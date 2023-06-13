package com.projects.AgiTask.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.Group;
import com.projects.AgiTask.entities.User;

@Repository
public interface GroupRepository extends JpaRepository<Group,Long>{

	@Query("SELECT g FROM Group g JOIN g.users u WHERE u = :user ORDER BY g.name DESC")
	Page<Group> findGroupsByUser(User user, Pageable pageable);
}
