package com.haru.ppobbi.domain.dog.service;

import com.haru.ppobbi.domain.dog.dto.DogDto.DogInfoDto;
import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogOwnerUpdateRequestDto;
import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogSaveRequestDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogisDeadResponseDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogisAliveResponseDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogNftResponseDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogProfileResposeDto;
import com.haru.ppobbi.domain.dog.entity.Breed;
import com.haru.ppobbi.domain.dog.entity.Dog;

import java.util.List;
import java.util.Optional;

public interface DogService {

    /**
     * DogSaveRequestDto 객체를 받아 등록
     * @author Sunhee
     * @param dogSaveRequestDto 등록할 DogSaveRequestDto 객체
     * @return Dog
     */
    Dog registDog(Integer userNo, DogSaveRequestDto dogSaveRequestDto);

    /**
     * userNo를 받아 모든 Dog 조회
     * @author Sunhee
     * @param userNo - User 기본 키
     * @return {@code List<Dog>}
     */
    List<DogProfileResposeDto> selectDogsByUserNo(Integer userNo);

    /**
     * dogNo를 받아 특정 Dog 1개 조회
     * @author Sunhee
     * @param dogNo - Dog 기본 키
     * @return {@code Dog}
     */
    DogProfileResposeDto selectDogByDogNo(Integer dogNo);

    /**
     * 모든 견종 목록 조회
     * @author Sunhee
     * @return {@code List<Breed>}
     */
    List<Breed> selectAllBreeds();

    /**
     * keyword 받아 검색조건에 해당하는 모든 견종 조회
     * @author Sunhee
     * @param keyword - 클라이언트로부터 받은 String
     * @return {@code List<Breed>}
     */
    List<Breed> selectAllBreedsByKeyword(String keyword);

    /**
     * dogNo를 받아 특정 Dog의 nft 조회
     * @author Sunhee
     * @param dogNo - Dog 기본 키
     * @return {@code DogNftResponseDto}
     */
    DogNftResponseDto selectDogNftByDogNo(Integer dogNo);

    /**
     * userNo를 받아 모든 Dog 조회
     * @author Sunhee
     * @param userNo - User 기본 키
     * @return {@code List<DogNftResponseDto>}
     */
    List<DogNftResponseDto> selectDogNftsByUserNo(Integer userNo);

    /**
     * DogOwnerUpdateRequestDto 객체를 받아 등록
     * @author Sunhee
     * @param dogOwnerUpdateRequestDto 등록할 DogOwnerUpdateRequestDto 객체
     * @return Dog
     */
    void updateDogOwner(DogOwnerUpdateRequestDto dogOwnerUpdateRequestDto);

    /**
     * userNo를 받아 모든 생존한 Dog 조회
     * @author Sunhee
     * @param userNo - User 기본 키
     * @return {@code List<Dog>}
     */
    List<DogisAliveResponseDto> selectAliveDogsByUserNo(Integer userNo);

    /**
     * userNo를 받아 모든 사망한 Dog 조회
     * @author Sunhee
     * @param userNo - User 기본 키
     * @return {@code List<Dog>}
     */
    List<DogisDeadResponseDto> selectDeadDogsByUserNo(Integer userNo);




}
