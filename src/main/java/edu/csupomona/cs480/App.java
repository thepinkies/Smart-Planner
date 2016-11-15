package edu.csupomona.cs480;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.csupomona.cs480.dao.PersonDAO;
import edu.csupomona.cs480.dao.SubjectsDAO;
import edu.csupomona.cs480.data.Person;
import edu.csupomona.cs480.data.Subjects;
import edu.csupomona.cs480.data.provider.FSUserManager;
import edu.csupomona.cs480.data.provider.UserManager;

@Configuration
@EnableAutoConfiguration
@ComponentScan
public class App {

    /**
     * This is a good example of how Spring instantiates
     * objects. The instances generated from this method
     * will be used in this project, where the Autowired
     * annotation is applied.
     */
    @Bean
    public UserManager userManager() {
        UserManager userManager = new FSUserManager();
        return userManager;
    }

    /**
     * This is the running main method for the web application.
     * Please note that Spring requires that there is one and
     * ONLY one main method in your whole program. You can create
     * other main methods for testing or debugging purposes, but
     * you cannot put extra main method when building your project.
     */
    public static void main(String[] args) throws Exception {
        // Run Spring Boot
        SpringApplication.run(App.class, args);
//    	ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
//		
//		PersonDAO personDAO = context.getBean(PersonDAO.class);
//		SubjectsDAO subjectsDAO = context.getBean(SubjectsDAO.class);
//		
//		Person person = new Person();
//		person.setName("Reyhan"); person.setCountry("Indonesia");
//		
//		Person personTwo = new Person();
//		personTwo.setName("Adrian Long");
//		personTwo.setCountry("Vietnam");
//		
//
//		personDAO.save(person);
//		personDAO.save(personTwo);
//		
//		System.out.println("Person::"+person);
//		
//		List<Person> list = personDAO.list();
//		
//		Subjects subject = new Subjects();
//		
//		//subject.setId(1);
//		subject.setSubjectName("CS 480");
//		subject.setDailyTasks("Get this Smart Planner Done! This is fricking awesome!");
//		
//		subjectsDAO.save(subject);
//		
//		
//		for(Person p : list){
//			System.out.println("Person List::"+p);
//		}
//		//close resources
//		context.close();
        
    }
}
