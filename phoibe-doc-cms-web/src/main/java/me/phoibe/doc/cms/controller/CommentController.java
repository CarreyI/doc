package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.dto.DPhoibeComment;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeComment;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeCommentService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by carrey on 18-8-26.
 */
@RestController
@RequestMapping("phoibe/comment")
public class CommentController {
    @Autowired
    private PhoibeCommentService phoibeCommentService;

    @RequestMapping(value = {"save"})
    public String save(@RequestBody PhoibeComment phoibeComment){
        phoibeCommentService.addComment(phoibeComment);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @RequestMapping("list/{docId}/{index}/{limit}")
    public String listComment(@PathVariable Integer index,@PathVariable Integer limit,@PathVariable Long docId){
        PageParam<PhoibeComment> pageParam = new PageParam<>();
        pageParam.setStart(index * limit + 1);
        pageParam.setLimit(limit);
        pageParam.setOrderBy("c.UPDATE_TIME");
        pageParam.setSort("DESC");
        PhoibeComment phoibeComment = new PhoibeComment();
        phoibeComment.setDocumentId(docId);
        pageParam.setParam(phoibeComment);
        PageList<DPhoibeComment> pageList = phoibeCommentService.fetchCommentByPageList(pageParam);
        return JsonUtils.toJson(new Result<PageList<DPhoibeComment>>(Code.SUCCESS, pageList));
    }
    @RequestMapping("list/{index}/{limit}")
    public String list(@PathVariable Integer index,@PathVariable Integer limit){
        PageParam<PhoibeComment> pageParam = new PageParam<>();
        pageParam.setStart(index * limit + 1);
        pageParam.setLimit(limit);
        pageParam.setOrderBy("c.UPDATE_TIME");
        pageParam.setSort("DESC");
        PhoibeComment phoibeComment = new PhoibeComment();
        pageParam.setParam(phoibeComment);
        PageList<DPhoibeComment> pageList = phoibeCommentService.fetchCommentByPageList(pageParam);
        return JsonUtils.toJson(new Result<PageList<DPhoibeComment>>(Code.SUCCESS, pageList));
    }

}
