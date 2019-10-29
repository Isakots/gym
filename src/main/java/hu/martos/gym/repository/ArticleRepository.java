package hu.martos.gym.repository;

import hu.martos.gym.domain.Article;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {

    Optional<List<Article>> findAllByType(String type);

    Optional<List<Article>> findAllByCreatedDateIsAfter();

    Optional<List<Article>> findAllByTypeAndCreatedDateIsAfter();

}
