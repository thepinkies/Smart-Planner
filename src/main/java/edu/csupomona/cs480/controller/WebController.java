package edu.csupomona.cs480.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import edu.csupomona.cs480.App;
import edu.csupomona.cs480.data.Person;
import edu.csupomona.cs480.data.Subjects;
import edu.csupomona.cs480.data.User;
import edu.csupomona.cs480.data.provider.UserManager;
import edu.csupomona.cs480.util.HibernateUtil;


/**
 * This is the controller used by Spring framework.
 * <p>
 * The basic function of this controller is to map
 * each HTTP API Path to the correspondent method.
 *
 */

@RestController
public class WebController {

	/**
	 * When the class instance is annotated with
	 * {@link Autowired}, it will be looking for the actual
	 * instance from the defined beans.
	 * <p>
	 * In our project, all the beans are defined in
	 * the {@link App} class.
	 */
	@Autowired
	private UserManager userManager;
	
	@RequestMapping(value = "/cs480/login", method = RequestMethod.POST)
	boolean validId(@RequestBody Person person) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Person correct = (Person) session.createQuery("FROM Person where username = '"+ person.getName()+ "'" + 
		" AND password = '" + person.getPassword() + "'").uniqueResult();
		if(correct == null)
			return false;
		return true;
	}
	
	/*********
	 * This basically get all user info by entering the username
	 * @param userId
	 * @return
	 */
	@RequestMapping(value = "/cs480/getId/{userId}", method = RequestMethod.GET)
	Set<Subjects> getIdfromUserName(@PathVariable("userId") String userId) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Person person = (Person) session.createQuery("FROM Person where username = '"+ userId + "'").uniqueResult();
		if(person == null)
			return null;
		Set<Subjects> personList = session.get(Person.class, person.getId()).getSubjects();
		return personList;
	}

	@RequestMapping(value = "/cs480/putId/{userId}", method = RequestMethod.PUT)
	void putIdfromUserName(@PathVariable("userId") String userId, @RequestBody Subjects subjects) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Person person = (Person) session.createQuery("FROM Person where username = '"+ userId + "'").uniqueResult();
		Subjects toAddSubject = new Subjects(subjects.getSubjectName(), subjects.getCardText(), subjects.getDate(), person);
		session.save(toAddSubject);
		session.close();
	}

	@RequestMapping(value = "/cs480/deleteCard/{userId}", method = RequestMethod.GET)
	int deleteCardfromId(@PathVariable("userId") String userId) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction tx = session.beginTransaction();
		Subjects subject = (Subjects) session.createQuery("FROM Subjects where id = '"+ userId + "'").uniqueResult();
		session.delete(subject);
		tx.commit();
		return 1;
	}
	
	@RequestMapping(value = "/cs480/updateCard/{userId}", method = RequestMethod.GET)
	int updateCardfromId(@PathVariable("userId") String userId) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction tx = session.beginTransaction();
		Subjects subject = (Subjects) session.createQuery("FROM Subjects where id = '"+ userId + "'").uniqueResult();
		subject.setSubjectName("cs210");
		session.update(subject);
		tx.commit();
		return 1;
	}


	@RequestMapping(value = "/cs480/getDate/{userId}/{dateSelected}", method = RequestMethod.GET)
	Set<Subjects> getSubject(@PathVariable("userId") String userId, @PathVariable("dateSelected") String date) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Person person = (Person) session.createQuery("FROM Person where username = '"+ userId + "'").uniqueResult();
		if(person == null)
			return null;
		Set<Subjects> personList = session.get(Person.class, person.getId()).getSubjects();
		Set<Subjects> sortedlist = new HashSet<>();

		for(Subjects s: personList)
		{
			if(s.getDate().equals(date))
			{
				sortedlist.add(s);
			}
		}
		return sortedlist;
	}



	/**
	 * This is a simple example of how the HTTP API works.
	 * It returns a String "OK" in the HTTP response.
	 * To try it, run the web application locally,
	 * in your web browser, type the link:
	 * 	http://localhost:8080/cs480/ping
	 */
	@RequestMapping(value = "/cs480/ping", method = RequestMethod.GET)
	String healthCheck() {
		// You can replace this with other string,
		// and run the application locally to check your changes
		// with the URL: http://localhost:8080/
		return "The Pinkies was HERE! Smart Planner COMING SOON!!!!";
	}
	
	
	/**
	 * This is a simple example of how to use a data manager
	 * to retrieve the data and return it as an HTTP response.
	 * <p>
	 * Note, when it returns from the Spring, it will be
	 * automatically converted to JSON format.
	 * <p>
	 * Try it in your web browser:
	 * 	http://localhost:8080/cs480/user/user101
	 */
	@RequestMapping(value = "/cs480/user/{userId}", method = RequestMethod.GET)
	User getUser(@PathVariable("userId") String userId) {
		User user = userManager.getUser(userId);
		return user;
	}

	/**
	 * This is an example of sending an HTTP POST request to
	 * update a user's information (or create the user if not
	 * exists before).
	 *
	 * You can test this with a HTTP client by sending
	 *  http://localhost:8080/cs480/user/user101
	 *  	name=John major=CS
	 *
	 * Note, the URL will not work directly in browser, because
	 * it is not a GET request. You need to use a tool such as
	 * curl.
	 *
	 * @param id
	 * @param name
	 * @param major
	 * @return
	 */
	@RequestMapping(value = "/cs480/user/{userId}", method = RequestMethod.POST)
	User updateUser(
			@PathVariable("userId") String id,
			@RequestParam("name") String name,
			@RequestParam(value = "major", required = false) String major) {
		User user = new User();
		user.setId(id);
		user.setMajor(major);
		user.setName(name);
		userManager.updateUser(user);
		return user;
	}

	/**
	 * This API deletes the user. It uses HTTP DELETE method.
	 *
	 * @param userId
	 */
	@RequestMapping(value = "/cs480/user/{userId}", method = RequestMethod.DELETE)
	void deleteUser(
			@PathVariable("userId") String userId) {
		userManager.deleteUser(userId);
	}

	/**
	 * This API lists all the users in the current database.
	 *
	 * @return
	 */
	@RequestMapping(value = "/cs480/users/list", method = RequestMethod.GET)
	List<User> listAllUsers() {
		return userManager.listAllUsers();
	}

	/*********** Web UI Test Utility **********/
	/**
	 * This method provide a simple web UI for you to test the different
	 * functionalities used in this web service.
	 */
	@RequestMapping(value = "/cs480/home", method = RequestMethod.GET)
	ModelAndView getUserHomepag() {
		ModelAndView modelAndView = new ModelAndView("test");
		return modelAndView;
	}

	@RequestMapping(value = "/cs480/hometest", method = RequestMethod.GET)
	ModelAndView getHomeTest() {
		ModelAndView modelAndView = new ModelAndView("index");
		return modelAndView;
	}

}
