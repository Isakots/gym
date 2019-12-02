package hu.martos.gym.config;
// TODO with external property configuration, it's not working..
//import hu.martos.gym.config.properties.MultiPartProperties;
//import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.web.multipart.commons.CommonsMultipartResolver;
//import org.springframework.web.multipart.support.StandardServletMultipartResolver;
//
//@Configuration
//@EnableConfigurationProperties(MultiPartProperties.class)
//@PropertySource("file:${global.appconf.dir}/picture.properties")
//public class MultiPartResolverConfiguration {
//
//    private final MultiPartProperties multiPartProperties;
//
//    public MultiPartResolverConfiguration(MultiPartProperties multiPartProperties) {
//        this.multiPartProperties = multiPartProperties;
//    }
//
//    // FileItemFactory class is not found somehow..
//    // https://howtodoinjava.com/library/solved-java-lang-classnotfoundexception-org-apache-commons-fileupload-fileitemfactory/
//    // TODO
//    @Bean
//    public CommonsMultipartResolver multipartResolver() {
//        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
//        StandardServletMultipartResolver resolver1 = new StandardServletMultipartResolver();
//        resolver1.resolveMultipart()
//        resolver.setDefaultEncoding("utf-8");
//        resolver.setMaxUploadSize(multiPartProperties.getMaxRequestSize());
//        resolver.setMaxUploadSizePerFile(multiPartProperties.getMaxFileSize());
//        return resolver;
//    }
//}
