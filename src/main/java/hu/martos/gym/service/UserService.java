package hu.martos.gym.service;

import hu.martos.gym.config.Constants;
import hu.martos.gym.domain.Authority;
import hu.martos.gym.domain.User;
import hu.martos.gym.repository.AuthorityRepository;
import hu.martos.gym.repository.UserRepository;
import hu.martos.gym.security.AuthoritiesConstants;
import hu.martos.gym.security.SecurityUtils;
import hu.martos.gym.service.dto.UserDTO;
import hu.martos.gym.service.util.RandomGeneratorUtil;
import hu.martos.gym.web.rest.errors.AccountResourceException;
import hu.martos.gym.web.rest.errors.EmailAlreadyUsedException;
import hu.martos.gym.web.rest.errors.EmailNotFoundException;
import hu.martos.gym.web.rest.errors.InvalidPasswordException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

// TODO Explode this class into minor pieces

@Service
@Transactional
public class UserService {
    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;
    private final MailService mailService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthorityRepository authorityRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.mailService = mailService;
    }

    public void activateRegistration(String key) {
        LOGGER.debug("Activating user for activation key {}", key);
        userRepository.findOneByActivationKey(key)
            .map(user -> {
                // activate given user for the registration key.
                user.setActivated(true);
                user.setActivationKey(null);
                LOGGER.debug("Activated user: {}", user);
                return user;
            })
            .orElseThrow(() -> new AccountResourceException("No user was found for this activation key"));
    }

    public void completePasswordReset(String newPassword, String key) {
        LOGGER.debug("Reset user password for reset key {}", key);
        userRepository.findOneByResetKey(key)
            .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400)))
            .map(user -> {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setResetKey(null);
                user.setResetDate(null);
                return user;
            })
            .orElseThrow(() -> new AccountResourceException("No user was found for this reset key"));
    }

    public void requestPasswordReset(String mail) {
        User user = userRepository.findOneByEmailIgnoreCase(mail)
            .filter(User::getActivated) // ?
            .map(foundUser -> {
                foundUser.setResetKey(RandomGeneratorUtil.generateResetKey());
                foundUser.setResetDate(Instant.now());
                return foundUser;
            }).orElseThrow(EmailNotFoundException::new);

        mailService.sendPasswordResetMail(user);
    }

    public void registerUser(UserDTO userDTO, String password) {
        userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).ifPresent(existingUser -> {
            boolean removed = removeNonActivatedUser(existingUser);
            if (!removed) {
                throw new EmailAlreadyUsedException();
            }
        });
        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setEmail(userDTO.getEmail().toLowerCase());
        newUser.setImageUrl(userDTO.getImageUrl());
        newUser.setLangKey(userDTO.getLangKey());
        // new user is not active
        newUser.setActivated(false);
        // new user gets registration key
        newUser.setActivationKey(RandomGeneratorUtil.generateActivationKey());
        Set<Authority> authorities = new HashSet<>();
        authorityRepository.findById(AuthoritiesConstants.USER).ifPresent(authorities::add);
        newUser.setAuthorities(authorities);
        userRepository.save(newUser);
        LOGGER.debug("Created Information for User: {}", newUser);

        mailService.sendActivationEmail(newUser);
    }

    private boolean removeNonActivatedUser(User existingUser) {
        if (existingUser.getActivated()) {
            return false;
        }
        userRepository.delete(existingUser);
        userRepository.flush();
        return true;
    }

    public Optional<UserDTO> updateUser(UserDTO userDTO) {
        // TODO member can modify only the user's role!!
        return Optional.of(new UserDTO());
    }

    public void changePassword(String currentClearTextPassword, String newPassword) {
        SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByEmailIgnoreCase)
            .ifPresent(user -> {
                String currentEncryptedPassword = user.getPassword();
                if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                    throw new InvalidPasswordException();
                }
                String encryptedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encryptedPassword);
                LOGGER.debug("Changed password for User: {}", user);
            });
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAllByEmailIgnoreCaseNot(pageable, Constants.ANONYMOUS_USER).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(Long id) {
        return userRepository.findOneWithAuthoritiesById(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByEmailIgnoreCase);
    }

    @Transactional(readOnly = true)
    public Optional<User> findOneByEmailIgnoreCase(String email) {
        return userRepository.findOneByEmailIgnoreCase(email);
    }

    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }

    @Transactional
    public void saveUserImage(String fileNameToSave, User user) {
        user.setImageUrl(fileNameToSave);
        userRepository.save(user);
    }
}
