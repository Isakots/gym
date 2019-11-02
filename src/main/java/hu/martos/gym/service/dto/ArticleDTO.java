package hu.martos.gym.service.dto;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class ArticleDTO {

    private String id;
    private String title;
    private String type;
    private String introduction;
    private String mainText;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getMainText() {
        return mainText;
    }

    public void setMainText(String mainText) {
        this.mainText = mainText;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = LocalDateTime.ofInstant(createdDate,
            ZoneId.systemDefault());
    }
}
