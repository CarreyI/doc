package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeDirectory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhoibeDirectoryMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeDirectory record);

    int insertSelective(PhoibeDirectory record);

    PhoibeDirectory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeDirectory record);

    int updateByPrimaryKey(PhoibeDirectory record);
}