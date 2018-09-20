package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeTag;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeTagService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phoibe/tag")
public class TagController {

    @Autowired
    private PhoibeTagService phoibeTagService;

    @GetMapping("/list/{index}/{limit}")
    public String list(@PathVariable Integer index, @PathVariable Integer limit){
        String orderBy = "CREATE_TIME";
        String sort = "DESC";
        PageParam<PhoibeTag> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setParam(new PhoibeTag());
        pageParam.setOrderBy(orderBy);
        pageParam.setSort(sort);
        PageList<PhoibeTag> pageList = phoibeTagService.fetchTagByPageList(pageParam);
        return JsonUtils.toJson(new Result<PageList<PhoibeTag>>(Code.SUCCESS, pageList));
    }

    @RequestMapping(value = {"save"})
    public String save(@RequestBody PhoibeTag phoibeTag){
        phoibeTagService.addTag(phoibeTag);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
}
