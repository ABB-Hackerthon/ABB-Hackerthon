package com.haru.ppobbi.domain.patrol.service;

import com.haru.ppobbi.domain.patrol.dto.PatrolReportRequestDto.*;
import com.haru.ppobbi.domain.patrol.dto.PatrolReportResponseDto.*;
import com.haru.ppobbi.domain.patrol.entity.PatrolReport;

import java.util.List;

public interface PatrolReportService {

    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto);

    public List<PatrolReportInfoResponseDto> selectAll();

    public PatrolReportDetailResponseDto selectOnePatrolReport(Integer patrolReportNo);




}
