package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.LoggingEvent;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoggingEventMapper {
    int insert(LoggingEvent record);

    int insertSelective(LoggingEvent record);
}