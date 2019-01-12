package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.PhoibeRole;
import me.phoibe.doc.cms.domain.po.PhoibeUser;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.exception.BusinessException;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeUserService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * @author tengzhaolei
 * @Title: LoginContorller
 * @Description: class
 * @date 2018/8/25 0:20
 */
@RestController
@RequestMapping("/phoibe/")
public class LoginContorller {

    @Autowired
    private PhoibeUserService phoibeUserService;

    @Autowired
    private CacheManager cacheManager;


    @GetMapping("/logout")
    public String logout(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String jwt = JwtUtil.generateToken("0",-1);
        Cookie cookie = new Cookie(JwtUtil.HEADER_STRING,jwt);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        String token = JwtUtil.getCookieValueByName(request,JwtUtil.HEADER_STRING);
        Long userId = Long.parseLong(JwtUtil.extractInfo(token).get(JwtUtil.USER_NAME).toString());
        UserInfo userInfo = phoibeUserService.fetchUserInfoByUserId(userId);

        cacheManager.getCache("userCache").evict(userId);
        response.addCookie(cookie);
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"");
        LogUtil.writeLog(userInfo.getUserName()+"退出了系统", LogUtil.OPER_TYPE_LOGOFF,"系统退出",LoginContorller.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }



    /**
     * 登录
     */
    @RequestMapping(value = "userlogin", method = { RequestMethod.POST})
    public Object userlogin(@RequestParam String username,
                            @RequestParam String password,
                            HttpSession session,
                            HttpServletResponse response, HttpServletRequest request) {

        PhoibeUser phoibeUser = new PhoibeUser();
        phoibeUser.setUserName(username);
        phoibeUser.setPassword(password);

        try {
            UserInfo userInfo = phoibeUserService.login(phoibeUser);
            if(userInfo != null){
                String jwt = JwtUtil.generateToken(userInfo.getId().toString(),JwtUtil.EXPIRATION_TIME);

                Cookie cookie = new Cookie(JwtUtil.HEADER_STRING,jwt);
                cookie.setPath("/");
//                cookie.setDomain(request.getServerName());
                cookie.setMaxAge((int)JwtUtil.EXPIRATION_TIME);
                response.addCookie(cookie);
                request.setAttribute("userInfo",userInfo);
                LogUtil.writeLog(username+"登录系统成功", LogUtil.OPER_TYPE_LOGIN,"系统登录",LoginContorller.class,request);

                return JsonUtils.toJson(new Result<UserInfo>(Code.SUCCESS, userInfo));
            }
            throw new BusinessException("用户名或密码不正确");
        } catch (Exception e) {
            return JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }

    }

}
