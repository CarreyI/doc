package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeSearch;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PhoibeSearchMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeSearch record);

    int insertSelective(PhoibeSearch record);

    PhoibeSearch selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeSearch record);

    int updateByPrimaryKey(PhoibeSearch record);

    List<String> selectHotSearch();

    int deleteOldByUserId(Long userId);

    List<String> selectByUserId(Long userId);

    int selectCountByContent(PhoibeSearch record);
}