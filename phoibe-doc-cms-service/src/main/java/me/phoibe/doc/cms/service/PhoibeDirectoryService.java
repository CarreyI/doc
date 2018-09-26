package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.po.PhoibeDirectory;
import me.phoibe.doc.cms.domain.po.PhoibeDocDir;

import java.util.List;

public interface PhoibeDirectoryService {

    void addDirectory(PhoibeDirectory phoibeDirectory);

    void modifyDirectory(PhoibeDirectory phoibeDirectory);

    void removeDirectory(Long dirId);

    void moveDirectory(PhoibeDocDir phoibeDocDir);

    List<PhoibeDirectory> fetchPhoibeDirectoryList();
}
