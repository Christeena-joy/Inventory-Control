package com.example.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_purchase")
public class Purchases {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchase_sequence")
    @SequenceGenerator(name = "purchase_sequence", sequenceName = "purchase_sequence", allocationSize = 1)
    @Column(name = "purchaseId")
    private Long purchaseId;

    @ManyToOne
    @JoinColumn(name = "sid", nullable = false)
    private Supplier supplier;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "total_item_quantity", nullable = false)
    private int totalItemQuantity;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private PaymentStatus paymentStatus;

    @Column(name = "item_delivery_status", nullable = false)
    private boolean itemDeliveryStatus;
    
    @OneToMany(mappedBy = "purchase", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PurchaseItem> purchaseItems = new ArrayList<>();

    // Getter and setter methods...

    public List<PurchaseItem> getPurchaseItems() {
        return purchaseItems;
    }

    public void setPurchaseItems(List<PurchaseItem> purchaseItems) {
        this.purchaseItems = purchaseItems;
    }

	public Long getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(Long purchaseId) {
		this.purchaseId = purchaseId;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate localDate) {
		this.date = localDate;
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

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public boolean isItemDeliveryStatus() {
		return itemDeliveryStatus;
	}

	public void setItemDeliveryStatus(boolean itemDeliveryStatus) {
		this.itemDeliveryStatus = itemDeliveryStatus;
	}
    
    
}
