package edu.csupomona.pomona.cs480.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import edu.csupomona.cs480.data.Person;


public class PersonDaoImpl implements PersonDAO {

	private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
    
	@Override
	public void save(Person p) {
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		session.persist(p);
		tx.commit();
		session.close();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Person> list() {
		Session session = this.sessionFactory.openSession();
		List<Person> personList = session.createQuery("from Person").list();
		session.close();
		return personList;
	}

}