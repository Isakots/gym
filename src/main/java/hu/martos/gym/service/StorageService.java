package hu.martos.gym.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class StorageService {

    private Path rootLocation = Paths.get("D:/workspace/uploadDir");

    public void init() {
        // TODO create upload and temp directories if not exist
    }

    public void store(MultipartFile file) {
        // TODO
        //  1. Check if user already has a file uploaded (file = image)
        //  2. Delete that file if exists
        //  3. validate file size and extension, and file name length
        //  4. Either reject file size or reformat file
        //  5. generate a timestamp and append to filename
        //  6. save file to directory
        //  7. update file name in user table

        try {
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public Resource loadFile() {
        // TODO
        //  1. get authenticated user
        //  2. load image belongs to authenticated user
        String fileName = "";

        try {
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }

}
