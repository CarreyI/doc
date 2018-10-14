package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.config.LogUtil;
import me.phoibe.doc.cms.dao.PhoibeDocumentMapper;
import me.phoibe.doc.cms.domain.dto.DPhoebeDocument;
import me.phoibe.doc.cms.domain.dto.DPhoibeUser;
import me.phoibe.doc.cms.domain.dto.DStatistical;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.*;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.security.JwtUtil;
import me.phoibe.doc.cms.service.PhoibeDocumentService;
import me.phoibe.doc.cms.service.PhoibeSearchService;
import me.phoibe.doc.cms.service.PhoibeUserService;
import me.phoibe.doc.cms.utils.JsonUtils;
import me.phoibe.doc.cms.utils.PlatDateTimeUtil;

import me.phoibe.doc.cms.utils.Word2PdfUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.annotation.Resource;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author pc
 * @Title: PhoibeDocumentController
 * @Description: 文档管理Controller
 * @date 2018/8/231:01
 */
@RestController
@RequestMapping("phoibe/document")
public class DocumentController {

	private static final Logger LOGGER = LoggerFactory.getLogger(DocumentController.class);
	@Autowired
	private PhoibeDocumentService phoibeDocumentService;
	@Resource
	private PhoibeDocumentMapper phoibeDocumentMapper;

	@Autowired
	private PhoibeUserService phoibeUserService;

	@Autowired
	private PhoibeSearchService phoibeSearchService;

	@Value("${breakpoint.upload.window}")
	private String window;
	@Value("${breakpoint.upload.linux}")
	private String linux;
	@Value("${breakpoint.upload.status}")
	private String status;

	private Long getUserId(HttpServletRequest request){
		String token = JwtUtil.getCookieValueByName(request,JwtUtil.HEADER_STRING);
		Long userId = Long.parseLong(JwtUtil.extractInfo(token).get(JwtUtil.USER_NAME).toString());
		return userId;
	}
	
	@GetMapping("list/{index}/{limit}")
	public String listDoucument(@PathVariable Integer index, @PathVariable Integer limit,
			@RequestParam(required = false) String f, @ModelAttribute DPhoebeDocument param,HttpServletRequest request) {
		String orderBy = "CREATE_TIME";
		String sort = "DESC";

		if(!StringUtils.isEmpty(f)) {
			switch (f) {
				case "handpick": {
					orderBy = "SCORE";
					param.setQueryFlag("handpick");
					break;
				}
				case "audit": {
					orderBy = "AUDIT_TIME";
					sort = "DESC nulls last";
					break;
				}
				case "storage": {
					orderBy = "STOCK_TIME";
					sort = "DESC nulls last";
					break;
				}


			}
		}
		Long userId = getUserId(request);
		if(!StringUtils.isEmpty(param.getName())){
			PhoibeSearch phoibeSearch = new PhoibeSearch();
			phoibeSearch.setUserId(userId);
			phoibeSearch.setSearchContent(param.getName());
			phoibeSearchService.addSearch(phoibeSearch);
		}

		if(!StringUtils.isEmpty(param.getQueryFlag())){

			param.setQueryUserId(userId);
		}

		if(param != null && !StringUtils.isEmpty(param.getFormat())){
			String formatStr = "(";
			String [] format = param.getFormat().split(",");
			for(String str : format){
				formatStr += "'"+str+"',";
			}
			formatStr = formatStr.substring(0,formatStr.length()-1)+")";
			param.setFormat(formatStr);
		}
		PageParam<DPhoebeDocument> pageParam = new PageParam<>();
		pageParam.setStart(index);
		pageParam.setLimit(limit);
		pageParam.setParam(param == null ? new DPhoebeDocument() : param);
		pageParam.setOrderBy(orderBy);
		pageParam.setSort(sort);

		PageList<DPhoebeDocument> pageList = phoibeDocumentService.fetchDocumentByPageList(pageParam);

		LogUtil.writeLog("查询浏览了文档记录", LogUtil.OPER_TYPE_LOOK,"文档查询", DocumentController.class,request);
		return JsonUtils.toJson(new Result<PageList<DPhoebeDocument>>(Code.SUCCESS, pageList));
	}

