package com.example.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PurchasesDto {

    private Long purchaseId;
    private Long sid;
    private LocalDate date;
    private int totalItemQuantity;
    private BigDecimal totalAmount;
    private Long paymentStatusId;
    private boolean itemDeliveryStatus;
    
    
    
	public PurchasesDto() {
		super();
	}
	public PurchasesDto(Long purchaseId, Long supplierId, LocalDate date, int totalItemQuantity, BigDecimal totalAmount,
			Long paymentStatusId, boolean itemDeliveryStatus) {
		super();
		this.purchaseId = purchaseId;
		this.sid = supplierId;
		this.date = date;
		this.totalItemQuantity = totalItemQuantity;
		this.totalAmount = totalAmount;
		this.paymentStatusId = paymentStatusId;
		this.itemDeliveryStatus = itemDeliveryStatus;
	}
	
	public Long getPurchaseId() {
		return purchaseId;
	}
	public void setPurchaseId(Long purchaseId) {
		this.purchaseId = purchaseId;
	}
	
	public Long getSid() {
		return sid;
	}
	public void setSid(Long sid) {
		this.sid = sid;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public int getTotalItemQuantity() {
		return totalItemQuantity;
	}
	public void setTotalItemQuantity(int totalItemQuantity) {
		this.totalItemQuantity = totalItemQuantity;
	}
	public BigDecimal getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Long getPaymentStatusId() {
		return paymentStatusId;
	}
	public void setPaymentStatusId(Long paymentStatusId) {
		this.paymentStatusId = paymentStatusId;
	}
	public boolean isItemDeliveryStatus() {
		return itemDeliveryStatus;
	}
	public void setItemDeliveryStatus(boolean itemDeliveryStatus) {
		this.itemDeliveryStatus = itemDeliveryStatus;
	}

    
}
