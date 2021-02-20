package com.proj.app.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resourceNotFoundHandling(ResourceNotFoundException exception, WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(APIException.class)
	public ResponseEntity<?> handleAPIException(APIException exception, WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
	}

	// handling global exception
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> globalExceptionHandling(Exception exception, WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
//	@ExceptionHandler(value = {ErrorDetails.class})
//	public ResponseEntity<?> handleCustomException
//		(ErrorDetails exception, WebRequest request){
//		ErrorDetails errorDetails = new ErrorDetails(exception.getMessage(), request.getDescription(false));
//		
//		return new ResponseEntity(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
//	}
}
