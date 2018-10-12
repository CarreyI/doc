package me.phoibe.doc.cms.domain.dto;

import me.phoibe.doc.cms.domain.po.LoggingEvent;

public class DLoggingEvent extends LoggingEvent {
    private String sDatatime;
    private String eDatatime;

    public String geteDatatime() {
        return eDatatime;
    }

    public void seteDatatime(String eDatatime) {
        this.eDatatime = eDatatime;
    }

    public String getsDatatime() {
        return sDatatime;
    }

    public void setsDatatime(String sDatatime) {
        this.sDatatime = sDatatime;
    }
}
