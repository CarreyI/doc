package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.dto.DPhoebeDocument;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeUserPostil;

import java.util.List;

public interface PhoibeUserPostilService {
    boolean insertUserPostil(PhoibeUserPostil phoibeUserPostil);
    List<PhoibeUserPostil> selectUserPostil(int userId);
    PageList<PhoibeUserPostil> fetchUserPostilList(PageParam<PhoibeUserPostil> pageParam);
}
