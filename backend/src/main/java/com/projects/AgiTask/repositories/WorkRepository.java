package com.projects.AgiTask.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.Work;

@Repository
public interface WorkRepository extends JpaRepository<Work,Long>{

}
