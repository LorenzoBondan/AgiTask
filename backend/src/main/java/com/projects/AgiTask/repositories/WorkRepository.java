package com.projects.AgiTask.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.AgiTask.dto.WorkDTO;
import com.projects.AgiTask.entities.Work;

@Repository
public interface WorkRepository extends JpaRepository<Work,Long>{

    default Integer getTotalTimeByEmployeeAndMonth(Long employeeId, Integer month) {
        List<WorkDTO> works = getWorksByEmployeeAndMonth(employeeId, month);
        Integer totalTime = works.stream()
                .map(WorkDTO::getTotalTime)
                .reduce(0, Integer::sum);
        return totalTime;
    }

	@Query("SELECT w FROM Work w WHERE w.employee.id = :employeeId AND MONTH(w.dateTimeStart) = :month")
	List<WorkDTO> getWorksByEmployeeAndMonth(Long employeeId, Integer month);

}
