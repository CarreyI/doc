package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeDict;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PhoibeDictMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeDict record);

    int insertSelective(PhoibeDict record);

    PhoibeDict selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeDict record);

    int updateByPrimaryKey(PhoibeDict record);

    List<PhoibeDict> selectByPage(PageParam<PhoibeDict> pageParam);

    long selectCountByPage(PageParam<PhoibeDict> pageParam);

    void deleteByGroupKey(String groupKey);
}