package com.infonal.dao.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.infonal.dao.UserRepository;
import com.infonal.model.User;

@Repository
public class UserRepositoryImpl implements UserRepository {
	@Inject
	private MongoTemplate mongo;

	@Override
	public void addUser(User user) {
		if (!mongo.collectionExists(User.class)) {
			mongo.createCollection(User.class);
		}
		mongo.insert(user, COLLECTION_NAME);
	}

	@Override
	public void editUser(User user) {
		mongo.save(user);
	}

	@Override
	public void deleteUser(String userId) {
		mongo.findAndRemove(new Query(Criteria.where("_id").is(userId)), User.class);
	}

	@Override
	public List<User> getUsers() {
		return mongo.findAll(User.class);
	}

	@Override
	public User getUser(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(userId));
		return mongo.findOne(query, User.class);
	}

	@Override
	public List<User> getUsersByPagination(int page) {
		Query query = new Query();
		query.limit(LIMIT);
		query.skip((page - 1) * SKIP);

		return mongo.find(query, User.class);
	}

	@Override
	public Long getCount() {
		return mongo.count(new Query(), User.class);
	}

}
