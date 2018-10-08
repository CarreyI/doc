package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.dto.DLoggingEvent;
import me.phoibe.doc.cms.domain.po.LoggingEvent;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.LoggingEventService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by carrey on 18-8-26.
 */
@RestController
@RequestMapping("phoibe/logging")
public class LoggingController {
    @Autowired
    private LoggingEventService loggingEventService;

    @PostMapping("/save")
    public String save(@RequestBody LoggingEvent loggingEvent){
        loggingEventService.addLogingEvent(loggingEvent);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @RequestMapping("list/{index}/{limit}")
    public String list(@PathVariable Integer index, @PathVariable Integer limit, HttpServletRequest request){
        PageParam<LoggingEvent> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setOrderBy("l.TIMESTMP");
        pageParam.setSort("DESC");
        LoggingEvent loggingEvent = new LoggingEvent();
        pageParam.setParam(loggingEvent);
        PageList<DLoggingEvent> pageList = loggingEventService.fetchLoggingEventByPageList(pageParam);
        LogUtil.writeLog("浏览了日志列表", LogUtil.OPER_TYPE_ADD,"日志管理", LoginContorller.class,request);
        return JsonUtils.toJson(new Result<PageList<DLoggingEvent>>(Code.SUCCESS, pageList));
    }
    @DeleteMapping("delete/{id}")
    public String removeDocument(@PathVariable Integer id,HttpServletRequest request) {
        try {
            loggingEventService.deleteByPrimaryKey(id.longValue());
        } catch (Exception e) {
            JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }
        LogUtil.writeLog("删除了Id为{"+id+"}的日志记录", LogUtil.OPER_TYPE_ADD,"日志管理", LoginContorller.class,request);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
}
