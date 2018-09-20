package me.phoibe.doc.cms.domain.po;

public class LoggingEventProperty {
    private Short eventId;

    private String mappedKey;

    private String mappedValue;

    public Short getEventId() {
        return eventId;
    }

    public void setEventId(Short eventId) {
        this.eventId = eventId;
    }

    public String getMappedKey() {
        return mappedKey;
    }

    public void setMappedKey(String mappedKey) {
        this.mappedKey = mappedKey == null ? null : mappedKey.trim();
    }

    public String getMappedValue() {
        return mappedValue;
    }

    public void setMappedValue(String mappedValue) {
        this.mappedValue = mappedValue == null ? null : mappedValue.trim();
    }
}