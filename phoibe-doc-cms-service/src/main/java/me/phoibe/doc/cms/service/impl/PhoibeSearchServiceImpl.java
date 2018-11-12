package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeSearchMapper;
import me.phoibe.doc.cms.domain.po.PhoibeSearch;
import me.phoibe.doc.cms.service.PhoibeSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PhoibeSearchServiceImpl implements PhoibeSearchService {

    @Autowired
    private PhoibeSearchMapper phoibeSearchMapper;

    @Override
    public void addSearch(PhoibeSearch phoibeSearch) {
        if(phoibeSearchMapper.selectCountByContent(phoibeSearch)==0) {
            phoibeSearch.setCreateTime(new Date());
            phoibeSearchMapper.insertSelective(phoibeSearch);
            phoibeSearchMapper.deleteOldByUserId(phoibeSearch.getUserId());
        }
    }

    @Override
    public List<String> fetchHotSearch() {
        return phoibeSearchMapper.selectHotSearch();
    }

    @Override
    public List<String> fetchByUserId(Long userId) {
        return phoibeSearchMapper.selectByUserId(userId);
    }

}
