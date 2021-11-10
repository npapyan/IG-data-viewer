package com.npn.instastat.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Upload {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Integer uploadId;

    private String instagramUser;

    private String listType;

    private Date uploadDate;

    public Integer getId() {
        return uploadId;
    }

    public void setId(Integer uploadId) {
        this.uploadId = uploadId;
    }

    public String getInstagramUser() {
        return instagramUser;
    }

    public void setInstagramUser(String instagramUser) {
        this.instagramUser = instagramUser;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getListType() {
        return listType;
    }

    public void setListType(String listType) {
        this.listType = listType;
    }
}
