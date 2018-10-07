package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeBrowse;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhoibeBrowseMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeBrowse record);

    int insertSelective(PhoibeBrowse record);

    PhoibeBrowse selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeBrowse record);

    int updateByPrimaryKey(PhoibeBrowse record);

    int deleteOldByUserId(Long userId);
}