package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
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

        LogUtil.writeLog("浏览了数据字典记录", LogUtil.OPER_TYPE_LOOK,"数据字典", DictController.class,request);
        return JsonUtils.toJson(new Result<PageList<PhoibeDict>>(Code.SUCCESS, pageList));

    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable Long id, HttpServletRequest request){
        phoibeDictService.removeDict(id);
        LogUtil.writeLog("浏览了数据字典记录", LogUtil.OPER_TYPE_DEL,"数据字典", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/add")
    public String add(@RequestBody PhoibeDict phoibeDict, HttpServletRequest request){
        phoibeDictService.addDict(phoibeDict);
        LogUtil.writeLog("标示为{"+phoibeDict.getGroupKey()+"}字段新增了名为：{"+phoibeDict.getDictName()+"}的子项", LogUtil.OPER_TYPE_ADD,"数据字典", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @PostMapping("/modify")
    public String modify(@RequestBody PhoibeDict phoibeDict, HttpServletRequest request){
        phoibeDictService.modifyDict(phoibeDict);
        LogUtil.writeLog("修改了{"+phoibeDict.getGroupKey()+"}字段字典记录", LogUtil.OPER_TYPE_EDIT,"数据字典", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
}
