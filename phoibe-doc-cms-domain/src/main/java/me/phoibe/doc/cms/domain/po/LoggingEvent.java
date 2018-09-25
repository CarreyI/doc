package me.phoibe.doc.cms.domain.po;

import java.math.BigDecimal;

public class LoggingEvent {
    private Long eventId;

    private BigDecimal timestmp;

    private String formattedMessage;

    private String loggerName;

    private String levelString;

    private String threadName;

    private Short referenceFlag;

    private String arg0;

    private String arg1;

    private String arg2;

    private String arg3;

    private String arg4;

    private String arg5;

    private String arg6;

    private String arg7;

    private String arg8;

    private String arg9;

    private String callerFilename;

    private String callerClass;

    private String callerMethod;

    private String callerLine;

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public BigDecimal getTimestmp() {
        return timestmp;
    }

    public void setTimestmp(BigDecimal timestmp) {
        this.timestmp = timestmp;
    }

    public String getFormattedMessage() {
        return formattedMessage;
    }

    public void setFormattedMessage(String formattedMessage) {
        this.formattedMessage = formattedMessage == null ? null : formattedMessage.trim();
    }

    public String getLoggerName() {
        return loggerName;
    }

    public void setLoggerName(String loggerName) {
        this.loggerName = loggerName == null ? null : loggerName.trim();
    }

    public String getLevelString() {
        return levelString;
    }

    public void setLevelString(String levelString) {
        this.levelString = levelString == null ? null : levelString.trim();
    }

    public String getThreadName() {
        return threadName;
    }

    public void setThreadName(String threadName) {
        this.threadName = threadName == null ? null : threadName.trim();
    }

    public Short getReferenceFlag() {
        return referenceFlag;
    }

    public void setReferenceFlag(Short referenceFlag) {
        this.referenceFlag = referenceFlag;
    }

    public String getArg0() {
        return arg0;
    }

    public void setArg0(String arg0) {
        this.arg0 = arg0 == null ? null : arg0.trim();
    }

    public String getArg1() {
        return arg1;
    }

    public void setArg1(String arg1) {
        this.arg1 = arg1 == null ? null : arg1.trim();
    }

    public String getArg2() {
        return arg2;
    }

    public void setArg2(String arg2) {
        this.arg2 = arg2 == null ? null : arg2.trim();
    }

    public String getArg3() {
        return arg3;
    }

    public void setArg3(String arg3) {
        this.arg3 = arg3 == null ? null : arg3.trim();
    }

    public String getArg4() {
        return arg4;
    }

    public void setArg4(String arg4) {
        this.arg4 = arg4 == null ? null : arg4.trim();
    }

    public String getArg5() {
        return arg5;
    }

    public void setArg5(String arg5) {
        this.arg5 = arg5 == null ? null : arg5.trim();
    }

    public String getArg6() {
        return arg6;
    }

    public void setArg6(String arg6) {
        this.arg6 = arg6 == null ? null : arg6.trim();
    }

    public String getArg7() {
        return arg7;
    }

    public void setArg7(String arg7) {
        this.arg7 = arg7 == null ? null : arg7.trim();
    }

    public String getArg8() {
        return arg8;
    }

    public void setArg8(String arg8) {
        this.arg8 = arg8 == null ? null : arg8.trim();
    }

    public String getArg9() {
        return arg9;
    }

    public void setArg9(String arg9) {
        this.arg9 = arg9 == null ? null : arg9.trim();
    }

    public String getCallerFilename() {
        return callerFilename;
    }

    public void setCallerFilename(String callerFilename) {
        this.callerFilename = callerFilename == null ? null : callerFilename.trim();
    }

    public String getCallerClass() {
        return callerClass;
    }

    public void setCallerClass(String callerClass) {
        this.callerClass = callerClass == null ? null : callerClass.trim();
    }

    public String getCallerMethod() {
        return callerMethod;
    }

    public void setCallerMethod(String callerMethod) {
        this.callerMethod = callerMethod == null ? null : callerMethod.trim();
    }

    public String getCallerLine() {
        return callerLine;
    }

    public void setCallerLine(String callerLine) {
        this.callerLine = callerLine == null ? null : callerLine.trim();
    }
}