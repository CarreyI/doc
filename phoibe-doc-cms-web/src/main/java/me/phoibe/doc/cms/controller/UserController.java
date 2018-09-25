package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.dto.DPhoibeUser;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeRole;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeUserService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/phoibe/user")
public class UserController {
    @Autowired
    private PhoibeUserService phoibeUserService;

    @GetMapping("/list/{index}/{limit}")
    public String list(@PathVariable Integer index, @PathVariable Integer limit,
                       @RequestParam(required = false) String f, @ModelAttribute UserInfo param, HttpServletRequest request){
        String orderBy = "u.CREATE_TIME";
        String sort = "DESC";
        PageParam<UserInfo> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setParam(param == null ? new UserInfo() : param);
        pageParam.setOrderBy(orderBy);
        pageParam.setSort(sort);

        PageList<UserInfo> pageList = phoibeUserService.fetchUserPageList(pageParam);
        LogUtil.writeLog("查看了用户管理信息", LogUtil.OPER_TYPE_LOOK,"用户管理",UserController.class,request);
        return JsonUtils.toJson(new Result<PageList<UserInfo>>(Code.SUCCESS, pageList));

    }

    @PostMapping("/save")
    public String save(@RequestBody DPhoibeUser dPhoibeUser, HttpServletRequest request) throws UnsupportedEncodingException {
        phoibeUserService.addUser(dPhoibeUser);
        LogUtil.writeLog("新增了用户名为{"+dPhoibeUser.getUserName()+"}的用户", LogUtil.OPER_TYPE_ADD,"用户管理",UserController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @GetMapping("/role/list")
    public String list( HttpServletRequest request){
        List<PhoibeRole> list = phoibeUserService.fetchUserRoleList();
        LogUtil.writeLog("查看了角色关系", LogUtil.OPER_TYPE_LOOK,"角色关系",UserController.class,request);
        return JsonUtils.toJson(new Result<List<PhoibeRole>>(Code.SUCCESS, list));
    }

    @GetMapping("/get")
    public String get(HttpServletRequest request){
        String token = JwtUtil.getCookieValueByName(request,JwtUtil.HEADER_STRING);
        Long userId = Long.parseLong(JwtUtil.extractInfo(token).get(JwtUtil.USER_NAME).toString());
        UserInfo userInfo = phoibeUserService.fetchUserInfoByUserId(userId);
        return JsonUtils.toJson(new Result<UserInfo>(Code.SUCCESS, userInfo));
    }

    @PostMapping("/update")
    public String update(@RequestBody DPhoibeUser dPhoibeUser, HttpServletRequest request){
        phoibeUserService.modifyUser(dPhoibeUser);
        LogUtil.writeLog("更新了用户名为{"+dPhoibeUser.getUserName()+"}的用户信息", LogUtil.OPER_TYPE_EDIT,"用户管理",UserController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
}
