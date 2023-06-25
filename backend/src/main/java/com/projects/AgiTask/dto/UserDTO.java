package com.projects.AgiTask.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.projects.AgiTask.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	
	@Email(message = "Favor entrar com um email válido")
	private String email;

	private String imgUrl;
	
	private Set<Long> totalTasksCompleted = new HashSet<>();
	
	private List<RoleDTO> roles = new ArrayList<>();
	
	private List<NotificationDTO> notifications = new ArrayList<>();
	
	private List<Long> commentsId = new ArrayList<>();
	
	private List<Long> groupsId = new ArrayList<>();
	
	private List<WorkDTO> works = new ArrayList<>();
	
	private List<Long> tasksId = new ArrayList<>();
	
	private List<Long> tasksFollowingId = new ArrayList<>();
	
	private Integer totalWorkTime;
	  
	public UserDTO() {}

	public UserDTO(Long id, String name, String email, String password, Long favoriteTeamId, String imgUrl, Integer totalWorkTime) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.imgUrl = imgUrl;
		this.totalWorkTime = totalWorkTime;
	}
	
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.imgUrl = entity.getImgUrl();
		
		entity.getTotalTasksCompleted().forEach(task -> this.totalTasksCompleted.add(task));
		entity.getRoles().forEach(rol -> this.roles.add(new RoleDTO(rol)));
		entity.getNotifications().forEach(not -> this.notifications.add(new NotificationDTO(not)));
		entity.getComments().forEach(com -> this.commentsId.add(com.getId()));
		entity.getGroups().forEach(group -> this.groupsId.add(group.getId()));
		entity.getWorks().forEach(work -> this.works.add(new WorkDTO(work)));
		entity.getTasks().forEach(task -> this.tasksId.add(task.getId()));
		entity.getTasksFollowing().forEach(task -> this.tasksFollowingId.add(task.getId()));
		
		entity.getTasksFollowing().forEach(task -> this.tasksId.add(task.getId()));
		
		this.totalWorkTime = entity.getTotalWorkTime();
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Set<Long> getTotalTasksCompleted() {
		return totalTasksCompleted;
	}

	public List<RoleDTO> getRoles() { 
		return roles;
	}

	public List<NotificationDTO> getNotifications() {
		return notifications;
	}

	public List<Long> getCommentsId() {
		return commentsId;
	}

	public List<Long> getGroupsId() {
		return groupsId;
	}

	public List<WorkDTO> getWorks() {
		return works;
	}

	public List<Long> getTasksId() {
		return tasksId;
	}

	public List<Long> getTasksFollowingId() {
		return tasksFollowingId;
	}

	public Integer getTotalWorkTime() {
		return totalWorkTime;
	}

	public void setTotalWorkTime(Integer totalWorkTime) {
		this.totalWorkTime = totalWorkTime;
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
		UserDTO other = (UserDTO) obj;
		return Objects.equals(id, other.id);
	}
}
