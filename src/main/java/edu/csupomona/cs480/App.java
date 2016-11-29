package edu.csupomona.cs480;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.hibernate.Session;

import edu.csupomona.cs480.data.Person;
import edu.csupomona.cs480.data.Subjects;
import edu.csupomona.cs480.data.provider.FSUserManager;
import edu.csupomona.cs480.data.provider.UserManager;
import edu.csupomona.cs480.util.HibernateUtil;

//@Configuration
//@EnableAutoConfiguration
//@ComponentScan
@SpringBootApplication
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
        //Run Spring Boot
        SpringApplication.run(App.class, args);

// before running springapplication run this first to create data into the table
//    	Session session = HibernateUtil.getSessionFactory().openSession();

//    	session.beginTransaction();

//    	Person PersonA = new Person("Adrian", "cs480");
//   	session.save(PersonA);
//    	Subjects subject1 = new Subjects("cs311", "hello world", 12, PersonA);
//    	Subjects subject2 = new Subjects("cs480", "hello world", 12, PersonA);
//    	Subjects subject3 = new Subjects("cs240", "hello world", 12, PersonA);

//        Set subjectset = new HashSet<Subjects>();
//        subjectset.add(subject1);
//        subjectset.add(subject2);
//        subjectset.add(subject3);
//        
//        
//        PersonA.setSubjects(subjectset);
//        
//        session.save(subject1);
//        session.save(subject2);
//        session.save(subject3);
//        
//        session.getTransaction().commit();
// end of the line
    	
        
    }
}
