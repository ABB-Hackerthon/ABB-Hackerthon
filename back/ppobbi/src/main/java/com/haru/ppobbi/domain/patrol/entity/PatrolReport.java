package com.haru.ppobbi.domain.patrol.entity;

import com.haru.ppobbi.domain.patrol.dto.PatrolReportRequestDto.*;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "patrol_report")
public class PatrolReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patrol_report_no")
    private Integer patrolReportNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @Column(name = "patrol_report_title")
    private String patrolReportTitle;

    @Column(name = "patrol_report_content")
    private String patrolReportContent;

    @Column(name = "patrol_log_address")
    private String patrolLogAddress;

    @Column(name = "patrol_report_img")
    private String patrolReportImg;

    @Column(name = "patrol_report_hit")
    private Integer patrolReportHit;

    @Builder
    public PatrolReport(User user, String patrolReportTitle, String patrolReportContent,
                        String patrolLogAddress, String patrolReportImg, Integer patrolReportHit) {
        this.user = user;
        this.patrolReportTitle = patrolReportTitle;
        this.patrolReportContent = patrolReportContent;
        this.patrolLogAddress = patrolLogAddress;
        this.patrolReportImg = patrolReportImg;
        this.patrolReportHit = patrolReportHit;
    }

    public PatrolReport updateHit(Integer patrolReportHit){
        this.patrolReportHit = patrolReportHit+1;
        return this;
    }

    public void updatePatrolReport(String patrolReportTitle, String patrolReportContent){
        this.patrolReportTitle = patrolReportTitle;
        this.patrolReportContent = patrolReportContent;
    }




}
