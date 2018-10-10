package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeDictMapper;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeDict;
import me.phoibe.doc.cms.service.PhoibeDictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhoibeDictServiceImpl implements PhoibeDictService {

    @Autowired
    private PhoibeDictMapper phoibeDictMapper;

    @Override
    public void addDict(PhoibeDict phoibeDict) {
        phoibeDictMapper.insertSelective(phoibeDict);
    }

    @Override
    public void removeDict(Long id) {
        phoibeDictMapper.deleteByPrimaryKey(id);
    }

    @Override
    public void modifyDict(PhoibeDict phoibeDict) {
        phoibeDictMapper.updateByPrimaryKeySelective(phoibeDict);
    }

    @Override
    public PageList<PhoibeDict> fetchByPage(PageParam<PhoibeDict> pageParam) {
        List<PhoibeDict> list = phoibeDictMapper.selectByPage(pageParam);
        return PageList.createPage(pageParam,phoibeDictMapper.selectCountByPage(pageParam),list);
    }
}
