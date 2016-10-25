package edu.csupomona.cs480.controller;

import static org.junit.Assert.*;

import org.junit.Test;

public class WebControllerAdrianTest {

	@Test
	public void test() {
		WebControllerAdrian test = new WebControllerAdrian();
		int squareNumber = test.square(5);
		assertEquals(25, squareNumber);
		
	}

}
