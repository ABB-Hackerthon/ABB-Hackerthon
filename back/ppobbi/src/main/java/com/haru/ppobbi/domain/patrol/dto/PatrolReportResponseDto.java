package com.haru.ppobbi.domain.patrol.dto;

import com.haru.ppobbi.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class PatrolReportResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class PatrolReportInfoResponseDto {
        private Integer patrolReportNo;
        private User user;
        private String patrolReportTitle;
        private String patrolLogAddress;
        private String patrolReportImg;
        private Integer patrolReportHit;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class PatrolReportDetailResponseDto {
        private Integer patrolReportNo;
        private User user;
        private String patrolReportTitle;
        private String patrolReportContent;
        private String patrolLogAddress;
        private String patrolReportImg;
        private Integer patrolReportHit;
    }


}
