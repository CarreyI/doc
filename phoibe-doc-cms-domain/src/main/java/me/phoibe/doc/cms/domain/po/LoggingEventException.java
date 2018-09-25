package me.phoibe.doc.cms.domain.po;

public class LoggingEventException extends LoggingEventExceptionKey {
    private String traceLine;

    public String getTraceLine() {
        return traceLine;
    }

    public void setTraceLine(String traceLine) {
        this.traceLine = traceLine == null ? null : traceLine.trim();
    }
}