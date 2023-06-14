package com.projects.AgiTask.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.projects.AgiTask.entities.enums.Status;

@Entity
@Table(name = "tb_task")
public class Task implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	@Column(columnDefinition = "TEXT")
	private String description;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime startDate;
	private Status status;
	
	@ManyToOne
    @JoinColumn(name = "creator_id")
	private User creator;
	
	@OneToMany(mappedBy = "task")
	private List<Work> works = new ArrayList<>();
	
	@OneToMany(mappedBy = "task")
	private List<Comment> comments = new ArrayList<>();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_task_followers",
				joinColumns = @JoinColumn(name = "task_id"), 
				inverseJoinColumns = @JoinColumn(name = "follower_id")
			)
	private Set<User> followers = new HashSet<>();
	
	public Task() {}

	public Task(Long id, String title, String description, LocalDateTime startDate, Status status, User creator) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.status = status;
		this.creator = creator;
	}
	
	public Map<String, Integer> getUsersWorkTime() {
	    Map<String, Integer> userWorkTimeMap = new HashMap<>();
	    for (Work work : works) {
	        User user = work.getEmployee();
	        int workTime = work.getTime();
	        String userName = user.getName();
	        userWorkTimeMap.put(userName, userWorkTimeMap.getOrDefault(userName, 0) + workTime);
	    }
	    return userWorkTimeMap;
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

	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

	public List<Work> getWorks() {
		return works;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public Set<User> getFollowers() {
		return followers;
	}
	
	public Integer getTotalWorkTime() {
		int totalWorkTime = 0;
		for(Work work : works) {
			totalWorkTime += work.getTime();
		}
		return totalWorkTime;
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
		Task other = (Task) obj;
		return Objects.equals(id, other.id);
	}
	
}
