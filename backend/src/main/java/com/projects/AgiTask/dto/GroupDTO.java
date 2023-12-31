package com.projects.AgiTask.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.projects.AgiTask.entities.Group;

public class GroupDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	
	private Integer totalWorkTime;
	
	private List<UserDTO> users = new ArrayList<>();
	
	public GroupDTO() {}
	
	public GroupDTO(Long id, String name, Integer totalWorkTime) {
		super();
		this.id = id;
		this.name = name;
		this.totalWorkTime = totalWorkTime;
	}
	
	public GroupDTO(Group entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.totalWorkTime = entity.getTotalWorkTime();
		
		entity.getUsers().forEach(user -> this.users.add(new UserDTO(user)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getTotalWorkTime() {
		return totalWorkTime;
	}

	public void setTotalWorkTime(Integer totalWorkTime) {
		this.totalWorkTime = totalWorkTime;
	}

	public List<UserDTO> getUsers() {
		return users;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GroupDTO other = (GroupDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	

}
