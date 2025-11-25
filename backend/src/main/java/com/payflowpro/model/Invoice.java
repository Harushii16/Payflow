package com.payflowpro.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Invoice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private Double amount;
    private LocalDate invoiceDate;
    private Boolean paid = false;
    private String status = "CREATED";

    public Invoice() {}

    public Invoice(String customerName, Double amount) {
        this.customerName = customerName;
        this.amount = amount;
        this.invoiceDate = LocalDate.now();
        this.paid = false;
        this.status = "CREATED";
    }

    // getters and setters
    public Long getId() { return id; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public LocalDate getInvoiceDate() { return invoiceDate; }
    public void setInvoiceDate(LocalDate invoiceDate) { this.invoiceDate = invoiceDate; }
    public Boolean getPaid() { return paid; }
    public void setPaid(Boolean paid) { this.paid = paid; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
