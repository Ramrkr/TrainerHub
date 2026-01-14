package com.examly.springapp.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.ApiResponseDto;
import com.examly.springapp.model.ErrorMessage;
import com.examly.springapp.model.OtpRequestDto;
import com.examly.springapp.model.PasswordResetDto;
import com.examly.springapp.model.SuccessMessage;
import com.examly.springapp.service.EmailService;


@RestController
@RequestMapping("/api")
public class EmailController {

    private final EmailService emailService;

    private static final Logger logger =LoggerFactory.getLogger(EmailController.class);

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/email/send-otp")
    public ResponseEntity<SuccessMessage> sendOtp(@RequestParam String email)
    {
        logger.info("Request to send OTP to email: {}", email);
        String otp=emailService.generateOTP();
        logger.info("Generated OTP: {}", otp);

        emailService.saveOtpToDb(email, otp);
        logger.info("OTP saved to database for email: {}", email);

        emailService.sendOtpEmail(email, otp);
        logger.info("OTP email sent to: {}", email, otp);

        SuccessMessage successMessage = new SuccessMessage("OTP sent successfully to " + email);
        return new ResponseEntity<>(successMessage, HttpStatus.OK);

        
    }

    @PostMapping("/email/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequestDto otpRequestDto )
    {
        logger.info("request for otp verification :{}",otpRequestDto);
        
        boolean valid=emailService.verifyOtp(otpRequestDto.getEmail(),otpRequestDto.getOtpInput());

        if(valid)
        {
            SuccessMessage successMessage=new SuccessMessage("Otp is valid");

            return new ResponseEntity<>(successMessage,HttpStatus.valueOf(200));
        }

        ErrorMessage errorMessage=new ErrorMessage("Otp is Invalid");
        return new ResponseEntity<>(errorMessage,HttpStatus.valueOf(403));
    }

    @PutMapping("/email/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDto passwordResetDto)
    {
        logger.info("Request to reset password for email: {}", passwordResetDto.getEmail());
        logger.info("request received:{}", passwordResetDto);

        if (!passwordResetDto.getNewPassword().equals(passwordResetDto.getConfirmPassword())) {
            ErrorMessage errorMessage = new ErrorMessage("New password and confirm password do not match");
            return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
        }

        boolean isReset = emailService.resetPassword(passwordResetDto.getEmail(), passwordResetDto.getNewPassword());

        if (isReset) {
            return new ResponseEntity<>(new ApiResponseDto<>(true,"Password reset successfully",null), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponseDto<>(false,"Failed to reset password. Please try again.",null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // @PostMapping("/send-otp")
    // public ResponseEntity<String> sendOtp(@RequestBody String email)
    // {
    //     logger.info("Request to send OTP to email: {}", email);
    //     String otp=emailService.generateOTP();
    //     logger.info("Generated OTP: {}", otp);

    //     emailService.saveOtpToDb(email, otp);
    //     logger.info("OTP saved to database for email: {}", email);

    //     emailService.sendOtpEmail(email, otp);
    //     logger.info("OTP email sent to: {}", email, otp);

    //     return new ResponseEntity<>("Otp Send successfully",HttpStatus.valueOf(200));

    // }

}
