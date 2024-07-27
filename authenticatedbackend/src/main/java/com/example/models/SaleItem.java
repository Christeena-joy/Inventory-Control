package com.example.models;
import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "sale_items")
public class SaleItem {

	    @Id
	    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sale_item_sequence")
	    @SequenceGenerator(name = "sale_item_sequence", sequenceName = "sale_item_sequence", allocationSize = 1)
	    @Column(name = "sale_item_id")
	    private Long saleItemId;

	    @ManyToOne
	    @JoinColumn(name = "sale_id", nullable = false)
	    private Sales sale;

	    @ManyToOne
	    @JoinColumn(name = "pid", nullable = false)
	    private Product product;

	    @ManyToOne
	    @JoinColumn(name = "category_id", nullable = false)
	    private Category category;

	    @Column(name = "quantity", nullable = false)
	    private int quantity;

	    @Column(name = "total_amount", nullable = false)
	    private BigDecimal totalAmount;

		public Long getSaleItemId() {
			return saleItemId;
		}

		public void setSaleItemId(Long saleItemId) {
			this.saleItemId = saleItemId;
		}

		public Sales getSale() {
			return sale;
		}

		public void setSale(Sales sale) {
			this.sale = sale;
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
