package com.haru.ppobbi.domain.patrol.repo;

import com.haru.ppobbi.domain.patrol.entity.PatrolReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatrolReportRepository extends JpaRepository<PatrolReport, Integer>  {

    public List<PatrolReport> findAllByCanceledOrderByCreateDateAsc(Integer isCanceled);

    public Optional<PatrolReport> findPatrolReportByPatrolReportNoAndCanceled(Integer patrolReportNo, Integer isCanceled);

}
