package edu.csupomona.cs480.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import edu.csupomona.cs480.data.Person;
import edu.csupomona.cs480.data.Subjects;


public class SubjectsDAOImpl implements SubjectsDAO{

	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public void save(Subjects subject) {
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		session.persist(subject);
		tx.commit();
		session.close();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Subjects> list() {
		Session session = this.sessionFactory.openSession();
		List<Subjects> subjectsList = session.createQuery("from Subject").list();
		session.close();
		return subjectsList;
	}

	@Override
	public Subjects getPersonById(int id) {
		Session session = this.sessionFactory.getCurrentSession();		
		Subjects s = (Subjects) session.load(Subjects.class, new Integer(id));
		return s;
	}

	@Override
	public void removePerson(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Subjects p = (Subjects) session.load(Subjects.class, new Integer(id));
		if(null != p){
			session.delete(p);
		}
		
	}

	@Override
	public void update(Subjects subject) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(subject);
		
	}
}