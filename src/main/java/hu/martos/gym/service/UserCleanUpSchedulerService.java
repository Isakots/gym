package hu.martos.gym.service;

import hu.martos.gym.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class UserCleanUpSchedulerService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserCleanUpSchedulerService.class);

    private final UserRepository userRepository;

    public UserCleanUpSchedulerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Not activated users should be automatically deleted after 3 days.
     * <p>
     * This is scheduled to get fired everyday, at 01:00 (am).
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void removeNotActivatedUsers() {
        userRepository
            .findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant.now().minus(3, ChronoUnit.DAYS))
            .forEach(user -> {
                LOGGER.debug("Deleting not activated user {}", user.getEmail());
                userRepository.delete(user);
            });
    }
}
