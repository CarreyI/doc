package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeUserPostilMapper;
import me.phoibe.doc.cms.domain.dto.DPhoebeDocument;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeDocument;
import me.phoibe.doc.cms.domain.po.PhoibeUserPostil;
import me.phoibe.doc.cms.service.PhoibeUserPostilService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PhoibeUserPostilServieImpl implements PhoibeUserPostilService {

    @Autowired
    private PhoibeUserPostilMapper phoibeUserPostilMapper;

    @Override
    public boolean insertUserPostil(PhoibeUserPostil phoibeUserPostil) {
        return phoibeUserPostilMapper.insertUserPostil(phoibeUserPostil) > 0;
    }

    @Override
    public List<PhoibeUserPostil> selectUserPostil(int userId) {
        return phoibeUserPostilMapper.selectUserPostil(userId);
    }

    @Override
    public PhoibeUserPostil GetUserPostilById(Long Id){
        return phoibeUserPostilMapper.GetUserPostilById(Id);
    }

    @Override
    public PageList<PhoibeUserPostil> fetchUserPostilList(PageParam<PhoibeUserPostil> param) {
        List<PhoibeUserPostil> dlist = new ArrayList<>();
        List<PhoibeUserPostil> list = phoibeUserPostilMapper.fetchUserPostilList(param);
        for (PhoibeUserPostil model:list){
            PhoibeUserPostil dmodel = new PhoibeUserPostil();
            BeanUtils.copyProperties(model,dmodel);
            //dmodel.settings();
            dlist.add(dmodel);
        }
        return PageList.createPage(param,phoibeUserPostilMapper.selectCountByPage(param),dlist);
        //return phoibeUserPostilMapper.fetchUserPostilList(param);
    }
    @Override
    public boolean removeById(int id){
        return phoibeUserPostilMapper.removeById(id);
    }
}
