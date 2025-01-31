package com.example.models;

public class RegistrationDTO {
    private String username;
    private String password;
    private String email;
    private String phoneNo;

    public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String username, String password, String email, String phoneNo) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.phoneNo = phoneNo;
	}



	public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String password){
        this.password = password;
    }
    
    
    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	@Override
	public String toString() {
		return "RegistrationDTO [username=" + username + ", password=" + password + ", email=" + email + ", phoneNo="
				+ phoneNo + "]";
	}
	
	
}
