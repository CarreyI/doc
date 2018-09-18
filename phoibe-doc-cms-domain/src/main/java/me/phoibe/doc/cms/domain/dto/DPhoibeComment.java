package me.phoibe.doc.cms.domain.dto;

import me.phoibe.doc.cms.domain.po.PhoibeComment;

public class DPhoibeComment extends PhoibeComment {
    private String realname;

    private String nickname;

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
