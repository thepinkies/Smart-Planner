package edu.csupomona.pomona.cs480.dao;

import java.util.List;

import edu.csupomona.cs480.data.Subjects;

public interface SubjectsDAO {

	public void save(Subjects subject);
	
	public List<Subjects> list();

	public void update(Subjects subject);
	
}
