package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.dto.DLoggingEvent;
import me.phoibe.doc.cms.domain.po.LoggingEvent;
import me.phoibe.doc.cms.domain.po.PageParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface LoggingEventMapper {
    int deleteByPrimaryKey(Long eventId);

    int insert(LoggingEvent record);

    int insertSelective(LoggingEvent record);

    LoggingEvent selectByPrimaryKey(Long eventId);

    int updateByPrimaryKeySelective(LoggingEvent record);

    int updateByPrimaryKey(LoggingEvent record);

    List<DLoggingEvent> selectByPage(PageParam<DLoggingEvent> pageParam);

    Long selectCountByPage(PageParam<DLoggingEvent> pageParam);
}