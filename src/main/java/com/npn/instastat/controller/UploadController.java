package com.npn.instastat.controller;

import com.npn.instastat.model.Upload;
import com.npn.instastat.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping(path="/upload")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping(path="/new")
    @CrossOrigin(origins = "http://localhost:4200/")
    public @ResponseBody String uploadFile(@RequestParam("thumbnail") MultipartFile file,
                                           @RequestParam("username") String username,
                                           @RequestParam("uploadDate") String uploadDate,
                                           @RequestParam("uploadType") String uploadType) throws Exception {
        return uploadService.addNewUpload(file, username, uploadDate, uploadType);
    }

    @GetMapping(path = "get-upload")
    @CrossOrigin(origins = "http://localhost:4200/")
    public @ResponseBody List<Upload> getUpload(@RequestParam("username") String username,
                                                @RequestParam("uploadDate") String uploadDate,
                                                @RequestParam("uploadType") String uploadType) {
        return uploadService.getUpload(username, uploadDate, uploadType);
    }

    @GetMapping(path="/get-uploads")
    @CrossOrigin(origins = "http://localhost:4200/")
    public @ResponseBody Iterable<Upload> getAllUploads() {
        return uploadService.getAllUploads();
    }
}
