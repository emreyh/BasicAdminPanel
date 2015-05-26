package com.infonal.dao;

import java.util.List;

import com.infonal.model.User;

public interface UserRepository {
	String COLLECTION_NAME = "T_USER";
	int LIMIT = 10;
	int SKIP  = 10;
	public void addUser(User user);

	public void editUser(User user);

	public void deleteUser(String userId);

	public List<User> getUsers();

	public User getUser(String userId);
	
	public List<User> getUsersByPagination(int page);
	
	public Long getCount();
	
}
