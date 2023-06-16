package com.projects.AgiTask.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.Task;
import com.projects.AgiTask.entities.User;
import com.projects.AgiTask.entities.enums.Status;
import com.projects.AgiTask.entities.interfaces.TasksByStatusProjection;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long>{

	@Query("SELECT obj FROM Task obj WHERE "
			+ "((obj.creator = :user) OR "
			+ "(:user MEMBER OF obj.followers)) AND "
			+ "(obj.status = :status) "
			+ "ORDER BY obj.startDate DESC")
	Page<Task> findByStatus(User user, Status status, Pageable pageable);
	
	@Query("SELECT t.status AS status, COUNT(t.id) AS sum FROM Task t GROUP BY t.status")
	List<TasksByStatusProjection> tasksByStatus();


}
