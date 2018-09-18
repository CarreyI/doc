package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeTag;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PhoibeTagMapper {
    int deleteByPrimaryKey(Short id);

    int insert(PhoibeTag record);

    int insertSelective(PhoibeTag record);

    PhoibeTag selectByPrimaryKey(Short id);

    int updateByPrimaryKeySelective(PhoibeTag record);

    int updateByPrimaryKey(PhoibeTag record);

    List<PhoibeTag> selectByPageList(PageParam<PhoibeTag> pageParam);

    Long selectByPageListCount(PageParam<PhoibeTag> pageParam);
}