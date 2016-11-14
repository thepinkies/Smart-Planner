Overview
--------

The skeleton of the demo web project for CS480.

This project is designed to let you practice the different aspects of software engineering, such as version control, design, tests, build, deployment, and maintenance.

Environment Setup
-----------------

1. Install the latests Maven (http://maven.apache.org/download.cgi)
2. Install the Eclipse 4+ (http://www.eclipse.org/)
3. Install the Maven Eclipse Plug-in using the update site (http://www.eclipse.org/m2e/download/)

Importing the Project into Eclipse
----------------------------------

1. File->Import->Maven->Existing Maven Projects
2. Select the directory containing the pom.xml file
3. Finish

Building the Project for the First Time
---------------------------------------
1. Right-click on the project root folder->Maven->Update Project

Running the Project Locally
----------------------------------------
1. Locate the App.java in src/main/java source folder and right-click on it->Run As->Java Application
2. Verify the running process in your web browser by the following URLs:

- http://localhost:8080/
- http://localhost:8080/cs480/ping
- http://localhost:8080/cs480/home

----------------------------------------
1. Adrian was here!
2. Testing Testing 123
3. Added some classes that will work with my Local SQL Tables
4. Use the following code to create the tables on your end, we will figure out how to deploy a unified database
- CREATE TABLE subjects (
	id int(11) unsigned NOT NULL AUTO_INCREMENT,
	subject_name varchar(75),
	daily_tasks TEXT,
	PRIMARY KEY(id),
  );

- CREATE TABLE daily_tasks (
	urgent_tasks_id int(11) unsigned NOT NULL AUTO_INCREMENT,
	urgent_task TEXT,
	subects_Id int,
	PRIMARY KEY(urgen_tasks_id),
	FOREIGN KEY(subjects_id) REFERENCES subjects(id),
  );

- The Listed tables should work. If an error were to occur, just text me and I will try to debug it with you.
