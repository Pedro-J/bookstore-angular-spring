package com.bookstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_order_billing")
public class OrderBilling extends Address implements Serializable{
	private static final long serialVersionUID = 78293749582348L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@OneToOne
	@JsonIgnore
	private Order order;

    public OrderBilling() {
    }

    public OrderBilling(Address address) {
        this.setCity(address.getCity());
        this.setCountry(address.getCountry());
        this.setState(address.getState());
        this.setStreet1(address.getStreet1());
        this.setStreet2(address.getStreet2());
        this.setZipcode(address.getZipcode());
        this.setName(address.getName());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }


}
