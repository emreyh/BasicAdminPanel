package com.infonal.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infonal.dao.UserRepository;
import com.infonal.model.User;
import com.infonal.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Inject
	private UserRepository userRepo;

	@Override
	public void addUser(User user) {
		userRepo.addUser(user);
	}

	@Override
	public void editUser(User user) {
		userRepo.editUser(user);
	}

	@Override
	public List<User> getUsers() {
		return userRepo.getUsers();
	}

	@Override
	public User getUser(String userId) {
		return userRepo.getUser(userId);
	}

	@Override
	public List<User> getUsersByPagination(int page) {
		return userRepo.getUsersByPagination(page);
	}

	@Override
	public void deleteUser(String userId) {
		userRepo.deleteUser(userId);
	}

	@Override
	public Long getCount() {
		return userRepo.getCount();
	}
}
