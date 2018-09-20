package me.phoibe.doc.cms.utils;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.UnsynchronizedAppenderBase;

public class OracleDBAppender extends
        UnsynchronizedAppenderBase<ILoggingEvent> {

    @Override
    protected void append(ILoggingEvent eventObject) {
            String level = eventObject.getLevel().toString();
            String loggerName = eventObject.getLoggerName();
            String threadName = eventObject.getThreadName();
            String formattedMessage = eventObject.getFormattedMessage();
        System.out.println("-level:"+level+"-loggerName:"+loggerName+"-threadName:"+threadName+"-formattedMessage:"+formattedMessage);
    }

}
