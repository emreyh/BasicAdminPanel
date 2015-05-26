<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title> <tiles:insertAttribute name = "title" /></title>
	<link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.flatly.css" rel="stylesheet" type="text/css">
	<link href="${pageContext.request.contextPath}/resources/css/custom.css" rel="stylesheet" type="text/css">
	<link href="${pageContext.request.contextPath}/resources/css/bootstrapValidator.min.css" rel="stylesheet" type="text/css">
	<link href="${pageContext.request.contextPath}/resources/css/animate.css" rel="stylesheet" type="text/css">
	<link href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css" rel="stylesheet" >
	<link href="${pageContext.request.contextPath}/resources/css/footable.core.min.css" rel="stylesheet" >
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/customScript.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrapValidator.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-growl.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/footable.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/footable.filter.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/footable.sort.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/footable.paginate.js"></script>
	<script type="text/javascript" src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.mask.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/customValidationSettings.js"></script>
</head>
<body>
	<div id="wrap">
		<tiles:insertAttribute name="header" />
		<div class="container">
			<tiles:insertAttribute name="body" />
		</div>
		<div id="footer">
			<div class="container">
				<tiles:insertAttribute name="footer" />
			</div>
		</div>
	</div>
</body>
</html>