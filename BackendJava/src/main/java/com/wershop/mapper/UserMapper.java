package com.wershop.mapper;

import com.wershop.dto.response.UserResponse;
import com.wershop.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "role.name", target = "role")
    UserResponse userToUserResponse(User user);
}
