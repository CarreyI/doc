package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.LoggingEventProperty;
import me.phoibe.doc.cms.domain.po.LoggingEventPropertyKey;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoggingEventPropertyMapper {
    int deleteByPrimaryKey(LoggingEventPropertyKey key);

    int insert(LoggingEventProperty record);

    int insertSelective(LoggingEventProperty record);

    LoggingEventProperty selectByPrimaryKey(LoggingEventPropertyKey key);

    int updateByPrimaryKeySelective(LoggingEventProperty record);

    int updateByPrimaryKey(LoggingEventProperty record);
}