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
This is the previous create table ignore it!

- CREATE TABLE due_dates (due_dates_id int(11) unsigned NOT NULL AUTO_INCREMENT, urgent_task varchar(75), subjects_id int unsigned, primary key(due_dates_id), foreign key(subjects_id) references subjects(id));

- The Listed tables should work. If an error were to occur, just text me and I will try to debug it with you.

NEW TABLE 

DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `cardtext` TEXT NOT NULL,
  `date` int(11) unsigned DEFAULT NULL,  
  `user_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  foreign key(user_id) references person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
