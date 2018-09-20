package me.phoibe.doc.cms.domain.po;

public class LoggingEvent {
    private Short timestmp;

    private String callerLine;

    private String callerMethod;

    private String callerClass;

    private String callerFilename;

    private String arg0;

    private String arg1;

    private String arg2;

    private String arg3;

    private String referenceFlag;

    private String threadName;

    private String levelString;

    private String loggerName;

    private String formattedMessage;

    public Short getTimestmp() {
        return timestmp;
    }

    public void setTimestmp(Short timestmp) {
        this.timestmp = timestmp;
    }

    public String getCallerLine() {
        return callerLine;
    }

    public void setCallerLine(String callerLine) {
        this.callerLine = callerLine == null ? null : callerLine.trim();
    }

    public String getCallerMethod() {
        return callerMethod;
    }

    public void setCallerMethod(String callerMethod) {
        this.callerMethod = callerMethod == null ? null : callerMethod.trim();
    }

    public String getCallerClass() {
        return callerClass;
    }

    public void setCallerClass(String callerClass) {
        this.callerClass = callerClass == null ? null : callerClass.trim();
    }

    public String getCallerFilename() {
        return callerFilename;
    }

    public void setCallerFilename(String callerFilename) {
        this.callerFilename = callerFilename == null ? null : callerFilename.trim();
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

    public String getReferenceFlag() {
        return referenceFlag;
    }

    public void setReferenceFlag(String referenceFlag) {
        this.referenceFlag = referenceFlag == null ? null : referenceFlag.trim();
    }

    public String getThreadName() {
        return threadName;
    }

    public void setThreadName(String threadName) {
        this.threadName = threadName == null ? null : threadName.trim();
    }

    public String getLevelString() {
        return levelString;
    }

    public void setLevelString(String levelString) {
        this.levelString = levelString == null ? null : levelString.trim();
    }

    public String getLoggerName() {
        return loggerName;
    }

    public void setLoggerName(String loggerName) {
        this.loggerName = loggerName == null ? null : loggerName.trim();
    }

    public String getFormattedMessage() {
        return formattedMessage;
    }

    public void setFormattedMessage(String formattedMessage) {
        this.formattedMessage = formattedMessage == null ? null : formattedMessage.trim();
    }
}