package com.bookstore.domain.security;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="tb_role")
public class Role implements Serializable{
	
	private static final long serialVersionUID = 65675234L;
	
	@Id
	private int roleId;
	
	private String name;
	
	@OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
	private Set<UserRole> userRoles = new HashSet<>();

    public Role(){}

    public Role(int roleId, String name) {
        this.roleId = roleId;
        this.name = name;
    }

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<UserRole> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}
	
	
}
