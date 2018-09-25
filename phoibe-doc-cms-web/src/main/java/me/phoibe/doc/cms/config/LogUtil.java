package me.phoibe.doc.cms.config;

import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeUserService;
import me.phoibe.doc.cms.service.impl.PhoibeUserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class LogUtil {
    /**
     * 登录操作
     */
    public static final int OPER_TYPE_LOGIN = 1;
    /**
     * 退出操作
     */
    public static final int OPER_TYPE_LOGOFF = 2;
    /**
     * 新增操作
     */
    public static final int OPER_TYPE_ADD = 3;
    /**
     * 修改操作
     */
    public static final int OPER_TYPE_EDIT = 4;
    /**
     * 删除操作
     */
    public static final int OPER_TYPE_DEL = 5;
    /**
     * 查看操作
     */
    public static final int OPER_TYPE_LOOK = 6;
    /**
     * 上传操作
     */
    public static final int OPER_TYPE_UPLOAD = 7;
    /**
     * 其他操作
     */
    public static final int OPER_TYPE_OTHER = 8;
    /**
     * 下载操作
     */
    public static final int OPER_TYPE_DOWN = 9;
    /**
     * 入库操作
     */
    public static final int OPER_TYPE_INSTORAGE = 10;
    /**
     * 审批操作
     */
    public static final int OPER_TYPE_CHECKPASS = 11;

    @Autowired
    private PhoibeUserService phoibeUserService;
    private static LogUtil logUtil;

    @PostConstruct
    public void init() {
        logUtil = this;
        logUtil.phoibeUserService = this.phoibeUserService;
    }

    /**
     * @param msg      日志信息 例：浏览了{moduleName}下id为{id}的文档
     * @param operType 操作类型
     * @param element  {name}Controller.class
     * @param request
     */
    public static void writeLog(String msg, int operType, String moduleName, Class<?> element, HttpServletRequest request) {
        Logger logger = LoggerFactory.getLogger(element);
        String token = JwtUtil.getCookieValueByName(request, JwtUtil.HEADER_STRING);
        UserInfo userInfo = new UserInfo();
        if (token != null) {
            Long userId = Long.parseLong(JwtUtil.extractInfo(token).get(JwtUtil.USER_NAME).toString());
            userInfo = logUtil.phoibeUserService.fetchUserInfoByUserId(userId);
        }else{
            userInfo = (UserInfo) request.getAttribute("userInfo");
        }


        String logUserName = "";
        String ipAddr = getIpAddr(request);
        if (userInfo != null) {
            String userName = userInfo.getUserName();
            String nicknam = userInfo.getNickname();
            String realname = userInfo.getRealname();
            logUserName = userName + "-" + realname + "-" + nicknam;
        }
        Object[] objects = {ipAddr, operType, logUserName, moduleName};
        logger.info(msg, objects);
    }

    /**
     * 获取登录用户IP地址
     *
     * @param request
     * @return
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        //ExceptionLogUtil.infoLog("ip:"+ip);
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
            //ExceptionLogUtil.infoLog("Proxy-Client-IP:"+ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
            //ExceptionLogUtil.infoLog("WL-Proxy-Client-IP:"+ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
            //ExceptionLogUtil.infoLog("HTTP_CLIENT_IP:"+ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            //ExceptionLogUtil.infoLog("HTTP_X_FORWARDED_FOR:"+ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
            //ExceptionLogUtil.infoLog("RemoteAddr:"+ip);
        }
        if (ip.equals("0:0:0:0:0:0:0:1")) {
            ip = "本地";
        }
        return ip;
    }
}
