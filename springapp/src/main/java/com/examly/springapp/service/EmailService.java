package com.examly.springapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.OtpToken;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.OtpRepository;
import com.examly.springapp.repository.UserRepository;

@Service
public class EmailService {

    private static final Logger logger=LoggerFactory.getLogger(EmailService.class);

    private OtpRepository otpRepository;

    private JavaMailSender javaMailSender;

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public EmailService(OtpRepository otpRepository, JavaMailSender javaMailSender,
                        UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.otpRepository = otpRepository;
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String generateOTP()
    {
        Random random = new Random();
        int otp=100000+random.nextInt(900000);
        logger.info("otp generated :{}", random);
        return String.valueOf(otp);
    }

    public void saveOtpToDb(String email,String otp)
    {
        OtpToken otpToken=new OtpToken();
        otpToken.setEmail(email);
        otpToken.setOtp(otp);
        otpToken.setExpiryTime(LocalDateTime.now().plusMinutes(2));
        otpRepository.save(otpToken);

    }

    public void sendOtpEmail(String toEmail,String otp)
    {
    SimpleMailMessage message = new SimpleMailMessage();
    logger.info("Preparing to send OTP email to: {}", toEmail);

    message.setTo(toEmail);
    message.setSubject("Your One-Time Password (OTP) for Password Reset");

String emailBody = String.format(
    "Dear User,\n\n"
  + "We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed:\n"
  + "🔐 OTP: %s\n"
  + "This OTP is valid for the next 2 minutes. Do not share this with anyone .If you did not request a password reset, please ignore this email.\n\n"
  + "Thank you for using our service.\n"
  + "If you have any questions or need assistance, please contact our support team at support\n\n"
  + "Best regards,\n"
  + "Support Team\n"
  + "Trainer Hub\n"
  + "www.trainerhub.com\n"
  + "support@trainerhub.com", otp);

    message.setText(emailBody);

    logger.info("Email content: \n{}", emailBody);
    javaMailSender.send(message);

    logger.info("OTP email sent successfully to: {}", toEmail);

    }

    public boolean verifyOtp(String email,String otpInput)
    {
        OtpToken otpToken=otpRepository.findByEmail(email).orElse(null);
        if(otpToken==null)
        {
            return false;
        }
        if(otpToken.getOtp().equals(otpInput) && otpToken.getExpiryTime().isAfter(LocalDateTime.now()))
        {
            return true;
        }
        return false;
    }

    // @Scheduled(fixedRate = 60000)
    // public void deleteExpiredOtps()
    // {
    //     LocalDateTime now=LocalDateTime.now();
    //     List<OtpToken> expiredOtps = otpRepository.findByExpiryTimeBefore(now);
    //     if (expiredOtps.isEmpty()) {
    //         logger.info("No expired OTPs found at: {}", now.toLocalDate() + " " + now.toLocalTime());
    //         return;
    //     }
    //     else
    //     {
    //         otpRepository.deleteAll(expiredOtps);
    //         logger.info("Expired OTPs deleted at: {}", now.toLocalDate() + " " + now.toLocalTime());
    //         logger.info("Number of expired OTPs deleted: {}", expiredOtps.size());
    //     }

    // }

    public boolean resetPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            logger.error("User not found with email: {}", email);
            return false;
        }
        //user.setPassword(newPassword);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
        
    }

}
