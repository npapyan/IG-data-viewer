package com.npn.instastat.service;

import com.npn.instastat.model.Account;
import com.npn.instastat.repository.AccountRepository;
import com.npn.instastat.repository.UploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UploadRepository uploadRepository;

        public List<Account> getUserListByUploadId(Integer uploadId, String uploadType) {
            return accountRepository.findByupload(uploadRepository.findOneByuploadId(uploadId));
        }

        public List<String> compareLists(Integer uploadId1, String uploadType1, Integer uploadId2, String uploadType2) {
            List<String> list1 = new ArrayList();
            List<String> list2 = new ArrayList();
            List<Account> accountList1 = accountRepository.findByupload(uploadRepository.findOneByuploadId(uploadId1));
            for (Account account : accountList1) {
                list1.add(account.getUsername());
            }

            List<Account> accountList2 = accountRepository.findByupload(uploadRepository.findOneByuploadId(uploadId2));
            for (Account account : accountList2) {
                list2.add(account.getUsername());
            }

            list1.removeAll(list2);

            return list1;
        }
}
