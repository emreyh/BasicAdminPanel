package com.infonal.model;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "T_USER")
public class User implements Serializable {
	private static final long serialVersionUID = -3170268556845566736L;
	@Id
	private String id;
	@Field
	private String name;
	@Field(value = "lastname")
	private String lastName;
	@Field(value = "phone")
	private String phoneNumber;
	@Field(value = "joindate")
	private Date joinDate;
	

	public User() {
	}

	public User(String name, String lastName, String phoneNumber, Date joinDate) {
		super();
		this.name = name;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.joinDate = joinDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", lastName=" + lastName
				+ ", phoneNumber=" + phoneNumber + ", joinDate" + joinDate + "]";
	}
}
