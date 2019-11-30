package hu.martos.gym.repository;

import hu.martos.gym.domain.Article;
import hu.martos.gym.domain.ArticleType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {

    Optional<List<Article>> findAllByType(ArticleType type);

    Optional<List<Article>> findAllByCreatedDateIsAfter(LocalDateTime ldt);

    Optional<List<Article>> findAllByTypeAndCreatedDateIsAfter(ArticleType type, LocalDateTime ldt);

}
