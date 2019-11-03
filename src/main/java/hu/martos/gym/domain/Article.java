package hu.martos.gym.domain;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

@Document(collection = "article")
public class Article extends AbstractAuditingEntity implements Serializable {

    @Id
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "type")
    private ArticleType type;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "main_text")
    private String content;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Article{" +
            "id='" + id + '\'' +
            ", title='" + title + '\'' +
            ", type='" + type + '\'' +
            ", introduction='" + introduction + '\'' +
            ", content='" + content + '\'' +
            '}';
    }
}
