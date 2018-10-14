package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.po.PhoibeSearch;

import java.util.List;

public interface PhoibeSearchService {
    void addSearch(PhoibeSearch phoibeSearch);

    List<String> fetchHotSearch();

    List<String> fetchByUserId(Long userId);

}
