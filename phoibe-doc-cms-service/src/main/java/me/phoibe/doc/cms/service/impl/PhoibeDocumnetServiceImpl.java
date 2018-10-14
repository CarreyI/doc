package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.*;
import me.phoibe.doc.cms.domain.dto.DPhoebeDocument;
import me.phoibe.doc.cms.domain.dto.DStatistical;
import me.phoibe.doc.cms.domain.po.*;
import me.phoibe.doc.cms.exception.BusinessException;
import me.phoibe.doc.cms.service.PhoibeDictService;
import me.phoibe.doc.cms.service.PhoibeDocumentService;
import me.phoibe.doc.cms.utils.FileUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author pc
 * @Title: PhoibeDocumnetServiceImpl
 * @Description: TODO
 * @date 2018/8/230:31
 */
@Service
public class PhoibeDocumnetServiceImpl implements PhoibeDocumentService {
    @Resource
    private PhoibeDocumentMapper phoibeDocumentMapper;

    @Autowired
    private PhoibeAttachContentMapper phoibeAttachContentMapper;

    @Autowired
    private PhoibeCollectionMapper phoibeCollectionMapper;

    @Autowired
    private PhoibeBrowseMapper phoibeBrowseMapper;

    @Autowired
    private PhoibeSubscribeMapper phoibeSubscribeMapper;

    @Autowired
    private PhoibeDictService phoibeDictService;

    @Value("${breakpoint.upload.window}")
    private String window;
    @Value("${breakpoint.upload.linux}")
    private String linux;
    @Value("${breakpoint.upload.status}")
    private String status;

    @Override
    public Integer save(PhoibeDocument phoibeDocument) {
        return phoibeDocumentMapper.insert(phoibeDocument);
    }
    @Override
    @Transactional
    public Integer save_v2(PhoibeDocument phoibeDocument) {
        int i = phoibeDocumentMapper.insert(phoibeDocument);
        PhoibeAttachContent phoibeAttachContent = new PhoibeAttachContent();
        phoibeAttachContent.setDocumentId(phoibeDocument.getId());
        phoibeAttachContent.setAttachContent("");
        phoibeAttachContentMapper.insertSelective(phoibeAttachContent);
        return i;
    }


    @Override
    public Integer update(PhoibeDocument phoibeDocument) {
        return phoibeDocumentMapper.updateByPrimaryKeySelective(phoibeDocument);
    }

    @Override
    @Transactional
    public Integer update_v2(PhoibeDocument phoibeDocument) {
        int i = phoibeDocumentMapper.updateByPrimaryKeySelective(phoibeDocument);
        PhoibeDocument model = phoibeDocumentMapper.selectByPrimaryKey(phoibeDocument.getId());
        String finalDirPath="";
        if(status.equals("1")) {
            finalDirPath = window;
        }else {
            finalDirPath = linux;
        }
        String fileAbosultePath = finalDirPath + model.getFilePath();
        PhoibeAttachContent phoibeAttachContent = new PhoibeAttachContent();

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(model.getName()+"#");
        stringBuilder.append(phoibeDictService.fetchById(model.getArms().longValue())+"#");
        stringBuilder.append(phoibeDictService.fetchById(model.getCombatType().longValue())+"#");
        stringBuilder.append(model.getUserRealName()+"#");
        stringBuilder.append(model.getWaraddr()+"#");
        stringBuilder.append(model.getWinner()+"#");
        stringBuilder.append(model.getLoser()+"#");
        stringBuilder.append(model.getWarstate()+"#");
        stringBuilder.append(model.getWartime()+"#");
        stringBuilder.append(FileUtil.readAttachText(fileAbosultePath));
        phoibeAttachContent.setAttachContent(stringBuilder.toString());
        phoibeAttachContent.setDocumentId(phoibeDocument.getId());
        phoibeAttachContentMapper.updateByDocumentId(phoibeAttachContent);
        return i;
    }
    
    @Override
    public PageList<DPhoebeDocument> fetchDocumentByPageList(PageParam<DPhoebeDocument> pageParam) {
        List<DPhoebeDocument> dlist = new ArrayList<>();
        List<PhoibeDocument> list = phoibeDocumentMapper.selectByPage(pageParam);
        for (PhoibeDocument model:list){
            DPhoebeDocument dmodel = new DPhoebeDocument();
            BeanUtils.copyProperties(model,dmodel);
            dmodel.settings();
            dlist.add(dmodel);
        }
        return PageList.createPage(pageParam,phoibeDocumentMapper.selectCountByPage(pageParam),dlist);
    }

