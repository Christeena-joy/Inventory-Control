package com.example.services.impl;

import org.springframework.stereotype.Service;

import com.example.dto.SupplierDto;
import com.example.mapper.SupplierMapper;
import com.example.models.Supplier;
import com.example.repository.SupplierRepository;
import com.example.services.SupplierService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public SupplierDto createSupplier(SupplierDto supplierDto) {
        Supplier supplier = SupplierMapper.toEntity(supplierDto);
        Supplier savedSupplier = supplierRepository.save(supplier);
        return SupplierMapper.toDto(savedSupplier);
    }

    @Override
    public SupplierDto getSupplierById(Long id) {
        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);
        return optionalSupplier.map(SupplierMapper::toDto).orElse(null);
    }

    @Override
    public List<SupplierDto> getAllSuppliers() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return suppliers.stream()
                .map(SupplierMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierDto updateSupplier(Long id, SupplierDto supplierDto) {
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));

        // Update existing supplier attributes with those from the DTO
        existingSupplier.setSname(supplierDto.getSname());
        existingSupplier.setEmail(supplierDto.getEmail());
        existingSupplier.setPhone(supplierDto.getPhone());
        existingSupplier.setAddress(supplierDto.getAddress());

        // Save the updated supplier
        Supplier updatedSupplier = supplierRepository.save(existingSupplier);

        // Return the updated supplier DTO
        return SupplierMapper.toDto(updatedSupplier);
    }

    @Override
    public void deleteSupplier(Long id) {
        // Check if the supplier exists
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));

        // Delete the supplier
        supplierRepository.delete(existingSupplier);
    }
}