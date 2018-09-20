package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.PhoibeRole;
import me.phoibe.doc.cms.domain.po.PhoibeUser;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Constant;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeUserService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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


    @GetMapping("/logout")
    public String logout(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String jwt = JwtUtil.generateToken("0",-1);
        Cookie cookie = new Cookie(JwtUtil.HEADER_STRING,jwt);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"");
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
            phoibeUser = phoibeUserService.login(phoibeUser);
            if(phoibeUser != null){
                String jwt = JwtUtil.generateToken(phoibeUser.getId().toString(),JwtUtil.EXPIRATION_TIME);
                UserInfo userInfo = new UserInfo();
                BeanUtils.copyProperties(phoibeUser,userInfo);
                PhoibeRole phoibeRole = phoibeUserService.fetchUserRoleByUserId(userInfo.getId());
                userInfo.setRoleType(phoibeRole.getRoleType());
                userInfo.setRoleName(phoibeRole.getRoleName());

                Cookie cookie = new Cookie(JwtUtil.HEADER_STRING,jwt);
                cookie.setPath("/");
//                cookie.setDomain(request.getServerName());
                cookie.setMaxAge((int)JwtUtil.EXPIRATION_TIME);
                response.addCookie(cookie);

                return JsonUtils.toJson(new Result<UserInfo>(Code.SUCCESS, userInfo));
            }
        } catch (Exception e) {
            return JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }


        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

}
