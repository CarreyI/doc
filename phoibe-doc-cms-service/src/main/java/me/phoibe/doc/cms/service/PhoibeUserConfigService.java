package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.po.PhoibeUserConfig;

public interface PhoibeUserConfigService {

    boolean insertUserConfig(PhoibeUserConfig userConfig);

    String[] selectUserConfig(int userId,int warsOrTactics);

    boolean selectUserConfigRecords(int userId);

    void deleteUserConfigByUserId(int userId);
}
