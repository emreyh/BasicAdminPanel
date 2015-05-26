package com.infonal.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.dao.DataAccessException;

@Aspect
public class LoggerAspect {

	private Logger log = Logger.getLogger(getClass());

	@Before("execution(* com.infonal.web.UserController.*(..))")
	public void logBefore(JoinPoint point) {
		log.info("logBefore() is running!");
		log.info(point.getSignature().getName() + " called...");
		log.info("*****************");
	}

	@AfterReturning(pointcut = "execution(* com.infonal.web.UserController.*(..))", returning = "data")
	public void logAfterReturning(JoinPoint point, Object data) {
		log.info("logAfterReturning() is running!");
		log.info(point.getSignature().getName() + " called...");
		log.info("Return value : " + data.toString());
		log.info("*****************");
	}
	@AfterThrowing(pointcut = "execution(* com.infonal.web.UserController.*(..))", throwing = "e")
	public void logAfterThrowing(JoinPoint point, DataAccessException e) {
		log.info("logAfterThrowing() is running!");
		log.info(point.getSignature().getName() + " called...");
		log.info("Exception  Message: " + e.getMessage());
		log.info("*****************");
	}

}
