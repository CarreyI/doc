package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeDict;

public interface PhoibeDictService {

    void addDict(PhoibeDict phoibeDict);

    void removeDict(Long id);

    void modifyDict(PhoibeDict phoibeDict);

    PageList<PhoibeDict> fetchByPage(PageParam<PhoibeDict> pageParam);

}
