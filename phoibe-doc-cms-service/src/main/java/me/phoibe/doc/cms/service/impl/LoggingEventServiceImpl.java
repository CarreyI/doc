package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.LoggingEventMapper;
import me.phoibe.doc.cms.domain.dto.DLoggingEvent;
import me.phoibe.doc.cms.domain.po.LoggingEvent;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.service.LoggingEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by lcq on 18-9-25.
 */
@Service
public class LoggingEventServiceImpl implements LoggingEventService {

    @Autowired
    private LoggingEventMapper loggingEventMapper;

    @Override
    public void addLogingEvent(LoggingEvent loggingEvent) {
        loggingEventMapper.insertSelective(loggingEvent);
    }

    @Override
    public PageList<DLoggingEvent> fetchLoggingEventByPageList(PageParam<LoggingEvent> pageParam) {
        List<DLoggingEvent> list = loggingEventMapper.selectByPage(pageParam);

        return PageList.createPage(pageParam,loggingEventMapper.selectCountByPage(pageParam),list);
    }
}
