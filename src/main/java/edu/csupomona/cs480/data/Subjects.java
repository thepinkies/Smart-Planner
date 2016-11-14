package edu.csupomona.cs480.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="subjects")
public class Subjects {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String subjectName;
	private String dailyTasks;
	
	public int getId(){
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getSubjectName() {
		return subjectName;
	}
	
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	
	public String getDailyTasks() {
		return dailyTasks;
	}
	
	public void setDailyTasks(String dailyTasks) {
		this.dailyTasks = dailyTasks;
	}
	
	@Override
	public String toString(){
		return "id="+id+", name="+subjectName+", country="+dailyTasks;
	}
	
}