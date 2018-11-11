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
import java.util.UUID;

@RestController
@RequestMapping("phoibe/dict")
public class DictController {
    @Autowired
    private PhoibeDictService phoibeDictService;

    @GetMapping("/list/{index}/{limit}/{flag}")
    public String list(@PathVariable Integer index, @PathVariable Integer limit,@PathVariable Integer flag,
                        @ModelAttribute PhoibeDict phoibeDict, HttpServletRequest request){
        PageParam<PhoibeDict> pageParam = new PageParam<>();
        String orderBy="id";
        String sort="DESC";
        if (flag==1){
            orderBy = "order_by";
            sort = "ASC";
        }
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setOrderBy(orderBy);
        pageParam.setSort(sort);
        pageParam.setParam(phoibeDict == null ? new PhoibeDict() : phoibeDict);

        PageList<PhoibeDict> pageList = phoibeDictService.fetchByPage(pageParam);
        if(phoibeDict.getDictType()==2){
            LogUtil.writeLog("浏览了数据字典记录", LogUtil.OPER_TYPE_LOOK,"数据字典", DictController.class,request);
        }
        return JsonUtils.toJson(new Result<PageList<PhoibeDict>>(Code.SUCCESS, pageList));

    }

    @DeleteMapping("remove")
    public String remove(@RequestParam String idstr,  HttpServletRequest request){

        String [] ids = idstr.split(",");
        for(String id : ids){
            phoibeDictService.removeDict(Long.valueOf(id));
        }
        LogUtil.writeLog("删除了id为{"+idstr+"}字典数据记录", LogUtil.OPER_TYPE_DEL,"数据字典", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
    @DeleteMapping("/removekey")
    public String removeByGroupKey(@RequestParam String groupKey, HttpServletRequest request){
        phoibeDictService.removeDictByGroupKey(groupKey);
        LogUtil.writeLog("删除了字段标识为{"+groupKey+"}字典数据记录", LogUtil.OPER_TYPE_DEL,"数据字典", DictController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
    @PostMapping("/add")
    public String add(@RequestBody PhoibeDict phoibeDict, HttpServletRequest request){
        phoibeDict.setDictKey(UUID.randomUUID().toString().substring(0,10));
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
