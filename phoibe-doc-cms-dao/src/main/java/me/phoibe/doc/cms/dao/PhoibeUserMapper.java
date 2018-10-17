package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.dto.DPhoibeUser;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PhoibeUserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeUser record);

    int insertSelective(PhoibeUser record);

    PhoibeUser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeUser record);

    int updateByPrimaryKey(PhoibeUser record);

    PhoibeUser selectByParam(PhoibeUser phoibeUser);

    List<UserInfo> selectByPageList(PageParam<UserInfo> pageParam);

    Long selectByPageListCount(PageParam<UserInfo> pageParam);

    List<DPhoibeUser> selectUserByScore();

    List<DPhoibeUser> selectUserByBrowse();

}