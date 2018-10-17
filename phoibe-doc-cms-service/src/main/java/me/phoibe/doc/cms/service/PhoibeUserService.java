package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.dto.DPhoibeUser;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PhoibeUserService {

    UserInfo login(PhoibeUser phoibeUser);

    List<PhoibeRole> fetchUserRoleByUserId(Long userId);

    UserInfo fetchUserInfoByUserId(Long userId);

    List<PhoibeRole> fetchUserRoleList();

    PageList<UserInfo> fetchUserPageList(PageParam<UserInfo> pageParam);

    void addUser(DPhoibeUser dPhoibeUser) throws UnsupportedEncodingException;

    void modifyUser(DPhoibeUser dPhoibeUser);

    void deleteByPrimaryKey(Long id);

    List<DPhoibeUser> fetchUserByScore();

    List<DPhoibeUser> fetchUserByBrowse();

    boolean checkSubscribe(PhoibeSubscribe phoibeSubscribe);

    void cancelSubscribe(PhoibeSubscribe phoibeSubscribe);

}
