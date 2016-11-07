package edu.csupomona.cs480;

import static org.junit.Assert.*;
import org.junit.Test;

public class IsoldeTest {
	
	@Test
	public void stringTest() {
		System.out.print("Null string test result: ");
		assertNull(createNullString());
		System.out.println("Valid string test result: ");
		assertNotNull(createString());
	}

	public String createNullString() {
		String test = null;
		return test;
	}

	public String createString() {
		String test2 = "Hello World!";
		return test2;
	}
}
