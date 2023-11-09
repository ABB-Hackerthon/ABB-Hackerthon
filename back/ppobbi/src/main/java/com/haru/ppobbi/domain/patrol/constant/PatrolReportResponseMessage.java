package com.haru.ppobbi.domain.patrol.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum PatrolReportResponseMessage implements ResponseMessage {

    CREATE_PATROL_REPORT_SUCCESS("순찰일지 등록 성공"),
    PATROL_REPORT_NOT_FOUND_EXCEPTION("순찰일지 1개 조회 실패"),
    READ_ALL_PATROL_REPORT("모든 순찰일지 리스트 조회 완료"),
    READ_ONE_PATROL_REPORT("순찰일지 상세조회 완료")
    ;

    private final String message;

    PatrolReportResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
