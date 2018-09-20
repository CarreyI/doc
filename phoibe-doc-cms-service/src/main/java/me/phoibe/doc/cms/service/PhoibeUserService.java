package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.dto.DPhoibeUser;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeRole;
import me.phoibe.doc.cms.domain.po.PhoibeUser;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PhoibeUserService {

    PhoibeUser login(PhoibeUser phoibeUser);

    PhoibeRole fetchUserRoleByUserId(Long userId);

    UserInfo fetchUserInfoByUserId(Long userId);

    List<PhoibeRole> fetchUserRoleList();

    PageList<UserInfo> fetchUserPageList(PageParam<UserInfo> pageParam);

    void addUser(DPhoibeUser dPhoibeUser) throws UnsupportedEncodingException;

    void modifyUser(DPhoibeUser dPhoibeUser);
}
