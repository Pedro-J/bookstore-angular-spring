package com.bookstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_user_shipping")
public class UserShipping extends AddressEntity implements Serializable{
	private static final long serialVersionUID = 978978987L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Boolean isDefault;

	@ManyToOne
	@JoinColumn(name="user_id")
	@JsonIgnore
	private User user;

    public UserShipping() {
    }

    public UserShipping(AddressEntity address) {
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

    public Boolean getDefault() {
        return isDefault;
    }

    public void setDefault(Boolean aDefault) {
        isDefault = aDefault;
    }
}
