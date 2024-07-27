package com.example.dto;

import java.math.BigDecimal;

public class ProductDto {
	 private Long pid;
	    private String pname;
	    private Long categoryId; 
	    private Integer quantity;
	    private BigDecimal purchasePrice; 
	    private BigDecimal salePrice; 
	    
	    // Constructors
	    public ProductDto() {
	    }

	    public ProductDto(Long pid, String pname, Long categoryId,  BigDecimal purchasePrice, BigDecimal salePrice, Integer quantity) {
	        this.pid = pid;
	        this.pname = pname;
	        this.categoryId = categoryId;
	        this.quantity = quantity;
	        this.purchasePrice = purchasePrice;
	        this.salePrice = salePrice;
	    }
	    
	    // Getters and Setters
	    public Long getPid() {
	        return pid;
	    }

	    public void setPid(Long pid) {
	        this.pid = pid;
	    }

	    public String getPname() {
	        return pname;
	    }

	    public void setPname(String pname) {
	        this.pname = pname;
	    }

	    public Long getCategoryId() {
	        return categoryId;
	    }

	    public void setCategoryId(Long categoryId) {
	        this.categoryId = categoryId;
	    }

	    public BigDecimal getPurchasePrice() {
	        return purchasePrice;
	    }

	    public void setPurchasePrice(BigDecimal purchasePrice) {
	        this.purchasePrice = purchasePrice;
	    }

	    public BigDecimal getSalePrice() {
	        return salePrice;
	    }

	    public void setSalePrice(BigDecimal salePrice) {
	        this.salePrice = salePrice;
	    }
	    

	    public Integer getQuantity() {
	        return quantity;
	    }

	    public void setQuantity(Integer quantity) {
	        this.quantity = quantity;
	    }
}
