package hu.martos.gym.service.dto;

import hu.martos.gym.domain.ArticleType;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class ArticleDTO {

    private String id;
    private String title;
    private ArticleType type;
    private String introduction;
    private String content;
    private LocalDateTime createdDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ArticleType getType() {
        return type;
    }

    public void setType(ArticleType type) {
        this.type = type;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = LocalDateTime.ofInstant(createdDate,
            ZoneId.systemDefault());
    }
}
