package com.projects.AgiTask.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.projects.AgiTask.entities.Comment;

public class CommentDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
	private LocalDateTime dateTime;
	private UserDTO author;
	private Long taskId;

	public CommentDTO() {}

	public CommentDTO(Long id, String text, LocalDateTime dateTime, UserDTO author, Long taskId) {
		super();
		this.id = id;
		this.text = text;
		this.dateTime = dateTime;
		this.author = author;
		this.taskId = taskId;
	}
	
	public CommentDTO(Comment entity) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.dateTime = entity.getDateTime();
		this.author = new UserDTO(entity.getAuthor());
		this.taskId = entity.getTask().getId();

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public UserDTO getAuthor() {
		return author;
	}

	public void setAuthor(UserDTO author) {
		this.author = author;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
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
		CommentDTO other = (CommentDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
