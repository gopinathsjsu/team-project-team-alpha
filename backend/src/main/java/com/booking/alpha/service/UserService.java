package com.booking.alpha.service;

import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entity.UserEntity;
import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.LoginEntry;
import com.booking.alpha.entry.UserEntry;
import com.booking.alpha.respository.UserRepository;
import com.booking.alpha.utils.S3Utils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.Timestamp;


@Service
public class UserService {

    private final UserRepository userRepository;

    private final S3Utils s3Utils;

    public UserService( UserRepository userRepository, S3Utils s3Utils) {
        this.userRepository = userRepository;
        this.s3Utils = s3Utils;
    }

    public UserEntry convertToEntry(UserEntity userEntity) {
        UserEntry userEntry = new UserEntry();
        BeanUtils.copyProperties( userEntity, userEntry);
        return userEntry;
    }

    public UserEntity convertToEntity(UserEntry userEntry) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties( userEntry, userEntity);
        return userEntity;
    }

    public UserEntry create( UserEntry userEntry) {
        try {
            userEntry.setRewardPoints(0L);
            userEntry.setPassword(BCrypt.hashpw(userEntry.getPassword(), BCrypt.gensalt()));
            UserEntity userEntity = convertToEntity(userEntry);
            UserEntity createdUserEntity = userRepository.save(userEntity);
            return convertToEntry(createdUserEntity);
        }catch (Exception exception){
            System.out.println("Exception in UserEntry create( UserEntry userEntry), msg : " + exception.getMessage());
            return null;
        }
    }

    public UserEntry findOneById( Long id) {
        try {
            UserEntity userEntity = userRepository.findById( id).get();
            return convertToEntry(userEntity);
        }catch (Exception exception){
            System.out.println("Exception in UserEntry findOneById( Long id), msg : " + exception.getMessage());
            return null;
        }
    }

    public UserEntry uploadImage(MultipartFile file, Long id){
        //File file1 = new File(file.getOriginalFilename());

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String fileName = timestamp.getTime() + file.getOriginalFilename();
        File file1 = new File(fileName);

        try(FileOutputStream outputStream = new FileOutputStream(file1)){
            outputStream.write(file.getBytes());
            s3Utils.uploadFile("alpha-hotel-images","hotel-1", new FileInputStream(file1));
            String url = s3Utils.getFileURL("alpha-hotel-images", fileName);

            file1.delete();
            UserEntry userEntry = findOneById(id);
            userEntry.setImageUrl(url);
            UserEntity userEntity = convertToEntity(userEntry);
            UserEntity createdUserEntity = userRepository.save(userEntity);
            return convertToEntry(createdUserEntity);
        }
        catch (Exception exception){
            System.out.println("Exception in UserEntry uploadImage(MultipartFile file, Long id), msg :  " + exception.getMessage());
            return null;
        }
    }

    public UserEntry userLogin(LoginEntry loginEntry){
        try {
            UserEntity userEntity = userRepository.findByEmailId(loginEntry.getEmailId()).get();
            UserEntry userEntry = convertToEntry(userEntity);
            if(BCrypt.checkpw(loginEntry.getPassword(), userEntry.getPassword())){
                return userEntry;
            }
            return null;
        }catch (Exception exception){
            System.out.println("Exception in UserEntry userLogin(LoginEntry loginEntry), msg :  " + exception.getMessage());
            return null;
        }
    }

    public UserEntry updateRewards(Long reward, Long id){
        try {
            UserEntry userEntry = findOneById(id);
            userEntry.setRewardPoints(userEntry.getRewardPoints() + reward);
            UserEntity userEntity = convertToEntity(userEntry);
            UserEntity createdUserEntity = userRepository.save(userEntity);
            return convertToEntry(createdUserEntity);
        }
        catch (Exception exception){
            System.out.println("Exception in UserEntry updateRewards(Long reward, Long id), msg :  " + exception.getMessage());
            return null;
        }
    }


    public boolean deleteUser(Long id){
        try {
            userRepository.deleteById(id);
            return true;
        }
        catch (Exception exception){
            System.out.println("Exception in  boolean deleteUser(Long id), msg :  " + exception.getMessage());
            return false;
        }
    }


    public UserEntry updateUser(Long id, UserEntry userEntry){
        try {
            UserEntry oldUserEntry = findOneById(id);
            oldUserEntry.setName(userEntry.getName());
            oldUserEntry.setEmailId(userEntry.getEmailId());
            oldUserEntry.setPassword(userEntry.getPassword());
            oldUserEntry.setRewardPoints(userEntry.getRewardPoints());
            oldUserEntry.setImageUrl(userEntry.getImageUrl());
            oldUserEntry.setId(userEntry.getId());

            UserEntity userEntity = convertToEntity(oldUserEntry);
            UserEntity updatedUserEntity = userRepository.save(userEntity);
            return convertToEntry(updatedUserEntity);
        }catch (Exception exception){
            System.out.println("Exception in UserEntry updateUser(Long id, UserEntry userEntry), msg : " + exception.getMessage());
            return null;
        }
    }


    public UserEntry updatePassword(Long id, LoginEntry loginEntry){

        try {
            UserEntry userEntry = findOneById(id);
            if (userEntry == null)
                return null;
            String newPassword = BCrypt.hashpw(loginEntry.getPassword(), BCrypt.gensalt());
            userEntry.setPassword(newPassword);
            UserEntity userEntity = convertToEntity(userEntry);
            UserEntity updatedUserEntity = userRepository.save(userEntity);
            return convertToEntry(updatedUserEntity);
        }catch (Exception exception){
            System.out.println("Exception in UserEntry updatePassword(Long id, LoginEntry loginEntry), msg : " + exception.getMessage());
            return null;
        }


    }
}



