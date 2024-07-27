package com.example.dto;


public class CustomerDto {
	private Integer customerId;
    private String cname;
    private String email;
    private String phoneNo;
    private String address;

    // Constructors
    public CustomerDto() {
    }

    public CustomerDto(Integer customerId, String cname, String email, String phoneNo, String address) {
        this.customerId = customerId;
        this.cname = cname;
        this.email = email;
        this.phoneNo = phoneNo;
        this.address = address;
    }

    // Getters and Setters
    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
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

	public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
