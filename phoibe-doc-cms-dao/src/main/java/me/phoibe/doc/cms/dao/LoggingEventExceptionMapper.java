package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.LoggingEventException;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoggingEventExceptionMapper {
    int deleteByPrimaryKey(Short eventId);

    int insert(LoggingEventException record);

    int insertSelective(LoggingEventException record);

    LoggingEventException selectByPrimaryKey(Short eventId);

    int updateByPrimaryKeySelective(LoggingEventException record);

    int updateByPrimaryKey(LoggingEventException record);
}