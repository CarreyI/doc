package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.dto.DLoggingEvent;
import me.phoibe.doc.cms.domain.po.LoggingEvent;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.LoggingEventService;
import me.phoibe.doc.cms.utils.ExcelUtil;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

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
        LogUtil.writeLog("浏览了日志列表", LogUtil.OPER_TYPE_LOOK,"日志管理", LoginContorller.class,request);
        return JsonUtils.toJson(new Result<PageList<DLoggingEvent>>(Code.SUCCESS, pageList));
    }
    @DeleteMapping("delete/{id}")
    public String removeDocument(@PathVariable Integer id,HttpServletRequest request) {
        try {
            loggingEventService.deleteByPrimaryKey(id.longValue());
            LogUtil.writeLog("删除了Id为{"+id+"}的日志记录", LogUtil.OPER_TYPE_DEL,"日志管理", LoginContorller.class,request);
        } catch (Exception e) {
            JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @RequestMapping("/export")
    public void exportLogExcel(HttpServletRequest request, HttpServletResponse response){
        try {
            Long sDatatime = Long.valueOf(request.getParameter("sDatatime"));
            Long eDatatime = Long.valueOf(request.getParameter("eDatatime"));
            PageParam<LoggingEvent> pageParam = new PageParam<>();
            pageParam.setStart(0);
            pageParam.setLimit(1000000000);
            pageParam.setOrderBy("l.TIMESTMP");
            pageParam.setSort("DESC");
            LoggingEvent loggingEvent = new LoggingEvent();
            pageParam.setParam(loggingEvent);
            PageList<DLoggingEvent> pageList = loggingEventService.fetchLoggingEventByPageList(pageParam);
            List<List<String>> rowList =new ArrayList<>();
            for (DLoggingEvent dLoggingEvent :pageList.getDataList()){
                List<String> stringList = new ArrayList<>();
                stringList.add(dLoggingEvent.getFormattedMessage());
                stringList.add(dLoggingEvent.getArg0());
                stringList.add(LogUtil.convertorLogType(Integer.parseInt(dLoggingEvent.getArg1())));
                stringList.add(dLoggingEvent.getArg2());
                stringList.add(dLoggingEvent.getArg3());
                stringList.add(dLoggingEvent.getTimestmp()+"");
                rowList.add(stringList);
            }
            List<String> listTitle = new ArrayList<>();
            listTitle.add("日志内容");
            listTitle.add("IP");
            listTitle.add("操作类型");
            listTitle.add("用户名-昵称-真实姓名");
            listTitle.add("功能模块");
            listTitle.add("记录时间");
            String excelFIleName= "日志信息记录表"+System.currentTimeMillis()+".xls";
            HSSFWorkbook wb =  ExcelUtil.getHSSFWorkbook(excelFIleName,listTitle,rowList,null);
            //响应到客户端
            this.setResponseHeader(response, excelFIleName);
            OutputStream os = response.getOutputStream();
            wb.write(os);
            os.flush();
            os.close();

            LogUtil.writeLog("导出了{"+sDatatime+" -- "+eDatatime+"}范围内的日志记录", LogUtil.OPER_TYPE_ADD,"日志管理", LoginContorller.class,request);
        }catch (Exception e) {
            e.printStackTrace();
            JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }
    }
    //发送响应流方法
    public void setResponseHeader(HttpServletResponse response, String fileName) {
        try {
            try {
                fileName = new String(fileName.getBytes(),"ISO8859-1");
            } catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            response.setContentType("application/octet-stream;charset=ISO8859-1");
            response.setHeader("Content-Disposition", "attachment;filename="+ fileName);
            response.addHeader("Pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");
            response.addHeader("Content-Type", "text/html; charset=utf-8");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
