package com.booking.alpha.service;

import com.booking.alpha.entity.UserEntity;
import com.booking.alpha.entry.UserEntry;
import com.booking.alpha.respository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService( UserRepository userRepository) {
        this.userRepository = userRepository;
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
        userEntry.setRewardPoints(0L);
        UserEntity userEntity = convertToEntity(userEntry);
        UserEntity createdUserEntity = userRepository.save(userEntity);
        return convertToEntry(createdUserEntity);
    }

    public UserEntry findOneById( Long id) {
        UserEntity userEntity = userRepository.findById( id).get();
        return convertToEntry(userEntity);
    }
}
