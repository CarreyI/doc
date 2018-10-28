package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.po.PhoibeDirectory;

import java.util.List;

public interface PhoibeDirectoryService {

    void addDirectory(PhoibeDirectory phoibeDirectory);

    void modifyDirectory(PhoibeDirectory phoibeDirectory);

    void removeDirectory(Long dirId);

    void removeDocDirById(Long docid);

    List<PhoibeDirectory> fetchPhoibeDirectoryList(Long userId);

    PhoibeDirectory selectByDirName(String dirName, Long userId);

    void moveDirectory(long[] docidstr, Long directoryid);
}
