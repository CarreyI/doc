package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.po.PhoibeUserPostil;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeUserPostilService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/phoibe/userPostil")
public class UserPostilController {
    @Autowired
    private PhoibeUserPostilService phoibeUserPostilService;
    @Value("${breakpoint.upload.window}")
    private String window;
    @Value("${breakpoint.upload.linux}")
    private String linux;
    @Value("${breakpoint.upload.status}")
    private String status;

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
}
