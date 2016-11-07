package edu.csupomona.pomona.cs480.dao;

import java.util.List;

import edu.csupomona.cs480.data.Person;

public interface PersonDAO {

	public void save(Person p);
	
	public List<Person> list();
	
}
