package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeUserPostilMapper;
import me.phoibe.doc.cms.domain.po.PhoibeUserPostil;
import me.phoibe.doc.cms.service.PhoibeUserPostilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
