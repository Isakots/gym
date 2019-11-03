package hu.martos.gym.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Gym.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    // TODO create external configuration files separately for all necessary properties
    //  in application.yml files and import properties with @ConfigurationProperties
}
