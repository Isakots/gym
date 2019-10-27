package hu.martos.gym.config;

import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "hu.martos.gym.repository")
public class MongoDBConfiguration {
    private static final String MONGO_DB_URL = "localhost";
    private static final String MONGO_DB_NAME = "first_test_db";

    @Bean
    public MongoClient mongoClient() {
        return new MongoClient(MONGO_DB_URL);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), MONGO_DB_NAME);
    }
}
