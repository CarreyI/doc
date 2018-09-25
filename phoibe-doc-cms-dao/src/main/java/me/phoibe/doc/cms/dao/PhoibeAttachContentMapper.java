package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeAttachContent;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhoibeAttachContentMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeAttachContent record);

    int insertSelective(PhoibeAttachContent record);

    PhoibeAttachContent selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeAttachContent record);

    int updateByPrimaryKeyWithBLOBs(PhoibeAttachContent record);

    int updateByPrimaryKey(PhoibeAttachContent record);

    int updateByDocumentId(PhoibeAttachContent record);
}