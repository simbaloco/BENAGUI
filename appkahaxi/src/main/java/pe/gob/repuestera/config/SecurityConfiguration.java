package pe.gob.repuestera.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import pe.gob.repuestera.handler.LoggingAccessDeniedHandler;
import pe.gob.repuestera.handler.MyAuthenticationSuccessHandler;
import pe.gob.repuestera.service.impl.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private UserDetailsServiceImpl userDetailsService;
	@Autowired
    private LoggingAccessDeniedHandler accessDeniedHandler;
	
	// Necesario para evitar que la seguridad se aplique a los resources, como los css, imagenes y javascripts
	private String[] resources = new String[] {
			"/js/**",
            "/css/**",
            "/images/**",
            "/webjars/**",
            "/language/**"
    };
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
            .authorizeRequests()
	            .antMatchers(resources).permitAll() 
	            .antMatchers("/", "/index", "/login").permitAll()
	            /*****************************************************************************/
	            //.antMatchers("/principal*").access("hasRole('USER') or hasRole('ADMIN')")
	           // .antMatchers("/principal*").hasAnyRole("ADMIN","USER")
	            //.antMatchers("/articulos").access("hasRole('ADMIN')")
	            //.antMatchers("/articulos").hasRole("ADMIN")	 
		        //.antMatchers("/compras").hasAnyRole("ADMIN","USER")
	            //.antMatchers("/articulos").hasRole("USER")
		       // .antMatchers("/ventas").hasAnyRole("ADMIN","USER")
		        /****************************************************************************/
	    	    .anyRequest()
	    	    .authenticated()
	            .and()
	        .formLogin()
                .loginPage("/login")
                .permitAll()
                .successHandler(new MyAuthenticationSuccessHandler())
                //.defaultSuccessUrl("/principal")
                .failureUrl("/login?error=true")
                .and()
            .logout()
            	.invalidateHttpSession(true)
            	.clearAuthentication(true)
            	.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login?logout")
                .permitAll()
                .and()
            .exceptionHandling()
            	.accessDeniedHandler(accessDeniedHandler)
            	.and()
            .sessionManagement()
                .maximumSessions(1)
                .expiredUrl("/login?expiredSession")
                .and()
            .invalidSessionUrl("/?invalid-session")
                .and()
            .csrf()
        		.disable();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(4);
	}
	
	
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());     
	}
	
}

