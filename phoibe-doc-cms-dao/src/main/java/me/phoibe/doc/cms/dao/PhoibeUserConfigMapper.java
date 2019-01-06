package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeUserConfig;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PhoibeUserConfigMapper {
    int insertUserConfig(PhoibeUserConfig userConfig);

    PhoibeUserConfig selectUserConfig(@Param("userId") int userId, @Param("warsOrTactics") int warsOrTactics);

    int selectUserConfigRecords(int userId);

    void deleteUserConfigByUserId(int userId);
}
