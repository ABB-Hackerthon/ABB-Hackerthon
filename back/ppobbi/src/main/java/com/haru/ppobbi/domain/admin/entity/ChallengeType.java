package com.haru.ppobbi.domain.admin.entity;

import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "challengeTypes")
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChallengeType extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_type_no")
    private Integer challengeTypeNo;
    @Column(name = "challenge_type_name")
    private String challengeTypeName;

    @Builder
    public ChallengeType(String challengeTypeName){
        this.challengeTypeName = challengeTypeName;
    }
}
