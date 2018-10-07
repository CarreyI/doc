package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeCollection;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhoibeCollectionMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeCollection record);

    int insertSelective(PhoibeCollection record);

    PhoibeCollection selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeCollection record);

    int updateByPrimaryKey(PhoibeCollection record);
}