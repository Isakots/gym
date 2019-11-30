package hu.martos.gym.config;

import hu.martos.gym.domain.Article;
import hu.martos.gym.service.dto.ArticleDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {

    @Bean
    public ModelMapper getModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        modelMapper.addMappings(
            new PropertyMap<Article, ArticleDTO>() {
                @Override
                protected void configure() {
                    map().setId(source.getId());
                    map().setTitle(source.getTitle());
                    map().setType(source.getType());
                    map().setIntroduction(source.getIntroduction());
                    map().setContent(source.getContent());
                    map().setCreatedDate(source.getCreatedDate());
                }
            }
        );
        return modelMapper;
    }
}
