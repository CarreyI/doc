package me.phoibe.doc.cms.domain.po;

public class LoggingEventException {
    private Short eventId;

    private Short i;

    private String traceLine;

    public Short getEventId() {
        return eventId;
    }

    public void setEventId(Short eventId) {
        this.eventId = eventId;
    }

    public Short getI() {
        return i;
    }

    public void setI(Short i) {
        this.i = i;
    }

    public String getTraceLine() {
        return traceLine;
    }

    public void setTraceLine(String traceLine) {
        this.traceLine = traceLine == null ? null : traceLine.trim();
    }
}