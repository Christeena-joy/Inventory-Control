package com.example.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "purchase_items")
public class PurchaseItem {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchase_item_sequence")
    @SequenceGenerator(name = "purchase_item_sequence", sequenceName = "purchase_item_sequence", allocationSize = 1)
    @Column(name = "purchase_item_id")
    private Long purchaseItemId;

	@ManyToOne
    @JoinColumn(name = "purchaseId", nullable = false)
    private Purchases purchase;

    @ManyToOne
    @JoinColumn(name = "pid", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "total_amt", nullable = false)
    private BigDecimal totalAmount;

	public Long getPurchaseItemId() {
		return purchaseItemId;
	}

	public void setPurchaseItemId(Long purchaseItemId) {
		this.purchaseItemId = purchaseItemId;
	}

	public Purchases getPurchase() {
		return purchase;
	}

	public void setPurchase(Purchases purchase) {
		this.purchase = purchase;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}
    
    
}
