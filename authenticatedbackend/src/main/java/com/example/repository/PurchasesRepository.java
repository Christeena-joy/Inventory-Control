package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Purchases;


@Repository
public interface PurchasesRepository extends JpaRepository<Purchases, Long> {

}
