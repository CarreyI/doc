package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.po.PhoibeDirectory;
import me.phoibe.doc.cms.domain.po.PhoibeDocDir;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeDirectoryService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


/**
 * Test
 */
@RestController
@RequestMapping("phoibe/directory")
public class DirectoryController {
    @Autowired
    private PhoibeDirectoryService phoibeDirectoryService;

    @GetMapping("/list/{userId}")
    public String list(@PathVariable Long userId,HttpServletRequest request){
        List<PhoibeDirectory> phoibeDirectories = phoibeDirectoryService.fetchPhoibeDirectoryList(userId);
        LogUtil.writeLog("浏览了个人目录记录", LogUtil.OPER_TYPE_LOOK,"个人目录", DictController.class,request);
        return JsonUtils.toJson(new Result<List<PhoibeDirectory>>(Code.SUCCESS, phoibeDirectories));
    }

    @DeleteMapping("/remove/{dirId}")
    public String remove(@PathVariable Long dirId,HttpServletRequest request){
        phoibeDirectoryService.removeDirectory(dirId);
        LogUtil.writeLog("删除了id为{"+dirId+"}的个人目录", LogUtil.OPER_TYPE_DEL,"个人目录", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/save")
    public String save(@RequestBody PhoibeDirectory phoibeDirectory,HttpServletRequest request){
        phoibeDirectoryService.addDirectory(phoibeDirectory);
        LogUtil.writeLog("新增了名称为{"+phoibeDirectory.getDirName()+"}的个人目录", LogUtil.OPER_TYPE_ADD,"个人目录", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/update")
    public String update(@RequestBody PhoibeDirectory phoibeDirectory,HttpServletRequest request){
        phoibeDirectoryService.modifyDirectory(phoibeDirectory);
        LogUtil.writeLog("修改了名称为为{"+phoibeDirectory.getDirName()+"}的个人目录", LogUtil.OPER_TYPE_EDIT,"个人目录", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/move")
    public String move(@RequestBody PhoibeDocDir phoibeDocDir, HttpServletRequest request){
        phoibeDirectoryService.moveDirectory(phoibeDocDir);
        LogUtil.writeLog("移动了文档id为{"+phoibeDocDir.getDocumentId()+"}到个人目录", LogUtil.OPER_TYPE_EDIT,"个人目录", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }


}
