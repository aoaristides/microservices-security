#!/usr/bin/env bash

set -e;

S3_ENV="$1";
if [ -z "$S3_ENV" ]; then
  S3_ENV=dev
fi;

if [[ $S3_ENV != "dev" && $S3_ENV != "qa" && $S3_ENV != "stg" && $S3_ENV != "prod" ]]; then
  echo "Invalid s3 env $S3_ENV";
  exit 1;
fi;

export AWS_S3_BUCKET="braviant-frontend-${S3_ENV}";

if [ $S3_ENV == "dev" ]; then
  AWS_CF_DISTRIBUTION="E1GA0Z1L4W26EJ";
elif [ $S3_ENV == "qa" ]; then
  AWS_CF_DISTRIBUTION="E1TW7YRS1296GN";
elif [ $S3_ENV == "stg" ]; then
  AWS_CF_DISTRIBUTION="E33IAA9NYH4I6Z";
elif [ $S3_ENV == "prod" ]; then
  AWS_CF_DISTRIBUTION="EHWX1NQIIXOJL";
fi
export AWS_CF_DISTRIBUTION;

if [ -z $WORKSPACE ]; then
  WORKSPACE=`dirname $0`;
fi;

cd "${WORKSPACE}";

docker build -t razorvision/braviant-frontend . 

rm -Rf dist && mkdir dist;

docker run -i -v /mnt/efs/jenkins/workspace/braviant-frontend-${S3_ENV}/dist:/opt/frontend/dist --rm razorvision/braviant-frontend

cat > ~/.aws/credentials <<EOF
[default]
aws_access_key_id = $AWS_ACCESS_KEY
aws_secret_access_key = $AWS_SECRET_KEY
EOF
aws --region us-east-1 s3 sync ./dist/ s3://${AWS_S3_BUCKET}/
aws --region us-east-1 cloudfront create-invalidation --distribution-id ${AWS_CF_DISTRIBUTION} --path "/*" 

rm -Rf ~/.aws;

exit 0;
