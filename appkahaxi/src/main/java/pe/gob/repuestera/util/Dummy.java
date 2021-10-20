package pe.gob.repuestera.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Dummy {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(4);
		System.out.println(bCryptPasswordEncoder.encode("admin"));
	}

}
