package edu.csupomona.cs480.dao;

import java.util.List;

import edu.csupomona.cs480.data.Person;

public interface PersonDAO {

	public void save(Person p);
	
	public void updatePerson(Person p);
	
	public List<Person> list();
	
	public Person getPersonById(int id);
	
	public void removePerson(int id);
	
}
