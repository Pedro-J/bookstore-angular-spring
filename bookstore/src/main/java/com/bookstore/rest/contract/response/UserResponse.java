package com.bookstore.domain;

import com.bookstore.domain.security.AuthorityEntity;
import com.bookstore.domain.security.UserRoleEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="tb_user")
public @Data @NoArgsConstructor class UserEntity implements UserDetails, Serializable{

	private static final long serialVersionUID = 9879895L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;
	
	private String username;

	@JsonIgnore
	private String password;

	private String firstName;
	private String lastName;
	
	private String email;
	private String phone;
	private boolean enabled = true;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonIgnore
	private Set<UserRoleEntity> userRoles = new HashSet<>();

	@OneToMany(cascade=CascadeType.ALL, mappedBy = "user")
	private List<UserPaymentEntity> userPaymentList;

	@OneToMany(cascade=CascadeType.ALL, mappedBy = "user")
	private List<UserShippingEntity> userShippingList;

	@OneToOne(cascade=CascadeType.ALL, mappedBy = "user")
	private ShoppingCartEntity shoppingCart;

	@Transient
	@JsonIgnore
	private String newPassword;

	@OneToMany(mappedBy="user")
	private List<OrderEntity> orderList;

    public UserEntity(String email, String username) {
		this.email = email;
		this.username = username;
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		Set<GrantedAuthority> authorities = new HashSet<>();
		userRoles.forEach(ur -> authorities.add(new AuthorityEntity(ur.getRole().getName())));
		
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

    @Override
	public boolean isEnabled() {
		return enabled;
	}


}
