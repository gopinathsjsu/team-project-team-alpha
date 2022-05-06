package com.booking.alpha.service;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entry.*;
import com.booking.alpha.respository.HotelRepository;
import com.booking.alpha.utils.AccountingUtils;
import com.booking.alpha.utils.S3Utils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringSubstitutor;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    private final AccountingUtils accountingUtils;

    private final S3Utils s3Utils;

    private final EntityManager entityManager;

    private final ObjectMapper objectMapper;

    public HotelService(HotelRepository hotelRepository, AccountingUtils accountingUtils, S3Utils s3Utils,
                        EntityManager entityManager, ObjectMapper objectMapper) {
        this.hotelRepository = hotelRepository;
        this.accountingUtils = accountingUtils;
        this.s3Utils = s3Utils;
        this.entityManager = entityManager;
        this.objectMapper = objectMapper;
    }

    public HotelEntry convertToEntry(HotelEntity hotelEntity) {
        HotelEntry hotelEntry = new HotelEntry();
        BeanUtils.copyProperties( hotelEntity, hotelEntry);
        String folderName = String.format("hotel-%s",hotelEntry.getId());
        String url = s3Utils.getFileURL("alpha-hotel-images", folderName);
        hotelEntry.setImageUrl(url);
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
            String folderName = String.format("hotel-%s",id);
            s3Utils.uploadFile("alpha-hotel-images",folderName, new FileInputStream(file1));
            String url = s3Utils.getFileURL("alpha-hotel-images", folderName);

            file1.delete();
            HotelEntry hotelEntry = findOneById(id);
            // hotelEntry.setImageUrl(url);
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
            //oldHotelEntry.setName(hotelEntry.getName());
            //oldHotelEntry.setEmailId(hotelEntry.getEmailId());
            //oldHotelEntry.setPassword(hotelEntry.getPassword());
            oldHotelEntry.setCity(hotelEntry.getCity());
            oldHotelEntry.setCountry(hotelEntry.getCountry());
            oldHotelEntry.setZipCode(hotelEntry.getZipCode());
            //oldHotelEntry.setImageUrl(hotelEntry.getImageUrl());
            //oldHotelEntry.setId(hotelEntry.getId());
            oldHotelEntry.setContactNo(hotelEntry.getContactNo());
            oldHotelEntry.setDescription(hotelEntry.getDescription());
            oldHotelEntry.setServiceList(hotelEntry.getServiceList());

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

    public List<HotelAvailabilityEntry> find(HotelSearchPagedRequest hotelSearchPagedRequest) throws ParseException {
        String query = getSqlQuery(hotelSearchPagedRequest);
        List<Object> resultList = entityManager.createNativeQuery(query).getResultList();
        List<HotelAvailabilityMappingEntry> hotelAvailabilityMappingEntries = new ArrayList<>();
        for(Object ob: resultList) {
            Object[] valueList = (Object[]) ob;
            HashMap<String,Object> hm = new HashMap<>();
            hm.put("hotelId", valueList[0]);
            hm.put("type", valueList[1]);
            hm.put("count", valueList[2]);
            hotelAvailabilityMappingEntries.add(objectMapper.convertValue(hm, new TypeReference<HotelAvailabilityMappingEntry>() {}));
        }
        Map< Long, List<HotelAvailabilityMappingEntry>> hotelAvailabilityMap = hotelAvailabilityMappingEntries.stream().collect(Collectors.groupingBy(HotelAvailabilityMappingEntry::getHotelId));
        List<HotelEntry> hotelEntries = findByIds(new HashSet<>(hotelAvailabilityMap.keySet()));
        Map<Long, HotelEntry> hotelEntryMap = hotelEntries.stream().collect(Collectors.toMap(HotelEntry::getId,hotelEntry -> hotelEntry));
        List<HotelAvailabilityEntry> hotelAvailabilityEntries = new ArrayList<>();
        for(Long hotelId: hotelAvailabilityMap.keySet()) {
            Map<RoomType, Long> countMap = new HashMap<>();
            for(RoomType roomType: RoomType.values()) {
                countMap.put(roomType, 0L);
            }
            for(HotelAvailabilityMappingEntry hotelAvailabilityMappingEntry: hotelAvailabilityMap.get(hotelId)) {
                countMap.put(hotelAvailabilityMappingEntry.getType(), hotelAvailabilityMappingEntry.getCount());
            }
            hotelAvailabilityEntries.add(new HotelAvailabilityEntry( hotelEntryMap.get(hotelId), countMap));
        }
        return hotelAvailabilityEntries;
    }

    public String getConditionString( HotelSearchPagedRequest hotelSearchPagedRequest) throws ParseException {
        Date startTime = accountingUtils.getCheckInTime(hotelSearchPagedRequest.getStartDate());
        Date endTime = accountingUtils.getCheckOutTime(hotelSearchPagedRequest.getEndDate());
        List<String> conditions = new ArrayList<>();
        conditions.add(" ( ((${START_TIME_STAMP} <= ${START_DATE_COLUMN}) and ( ${END_DATE_COLUMN} <= ${END_TIME_STAMP})) OR ((${START_TIME_STAMP} <= ${END_DATE_COLUMN}) and ( ${END_DATE_COLUMN} <= ${END_TIME_STAMP})) OR ((${START_DATE_COLUMN} <= ${START_TIME_STAMP}) and ( ${END_TIME_STAMP} <= ${END_DATE_COLUMN})) ) ");
        conditions.add(" ( ${CITY_COLUMN} = '${TARGET_CITY}' ) ");
        conditions.add(" ( ${BOOKING_STATE_COLUMN}) in (${BOOKING_STATE_VALUES}) ");
        Map<String, String> values = new HashMap<>();
        values.put("START_TIME_STAMP", Long.valueOf(startTime.getTime()).toString());
        values.put("END_TIME_STAMP", Long.valueOf(endTime.getTime()).toString());
        values.put("TARGET_CITY", hotelSearchPagedRequest.getCity());
        values.put("BOOKING_STATE_VALUES", StringUtils.join(Arrays.asList(String.format("'%s'", BookingState.CONFIRMED.toString()), String.format("'%s'", BookingState.PENDING.toString())),","));
        values.put("START_DATE_COLUMN", "reservation.start_time");
        values.put("END_DATE_COLUMN", "reservation.end_time");
        values.put("CITY_COLUMN", "hotel.city");
        values.put("BOOKING_STATE_COLUMN", "reservation.booking_state");
        StringSubstitutor substitutor = new StringSubstitutor(values);
        return substitutor.replace(StringUtils.join(conditions, " and "));
    }

    public String getSqlQuery( HotelSearchPagedRequest hotelSearchPagedRequest) throws ParseException {
        String condition = getConditionString( hotelSearchPagedRequest);
        String query = String.format(" SELECT room.hotel_id as hotelId, room.type as type, count(*) as count FROM room JOIN hotel ON room.hotel_id = hotel.id LEFT JOIN reservation ON room.id = reservation.room_id and %s WHERE reservation.room_id IS NULL GROUP BY room.hotel_id, room.type ", condition);
        return query;
    }

    public List<HotelEntry> findByIds( Set<Long> hotelIds) {
        if(ObjectUtils.isEmpty(hotelIds)) {
            return new ArrayList<>();
        }
        List<HotelEntity> hotelEntityList = hotelRepository.findAllById(hotelIds);
        if(ObjectUtils.isEmpty(hotelEntityList)) {
            return new ArrayList<>();
        }
        return hotelEntityList.stream().map(this::convertToEntry).collect(Collectors.toList());
    }
}