	@GetMapping("list/browse/{index}/{limit}")
	public String listBrowse(@PathVariable Integer index, @PathVariable Integer limit,@ModelAttribute DPhoebeDocument param,HttpServletRequest request) {
		String orderBy = "b.CREATE_TIME";
		String sort = "DESC";


		Long userId = getUserId(request);
		param.setQueryUserId(userId);
		param.setQueryFlag("browse");

		if(param != null && !StringUtils.isEmpty(param.getFormat())){
			String formatStr = "(";
			String [] format = param.getFormat().split(",");
			for(String str : format){
				formatStr += "'"+str+"',";
			}
			formatStr = formatStr.substring(0,formatStr.length()-1)+")";
			param.setFormat(formatStr);
		}
		PageParam<DPhoebeDocument> pageParam = new PageParam<>();
		pageParam.setStart(index);
		pageParam.setLimit(limit);
		pageParam.setParam(param == null ? new DPhoebeDocument() : param);
		pageParam.setOrderBy(orderBy);
		pageParam.setSort(sort);

		PageList<DPhoebeDocument> pageList = phoibeDocumentService.fetchJoinDocumentByPageList(pageParam);

		LogUtil.writeLog("浏览了文档浏览记录", LogUtil.OPER_TYPE_LOOK,"文档查询", DocumentController.class,request);
		return JsonUtils.toJson(new Result<PageList<DPhoebeDocument>>(Code.SUCCESS, pageList));
	}

	@GetMapping("list/collection/{index}/{limit}")
	public String listCollection(@PathVariable Integer index, @PathVariable Integer limit,@ModelAttribute DPhoebeDocument param,HttpServletRequest request) {
		String orderBy = "c.CREATE_TIME";
		String sort = "DESC";


		Long userId = getUserId(request);
		param.setQueryUserId(userId);
		param.setQueryFlag("collection");

		if(param != null && !StringUtils.isEmpty(param.getFormat())){
			String formatStr = "(";
			String [] format = param.getFormat().split(",");
			for(String str : format){
				formatStr += "'"+str+"',";
			}
			formatStr = formatStr.substring(0,formatStr.length()-1)+")";
			param.setFormat(formatStr);
		}
		PageParam<DPhoebeDocument> pageParam = new PageParam<>();
		pageParam.setStart(index);
		pageParam.setLimit(limit);
		pageParam.setParam(param == null ? new DPhoebeDocument() : param);
		pageParam.setOrderBy(orderBy);
		pageParam.setSort(sort);

		PageList<DPhoebeDocument> pageList = phoibeDocumentService.fetchJoinDocumentByPageList(pageParam);

		LogUtil.writeLog("浏览了收藏的文档记录", LogUtil.OPER_TYPE_LOOK,"文档查询", DocumentController.class,request);
		return JsonUtils.toJson(new Result<PageList<DPhoebeDocument>>(Code.SUCCESS, pageList));
	}


	@GetMapping("list/user/{index}/{limit}")
	public String listDoucumentUser(@PathVariable Integer index, @PathVariable Integer limit,@ModelAttribute DPhoebeDocument param,HttpServletRequest request) {

		PageParam<DPhoebeDocument> pageParam = new PageParam<>();
		pageParam.setStart(index);
		pageParam.setLimit(limit);
		pageParam.setParam(param == null ? new DPhoebeDocument() : param);

		List<DPhoebeDocument> list = phoibeDocumentService.fetchDocumentUserList(pageParam);
		LogUtil.writeLog("浏览了个人文档", LogUtil.OPER_TYPE_LOOK,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<List<DPhoebeDocument>>(Code.SUCCESS, list));
	}

	@GetMapping("fetch/{id}")
	public String getDoucument(@PathVariable Long id,HttpServletRequest request) {

		DPhoebeDocument dPhoibeDocument = phoibeDocumentService.fetchDocumentById(id);

		PhoibeCollection phoibeCollection = new PhoibeCollection();
		phoibeCollection.setDocumentId(id);
		phoibeCollection.setUserId(getUserId(request));
		dPhoibeDocument.setCollection(phoibeDocumentService.checkCollection(phoibeCollection));

		Long userId = getUserId(request);
		PhoibeBrowse phoibeBrowse = new PhoibeBrowse();
		phoibeBrowse.setDocumentId(id);
		phoibeBrowse.setUserId(userId);
		phoibeDocumentService.browse(phoibeBrowse);
		LogUtil.writeLog("浏览了id为{"+id+"}的文档", LogUtil.OPER_TYPE_LOOK,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<DPhoebeDocument>(Code.SUCCESS, dPhoibeDocument));

	}

