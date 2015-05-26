package com.infonal.web;

import org.mockito.Mockito;
import org.springframework.beans.factory.FactoryBean;

public class MockitoFactoryBean<T> implements FactoryBean<T> {

	private final Class<T> classToBeMocked;

	public MockitoFactoryBean(final Class<T> classToBeMocked) {
		this.classToBeMocked = classToBeMocked;
	}

	@Override
	public T getObject() throws Exception {
		return Mockito.mock(this.classToBeMocked);
	}

	@Override
	public Class<?> getObjectType() {
		return this.classToBeMocked;
	}

	@Override
	public boolean isSingleton() {
		return true;
	}
}