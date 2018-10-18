package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeTag;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeTagService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/phoibe/tag")
public class TagController {

    @Autowired
    private PhoibeTagService phoibeTagService;

    @GetMapping("/list/{index}/{limit}")
    public String list(@PathVariable Integer index, @PathVariable Integer limit, @ModelAttribute PhoibeTag param,HttpServletRequest request){
        String orderBy = "ORDER_BY";
        String sort = "ASC";
        PageParam<PhoibeTag> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setParam(param == null ? new PhoibeTag() : param);
        pageParam.setOrderBy(orderBy);
        pageParam.setSort(sort);
        PageList<PhoibeTag> pageList = phoibeTagService.fetchTagByPageList(pageParam);
        LogUtil.writeLog("浏览了标签列表", LogUtil.OPER_TYPE_LOOK,"标签管理",TagController.class,request);
        return JsonUtils.toJson(new Result<PageList<PhoibeTag>>(Code.SUCCESS, pageList));
    }

    @RequestMapping(value = {"save"})
    public String save(@RequestBody PhoibeTag phoibeTag, HttpServletRequest request){
        phoibeTagService.addTag(phoibeTag);
        LogUtil.writeLog("新增了标签", LogUtil.OPER_TYPE_ADD,"标签管理",TagController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
    @RequestMapping(value = {"update"})
    public String update(@RequestBody PhoibeTag phoibeTag, HttpServletRequest request){
        phoibeTagService.updateByPrimaryKeySelective(phoibeTag);
        LogUtil.writeLog("修改了标签", LogUtil.OPER_TYPE_EDIT,"标签管理",TagController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
    @DeleteMapping("/remove")
    public String remove(@RequestParam String idstr,HttpServletRequest request){
        String [] ids = idstr.split(",");
        for(String id : ids) {
            phoibeTagService.deleteByPrimaryKey(Short.parseShort(id));
        }
        LogUtil.writeLog("删除了Id为{"+idstr+"}的标签记录", LogUtil.OPER_TYPE_DEL,"标签管理",UserController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
    @GetMapping("fetch/{id}")
    public String getUser(@PathVariable Integer id,HttpServletRequest request) {

        PhoibeTag tag = phoibeTagService.selectByPrimaryKey(id.shortValue());

        LogUtil.writeLog("浏览了Id为{"+id+"}的标签信息", LogUtil.OPER_TYPE_LOOK,"标签管理",UserController.class,request);
        return JsonUtils.toJson(new Result<PhoibeTag>(Code.SUCCESS, tag));

    }
}
