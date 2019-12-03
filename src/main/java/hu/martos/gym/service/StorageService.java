package hu.martos.gym.service;

import hu.martos.gym.config.properties.ImageProperties;
import hu.martos.gym.config.properties.MultiPartProperties;
import hu.martos.gym.domain.User;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageService {
    private static final Logger LOGGER = LoggerFactory.getLogger(StorageService.class);

    private final UserService userService;
    private final ImageProperties imageProperties;
    private final MultiPartProperties multiPartProperties;
    private final Path rootLocation;

    public StorageService(UserService userService, ImageProperties imageProperties, MultiPartProperties multiPartProperties) {
        this.userService = userService;
        this.imageProperties = imageProperties;
        this.multiPartProperties = multiPartProperties;
        this.rootLocation = Paths.get(imageProperties.getUploadDirectory());
    }

    @PostConstruct
    public void init() {
        File uploadDirectory = new File(imageProperties.getUploadDirectory());
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }
        File tempDirectory = new File(multiPartProperties.getLocation());
        if (!tempDirectory.exists()) {
            tempDirectory.mkdirs();
        }
    }

    public void store(MultipartFile file) throws IOException {
        User user = userService.getUserWithAuthorities()
            .orElseThrow(() -> new UsernameNotFoundException("User is not autchenticated"));
        deleteOutDatedFile(user);

        String originalFileName = file.getOriginalFilename();
        if (file.isEmpty()) {
            throw new UnsupportedOperationException("There is no uploaded file"); // TODO
        }
        validateUploadedFile(originalFileName);

        // lehet egy mappába csak X fájl kerülhet... (op rsz specifikus) lehet jobb lenne userenként 1 mappa
        String fileNameToSave = UUID.randomUUID().toString() + "." + FilenameUtils.getExtension(originalFileName);
        try {
            Files.copy(file.getInputStream(), this.rootLocation.resolve(fileNameToSave));
        } catch (Exception e) {
            throw new RuntimeException("Uploaded file cannot be saved.");
        }

        userService.saveUserImage(fileNameToSave, user);
    }

    public Resource loadFile() {
        User user = userService.getUserWithAuthorities()
            .orElseThrow(() -> new UsernameNotFoundException("Nincs bejelentkezve"));
        String fileName = user.getImageUrl();

        try {
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("resource not exists"); // TODO
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("path uri is malformed"); // TODO
        }
    }

    private void deleteOutDatedFile(User currentUser) throws IOException {
        if (!StringUtils.isEmpty(currentUser.getImageUrl())) {
            Path path = rootLocation.resolve(currentUser.getImageUrl());
            if (Files.deleteIfExists(path)) {
                LOGGER.debug("File deletion was successful"); // TODO
            } else {
                LOGGER.debug("File deletion cannot be performed"); // TODO
            }
        }
    }

    private void validateUploadedFile(String originalFileName) {
        validateExtension(originalFileName);
        //validateSize(originalFileName);
    }

    private void validateExtension(String originalFileName) {
        LOGGER.debug("file name is: " + originalFileName);
        String fileExtension = FilenameUtils.getExtension(originalFileName);
        LOGGER.debug("file extension is: " + fileExtension);
        String[] supportedExtensions = imageProperties.getSupportedExtensions().split("/");
        boolean extensionValidity = false;
        for (String extension : supportedExtensions) {
            if (extension.equals(fileExtension)) {
                extensionValidity = true;
                break;
            }
        }
        if (!extensionValidity) {
            // TODO create an exception
            throw new UnsupportedOperationException("The uploaded file extension is not valid");
        }
    }

    private void validateSize(String originalFileName) throws IOException {
        // TODO resize or reject image
        // Maybe I have to save file temporarly..
        //        LOGGER.debug("File is: {}", file.getResource().getFile());
        //        BufferedImage image = ImageIO.read(file.getResource().getFile());
        //        int width = image.getWidth();
        //        int height = image.getHeight();
        //        LOGGER.debug("Uploaded image width: {} and height: {}", width, height);
    }

}
