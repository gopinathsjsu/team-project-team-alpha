package com.booking.alpha.service;

import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entity.UserEntity;
import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.LoginEntry;
import com.booking.alpha.entry.UserEntry;
import com.booking.alpha.respository.HotelRepository;
import com.booking.alpha.utils.S3Utils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.util.Optional;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;
    private final S3Utils s3Utils;

    public HotelService(HotelRepository hotelRepository, S3Utils s3Utils) {
        this.hotelRepository = hotelRepository;
        this.s3Utils = s3Utils;
    }

    public HotelEntry convertToEntry(HotelEntity hotelEntity) {
        HotelEntry hotelEntry = new HotelEntry();
        BeanUtils.copyProperties( hotelEntity, hotelEntry);
        return hotelEntry;
    }

    public HotelEntity convertToEntity(HotelEntry hotelEntry) {
        HotelEntity hotelEntity = new HotelEntity();
        BeanUtils.copyProperties( hotelEntry, hotelEntity);
        return hotelEntity;
    }

    public HotelEntry findOneById( Long id) {
        /*
        System.out.println(" Looking up for Id "+id);
        HotelEntity hotelEntity = hotelRepository.findById(id).get();
        return convertToEntry(hotelEntity);
         */
        try {
            HotelEntity hotelEntity = hotelRepository.findById( id).get();
            return convertToEntry(hotelEntity);
        }catch (Exception exception){
            System.out.println("Exception in HotelEntry findOneById( Long id), msg : " + exception.getMessage());
            return null;
        }
    }

    public HotelEntry create(HotelEntry hotelEntry) {
        try {
            hotelEntry.setPassword(BCrypt.hashpw(hotelEntry.getPassword(), BCrypt.gensalt()));
            HotelEntity hotelEntity = convertToEntity(hotelEntry);
            HotelEntity createdHotelEntity = hotelRepository.save(hotelEntity);
            return convertToEntry(createdHotelEntity);
        }catch (Exception exception){
            System.out.println("Exception in HotelEntry create( HotelEntry hotelEntry), msg : " + exception.getMessage());
            return null;
        }
    }


    public HotelEntry uploadImage(MultipartFile file, Long id){
        //File file1 = new File(file.getOriginalFilename());

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String fileName = timestamp.getTime() + file.getOriginalFilename();
        File file1 = new File(fileName);

        try(FileOutputStream outputStream = new FileOutputStream(file1)){
            outputStream.write(file.getBytes());
            s3Utils.uploadFile("alpha-hotel-images","hotel-1", new FileInputStream(file1));
            String url = s3Utils.getFileURL("alpha-hotel-images", fileName);

            file1.delete();
            HotelEntry hotelEntry = findOneById(id);
            hotelEntry.setImageUrl(url);
            HotelEntity hotelEntity = convertToEntity(hotelEntry);
            HotelEntity createdHotelEntity = hotelRepository.save(hotelEntity);
            return convertToEntry(createdHotelEntity);
        }
        catch (Exception exception){
            System.out.println("Exception in HotelEntry uploadImage(MultipartFile file, Long id), msg :  " + exception.getMessage());
            return null;
        }
    }


    public boolean deleteHotel(Long id){
        try {
            hotelRepository.deleteById(id);
            return true;
        }
        catch (Exception exception){
            System.out.println("Exception in  boolean deleteHotel(Long id), msg :  " + exception.getMessage());
            return false;
        }
    }


    public HotelEntry hotelLogin(LoginEntry loginEntry){
        try {
            HotelEntity  hotelEntity = hotelRepository.findByEmailId(loginEntry.getEmailId()).get();
            HotelEntry hotelEntry = convertToEntry(hotelEntity);
            if(BCrypt.checkpw(loginEntry.getPassword(), hotelEntry.getPassword())){
                return hotelEntry;
            }
            return null;
        }catch (Exception exception){
            System.out.println("Exception in HotelEntry hotelLogin(LoginEntry loginEntry), msg :  " + exception.getMessage());
            return null;
        }
    }



    public HotelEntry updateHotel(Long id, HotelEntry hotelEntry){
        try {
            HotelEntry oldHotelEntry = findOneById(id);
            oldHotelEntry.setName(hotelEntry.getName());
            oldHotelEntry.setEmailId(hotelEntry.getEmailId());
            oldHotelEntry.setPassword(hotelEntry.getPassword());
            oldHotelEntry.setCity(hotelEntry.getCity());
            oldHotelEntry.setCountry(hotelEntry.getCountry());
            oldHotelEntry.setZipCode(hotelEntry.getZipCode());
            oldHotelEntry.setImageUrl(hotelEntry.getImageUrl());
            oldHotelEntry.setId(hotelEntry.getId());
            oldHotelEntry.setContactNo(hotelEntry.getContactNo());

            HotelEntity hotelEntity = convertToEntity(oldHotelEntry);
            HotelEntity updatedHotelEntity = hotelRepository.save(hotelEntity);
            return convertToEntry(updatedHotelEntity);
        }catch (Exception exception){
            System.out.println("Exception in HotelEntry updateUser(Long id, HotelEntry hotelEntry), msg : " + exception.getMessage());
            return null;
        }
    }

    public HotelEntry updatePassword(Long id, LoginEntry loginEntry){

        try {
            HotelEntry hotelEntry = findOneById(id);
            if (hotelEntry == null)
                return null;
            String newPassword = BCrypt.hashpw(loginEntry.getPassword(), BCrypt.gensalt());
            hotelEntry.setPassword(newPassword);
            HotelEntity hotelEntity = convertToEntity(hotelEntry);
            HotelEntity updatedHotelEntity = hotelRepository.save(hotelEntity);
            return convertToEntry(updatedHotelEntity);
        }catch (Exception exception){
            System.out.println("Exception in HotelEntry updatePassword(Long id,  LoginEntry loginEntry), msg : " + exception.getMessage());
            return null;
        }


    }

}
