package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.dto.DPhoibeComment;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeComment;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeCommentService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by carrey on 18-8-26.
 */
@RestController
@RequestMapping("phoibe/comment")
public class CommentController {
    @Autowired
    private PhoibeCommentService phoibeCommentService;

    @PostMapping("/save")
    public String save(@RequestBody PhoibeComment phoibeComment, HttpServletRequest request){
        phoibeCommentService.addComment(phoibeComment);
        long documentId = phoibeComment.getDocumentId();
        LogUtil.writeLog("对Id为{"+documentId+"}的文档进行留言评论", LogUtil.OPER_TYPE_ADD,"文档评论",CommentController.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @RequestMapping("list/{docId}/{index}/{limit}")
    public String listComment(@PathVariable Integer index, @PathVariable Integer limit, @PathVariable Long docId, HttpServletRequest request){
        PageParam<PhoibeComment> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setOrderBy("c.UPDATE_TIME");
        pageParam.setSort("DESC");
        PhoibeComment phoibeComment = new PhoibeComment();
        phoibeComment.setDocumentId(docId);
        pageParam.setParam(phoibeComment);
        PageList<DPhoibeComment> pageList = phoibeCommentService.fetchCommentByPageList(pageParam);
        LogUtil.writeLog("浏览了文档Id为{"+docId+"}的评论信息", LogUtil.OPER_TYPE_LOOK,"文档评论",CommentController.class,request);
        return JsonUtils.toJson(new Result<PageList<DPhoibeComment>>(Code.SUCCESS, pageList));
    }
    @RequestMapping("list/{index}/{limit}")
    public String list(@PathVariable Integer index,@PathVariable Integer limit, HttpServletRequest request){
        PageParam<PhoibeComment> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setOrderBy("c.UPDATE_TIME");
        pageParam.setSort("DESC");
        PhoibeComment phoibeComment = new PhoibeComment();
        pageParam.setParam(phoibeComment);
        PageList<DPhoibeComment> pageList = phoibeCommentService.fetchCommentByPageList(pageParam);

        LogUtil.writeLog("浏览了评论信息", LogUtil.OPER_TYPE_LOOK,"评论管理",CommentController.class,request);
        return JsonUtils.toJson(new Result<PageList<DPhoibeComment>>(Code.SUCCESS, pageList));
    }

}
