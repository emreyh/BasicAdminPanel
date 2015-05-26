package com.infonal.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import net.tanesha.recaptcha.ReCaptcha;
import net.tanesha.recaptcha.ReCaptchaResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.infonal.model.User;
import com.infonal.service.UserService;

@Controller
public class UserController {

	@Inject
	private UserService userService;

	@Inject
	private ReCaptcha reCaptchaService;

	// page number for the pagination
	private int pageNumber = 1;

	// index page
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String getAllUsers(ModelMap model) {
		pageNumber = 1;
		model.addAttribute("users", userService.getUsersByPagination(pageNumber));
		model.addAttribute("isEnough",userService.getCount() >= 12 ? true : false);
		return "index";
	}

	@RequestMapping(value = "getUsersAjaxByPageNumber", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getUsersByPageNumber() {
		pageNumber++;
		// get users from database
		List<User> users = userService.getUsersByPagination(pageNumber);

		// prepare ajax response
		Map<String, Object> response = new HashMap<String, Object>();
		if (users.size() == 0) {
			response.put("isExist", false);
		} else {
			response.put("isExist", true);
			response.put("users", users);
		}
		return response;
	}

	@RequestMapping(value = "addUserAjax", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUser(@RequestBody HashMap<String, String> formData, HttpServletRequest request) {
		String name = formData.get("name");
		String lastName = formData.get("lastname");
		String phoneNumber = formData.get("phoneNumber");
		
		// Ajax Response Data
		Map<String, Object> response = new HashMap<String, Object>();

		if(name == null || "".equals(name)){
			response.put("message", "name must be not empty");
			response.put("valid", false);
			return response;
		}
		if(lastName == null || "".equals(lastName)){
			response.put("message", "last name must be not empty");
			response.put("valid", false);
			return response;
		}
		
		// get recaptcha fields from ajax request
		String challenge = formData.get("recaptcha_challenge_field");
		String respCaptcha = formData.get("recaptcha_response_field");
		String remoteAddr = request.getRemoteAddr();
		ReCaptchaResponse reCaptchaResponse = reCaptchaService.checkAnswer(remoteAddr, challenge, respCaptcha);

		User user = new User(name, lastName, phoneNumber);

		if (reCaptchaResponse.isValid()) {
			userService.addUser(user); // added user to database
			if (user.getId() != null) {
				response.put("valid", true);
				response.put("user", user);
			} else {
				response.put("valid", false);
				response.put("message", "Registration failed.");
			}
		} else {
			response.put("reCaptchaValid", false);
		}
		return response;
	}

	@RequestMapping(value = "editUserAjax", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> editUser(@RequestBody HashMap<String, String> formData) {
		// ajax get parameters
		String userId = formData.get("userId");
		String name = formData.get("name");
		String lastName = formData.get("lastName");
		String phoneNumber = formData.get("phoneNumber");

		// find old user
		User findUser = userService.getUser(userId);
		findUser.setName(name);
		findUser.setLastName(lastName);
		findUser.setPhoneNumber(phoneNumber);

		// update user
		userService.editUser(findUser);

		// Ajax Response Data
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("valid", true);
		response.put("user", findUser);
		return response;
	}

	@RequestMapping(value = "/deleteUserAjax", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> deleteUser(@RequestBody HashMap<String, String> data) {
		// ajax get parameters
		String userId = data.get("userId");

		// deleted user
		userService.deleteUser(userId);

		// Ajax Response Data
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("valid", true);
		response.put("userId", userId);
		return response;
	}
}
