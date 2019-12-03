package hu.martos.gym.web.rest;

import hu.martos.gym.service.StorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UploadController {

    private final StorageService storageService;

    public UploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/api/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            storageService.store(file);
            message = "You successfully uploaded " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Failed to upload " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @GetMapping(value = "/api/download")
    public ResponseEntity<Map<String, String>> downloadFile() throws IOException {
        // Load file as Resource
        Resource resource = storageService.loadFile();

        String encodeImage =
            Base64.getEncoder()
                .withoutPadding()
                .encodeToString(Files.readAllBytes(resource.getFile().toPath()));
        Map<String, String> jsonMap = new HashMap<>();
        jsonMap.put("content", encodeImage);
        return ResponseEntity.ok(jsonMap);
    }

}
