package com.projects.AgiTask.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.Task;
import com.projects.AgiTask.entities.enums.Status;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long>{

	Page<Task> findByStatus(Status status, Pageable pageable);
}
