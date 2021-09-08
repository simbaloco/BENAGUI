package pe.gob.repuestera.handler;

import java.io.IOException;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler{

	private static final Logger logger = LogManager.getLogger(MyAuthenticationSuccessHandler.class);
	
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
        logger.info("roles-->" + roles);
        
        if (roles.contains("ROLE_ADMIN")) {
            request.getSession(false).setMaxInactiveInterval(60000);
        }
        else {
            request.getSession(false).setMaxInactiveInterval(120);
        }
        //Your login success url goes here, currently login success url="/"
        logger.info(request.getContextPath());
        response.sendRedirect(request.getContextPath() + "/principal");
    }
}
