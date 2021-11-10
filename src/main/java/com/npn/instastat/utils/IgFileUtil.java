package com.npn.instastat.utils;

import com.npn.instastat.model.Account;
import com.npn.instastat.model.Upload;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class IgFileUtil {

    private static final String MAIN_REGEX = "<a class=\"FPmhX notranslate  _0imsa \" title=\"";
    private static final String USERNAME_REGEX = "\" href=\"";
    private static final String NAME_RIGHT_REGEX = "</div></div></div><div class=\"Pkbci\">";
    private static final String NAME_LEFT_REGEX = "<div class=\"wFPL8 \">";

    public ArrayList<Account> parseForAccounts(String fileContents, Upload upload) throws Exception {
        ArrayList<Account> accountList = new ArrayList<>();
        String[] splitFileContentsArr = fileContents.split(MAIN_REGEX);
        List<String> splitFileContents = new ArrayList<>(Arrays.asList(splitFileContentsArr));
        if (splitFileContents.size() == 0) {
            throw new Exception("File contents are empty.");
        }
        splitFileContents.remove(0);
        for (String follower : splitFileContents) {
            String username = follower.split(USERNAME_REGEX)[0];
            String[] displayNameArr = follower.split(NAME_RIGHT_REGEX)[0].split(NAME_LEFT_REGEX);
            String displayName = "";
            if (displayNameArr.length > 1) {
                displayName  = displayNameArr[1];
            }
            Account account = new Account();
            account.setUsername(username);
            account.setName(displayName);
            account.setUpload(upload);
            accountList.add(account);
        }
        return accountList;
    }

}
