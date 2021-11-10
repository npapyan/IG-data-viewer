package com.npn.instastat.controller;


import com.npn.instastat.model.Account;
import com.npn.instastat.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path="/account")
@CrossOrigin(origins = "http://localhost:4200/")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping(path = "/get-user-list")
    public @ResponseBody
    List<Account> getUserListByUploadId(@RequestParam("uploadId") Integer uploadId,
                                        @RequestParam("uploadType") String uploadType) {
        return accountService.getUserListByUploadId(uploadId, uploadType);
    }

    @GetMapping(path = "/compare-lists")
    public @ResponseBody
    List<String> compareLists(@RequestParam("uploadId1") Integer uploadId1,
                              @RequestParam("uploadType1") String uploadType1,
                              @RequestParam("uploadId2") Integer uploadId2,
                              @RequestParam("uploadType2") String uploadType2) {
        return accountService.compareLists(uploadId1, uploadType1, uploadId2, uploadType2);
    }
}
