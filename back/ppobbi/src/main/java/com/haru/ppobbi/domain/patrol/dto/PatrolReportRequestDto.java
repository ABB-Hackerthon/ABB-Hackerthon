package com.haru.ppobbi.domain.patrol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class PatrolReportRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatrolReportSaveRequestDto {
        private String patrolReportTitle;
        private String patrolReportContent;
        private String patrolLogAddress;
        private String patrolReportImg;
    }
}
