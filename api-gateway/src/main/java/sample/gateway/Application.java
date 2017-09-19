package sample.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
//	@Bean
//	public CorsFilter corsFilter() {
//	    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	    final CorsConfiguration config = new CorsConfiguration();
//	    config.addAllowedOrigin("http://resttesttest.com");
//	    source.registerCorsConfiguration("/**", config);
//	    return new CorsFilter(source);
//	}
}
