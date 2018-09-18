package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeTagMapper;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeTag;
import me.phoibe.doc.cms.service.PhoibeTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PhoibeTagServiceImpl implements PhoibeTagService {

    @Autowired
    private PhoibeTagMapper phoibeTagMapper;

    @Override
    public PageList<PhoibeTag> fetchTagByPageList(PageParam<PhoibeTag> pageParam) {
        List<PhoibeTag> list = phoibeTagMapper.selectByPageList(pageParam);
        return PageList.createPage(pageParam,phoibeTagMapper.selectByPageListCount(pageParam),list);
    }

    @Override
    public void addTag(PhoibeTag phoibeTag) {
        phoibeTag.setCreateTime(new Date());
        phoibeTagMapper.insertSelective(phoibeTag);
    }
}
