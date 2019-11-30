package hu.martos.gym.web.rest;

import hu.martos.gym.domain.Article;
import hu.martos.gym.domain.ArticleType;
import hu.martos.gym.repository.ArticleRepository;
import hu.martos.gym.service.dto.ArticleDTO;
import hu.martos.gym.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ArticleResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(ArticleResource.class);
    private static final String ENTITY_NAME = "article";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArticleRepository articleRepository;
    private final ModelMapper modelMapper;

    public ArticleResource(ArticleRepository articleRepository, ModelMapper modelMapper) {
        this.articleRepository = articleRepository;
        this.modelMapper = modelMapper;
    }

    /**
     * {@code GET  /articles} : get all the articles by type
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articles in body.
     */
    @GetMapping("/articles")
    public ResponseEntity<List<ArticleDTO>> getAllArticlesByType(@RequestParam ArticleType type) {
        LOGGER.debug("Requesting all articles with type: {}", type);
        if(type == null) {
            throw new BadRequestAlertException("Article type must be specified!", ENTITY_NAME, "idexists");
        }
        // TODO make minusMonths parameter configurable
        List<ArticleDTO> articles = articleRepository.findAllByTypeAndCreatedDateIsAfter(type, LocalDateTime.now().minusMonths(12L))
            .orElse(Collections.emptyList())
            .stream()
            .map(article -> modelMapper.map(article, ArticleDTO.class))
            .collect(Collectors.toList());
        return ResponseEntity.ok(articles);
    }

    /**
     * {@code GET  /articles/:id} : get the "id" article.
     *
     * @param id the id of the article to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the article, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/articles/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable String id) {
        LOGGER.debug("REST request to get Article : {}", id);
        Optional<Article> article = articleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(article);
    }

    /**
     * {@code POST  /articles} : Create a new article.
     *
     * @param article the article to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new article, or with status {@code 400 (Bad Request)} if the article has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/articles")
    @PreAuthorize("hasAuthority('ROLE_MEMBER')")
    public ResponseEntity<Article> createArticle(@RequestBody Article article) throws URISyntaxException {
        LOGGER.debug("REST request to save Article : {}", article);
        if (article.getId() != null) {
            throw new BadRequestAlertException("A new article cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Article result = articleRepository.save(article);
        return ResponseEntity.created(new URI("/api/articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /articles} : Updates an existing article.
     *
     * @param article the article to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated article,
     * or with status {@code 400 (Bad Request)} if the article is not valid,
     * or with status {@code 500 (Internal Server Error)} if the article couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/articles")
    @PreAuthorize("hasAuthority('ROLE_MEMBER')")
    public ResponseEntity<Article> updateArticle(@RequestBody Article article) {
        LOGGER.debug("REST request to update Article : {}", article);
        if (article.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Article result = articleRepository.save(article);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, article.getId()))
            .body(result);
    }

    /**
     * {@code DELETE  /articles/:id} : delete the "id" article.
     *
     * @param id the id of the article to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/articles/{id}")
    @PreAuthorize("hasAuthority('ROLE_MEMBER')")
    public ResponseEntity<Void> deleteArticle(@PathVariable String id) {
        LOGGER.debug("REST request to delete Article : {}", id);
        articleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
