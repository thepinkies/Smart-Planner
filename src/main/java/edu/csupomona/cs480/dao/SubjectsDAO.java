package edu.csupomona.cs480.dao;

import java.util.List;

import edu.csupomona.cs480.data.Subjects;

public interface SubjectsDAO {

	public void save(Subjects subject);
	
	public List<Subjects> list();

	public void update(Subjects subject);
	
	public Subjects getPersonById(int id);
	
	public void removePerson(int id);
	
}
