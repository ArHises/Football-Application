package com.backend.roman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RomanApplication {

	public static void main(String[] args) {
		SpringApplication.run(RomanApplication.class, args);
		System.out.println("Server is running");
	}

}
