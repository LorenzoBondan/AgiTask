package com.projects.AgiTask.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.dto.WorkDTO;
import com.projects.AgiTask.entities.Work;

@Repository
public interface WorkRepository extends JpaRepository<Work,Long>{

    @Query("SELECT SUM(w.time) FROM Work w WHERE w.employee.id = :employeeId AND MONTH(w.dateTime) = :month")
    Integer getTotalTimeByEmployeeAndMonth(Long employeeId, Integer month);

    @Query("SELECT w FROM Work w WHERE w.employee.id = :employeeId AND MONTH(w.dateTime) = :month")
    List<WorkDTO> getWorksByEmployeeAndMonth(Long employeeId, Integer month);
}
