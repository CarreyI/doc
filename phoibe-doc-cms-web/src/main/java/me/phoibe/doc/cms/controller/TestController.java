package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Test
 */
@RestController
@RequestMapping("phoibe/test")
public class TestController {
    @Autowired
    PhoibeUserService phoibeUserService;

    @GetMapping("hello")
    public String hello(HttpServletRequest request) {

        String token = JwtUtil.getCookieValueByName(request,JwtUtil.HEADER_STRING);
        Map<String,Object> jwtMap= JwtUtil.extractInfo(token);
        UserInfo userInfo = new UserInfo();
        if (jwtMap != null) {
            Object jwt_user =  jwtMap.get(JwtUtil.USER_NAME);
            if (jwt_user != null) {
                Long userId = Long.parseLong(jwt_user.toString());
                userInfo = phoibeUserService.fetchUserInfoByUserId(userId);
            }
        }
        System.out.println("取当前用户结束--------------");
        return userInfo.toString();
    }

}
