package com.projects.AgiTask.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.projects.AgiTask.entities.Task;
import com.projects.AgiTask.entities.enums.Status;

public class TaskDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String title;
	private String description;
	private LocalDateTime startDate;
	private Status status;
	private Integer totalWorkTime;
	
	private Long creatorId;
	
	private List<Long> followersId = new ArrayList<>();
	
	private List<WorkDTO> works = new ArrayList<>();
	
	private List<CommentDTO> comments = new ArrayList<>();
	
	private Map<String, Integer> usersWorkTime = new HashMap<>();
	
	public TaskDTO() {}

	public TaskDTO(Long id, String title, String description, LocalDateTime startDate, Status status, Integer totalWorkTime, Long creatorId) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.status = status;
		this.totalWorkTime = totalWorkTime;
		this.creatorId = creatorId;
	}
	
	public TaskDTO(Task entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.description = entity.getDescription();
		this.startDate = entity.getStartDate();
		this.status = entity.getStatus();
		this.creatorId = entity.getCreator().getId();
		
		this.totalWorkTime = entity.getTotalWorkTime();
		this.usersWorkTime = entity.getUsersWorkTime();
		
		entity.getComments().forEach(com -> this.comments.add(new CommentDTO(com)));
		entity.getWorks().forEach(work -> this.works.add(new WorkDTO(work)));
		entity.getFollowers().forEach(fol -> this.followersId.add(fol.getId()));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Integer getTotalWorkTime() {
		return totalWorkTime;
	}

	public void setTotalWorkTime(Integer totalWorkTime) {
		this.totalWorkTime = totalWorkTime;
	}

	public Long getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}

	public List<Long> getFollowersId() {
		return followersId;
	}

	public List<WorkDTO> getWorks() {
		return works;
	}

	public List<CommentDTO> getComments() {
		return comments;
	}

	public Map<String, Integer> getUsersWorkTime() {
		return usersWorkTime;
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
		TaskDTO other = (TaskDTO) obj;
		return Objects.equals(id, other.id);
	}
}
