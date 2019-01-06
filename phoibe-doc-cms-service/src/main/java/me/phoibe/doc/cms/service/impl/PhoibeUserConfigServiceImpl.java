package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeUserConfigMapper;
import me.phoibe.doc.cms.domain.po.PhoibeUserConfig;
import me.phoibe.doc.cms.service.PhoibeUserConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhoibeUserConfigServiceImpl implements PhoibeUserConfigService {

    @Autowired
    private PhoibeUserConfigMapper phoibeUserConfigMapper;

    @Override
    public boolean insertUserConfig(PhoibeUserConfig userConfig) {
        return phoibeUserConfigMapper.insertUserConfig(userConfig) > 0;
    }

    @Override
    public String[] selectUserConfig(int userId,int warsOrTactics) {
        PhoibeUserConfig phoibeUserConfig = phoibeUserConfigMapper.selectUserConfig(userId,warsOrTactics);
        return phoibeUserConfig.getConfigNames().split(",");
    }

    @Override
    public boolean selectUserConfigRecords(int userId) {
        return phoibeUserConfigMapper.selectUserConfigRecords(userId) > 0;
    }

    @Override
    public void deleteUserConfigByUserId(int userId) {
         phoibeUserConfigMapper.deleteUserConfigByUserId(userId);
    }

}
