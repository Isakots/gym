package hu.martos.gym.config.converter;

import hu.martos.gym.domain.User;
import hu.martos.gym.service.dto.UserDTO;
import org.modelmapper.AbstractConverter;

public class UserDTOtoUserConverter extends AbstractConverter<UserDTO, User> {

    @Override
    public User convert(UserDTO source) {
        if (source == null) {
            return null;
        }
        User user = new User();
        user.setFirstName(source.getFirstName());
        user.setLastName(source.getLastName());
        user.setEmail(source.getEmail().toLowerCase());
        user.setImageUrl(source.getImageUrl());
        user.setActivated(source.isActivated());
        user.setLangKey(source.getLangKey());

        return user;
    }
}
