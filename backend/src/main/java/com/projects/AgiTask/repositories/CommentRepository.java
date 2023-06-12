package com.projects.AgiTask.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>{

}
