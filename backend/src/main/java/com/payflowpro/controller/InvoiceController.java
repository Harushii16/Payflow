package com.payflowpro.controller;

import com.payflowpro.model.Invoice;
import com.payflowpro.repository.InvoiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    private final InvoiceRepository repo;

    public InvoiceController(InvoiceRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Invoice> all() {
        return repo.findAll();
    }

    @PostMapping
    public Invoice create(@RequestBody Invoice invoice) {
        invoice.setStatus("CREATED");
        return repo.save(invoice);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> get(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Invoice> pay(@PathVariable Long id) {
        return repo.findById(id).map(inv -> {
            inv.setPaid(true);
            inv.setStatus("PAID");
            repo.save(inv);
            return ResponseEntity.ok(inv);
        }).orElse(ResponseEntity.notFound().build());
    }
}
