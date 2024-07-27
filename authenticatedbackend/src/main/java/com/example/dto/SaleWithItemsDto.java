package com.example.dto;

import java.util.List;

import com.example.models.SaleItem;



public class SaleWithItemsDto {
    private SalesDto saleDto;
    private List<SaleItem> saleItems;
    
    
	public SaleWithItemsDto(SalesDto saleDto, List<SaleItem> saleItems) {
		super();
		this.saleDto = saleDto;
		this.saleItems = saleItems;
	}
	public SaleWithItemsDto() {
        // Empty constructor
    }
	
	public SalesDto getSaleDto() {
		return saleDto;
	}
	public void setSaleDto(SalesDto saleDto) {
		this.saleDto = saleDto;
	}
	public List<SaleItem> getSaleItems() {
		return saleItems;
	}
	public void setSaleItems(List<SaleItem> saleItems) {
		this.saleItems = saleItems;
	}

    
}
