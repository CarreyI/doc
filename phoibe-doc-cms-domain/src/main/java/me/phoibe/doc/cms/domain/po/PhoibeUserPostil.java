package me.phoibe.doc.cms.domain.po;

import java.util.Date;

public class PhoibeUserPostil {
    private int id;
    private long userId;
    private long docId;
    private String docName;
    private String docPath;
    private Date createTime;
    private int fileSize;
    private String userName;
    private Short progress;
    private String docTitle;

    public Short getProgress() {
        return progress;
    }

    public void setProgress(Short progress) {
        this.progress = progress;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getDocId() {
        return docId;
    }

    public void setDocId(int docId) {
        this.docId = docId;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocPath() {
        return docPath;
    }
    public String getDocTitle(){return docTitle;};

    public void setDocPath(String docPath) {
        this.docPath = docPath;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getFileSize() {
        return fileSize;
    }

    public void setFileSize(int fileSize) {
        this.fileSize = fileSize;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setDocTitle(String docTitle){this.docTitle = docTitle;}
}
