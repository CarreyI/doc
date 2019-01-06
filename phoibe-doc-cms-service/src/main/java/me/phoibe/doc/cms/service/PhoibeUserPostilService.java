package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.po.PhoibeUserPostil;

import java.util.List;

public interface PhoibeUserPostilService {
    boolean insertUserPostil(PhoibeUserPostil phoibeUserPostil);
    List<PhoibeUserPostil> selectUserPostil(int userId);
}
