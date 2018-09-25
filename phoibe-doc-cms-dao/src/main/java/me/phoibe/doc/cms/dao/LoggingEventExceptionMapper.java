package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.LoggingEventException;
import me.phoibe.doc.cms.domain.po.LoggingEventExceptionKey;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoggingEventExceptionMapper {
    int deleteByPrimaryKey(LoggingEventExceptionKey key);

    int insert(LoggingEventException record);

    int insertSelective(LoggingEventException record);

    LoggingEventException selectByPrimaryKey(LoggingEventExceptionKey key);

    int updateByPrimaryKeySelective(LoggingEventException record);

    int updateByPrimaryKey(LoggingEventException record);
}