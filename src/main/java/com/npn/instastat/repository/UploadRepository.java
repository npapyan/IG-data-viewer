package com.npn.instastat.repository;

import com.npn.instastat.model.Upload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface UploadRepository extends JpaRepository<Upload, Integer> {

    Upload findOneByuploadId(Integer uploadId);

    List<Upload> findAllByInstagramUserAndListTypeAndUploadDate(String instagramUser, String listType, Date uploadDate);

}
