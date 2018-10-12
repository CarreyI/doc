package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.dto.DLoggingEvent;
import me.phoibe.doc.cms.domain.po.LoggingEvent;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;

/**
 * Created by lcq on 18-9-25.
 */
public interface LoggingEventService {

    void addLogingEvent(LoggingEvent loggingEvent);

    PageList<DLoggingEvent> fetchLoggingEventByPageList(PageParam<DLoggingEvent> pageParam);

    int deleteByPrimaryKey(Long eventId);
}
