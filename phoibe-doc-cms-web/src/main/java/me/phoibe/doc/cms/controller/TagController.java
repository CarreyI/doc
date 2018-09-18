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
        pageParam.setStart(index * limit + 1);
        pageParam.setLimit(limit);
        pageParam.setParam(new PhoibeTag());
        pageParam.setOrderBy(orderBy);
        pageParam.setSort(sort);
        PageList<PhoibeTag> pageList = phoibeTagService.fetchTagByPageList(pageParam);
        return JsonUtils.toJson(new Result<PageList<PhoibeTag>>(Code.SUCCESS, pageList));
    }

    @PostMapping("/save")
    public String save(@ModelAttribute PhoibeTag phoibeTag){
        phoibeTagService.addTag(phoibeTag);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
}
