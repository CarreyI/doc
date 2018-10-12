package me.phoibe.doc.cms.domain.po;

public class PhoibeDict {
    private Long id;

    private String dictKey;

    private String dictName;

    private String groupKey;

    private String groupName;

    private Short orderBy;

    private Short dictType;

    private Short dictStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDictKey() {
        return dictKey;
    }

    public void setDictKey(String dictKey) {
        this.dictKey = dictKey == null ? null : dictKey.trim();
    }

    public String getDictName() {
        return dictName;
    }

    public void setDictName(String dictName) {
        this.dictName = dictName == null ? null : dictName.trim();
    }

    public String getGroupKey() {
        return groupKey;
    }

    public void setGroupKey(String groupKey) {
        this.groupKey = groupKey == null ? null : groupKey.trim();
    }

    public Short getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(Short orderBy) {
        this.orderBy = orderBy;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Short getDictType() {
        return dictType;
    }

    public void setDictType(Short dictType) {
        this.dictType = dictType;
    }

    public Short getDictStatus() {
        return dictStatus;
    }

    public void setDictStatus(Short dictStatus) {
        this.dictStatus = dictStatus;
    }
}