    @Override
    public List<DPhoebeDocument> fetchDocumentUserList(PageParam<DPhoebeDocument> pageParam) {
        return phoibeDocumentMapper.selectDocumentUser(pageParam);
    }

    @Override
    public void removeDocumentById(Integer id) {
        if(null == id){
            throw new BusinessException("删除参数id为空");
        }
        phoibeDocumentMapper.deleteByPrimaryKey(id.longValue());
    }

    @Override
    public void modifyDocumentById(PhoibeDocument phoibeDocument) {
        if(null == phoibeDocument || null == phoibeDocument.getId()){
            throw new BusinessException("修改参数错误");
        }
        phoibeDocumentMapper.updateByPrimaryKeySelective(phoibeDocument);
    }

    @Override
    public DPhoebeDocument fetchDocumentById(Long id) {
        if(null == id){
            return null;
        }
        DPhoebeDocument dmodel = new DPhoebeDocument();
        PhoibeDocument model = phoibeDocumentMapper.selectByPrimaryKey(id);
        if(null == model){
            return null;
        }
        BeanUtils.copyProperties(model,dmodel);
        dmodel.settings();
        return dmodel;
    }

    @Override
    @Transactional
    public void browse(PhoibeBrowse phoibeBrowse) {
        phoibeBrowse.setCreateTime(new Date());
        phoibeBrowseMapper.insertSelective(phoibeBrowse);
        phoibeBrowseMapper.deleteOldByUserId(phoibeBrowse.getUserId());
        phoibeDocumentMapper.updateHitcountById(phoibeBrowse.getDocumentId());
    }

    @Override
    public void collection(PhoibeCollection phoibeCollection) {
        phoibeCollection.setCreateTime(new Date());
        phoibeCollectionMapper.insertSelective(phoibeCollection);
    }

    @Override
    public void subscribe(PhoibeSubscribe phoibeSubscribe) {
        phoibeSubscribe.setCreateTime(new Date());
        phoibeSubscribeMapper.insertSelective(phoibeSubscribe);
    }

    @Override
    public List<PhoibeDocument> fetchHotUserDocument(Long userId) {
        PageParam<DPhoebeDocument> pageParam = new PageParam<>();
        pageParam.setStart(0);
        pageParam.setLimit(3);
        pageParam.setOrderBy("HITCOUNT");
        pageParam.setSort("DESC");
        DPhoebeDocument dPhoebeDocument = new DPhoebeDocument();
        dPhoebeDocument.setUserId(userId);
        pageParam.setParam(dPhoebeDocument);
        List<PhoibeDocument> list = phoibeDocumentMapper.selectByPage(pageParam);
        return list;
    }

    @Override
    public boolean checkCollection(PhoibeCollection phoibeCollection) {
        return phoibeCollectionMapper.selectCountByParam(phoibeCollection) > 0;
    }

    @Override
    public void cancelCollection(PhoibeCollection phoibeCollection) {
        phoibeCollectionMapper.deleteByParam(phoibeCollection);
    }

    @Override
    public void cancelBrowse(PhoibeBrowse phoibeBrowse) {
        phoibeBrowseMapper.deleteByParam(phoibeBrowse);
    }

    @Override
    public double fetchAvgScore(Long userId) {
        return phoibeDocumentMapper.selectAvgScore(userId);
    }

    @Override
    public PageList<DPhoebeDocument> fetchJoinDocumentByPageList(PageParam<DPhoebeDocument> pageParam) {
        List<DPhoebeDocument> dlist = new ArrayList<>();
        List<PhoibeDocument> list = phoibeDocumentMapper.selectJoinByPage(pageParam);
        for (PhoibeDocument model:list){
            DPhoebeDocument dmodel = new DPhoebeDocument();
            BeanUtils.copyProperties(model,dmodel);
            dmodel.settings();
            dlist.add(dmodel);
        }
        return PageList.createPage(pageParam,phoibeDocumentMapper.selectJoinCountByPage(pageParam),dlist);
    }

    @Override
    public List<DStatistical> fetchStatisticalByParam(String group) {
        return phoibeDocumentMapper.selectStatisticalByParam(group);
    }
}