	@GetMapping("count")
	public String countDoucument(@ModelAttribute DPhoebeDocument param) {
		PageParam<DPhoebeDocument> pageParam = new PageParam<>();
		pageParam.setParam(param == null ? new DPhoebeDocument() : param);
		Long count = phoibeDocumentMapper.selectCountByPage(pageParam);

		return JsonUtils.toJson(new Result<>(Code.SUCCESS, count));
	}

	 @DeleteMapping("delete")
	public String removeDocument(@RequestParam String idstr, HttpServletRequest request) {
		try {
			String [] ids = idstr.split(",");
			for(String id : ids){
				phoibeDocumentService.removeDocumentById(Integer.parseInt(id));
			}

		} catch (Exception e) {
			JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
		}
		 LogUtil.writeLog("删除了id为{"+idstr+"}的文档", LogUtil.OPER_TYPE_LOOK,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
	}

	@RequestMapping(value = { "save" })
	public String saveOrUpdate(@RequestBody Map rb, HttpServletRequest request) {

		UserInfo userInfo = phoibeUserService.fetchUserInfoByUserId(getUserId(request));

		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			request.setCharacterEncoding("UTF-8");

			Map<String, Object> map = null;
			String filemd5 = (String) rb.get("filemd5");
			String filename = (String) rb.get("filename");
			String fileext = (String) rb.get("fileext");
			String fileSize = rb.get("filesize")+"";
			String div_file_id = (String) rb.get("div_file_id");
			
			
			PhoibeDocument phoibeDocument = new PhoibeDocument();
			phoibeDocument.setName((String) rb.get("name"));
			phoibeDocument.setWarstate((String) rb.get("warcountry"));
			
			String combat_type =(String)rb.get("combat_type");
			combat_type = combat_type.replaceAll(" ", "");
			phoibeDocument.setCombatType(Short.parseShort(combat_type));
			
			String srms =(String)rb.get("arms");
			srms = srms.replaceAll(" ", "");
			phoibeDocument.setArms(Short.parseShort(srms));
			
			phoibeDocument.setWaraddr((String) rb.get("waraddr"));
			phoibeDocument.setWartime(PlatDateTimeUtil.formatStr((String) rb.get("wartime"),"YYYY-MM-DD"));
			phoibeDocument.setWinner((String) rb.get("winner"));
			phoibeDocument.setLoser((String) rb.get("loser"));
			phoibeDocument.setWarnum((String) rb.get("warnum"));
			phoibeDocument.setDescription((String) rb.get("description"));
			phoibeDocument.setAuditStatus((short) (1));
			phoibeDocument.setAuditUserId(1l);

			phoibeDocument.setFileSize(new BigDecimal(fileSize));
			phoibeDocument.setFilePath(filemd5+"/"+filename);
			phoibeDocument.setFormat(fileext);
			phoibeDocument.setProgress((short) (20));
			
			phoibeDocument.setScore(new BigDecimal(0));
			phoibeDocument.setTag((String) rb.get("tagId"));
			phoibeDocument.setUpdateTime(new Date());
			phoibeDocument.setUserId(userInfo.getId());
			phoibeDocument.setUserRealName(userInfo.getRealname());
			phoibeDocument.setStatus((short) (101));//上传中
			phoibeDocument.setCreateTime(new Date());
			short pc = (short) (1 + Math.random() * (10 - 1 + 1));
			phoibeDocument.setPagecount(pc);

			int result = phoibeDocumentService.save_v2(phoibeDocument);

			BeanUtils.copyProperties(request, phoibeDocument);
			if (result > 0) {
				resultMap.put("success", true);
				resultMap.put("dId", phoibeDocument.getId());
				resultMap.put("div_file_id", div_file_id);
				LogUtil.writeLog("Id为{"+phoibeDocument.getId()+"}的文档正在上传", LogUtil.OPER_TYPE_ADD,"个人文档", DocumentController.class,request);
			} else {
				LogUtil.writeLog("Id为{"+phoibeDocument.getId()+"}的文档上传失败，请重新上传", LogUtil.OPER_TYPE_ADD,"文档管理", DocumentController.class,request);
				resultMap.put("success", false);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			resultMap.put("success", false);
		}
		LOGGER.info(JsonUtils.toJson(resultMap));
		return JsonUtils.toJson(resultMap);
	}
	@RequestMapping("completeSave/{id}")
	@ResponseBody
	public String completeSave(@PathVariable Integer id,HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			
			PhoibeDocument phoibeDocument = new PhoibeDocument();

			phoibeDocument.setId(id.longValue());
			phoibeDocument.setProgress((short) (100));
			
			phoibeDocument.setStatus((short) (100));//上传完成
			
			int result = phoibeDocumentService.update_v2(phoibeDocument);
			
			if (result > 0) {
				resultMap.put("success", true);
				resultMap.put("dId", result);
				LogUtil.writeLog("Id为{"+phoibeDocument.getId()+"}的文档上传完成", LogUtil.OPER_TYPE_ADD,"个人文档", DocumentController.class,request);
			} else {
				resultMap.put("success", false);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			LogUtil.writeLog("Id为{"+id+"}的文档上传失败，请重新上传", LogUtil.OPER_TYPE_OTHER,"文档管理", DocumentController.class,request);
			e.printStackTrace();
			resultMap.put("success", false);
		}
		LOGGER.info(JsonUtils.toJson(resultMap));
		return JsonUtils.toJson(resultMap);
	}
	
	@RequestMapping("update/{f}/{id}")
	public String modifyDocument(@PathVariable String f, @PathVariable Integer id,HttpServletRequest request) {
		String token = JwtUtil.getCookieValueByName(request,JwtUtil.HEADER_STRING);
		Long userId = Long.parseLong(JwtUtil.extractInfo(token).get(JwtUtil.USER_NAME).toString());
		UserInfo userInfo = phoibeUserService.fetchUserInfoByUserId(userId);
		try {
			PhoibeDocument phoibeDocument = new PhoibeDocument();
			phoibeDocument.setId(id.longValue());
			if ("instorage".equals(f)) {
				phoibeDocument.setIsstock(Short.valueOf("1"));
				phoibeDocument.setStockTime(new Date());
				phoibeDocument.setStocker(userInfo.getRealname());
				LogUtil.writeLog("将Id为{"+id+"}的文档添加入库", LogUtil.OPER_TYPE_INSTORAGE,"文档管理", DocumentController.class,request);
			} else if ("outstorage".equals(f)) {
				phoibeDocument.setIsstock(Short.valueOf("0"));
				LogUtil.writeLog("从库中移除了Id为{"+id+"}的文档", LogUtil.OPER_TYPE_DEL,"文档管理", DocumentController.class,request);
			} else if ("checkpass".equals(f)) {
				phoibeDocument.setAuditStatus(Short.valueOf("2"));
				phoibeDocument.setAuditTime(new Date());
				phoibeDocument.setAuditUserId(userInfo.getId());
				LogUtil.writeLog("Id为{"+id+"}的文档审批通过", LogUtil.OPER_TYPE_CHECKPASS,"文档管理", DocumentController.class,request);
			} else if ("checkrefuse".equals(f)) {
				phoibeDocument.setAuditStatus(Short.valueOf("3"));
				phoibeDocument.setAuditTime(new Date());
				phoibeDocument.setAuditUserId(userInfo.getId());
				LogUtil.writeLog("Id为{"+id+"}的文档被驳回", LogUtil.OPER_TYPE_CHECKPASS,"文档管理", DocumentController.class,request);
			} else {
				LogUtil.writeLog("Id为{"+id+"}的文档业务参数错误", LogUtil.OPER_TYPE_CHECKPASS,"文档管理", DocumentController.class,request);
				throw new Exception("业务参数错误");
			}

			phoibeDocumentService.modifyDocumentById(phoibeDocument);
		} catch (Exception e) {
			JsonUtils.toJson(new Result<>(Code.FAILED, e.getMessage()));
		}
		return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
	}

	// phoibe/document/download
	@RequestMapping(value = {"download"})
	public byte[] download(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		String pdId= request.getParameter("Id");
		DPhoebeDocument pd = phoibeDocumentService.fetchDocumentById(Long.parseLong(pdId));

        if(null!=pd){
            String finalDirPath="";
            if(status.equals("1")) {
                finalDirPath = window;
            }else {
                finalDirPath = linux;
            }
            String fileAbosultePath = finalDirPath + pd.getFilePath();

            File file = new File(fileAbosultePath);
            String filename = file.getName();

            byte[]bytes=getContent(fileAbosultePath);
            LogUtil.writeLog("下载了Id为{"+pdId+"}的文档", LogUtil.OPER_TYPE_DOWN,"文档管理", DocumentController.class,request);
            response.setContentType("multipart/form-data");
            //2.设置文件头：最后一个参数是设置下载文件名(假如我们叫a.pdf)
            response.addHeader("Content-Disposition", "attachment;fileName="+new String(filename.getBytes("gbk"),"ISO8859-1"));
            return bytes;
        }
        return null;
    }
    @RequestMapping(value = "/previewDoc/{id}",method = RequestMethod.GET)
    public void previewDoc(@PathVariable Long id,HttpServletResponse response,HttpServletRequest request) throws IOException {
        DPhoebeDocument dPhoibeDocument = phoibeDocumentService.fetchDocumentById(id);
		String filepath = dPhoibeDocument.getFilePath();
		String finalDirPath="";
		if(status.equals("1")) {
			finalDirPath = window;
		}else {
			finalDirPath = linux;
		}
		String pdffilepath = filepath.substring(0,filepath.lastIndexOf(".")) + ".pdf";
		String path = finalDirPath + pdffilepath;
		File file = new File(path);
		if (!file.exists()){
			Word2PdfUtil.doc2pdf((finalDirPath+filepath),path);
		}
		LogUtil.writeLog("查看了Id为{"+id+"}的文档文件", LogUtil.OPER_TYPE_LOOK,"文档管理", DocumentController.class,request);
		response.sendRedirect("/docword/"+new String(path.replace(finalDirPath,"").getBytes("utf-8"), "ISO8859-1"));
	}

    /**
     *
     * @param id
     * @param request
     * @return
     */
	@RequestMapping("collection/{id}")
	public String collection(@PathVariable Long id,HttpServletRequest request){
		Long userId = getUserId(request);
		PhoibeCollection phoibeCollection = new PhoibeCollection();
		phoibeCollection.setDocumentId(id);
		phoibeCollection.setUserId(userId);
		phoibeDocumentService.collection(phoibeCollection);
		LogUtil.writeLog("收藏了Id为{"+id+"}的文档", LogUtil.OPER_TYPE_ADD,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
	}

	@RequestMapping("subscribe/{id}")
	public String subscribe(@PathVariable Long id,HttpServletRequest request){
		Long userId = getUserId(request);
		PhoibeSubscribe phoibeSubscribe = new PhoibeSubscribe();
		phoibeSubscribe.setSubUserId(id);
		phoibeSubscribe.setUserId(userId);
		phoibeDocumentService.subscribe(phoibeSubscribe);
		LogUtil.writeLog("订阅了Id为{"+id+"}的用户", LogUtil.OPER_TYPE_ADD,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
	}

	@GetMapping("hot")
	public String hot(HttpServletRequest request){
		List<DPhoibeUser> phoibeUsers = phoibeUserService.fetchUserByScore();
		for(DPhoibeUser dPhoibeUser:phoibeUsers){
			dPhoibeUser.setAvgScore(phoibeDocumentService.fetchAvgScore(dPhoibeUser.getId()));
			dPhoibeUser.setPhoibeDocuments(phoibeDocumentService.fetchHotUserDocument(dPhoibeUser.getId()));
		}
		for(int i = 0;i < phoibeUsers.size() -1;i++){
			for(int j = 0; j < phoibeUsers.size() - i -1;j++){
				if(phoibeUsers.get(j).getAvgScore() < phoibeUsers.get(j+1).getAvgScore()){
					DPhoibeUser phoibeUser = phoibeUsers.get(j);
					phoibeUsers.set(j,phoibeUser);
					phoibeUsers.set(j+1,phoibeUser);
				}
			}
		}
		LogUtil.writeLog("浏览了首页热搜", LogUtil.OPER_TYPE_LOOK,"首页热搜", DocumentController.class,request);
		return JsonUtils.toJson(new Result<List<DPhoibeUser>>(Code.SUCCESS, phoibeUsers));
	}

	@GetMapping("checkSubscribe/{id}")
	public String checkSubscribe(@PathVariable Long id,HttpServletRequest request){
		PhoibeSubscribe phoibeSubscribe = new PhoibeSubscribe();
		phoibeSubscribe.setSubUserId(id);
		phoibeSubscribe.setUserId(getUserId(request));
		return JsonUtils.toJson(new Result<Boolean>(Code.SUCCESS, phoibeUserService.checkSubscribe(phoibeSubscribe)));
	}

	@GetMapping("cancelCollection/{id}")
	public String cancelCollection(@PathVariable Long id,HttpServletRequest request){
		PhoibeCollection phoibeCollection = new PhoibeCollection();
		phoibeCollection.setDocumentId(id);
		phoibeCollection.setUserId(getUserId(request));
		phoibeDocumentService.cancelCollection(phoibeCollection);
		LogUtil.writeLog("取消收藏了Id为{"+id+"}的文档", LogUtil.OPER_TYPE_DEL,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
	}

	@GetMapping("cancelbrowse/{id}")
	public String cancelbrowse(@PathVariable Long id,HttpServletRequest request){
		PhoibeBrowse phoibeBrowse = new PhoibeBrowse();
		phoibeBrowse.setDocumentId(id);
		phoibeBrowse.setUserId(getUserId(request));
		phoibeDocumentService.cancelBrowse(phoibeBrowse);
		LogUtil.writeLog("用户清除了Id为{"+id+"}的文档浏览记录", LogUtil.OPER_TYPE_DEL,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
	}

	@GetMapping("cancelSubscribe/{id}")
	public String cancelSubscribe(@PathVariable Long id,HttpServletRequest request){
		PhoibeSubscribe phoibeSubscribe = new PhoibeSubscribe();
		phoibeSubscribe.setSubUserId(id);
		phoibeSubscribe.setUserId(getUserId(request));
		phoibeUserService.cancelSubscribe(phoibeSubscribe);
		LogUtil.writeLog("取消订阅Id为{"+id+"}的用户", LogUtil.OPER_TYPE_DEL,"个人文档", DocumentController.class,request);
		return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
	}

	@GetMapping("statistical/{group}")
	public String statistical(@PathVariable String group,HttpServletRequest request){
		List<DStatistical> list = phoibeDocumentService.fetchStatisticalByParam(group);

		LogUtil.writeLog("浏览了文档统计图", LogUtil.OPER_TYPE_DEL,"文档统计", DocumentController.class,request);
		return JsonUtils.toJson(new Result<List<DStatistical>>(Code.SUCCESS, list));
	}

	@GetMapping("hotsearch")
	public String hotsearch(){
		List<String> list = phoibeSearchService.fetchHotSearch();
		return JsonUtils.toJson(new Result<List<String>>(Code.SUCCESS, list));
	}

	@GetMapping("usersearch")
	public String usersearch(HttpServletRequest request){
		Long userId = getUserId(request);
		List<String> list = phoibeSearchService.fetchByUserId(userId);
		return JsonUtils.toJson(new Result<List<String>>(Code.SUCCESS, list));
	}

	public static byte[] getContent(String filePath) throws IOException {
		File file = new File(filePath);
		long fileSize = file.length();
		if (fileSize > Integer.MAX_VALUE) {
			System.out.println("file too big...");
			return null;
		}
		FileInputStream fi = new FileInputStream(file);
		byte[] buffer = new byte[(int) fileSize];
		int offset = 0;
		int numRead = 0;
		while (offset < buffer.length && (numRead = fi.read(buffer, offset, buffer.length - offset)) >= 0) {
			offset += numRead;
		}
		// 确保所有数据均被读取
		if (offset != buffer.length) {
			throw new IOException("Could not completely read file " + file.getName());
		}
		fi.close();
		return buffer;
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		// 严格限制日期转换
		sdf.setLenient(false);

		// true:允许输入空值，false:不能为空值
		binder.registerCustomEditor(Date.class, new CustomDateEditor(sdf, true));

	}
}
