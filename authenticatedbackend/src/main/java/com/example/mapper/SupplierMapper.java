package com.example.mapper;

import com.example.dto.SupplierDto;
import com.example.models.Supplier;

public class SupplierMapper {

    public static SupplierDto toDto(Supplier supplier) {
        SupplierDto supplierDto = new SupplierDto();
        supplierDto.setSid(supplier.getSid());
        supplierDto.setSname(supplier.getSname());
        supplierDto.setEmail(supplier.getEmail());
        supplierDto.setPhone(supplier.getPhone());
        supplierDto.setAddress(supplier.getAddress());
        return supplierDto;
    }

    public static Supplier toEntity(SupplierDto supplierDto) {
        Supplier supplier = new Supplier();
        supplier.setSid(supplierDto.getSid());
        supplier.setSname(supplierDto.getSname());
        supplier.setEmail(supplierDto.getEmail());
        supplier.setPhone(supplierDto.getPhone());
        supplier.setAddress(supplierDto.getAddress());
        return supplier;
    }
}