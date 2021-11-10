package com.npn.instastat.service;
import com.npn.instastat.model.Upload;
import com.npn.instastat.repository.AccountRepository;
import com.npn.instastat.repository.UploadRepository;
import com.npn.instastat.utils.IgFileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.InputStream;
import java.sql.Date;
import java.util.*;

@Service
public class UploadService {

    @Autowired
    private UploadRepository uploadRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private IgFileUtil igFileUtil;

    @Transactional(rollbackOn = Exception.class)
    public String addNewUpload(MultipartFile file, String username, String uploadDate, String uploadType) throws Exception {
        InputStream fileUploadStream = file.getInputStream();
        String fileContents = new String(fileUploadStream.readAllBytes());
        Date date = Date.valueOf(uploadDate);

        Upload upload = new Upload();
        upload.setInstagramUser(username);
        upload.setListType(uploadType.split(" ")[0]);
        upload.setUploadDate(date);

        upload = uploadRepository.save(upload);
        accountRepository.saveAll(igFileUtil.parseForAccounts(fileContents, upload));

        return "Gucci";
    }

    public List<Upload> getUpload(String username, String uploadDate, String uploadType) {
        Date date = Date.valueOf(uploadDate);
        Upload upload = new Upload();
        upload.setInstagramUser(username);
        upload.setListType(uploadType.split(" ")[0]);
        upload.setUploadDate(date);
        return uploadRepository.findAllByInstagramUserAndListTypeAndUploadDate(upload.getInstagramUser(), upload.getListType(), upload.getUploadDate());
    }

    public Iterable<Upload> getAllUploads() {
        return uploadRepository.findAll();
    }

}
