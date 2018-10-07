package me.phoibe.doc.cms.domain.dto;

import me.phoibe.doc.cms.domain.po.PhoibeDocument;
import me.phoibe.doc.cms.domain.po.PhoibeUser;

import java.util.List;

public class DPhoibeUser extends PhoibeUser {
    private List<Long> roleId;

    private List<PhoibeDocument> phoibeDocuments;

    public List<PhoibeDocument> getPhoibeDocuments() {
        return phoibeDocuments;
    }

    public void setPhoibeDocuments(List<PhoibeDocument> phoibeDocuments) {
        this.phoibeDocuments = phoibeDocuments;
    }

    public List<Long> getRoleId() {
        return roleId;
    }

    public void setRoleId(List<Long> roleId) {
        this.roleId = roleId;
    }
}
