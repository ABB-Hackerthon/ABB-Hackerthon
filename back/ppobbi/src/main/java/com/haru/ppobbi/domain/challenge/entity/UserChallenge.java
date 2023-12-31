package com.haru.ppobbi.domain.challenge.entity;

import com.haru.ppobbi.domain.admin.entity.Challenge;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "userChallenges")
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserChallenge extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_challenge_no")
    private Integer userChallengeNo;
    @ManyToOne
    @JoinColumn(name = "challenge_no")
    private Challenge challenge;
    @Column(name = "user_no")
    private Integer userNo;
    @Column(name = "user_challenge_cnt")
    private Integer userChallengeCnt;
    @Column(name = "user_challenge_iscomplete")
    private Integer userChallengeIscomplete;
    @Column(name = "completed_date")
    private LocalDateTime completedDate;
}
