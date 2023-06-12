package com.projects.AgiTask.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long>{

}
