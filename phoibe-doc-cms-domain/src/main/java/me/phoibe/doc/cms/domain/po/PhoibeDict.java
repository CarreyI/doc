package me.phoibe.doc.cms.domain.po;

public class PhoibeDict {
    private Long id;

    private String dictKey;

    private String dictName;

    private String groupKey;

    private Short orderBy;

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
}