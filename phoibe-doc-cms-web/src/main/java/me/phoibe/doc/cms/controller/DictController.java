package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeDict;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeDictService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("phoibe/dict")
public class DictController {
    @Autowired
    private PhoibeDictService phoibeDictService;

    @GetMapping("/list/{start}/{limit}")
    public String list(@PathVariable Integer index, @PathVariable Integer limit,
                        @ModelAttribute PhoibeDict phoibeDict, HttpServletRequest request){
        PageParam<PhoibeDict> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setParam(phoibeDict == null ? new PhoibeDict() : phoibeDict);

        PageList<PhoibeDict> pageList = phoibeDictService.fetchByPage(pageParam);

        return JsonUtils.toJson(new Result<PageList<PhoibeDict>>(Code.SUCCESS, pageList));

    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable Long id){
        phoibeDictService.removeDict(id);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/add")
    public String add(@RequestBody PhoibeDict phoibeDict){
        phoibeDictService.addDict(phoibeDict);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/modify")
    public String modify(@RequestBody PhoibeDict phoibeDict){
        phoibeDictService.modifyDict(phoibeDict);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
}
