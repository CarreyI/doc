package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.LoggingEventProperty;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoggingEventPropertyMapper {
    int deleteByPrimaryKey(Short eventId);

    int insert(LoggingEventProperty record);

    int insertSelective(LoggingEventProperty record);

    LoggingEventProperty selectByPrimaryKey(Short eventId);

    int updateByPrimaryKeySelective(LoggingEventProperty record);

    int updateByPrimaryKey(LoggingEventProperty record);
}