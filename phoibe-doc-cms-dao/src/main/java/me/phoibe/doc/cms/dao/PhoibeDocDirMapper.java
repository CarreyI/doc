package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeDocDir;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhoibeDocDirMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeDocDir record);

    int insertSelective(PhoibeDocDir record);

    PhoibeDocDir selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeDocDir record);

    int updateByPrimaryKey(PhoibeDocDir record);

    int deleteByDirId(Long dirId);

    int deleteByDocId(Long docId);
}