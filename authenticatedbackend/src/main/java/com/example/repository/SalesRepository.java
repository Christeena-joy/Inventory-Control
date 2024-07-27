package com.example.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Sales;


@Repository
public interface SalesRepository extends JpaRepository<Sales,Integer>{

}
