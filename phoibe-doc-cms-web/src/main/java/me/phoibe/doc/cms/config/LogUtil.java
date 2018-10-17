package me.phoibe.doc.cms.config;

import com.alibaba.fastjson.JSONObject;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeUserService;
import org.apache.commons.collections.map.HashedMap;
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
     * 登录
     */
    public static final int OPER_TYPE_LOGIN = 1;
    /**
     * 退出
     */
    public static final int OPER_TYPE_LOGOFF = 2;
    /**
     * 新增
     */
    public static final int OPER_TYPE_ADD = 3;
    /**
     * 修改
     */
    public static final int OPER_TYPE_EDIT = 4;
    /**
     * 删除
     */
    public static final int OPER_TYPE_DEL = 5;
    /**
     * 查看
     */
    public static final int OPER_TYPE_LOOK = 6;
    /**
     * 上传
     */
    public static final int OPER_TYPE_UPLOAD = 7;
    /**
     * 其他
     */
    public static final int OPER_TYPE_OTHER = 8;
    /**
     * 下载
     */
    public static final int OPER_TYPE_DOWN = 9;
    /**
     * 入库
     */
    public static final int OPER_TYPE_INSTORAGE = 10;
    /**
     * 审批
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
     * @param operType 类型
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
        } else {
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
    public static  String toJsonLogType(){
        Map<String, String> map = new HashedMap();
        map.put(OPER_TYPE_LOGIN+"", "登录");
        map.put(OPER_TYPE_LOGOFF+"", "退出");
        map.put(OPER_TYPE_ADD+"", "新增");
        map.put(OPER_TYPE_EDIT+"", "修改");
        map.put(OPER_TYPE_DEL+"", "删除");
        map.put(OPER_TYPE_LOOK+"", "查看");
        map.put(OPER_TYPE_UPLOAD+"", "上传");
        map.put(OPER_TYPE_OTHER+"", "其它");
        map.put(OPER_TYPE_DOWN+"", "下载");
        map.put(OPER_TYPE_INSTORAGE+"", "入库");
        map.put(OPER_TYPE_CHECKPASS+"", "审批");

        return JSONObject.toJSONString(map);
    }
    public static  String convertorLogType(int type) {

        String typeName = "";
        switch (type) {
            case OPER_TYPE_LOGIN:
                typeName = "登录";
                break;
            case OPER_TYPE_LOGOFF:
                typeName = "退出";
                break;
            case OPER_TYPE_ADD:
                typeName = "新增";
                break;
            case OPER_TYPE_EDIT:
                typeName = "修改";
                break;
            case OPER_TYPE_DEL:
                typeName = "删除";
                break;
            case OPER_TYPE_LOOK:
                typeName = "查看";
                break;
            case OPER_TYPE_UPLOAD:
                typeName = "上传";
                break;
            case OPER_TYPE_OTHER:
                typeName = "其它";
                break;
            case OPER_TYPE_DOWN:
                typeName = "下载";
                break;
            case OPER_TYPE_INSTORAGE:
                typeName = "入库";
                break;
            case OPER_TYPE_CHECKPASS:
                typeName = "审批";
                break;
        }
        return typeName;
    }

}
