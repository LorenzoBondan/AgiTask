package com.projects.AgiTask.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long>{

}
