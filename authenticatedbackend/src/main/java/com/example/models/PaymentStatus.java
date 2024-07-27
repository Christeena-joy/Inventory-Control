package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "payment_status")
public class PaymentStatus {

	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "status_sequence")
    @SequenceGenerator(name = "status_sequence", sequenceName = "status_sequence", allocationSize = 1)
    @Column(name = "status_id")
    private Long statusId;

    @Column(name = "status", nullable = false)
    private String status;

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    
}
