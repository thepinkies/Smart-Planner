package edu.csupomona.cs480.data;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="subjects")
public class Subjects {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private String cardtext;
	private String date;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	@JsonIgnore
	private Person person;
	
	public Subjects()
	{
		
	}
	
	public Subjects(String name, String cardtext, String date, Person person) {
        this.name = name;
        this.cardtext = cardtext;
        this.date = date;
        this.person = person;
    }
	
	public int getId(){
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getDate(){
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getSubjectName() {
		return name;
	}
	
	public void setSubjectName(String subjectName) {
		this.name = subjectName;
	}
	
	public String getCardText() {
		return cardtext;
	}
	
	public void setCardText(String dailyTasks) {
		this.cardtext = dailyTasks;
	}
	
    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
	
	@Override
	public String toString(){
		return "id="+id+", name="+name+", country="+cardtext;
	}
	
}