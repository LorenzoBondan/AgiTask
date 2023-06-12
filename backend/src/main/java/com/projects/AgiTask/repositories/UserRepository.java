package com.projects.AgiTask.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	User findByEmail(String email);
	
	@Query("SELECT DISTINCT obj FROM User obj "
			+ "WHERE (UPPER(obj.name) LIKE UPPER(CONCAT('%', :name, '%')) ) ORDER BY obj.name")
	Page<User> find(String name, Pageable pageable);
}
