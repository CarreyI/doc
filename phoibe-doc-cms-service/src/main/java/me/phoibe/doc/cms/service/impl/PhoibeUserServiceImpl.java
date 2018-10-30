package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeRoleMapper;
import me.phoibe.doc.cms.dao.PhoibeSubscribeMapper;
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
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
@CacheConfig(cacheNames = {"userCache"})
@Service
public class PhoibeUserServiceImpl implements PhoibeUserService {

    @Autowired
    private PhoibeUserMapper phoibeUserMapper;

    @Autowired
    private PhoibeRoleMapper phoibeRoleMapper;

    @Autowired
    private PhoibeUserRoleMapper phoibeUserRoleMapper;

    @Autowired
    private PhoibeSubscribeMapper phoibeSubscribeMapper;


    @Override
    public UserInfo login(PhoibeUser phoibeUser) {
        if(StringUtils.isEmpty(phoibeUser.getUserName())){
            throw new BusinessException("用户名不能为空");
        }
        if(StringUtils.isEmpty(phoibeUser.getPassword())){
            throw new BusinessException("密码不能为空");
        }
        phoibeUser.setStatus(Short.valueOf("1"));
        PhoibeUser phoibeUser1 = phoibeUserMapper.selectByParam(phoibeUser);
        if(phoibeUser1==null){
            return null;
        }
        UserInfo userInfo = new UserInfo();
        List<PhoibeRole> phoibeRole = phoibeRoleMapper.selectByUserId(phoibeUser1.getId());
        BeanUtils.copyProperties(phoibeUser1,userInfo);
        userInfo.setRoles(phoibeRole);
        return userInfo;
    }

    @Override
    public List<PhoibeRole> fetchUserRoleByUserId(Long userId) {
        return phoibeRoleMapper.selectByUserId(userId);
    }

    @Cacheable(key = "#userId")
    @Override
    public UserInfo fetchUserInfoByUserId(Long userId) {
        if(null == userId){
            throw new BusinessException("用户id不能为空");
        }
        UserInfo userInfo = new UserInfo();
        PhoibeUser phoibeUser = phoibeUserMapper.selectByPrimaryKey(userId);
        if(phoibeUser == null){
            throw new BusinessException("未找到该用户");
        }
        List<PhoibeRole> phoibeRole = phoibeRoleMapper.selectByUserId(userId);
        BeanUtils.copyProperties(phoibeUser,userInfo);
        userInfo.setRoles(phoibeRole);

        return userInfo;
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
    public void addUser(DPhoibeUser dPhoibeUser) throws UnsupportedEncodingException {
        PhoibeUser user = new PhoibeUser();
        BeanUtils.copyProperties(dPhoibeUser,user);
        user.setPassword(DigestUtils.md5Hex(user.getPassword()));
        phoibeUserMapper.insertSelective(user);
        for(Long roleId : dPhoibeUser.getRoleId()){
            PhoibeUserRole phoibeUserRole = new PhoibeUserRole();
            phoibeUserRole.setCreateTime(new Date());
            phoibeUserRole.setRoleId(roleId);
            phoibeUserRole.setUserId(user.getId());
            phoibeUserRoleMapper.insertSelective(phoibeUserRole);
        }
    }

    @Override
    @Transactional
    public void modifyUser(DPhoibeUser dPhoibeUser) {
        PhoibeUser user = new PhoibeUser();
        BeanUtils.copyProperties(dPhoibeUser,user);
        user.setPassword(DigestUtils.md5Hex(user.getPassword()));
        phoibeUserMapper.updateByPrimaryKeySelective(user);
        phoibeUserRoleMapper.deleteByUserId(user.getId());
        for(Long roleId : dPhoibeUser.getRoleId()) {
            PhoibeUserRole phoibeUserRole = new PhoibeUserRole();
            phoibeUserRole.setUpdateTime(new Date());
            phoibeUserRole.setRoleId(roleId);
            phoibeUserRole.setUserId(user.getId());
            phoibeUserRoleMapper.insertSelective(phoibeUserRole);
        }
    }

    @Override
    public void deleteByPrimaryKey(Long id) {
        phoibeUserMapper.deleteByPrimaryKey(id);
        phoibeUserRoleMapper.deleteByUserId(id);
    }

    @Override
    public List<DPhoibeUser> fetchUserByScore() {
        return phoibeUserMapper.selectUserByScore();
    }
    @Override
    public List<DPhoibeUser> fetchUserByBrowse() {
        return phoibeUserMapper.selectUserByBrowse();
    }

    @Override
    public boolean checkSubscribe(PhoibeSubscribe phoibeSubscribe) {
        return phoibeSubscribeMapper.selectCountByParam(phoibeSubscribe) > 0;
    }

    @Override
    public void cancelSubscribe(PhoibeSubscribe phoibeSubscribe) {
        phoibeSubscribeMapper.deleteByParam(phoibeSubscribe);
    }
    @Override
    public List<PhoibeUser> isExitUser(DPhoibeUser userInfo) {
        return phoibeUserMapper.isExitUser(userInfo);
    }

}
