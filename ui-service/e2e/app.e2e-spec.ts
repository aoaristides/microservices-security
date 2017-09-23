import { BraviantFrontendPage } from './app.po';

describe('braviant-frontend App', function() {
  let page: BraviantFrontendPage;

  beforeEach(() => {
    page = new BraviantFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
