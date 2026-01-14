package com.examly.springapp.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.OtpToken;

@Repository
public interface OtpRepository extends JpaRepository<OtpToken,Long>{

    Optional<OtpToken> findByEmail(String email);

    void deleteByExpiryTimeBefore(LocalDateTime time);

    List<OtpToken> findByExpiryTimeBefore(LocalDateTime time);


    

}
