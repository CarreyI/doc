package me.phoibe.doc.cms.domain.po;

public class PhoibeAttachContent {
    private Long id;

    private Long documentId;

    private String attachContent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getAttachContent() {
        return attachContent;
    }

    public void setAttachContent(String attachContent) {
        this.attachContent = attachContent == null ? null : attachContent.trim();
    }
}