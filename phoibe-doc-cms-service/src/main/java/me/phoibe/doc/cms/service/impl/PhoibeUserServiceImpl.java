package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeRoleMapper;
import me.phoibe.doc.cms.dao.PhoibeUserMapper;
import me.phoibe.doc.cms.dao.PhoibeUserRoleMapper;
import me.phoibe.doc.cms.domain.dto.DPhoibeUser;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.*;
import me.phoibe.doc.cms.exception.BusinessException;
import me.phoibe.doc.cms.service.PhoibeUserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

@Service
public class PhoibeUserServiceImpl implements PhoibeUserService {

    @Autowired
    private PhoibeUserMapper phoibeUserMapper;

    @Autowired
    private PhoibeRoleMapper phoibeRoleMapper;

    @Autowired
    private PhoibeUserRoleMapper phoibeUserRoleMapper;

    @Override
    public PhoibeUser login(PhoibeUser phoibeUser) {
        if(StringUtils.isEmpty(phoibeUser.getUserName())){
            throw new BusinessException("用户名不能为空");
        }
        if(StringUtils.isEmpty(phoibeUser.getPassword())){
            throw new BusinessException("密码不能为空");
        }
        phoibeUser.setStatus(Short.valueOf("1"));
        PhoibeUser phoibeUser1 = phoibeUserMapper.selectByParam(phoibeUser);
        return phoibeUser1;
    }

    @Override
    public PhoibeRole fetchUserRoleByUserId(Long userId) {
        return phoibeRoleMapper.selectByUserId(userId);
    }

    @Override
    public UserInfo fetchUserInfoByUserId(Long userId) {
        if(null == userId){
            throw new BusinessException("用户id不能为空");
        }
        UserInfo userInfo = new UserInfo();
        PhoibeUser phoibeUser = new PhoibeUser();
        phoibeUser.setId(userId);
        PhoibeUser phoibeUser1 = phoibeUserMapper.selectByParam(phoibeUser);
        if(phoibeUser1 == null){
            throw new BusinessException("未找到该用户");
        }
        PhoibeRole phoibeRole = phoibeRoleMapper.selectByUserId(userId);
        BeanUtils.copyProperties(phoibeUser1,userInfo);
        userInfo.setRoleType(phoibeRole.getRoleType());
        userInfo.setRoleName(phoibeRole.getRoleName());

        return null;
    }

    @Override
    public List<PhoibeRole> fetchUserRoleList() {
        return phoibeRoleMapper.selectByList();
    }

    @Override
    public PageList<UserInfo> fetchUserPageList(PageParam<UserInfo> pageParam) {
        List<UserInfo> list = phoibeUserMapper.selectByPageList(pageParam);
        return PageList.createPage(pageParam,phoibeUserMapper.selectByPageListCount(pageParam),list);
    }

    @Override
    @Transactional
    public void addUser(DPhoibeUser dPhoibeUser) {
        PhoibeUser user = new PhoibeUser();
        BeanUtils.copyProperties(dPhoibeUser,user);
        user.setPassword(DigestUtils.md5("Q1w2e3r4").toString());
        phoibeUserMapper.insertSelective(user);
        PhoibeUserRole phoibeUserRole = new PhoibeUserRole();
        phoibeUserRole.setCreateTime(new Date());
        phoibeUserRole.setRoleId(dPhoibeUser.getRoleId());
        phoibeUserRole.setUserId(user.getId());
        phoibeUserRoleMapper.insertSelective(phoibeUserRole);
    }

    @Override
    public void modifyUser(DPhoibeUser dPhoibeUser) {
        PhoibeUser user = new PhoibeUser();
        BeanUtils.copyProperties(dPhoibeUser,user);
        phoibeUserMapper.updateByPrimaryKeySelective(user);
        PhoibeUserRole phoibeUserRole = new PhoibeUserRole();
        phoibeUserRole.setUpdateTime(new Date());
        phoibeUserRole.setRoleId(dPhoibeUser.getRoleId());
        phoibeUserRole.setUserId(user.getId());
        phoibeUserRoleMapper.updateByUserId(phoibeUserRole);
    }
}
