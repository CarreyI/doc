package me.phoibe.doc.cms.controller;

import jodd.util.URLDecoder;
import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.domain.dto.DLoggingEvent;
import me.phoibe.doc.cms.domain.po.LoggingEvent;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.LoggingEventService;
import me.phoibe.doc.cms.utils.DateUtils;
import me.phoibe.doc.cms.utils.ExcelUtil;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by carrey on 18-8-26.
 */
@RestController
@RequestMapping("phoibe/logging")
public class LoggingController {
    @Autowired
    private LoggingEventService loggingEventService;

    @Value("${exportlog}")
    private String exportlog;

    @PostMapping("/save")
    public String save(@RequestBody LoggingEvent loggingEvent){
        loggingEventService.addLogingEvent(loggingEvent);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @RequestMapping("list/{index}/{limit}")
    public String list(@ModelAttribute DLoggingEvent param,@PathVariable Integer index, @PathVariable Integer limit, HttpServletRequest request){
        PageParam<DLoggingEvent> pageParam = new PageParam<>();
        pageParam.setStart(index);
        pageParam.setLimit(limit);
        pageParam.setOrderBy("l.TIMESTMP");
        pageParam.setSort("DESC");
        pageParam.setParam(param);
        PageList<DLoggingEvent> pageList = loggingEventService.fetchLoggingEventByPageList(pageParam);
        LogUtil.writeLog("浏览了日志列表", LogUtil.OPER_TYPE_LOOK,"日志管理", LoginContorller.class,request);
        return JsonUtils.toJson(new Result<PageList<DLoggingEvent>>(Code.SUCCESS, pageList));
    }
    @DeleteMapping("delete")
    public String removeDocument(@RequestParam String idstr,HttpServletRequest request) {
        try {
            String [] ids = idstr.split(",");
            for(String id : ids) {
                loggingEventService.deleteByPrimaryKey(Long.parseLong(id));
            }
            LogUtil.writeLog("删除了Id为{"+idstr+"}的日志记录", LogUtil.OPER_TYPE_DEL,"日志管理", LoginContorller.class,request);
        } catch (Exception e) {
            JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }
    @RequestMapping("/backups")
    public String backupsSql(@ModelAttribute DLoggingEvent loggingEvent, HttpServletRequest request, HttpServletResponse response){
        String excelFIleName="";
        try {
            String sDatatime="";
            String eDatatime="";
            PageParam<DLoggingEvent> pageParam = new PageParam<>();
            pageParam.setStart(0);
            pageParam.setLimit(1000000000);
            pageParam.setOrderBy("l.TIMESTMP");
            pageParam.setSort("DESC");
            pageParam.setParam(loggingEvent);
            PageList<DLoggingEvent> pageList = loggingEventService.fetchLoggingEventByPageList(pageParam);
            StringBuilder logsub =new StringBuilder();
            logsub.append("/*");
            logsub.append("\r\n File Create Time：");
            logsub.append(DateUtils.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss"));
            logsub.append("\r\n Log Start Time：");
            logsub.append("\r\n Log End Time：");
            logsub.append("\r\n */");
            logsub.append("\r\n INSERT INTO \"LOGGING_EVENT\"");
            for (DLoggingEvent dLoggingEvent :pageList.getDataList()){
                logsub.append(dLoggingEvent.getFormattedMessage());
                logsub.append(dLoggingEvent.getArg0());
                logsub.append(LogUtil.convertorLogType(Integer.parseInt(dLoggingEvent.getArg1())));
                logsub.append(dLoggingEvent.getArg2());
                logsub.append(dLoggingEvent.getArg3());
                logsub.append(dLoggingEvent.getTimestmp()+"");

                if (sDatatime==""){
                    sDatatime = DateUtils.formatDate(new Date(dLoggingEvent.getEventId()),"yyyy-MM-dd");
                }
                eDatatime = DateUtils.formatDate(new Date(dLoggingEvent.getEventId()),"yyyy-MM-dd");
            }
            File filedir = new File(exportlog);
            if (!filedir.exists()) {
                filedir.mkdirs();
            }
            File file = new File(exportlog,excelFIleName);

            LogUtil.writeLog("导出了{"+sDatatime+" -- "+eDatatime+"}范围内的日志记录", LogUtil.OPER_TYPE_ADD,"日志管理", LoggingController.class,request);
        }catch (Exception e) {
            e.printStackTrace();
            JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, excelFIleName));
    }
    @RequestMapping("/export")
    public String exportLogExcel(@ModelAttribute DLoggingEvent loggingEvent, HttpServletRequest request, HttpServletResponse response){
        String excelFIleName="";
        try {
            String sDatatime="";
            String eDatatime="";
            PageParam<DLoggingEvent> pageParam = new PageParam<>();
            pageParam.setStart(0);
            pageParam.setLimit(1000000000);
            pageParam.setOrderBy("l.TIMESTMP");
            pageParam.setSort("DESC");
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

                if (sDatatime==""){
                    sDatatime = DateUtils.formatDate(new Date(dLoggingEvent.getEventId()),"yyyy-MM-dd");
                }
                eDatatime = DateUtils.formatDate(new Date(dLoggingEvent.getEventId()),"yyyy-MM-dd");
            }
            List<String> listTitle = new ArrayList<>();
            listTitle.add("日志内容");
            listTitle.add("IP");
            listTitle.add("操作类型");
            listTitle.add("用户名-昵称-真实姓名");
            listTitle.add("功能模块");
            listTitle.add("记录时间");
            excelFIleName= "日志信息记录表"+System.currentTimeMillis()+".xls";
            HSSFWorkbook wb =  ExcelUtil.getHSSFWorkbook(excelFIleName,listTitle,rowList,null);

            File filedir = new File(exportlog);
            if (!filedir.exists()) {
                filedir.mkdirs();
            }
            File file = new File(exportlog,excelFIleName);
            wb.write(file);
            LogUtil.writeLog("导出了{"+sDatatime+" -- "+eDatatime+"}范围内的日志记录", LogUtil.OPER_TYPE_ADD,"日志管理", LoggingController.class,request);
        }catch (Exception e) {
            e.printStackTrace();
            JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
        }
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, excelFIleName));
    }
    @RequestMapping("/exportDownload/{fileName}")
    public byte[] exportDownload(HttpServletResponse response,@PathVariable String fileName) {
        try {
            fileName = URLDecoder.decode(fileName,"UTF-8");
            String fileAbosultePath = exportlog + "/"+fileName+".xls";

            File file = new File(fileAbosultePath);
            String filename = file.getName();

            byte[]bytes=DocumentController.getContent(fileAbosultePath);
            response.setContentType("multipart/form-data");
            response.addHeader("Content-Disposition", "attachment;fileName="+new String(filename.getBytes("gbk"),"ISO8859-1"));
            return bytes;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    } @GetMapping("toJsonLogType")
    public String toJsonLogType() {
       return LogUtil.toJsonLogType();
    }
}
