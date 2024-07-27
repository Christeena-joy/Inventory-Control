package com.example.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SalesDto {

    private Integer saleId;
    private Integer customerId;
    private LocalDate date;
    private int totalQuantity;
    private BigDecimal totalAmount;
    private Long paymentStatusId;
    private boolean itemDeliveryStatus; 
    

	public Integer getSaleId() {
        return saleId;
    }

    public void setSaleId(Integer saleId) {
        this.saleId = saleId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
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
