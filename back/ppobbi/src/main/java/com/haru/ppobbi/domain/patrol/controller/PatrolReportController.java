package com.haru.ppobbi.domain.patrol.controller;

import com.haru.ppobbi.domain.patrol.dto.PatrolReportRequestDto.*;
import com.haru.ppobbi.domain.patrol.dto.PatrolReportResponseDto.*;
import com.haru.ppobbi.domain.patrol.service.PatrolReportService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.READ_ALL_DOG_BY_USER;
import static com.haru.ppobbi.domain.patrol.constant.PatrolReportResponseMessage.*;

@RestController
@RequestMapping("/api/patrol")
@RequiredArgsConstructor
@Slf4j
public class PatrolReportController {

    private final PatrolReportService patrolReportService;

    @PostMapping()
    public ResponseEntity<ResponseDto<String>> createPatrolReport(
            @RequestAttribute("userNo") Integer userNo, @RequestBody PatrolReportSaveRequestDto patrolReportSaveRequestDto) {

        patrolReportService.registPatrolReport(userNo, patrolReportSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.create(CREATE_PATROL_REPORT_SUCCESS.message()));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<PatrolReportInfoResponseDto>>> selectAllPatrolReport () {
        List<PatrolReportInfoResponseDto> patrolReportInfoList = patrolReportService.selectAll();
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_ALL_PATROL_REPORT, patrolReportInfoList));
    }


    @GetMapping("/{patrolReportNo}")
    public ResponseEntity<ResponseDto<PatrolReportDetailResponseDto>> selectOnePatrolReport(
            @PathVariable Integer patrolNo){
        PatrolReportDetailResponseDto patrolDetail = patrolReportService.selectOnePatrolReport(patrolNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_ONE_PATROL_REPORT, patrolDetail));
    }




}
