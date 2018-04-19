package com.bookstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_user_billing")
public class UserBilling extends Address implements Serializable{
	private static final long serialVersionUID = 1231123934L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@OneToOne(mappedBy = "userBilling")
	@JsonIgnore
	private UserPayment userPayment;

    public UserBilling() {
    }

    public UserBilling(Address address) {
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

	public UserPayment getUserPayment() {
		return userPayment;
	}

	public void setUserPayment(UserPayment userPayment) {
		this.userPayment = userPayment;
	}

}
