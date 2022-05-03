package com.booking.alpha.service;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entity.RoomEntity;
import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.respository.HotelRepository;
import com.booking.alpha.respository.RoomRepository;
import com.booking.alpha.utils.AccountingUtils;
import com.booking.alpha.utils.S3Utils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final S3Utils s3Utils;

    public RoomService(RoomRepository roomRepository, S3Utils s3Utils) {
        this.roomRepository = roomRepository;
        this.s3Utils = s3Utils;
    }

    RoomEntity convertToEntity( RoomEntry roomEntry) {
        RoomEntity roomEntity = new RoomEntity();
        BeanUtils.copyProperties( roomEntry, roomEntity);
        return roomEntity;
    }

    RoomEntry convertToEntry( RoomEntity roomEntity) {
        RoomEntry roomEntry = new RoomEntry();
        BeanUtils.copyProperties( roomEntity, roomEntry);
        return roomEntry;
    }

    public RoomEntry findOneAvailable(Long hotelId, RoomType roomType, Long startDate, Long endDate) {
        RoomEntity roomEntity = roomRepository.findOneAvailable(hotelId, roomType.toString(),
                new HashSet<String>(Arrays.asList(BookingState.CONFIRMED.toString(),
                        BookingState.PENDING.toString())),
                startDate, endDate);
        if(ObjectUtils.isEmpty(roomEntity)) {
            return null;
        }
        return convertToEntry(roomEntity);
    }


    public RoomEntry addRoom(RoomEntry roomEntry){
        RoomEntity roomEntity = convertToEntity(roomEntry);
        RoomEntity createdRoomEntity = roomRepository.save(roomEntity);
        return convertToEntry(createdRoomEntity);
    }

    public RoomEntry uploadImage(MultipartFile file, Long id){
        //File file1 = new File(file.getOriginalFilename());

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String fileName = timestamp.getTime() + file.getOriginalFilename();
        File file1 = new File(fileName);

        try(FileOutputStream outputStream = new FileOutputStream(file1)){
            outputStream.write(file.getBytes());
            s3Utils.uploadFile("alpha-hotel-images","hotel-1", new FileInputStream(file1));
            String url = s3Utils.getFileURL("alpha-hotel-images", fileName);

            file1.delete();
            RoomEntry roomEntry = findOneById(id);
            roomEntry.setImageUrl(url);
            RoomEntity roomEntity = convertToEntity(roomEntry);
            RoomEntity createdRoomEntity = roomRepository.save(roomEntity);
            return convertToEntry(createdRoomEntity);
        }
        catch (Exception exception){
            System.out.println("Exception in RoomEntry uploadImage(MultipartFile file, Long id), msg :  " + exception.getMessage());
            return null;
        }
    }

    public RoomEntry findOneById( Long id) {
        try {
            RoomEntity roomEntity = roomRepository.findById( id).get();
            return convertToEntry(roomEntity);
        }catch (Exception exception){
            System.out.println("Exception in RoomEntry findOneById( Long id), msg : " + exception.getMessage());
            return null;
        }
    }

    public RoomEntry updateRoom(Long id, RoomEntry roomEntry){
        try {
            RoomEntry oldRoomEntry = findOneById(id);
            oldRoomEntry.setType(roomEntry.getType());
            oldRoomEntry.setCost(roomEntry.getCost());
            oldRoomEntry.setName(roomEntry.getName());
            oldRoomEntry.setDescription(roomEntry.getDescription());
            oldRoomEntry.setMaxOccupants(roomEntry.getMaxOccupants());
            oldRoomEntry.setAdults(roomEntry.getAdults());
            oldRoomEntry.setChildren(roomEntry.getChildren());
            RoomEntity roomEntity = convertToEntity(oldRoomEntry);
            RoomEntity updatedRoomEntity = roomRepository.save(roomEntity);
            return convertToEntry(updatedRoomEntity);
        }catch (Exception exception){
            System.out.println("Exception in RoomEntry updateRoom(Long id, RoomEntry roomEntry), msg : " + exception.getMessage());
            return null;
        }
    }


    public List<RoomEntity> getAllRoomsOfAHotel(Long hotelId){
        List<RoomEntity> rooms = roomRepository.getAllRoomsOfAHotel(hotelId);
        return rooms;
    }

    public boolean deleteRoom(Long id){
        try {
            roomRepository.deleteById(id);
            return true;
        }
        catch (Exception exception){
            System.out.println("Exception in  boolean deleteRoom(Long id), msg :  " + exception.getMessage());
            return false;
        }
    }

}
