package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.dto.DPhoebeDocument;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.*;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeUserPostilService;
import me.phoibe.doc.cms.service.PhoibeUserService;
import me.phoibe.doc.cms.utils.JsonUtils;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import me.phoibe.doc.cms.config.LogUtil;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequestMapping("/phoibe/userPostil")
public class UserPostilController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DocumentController.class);

    @Autowired
    private PhoibeUserPostilService phoibeUserPostilService;

    @Autowired
    private PhoibeUserService phoibeUserService;

    @Value("${breakpoint.upload.window}")
    private String window;
    @Value("${breakpoint.upload.linux}")
    private String linux;
    @Value("${breakpoint.upload.status}")
    private String status;

    private Long getUserId(HttpServletRequest request){
        String token = JwtUtil.getCookieValueByName(request,JwtUtil.HEADER_STRING);
        Long userId = Long.parseLong(JwtUtil.extractInfo(token).get(JwtUtil.USER_NAME).toString());
        return userId;
    }
            @RequestMapping(value = { "insertPostil" })
    public String insertUserPostil(@ModelAttribute PhoibeUserPostil phoibeUserPostil, MultipartFile file){

        String finalDirPath="";
        if(status.equals("1")) {
            finalDirPath = window;
        }else {
            finalDirPath = linux;
        }

        if(file.isEmpty()){
            return JsonUtils.toJson(new Result<>(Code.FAILED, "文件是空的"));
        }
        String fileName = file.getOriginalFilename();
        int size = (int) file.getSize();
        phoibeUserPostil.setDocName(fileName);
        phoibeUserPostil.setFileSize(size);

        String relPath = finalDirPath + "/" + fileName;
        File dest = new File(relPath);
        phoibeUserPostil.setDocPath(relPath);
        if(!dest.getParentFile().exists()){ //判断文件父目录是否存在
            dest.getParentFile().mkdir();
        }
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();

            return JsonUtils.toJson(new Result<>(Code.FAILED, "文件是空的"));
        }
        boolean result = phoibeUserPostilService.insertUserPostil(phoibeUserPostil);
        if (result){
            return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
        }else{
            return JsonUtils.toJson(new Result<>(Code.FAILED, "上传批注失败"));
        }

    }

    @GetMapping(value = {"getPostil/{userId}"})
    public String getUserPostil(@PathVariable Integer userId){
        List<PhoibeUserPostil> result = phoibeUserPostilService.selectUserPostil(userId);
        return JsonUtils.toJson(new Result<List<PhoibeUserPostil>>(Code.SUCCESS, result));
    }

    @RequestMapping("completeSave/{id}")
    @ResponseBody
    public String completeSave(@PathVariable Integer id,HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            int result =1;

            if (result > 0) {
                resultMap.put("success", true);
                resultMap.put("dId", result);
                //LogUtil.writeLog("Id为{"+phoibeDocument.getId()+"}的文档上传完成", LogUtil.OPER_TYPE_ADD,"个人文档", DocumentController.class,request);
            } else {
                resultMap.put("success", false);
            }

        } catch (Exception e) {
            // TODO: handle exception
            //LogUtil.writeLog("Id为{"+id+"}的文档上传失败，请重新上传", LogUtil.OPER_TYPE_OTHER,"文档管理", DocumentController.class,request);
            e.printStackTrace();
            resultMap.put("success", false);
        }
        return JsonUtils.toJson(resultMap);
    }

    @GetMapping("list/{index}/{limit}")
    public String listUserPostil(@PathVariable Integer index, @PathVariable Integer limit, @ModelAttribute PhoibeUserPostil param, HttpServletRequest request) {

        PageParam<PhoibeUserPostil> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setParam(param == null ? new PhoibeUserPostil() : param);

        //if(!StringUtils.isEmpty(param.getContentStr())){
            Long userId = getUserId(request);
            PhoibeSearch phoibeSearch = new PhoibeSearch();
            if(param.getUserId()>0)
            phoibeSearch.setUserId(userId);

        PageList<PhoibeUserPostil> list = phoibeUserPostilService.fetchUserPostilList(pageParam);
        LogUtil.writeLog("浏览了批注", LogUtil.OPER_TYPE_LOOK,"批注", DocumentController.class,request);
        return JsonUtils.toJson(new Result<PageList<PhoibeUserPostil>>(Code.SUCCESS, list));
    }

    @RequestMapping(value = { "save" })
    public String saveOrUpdate(@RequestBody Map rb, HttpServletRequest request) {

        UserInfo userInfo = phoibeUserService.fetchUserInfoByUserId(getUserId(request));

        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            request.setCharacterEncoding("UTF-8");

            Map<String, Object> map = null;
            String filemd5 = (String) rb.get("filemd5");
            String filename = (String) rb.get("filename");
            String fileext = (String) rb.get("fileext");
            int fileSize = (int)rb.get("filesize");
            String div_file_id = (String) rb.get("div_file_id");
            String docid = (String) rb.get("docId");
            PhoibeUserPostil dm = new PhoibeUserPostil();
            dm.setDocPath(filemd5+"/"+filename);
            dm.setDocId(Integer.parseInt(docid));
            dm.setProgress((short) (20));

            dm.setDocName(filename);
            dm.setFileSize(fileSize);
            dm.setCreateTime(new Date());
            dm.setUserId(userInfo.getId());
            dm.setUserName(userInfo.getUserName());
            boolean result = phoibeUserPostilService.insertUserPostil(dm);
            if(result) {
                resultMap.put("success", true);
                resultMap.put("dId", dm.getId());
                resultMap.put("div_file_id", div_file_id);
            }
            else{
                resultMap.put("success", false);
            }
        }
        catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            resultMap.put("success", false);
        }
        LOGGER.info(JsonUtils.toJson(resultMap));
        return JsonUtils.toJson(resultMap);
    }

}
