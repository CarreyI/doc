package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.po.PhoibeDirectory;
import me.phoibe.doc.cms.domain.po.PhoibeDocDir;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeDirectoryService;
import me.phoibe.doc.cms.utils.JsonUtils;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String list(@PathVariable Long userId){
        List<PhoibeDirectory> phoibeDirectories = phoibeDirectoryService.fetchPhoibeDirectoryList(userId);
        return JsonUtils.toJson(new Result<List<PhoibeDirectory>>(Code.SUCCESS, phoibeDirectories));
    }

    @DeleteMapping("/remove/{dirId}")
    public String remove(@PathVariable Long dirId){
        phoibeDirectoryService.removeDirectory(dirId);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/save")
    public String save(@RequestBody PhoibeDirectory phoibeDirectory){
        phoibeDirectoryService.addDirectory(phoibeDirectory);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/update")
    public String update(@RequestBody PhoibeDirectory phoibeDirectory){
        phoibeDirectoryService.modifyDirectory(phoibeDirectory);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/move")
    public String move(@RequestBody PhoibeDocDir phoibeDocDir){
        phoibeDirectoryService.moveDirectory(phoibeDocDir);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }


}
