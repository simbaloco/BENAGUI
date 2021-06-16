package pe.gob.repuestera.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.exception.RepuesteraException;

import java.io.PrintWriter;
import java.io.StringWriter;

@ControllerAdvice
public class ExceptionHandlerAdvice {

    private static final Logger logger = LogManager.getLogger(ExceptionHandlerAdvice.class);

    @ExceptionHandler(RepuesteraException.class)
    public ResponseEntity handleException(RepuesteraException e) {
    	logger.debug("RepuesteraException ==> " +  e.getMessage());
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }

    @ExceptionHandler(ErrorControladoException.class)
    public ResponseEntity handleException(ErrorControladoException ex) {

        logger.debug("ErrorControladoException ==> " +  ex.getMessage());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity globalExceptionHandler(Exception ex) {

        StringWriter printStackTrace = new StringWriter();
        ex.printStackTrace(new PrintWriter(printStackTrace));
        logger.debug("Exception ==> " +  printStackTrace.toString());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.toString());
    }

}
