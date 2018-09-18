package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeTag;

public interface PhoibeTagService  {
    PageList<PhoibeTag> fetchTagByPageList(PageParam<PhoibeTag> pageParam);

    void addTag(PhoibeTag phoibeTag);
}
