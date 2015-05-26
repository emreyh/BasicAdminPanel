package com.infonal.service;

import java.util.List;

import com.infonal.model.User;

public interface UserService {
	public void addUser(User user);

	public void editUser(User user);

	public void deleteUser(String userId);

	public List<User> getUsers();

	public User getUser(String userId);
	
	public List<User> getUsersByPagination(int page);
	
	public Long getCount();

}
