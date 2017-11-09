package sample.gateway;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.google.common.collect.Lists.newArrayList;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/**").permitAll();
		http.cors().configurationSource(corsConfigurationSource());
		http.csrf().ignoringAntMatchers("/uaa/**");
		// CSRF tokens handling
		http.addFilterAfter(new OncePerRequestFilter() {
			@Override
			protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
											FilterChain filterChain) throws ServletException, IOException {
				CsrfToken token = (CsrfToken) request.getAttribute("_csrf");
				if (token != null) {
					response.setHeader("X-CSRF-HEADER", token.getHeaderName());
					response.setHeader("X-CSRF-PARAM", token.getParameterName());
					response.setHeader("X-CSRF-TOKEN" , token.getToken());
				}
				filterChain.doFilter(request, response);
			}
		}, CsrfFilter.class);
	}

	public CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedHeader("*");
		config.addAllowedOrigin("http://localhost:4200");
		config.setAllowedMethods(newArrayList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		source.registerCorsConfiguration("/**", config);
		return source;
	}

}