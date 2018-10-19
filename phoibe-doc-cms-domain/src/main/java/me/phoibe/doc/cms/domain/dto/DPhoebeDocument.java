package me.phoibe.doc.cms.domain.dto;

import me.phoibe.doc.cms.domain.po.PhoibeDocument;
import org.springframework.util.StringUtils;

import java.util.Date;

public class DPhoebeDocument extends PhoibeDocument {

    private String combatTypeDesc;

    private String armsDesc;

    private String statusDesc;

    private String auditStatusDesc;

    private Date auditTimeBegin;

    private Date auditTimeEnd;

    private Date stockTimeBegin;

    private Date stockTimeEnd;

    private Date createTimeBegin;

    private Date createTimeEnd;

    private Long warnumBegin;

    private Long warnumEnd;

    private Long dirId;

    private String contentStr;

    private String queryFlag;

    private Long queryUserId;

    private Boolean isCollection;

    private String realname;

    private String nickname;

    private String[] tagArray;

    private String[] armsArray;

    private String[] combatArray;

    private String[] formatArray;

    public String[] getFormatArray() {
        return formatArray;
    }

    public void setFormatArray(String[] formatArray) {
        this.formatArray = formatArray;
    }

    public String[] getArmsArray() {
        return armsArray;
    }

    public void setArmsArray(String[] armsArray) {
        this.armsArray = armsArray;
    }

    public String[] getCombatArray() {
        return combatArray;
    }

    public void setCombatArray(String[] combatArray) {
        this.combatArray = combatArray;
    }
    public String[] getTagArray() {
        return tagArray;
    }

    public void setTagArray(String[] tagArray) {
        this.tagArray = tagArray;
    }

    public void settings(){
        if(!StringUtils.isEmpty(getContent())){
            this.contentStr =new String(getContent());
            setContent(null);
        }
    }

    public Boolean getCollection() {
        return isCollection;
    }

    public void setCollection(Boolean collection) {
        isCollection = collection;
    }

    public Long getQueryUserId() {
        return queryUserId;
    }

    public void setQueryUserId(Long queryUserId) {
        this.queryUserId = queryUserId;
    }

    public String getQueryFlag() {
        return queryFlag;
    }

    public void setQueryFlag(String queryFlag) {
        this.queryFlag = queryFlag;
    }

    public Date getCreateTimeBegin() {
        return createTimeBegin;
    }

    public void setCreateTimeBegin(Date createTimeBegin) {
        this.createTimeBegin = createTimeBegin;
    }

    public Date getCreateTimeEnd() {
        return createTimeEnd;
    }

    public void setCreateTimeEnd(Date createTimeEnd) {
        this.createTimeEnd = createTimeEnd;
    }

    public Long getWarnumBegin() {
        return warnumBegin;
    }

    public void setWarnumBegin(Long warnumBegin) {
        this.warnumBegin = warnumBegin;
    }

    public Long getWarnumEnd() {
        return warnumEnd;
    }

    public void setWarnumEnd(Long warnumEnd) {
        this.warnumEnd = warnumEnd;
    }

    public Long getDirId() {
        return dirId;
    }

    public void setDirId(Long dirId) {
        this.dirId = dirId;
    }

    public String getCombatTypeDesc() {
        return combatTypeDesc;
    }

    public void setCombatTypeDesc(String combatTypeDesc) {
        this.combatTypeDesc = combatTypeDesc;
    }

    public String getArmsDesc() {
        return armsDesc;
    }

    public void setArmsDesc(String armsDesc) {
        this.armsDesc = armsDesc;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

    public String getAuditStatusDesc() {
        return auditStatusDesc;
    }

    public void setAuditStatusDesc(String auditStatusDesc) {
        this.auditStatusDesc = auditStatusDesc;
    }

    public Date getAuditTimeBegin() {
        return auditTimeBegin;
    }

    public void setAuditTimeBegin(Date auditTimeBegin) {
        this.auditTimeBegin = auditTimeBegin;
    }

    public Date getAuditTimeEnd() {
        return auditTimeEnd;
    }

    public void setAuditTimeEnd(Date auditTimeEnd) {
        this.auditTimeEnd = auditTimeEnd;
    }

    public Date getStockTimeBegin() {
        return stockTimeBegin;
    }

    public void setStockTimeBegin(Date stockTimeBegin) {
        this.stockTimeBegin = stockTimeBegin;
    }

    public Date getStockTimeEnd() {
        return stockTimeEnd;
    }

    public void setStockTimeEnd(Date stockTimeEnd) {
        this.stockTimeEnd = stockTimeEnd;
    }

    public String getContentStr() {
        return contentStr;
    }

    public void setContentStr(String contentStr) {
        this.contentStr = contentStr;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }



}