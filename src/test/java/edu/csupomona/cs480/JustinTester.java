package edu.csupomona.cs480;

import static org.junit.Assert.assertEquals;
import org.junit.Test;
 
public class JustinTester {
 
 	@Test
	public void additionTest() {
		assertEquals("Addition test result! - ", 85, addition(35, 50));
	}
 
	public int addition(int x, int y) {
		return x + y;
	}
 
 	@Test
	public void booleanTest() {
		System.out.println("Boolean test result! - ");
		assertTrue(booleanTester());
	}
 
	public Boolean booleanTester() {
		Boolean result = true;
		return result;
	}
}
		
		