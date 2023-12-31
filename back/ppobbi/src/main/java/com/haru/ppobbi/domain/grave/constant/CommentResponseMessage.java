package com.haru.ppobbi.domain.grave.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum CommentResponseMessage implements ResponseMessage {
    CREATE_SUCCESS("추모 댓글 등록 완료"),
    CREATE_FAIL_NO_USER("추모 댓글 등록 실패: 작성자 조회 실패"),
    READ_SUCCESS("추모 댓글 조회 성공"),
    READ_FAIL("추모 댓글 조회 실패"),
    DELETE_SUCCESS("추모 댓글 삭제 성공"),
    DELETE_FAIL("추모 댓글 삭제 실패"),
    UNAUTHORIZED("인증 실패");

    private final String message;

    CommentResponseMessage(String message){
        this.message = message;
    }

    @Override
    public String message(){
        return this.message;
    }
}
