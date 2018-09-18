package me.phoibe.doc.cms.domain.dto;

import me.phoibe.doc.cms.domain.po.PhoibeUser;

public class DPhoibeUser extends PhoibeUser {
    private Long roleId;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
