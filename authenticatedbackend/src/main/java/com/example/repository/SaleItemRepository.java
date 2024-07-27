package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.SaleItem;


@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
	 List<SaleItem> findBySaleSaleId(Integer saleId);

}
