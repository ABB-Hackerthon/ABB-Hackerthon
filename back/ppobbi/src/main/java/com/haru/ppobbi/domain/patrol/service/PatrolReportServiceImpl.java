package com.haru.ppobbi.domain.patrol.service;

import com.haru.ppobbi.domain.patrol.dto.PatrolReportRequestDto.*;
import com.haru.ppobbi.domain.patrol.dto.PatrolReportResponseDto.*;
import com.haru.ppobbi.domain.patrol.entity.PatrolReport;
import com.haru.ppobbi.domain.patrol.repo.PatrolReportRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.haru.ppobbi.domain.patrol.constant.PatrolReportResponseMessage.PATROL_REPORT_NOT_FOUND_EXCEPTION;
import static com.haru.ppobbi.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.haru.ppobbi.global.constant.BaseConstant.NOTCANCELED;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolReportServiceImpl implements PatrolReportService{

    private final PatrolReportRepository patrolReportRepository;
    private final UserRepository userRepository;


    @Override
    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        PatrolReport patrolReport = PatrolReport.builder()
                .user(user)
                .patrolReportTitle(patrolReportSaveRequestDto.getPatrolReportTitle())
                .patrolReportContent(patrolReportSaveRequestDto.getPatrolReportContent())
                .patrolLogAddress(patrolReportSaveRequestDto.getPatrolLogAddress())
                .patrolReportImg(patrolReportSaveRequestDto.getPatrolReportImg())
                .build();

        patrolReportRepository.save(patrolReport);
        return patrolReport;
    }

    @Override
    public List<PatrolReportInfoResponseDto> selectAll() {
        List<PatrolReport> reportList = patrolReportRepository.findAllByCanceledOrderByCreateDateAsc(NOTCANCELED);
        List<PatrolReportInfoResponseDto> list = new ArrayList<>();

        for (int i = 0; i < reportList.size(); i++) {
            PatrolReport patrolReport = reportList.get(i);
            PatrolReportInfoResponseDto patrolReportInfoResponseDto = PatrolReportInfoResponseDto.builder()
                    .patrolReportNo(patrolReport.getPatrolReportNo())
                    .user(patrolReport.getUser())
                    .patrolReportTitle(patrolReport.getPatrolReportTitle())
                    .patrolLogAddress(patrolReport.getPatrolLogAddress())
                    .patrolReportHit(patrolReport.getPatrolReportHit())
                    .patrolReportImg(patrolReport.getPatrolReportImg())
                    .build();
            list.add(patrolReportInfoResponseDto);
        }

        return list;
    }

    @Override
    public PatrolReportDetailResponseDto selectOnePatrolReport(Integer patrolReportNo) {
        PatrolReport patrolReport = patrolReportRepository.findPatrolReportByPatrolReportNoAndCanceled(patrolReportNo, NOTCANCELED)
                .orElseThrow( ()->new NotFoundException(PATROL_REPORT_NOT_FOUND_EXCEPTION.message()));

        PatrolReportDetailResponseDto patrolReportDetailResponseDto = PatrolReportDetailResponseDto.builder()
                .patrolReportNo(patrolReport.getPatrolReportNo())
                .user(patrolReport.getUser())
                .patrolReportTitle(patrolReport.getPatrolReportTitle())
                .patrolReportContent(patrolReport.getPatrolReportContent())
                .patrolLogAddress(patrolReport.getPatrolLogAddress())
                .patrolReportImg(patrolReport.getPatrolReportImg())
                .patrolReportHit(patrolReport.getPatrolReportHit())
                .build();

        return patrolReportDetailResponseDto;
    }
}
