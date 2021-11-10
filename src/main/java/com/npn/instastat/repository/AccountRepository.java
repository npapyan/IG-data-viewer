package com.npn.instastat.repository;

import com.npn.instastat.model.Account;
import com.npn.instastat.model.Upload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    List<Account> findByupload(Upload upload);
}
