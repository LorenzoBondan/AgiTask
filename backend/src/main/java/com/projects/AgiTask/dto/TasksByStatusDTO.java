package com.projects.AgiTask.dto;

import java.io.Serializable;


public class TasksByStatusDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String status;
	private Integer sum;
	
	public TasksByStatusDTO() {}

	public TasksByStatusDTO(String string, Integer sum) {
		super();
		this.status = string;
		this.sum = sum;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getSum() {
		return sum;
	}

	public void setSum(Integer sum) {
		this.sum = sum;
	}
	
	
}
