package me.phoibe.doc.cms.service;

import me.phoibe.doc.cms.domain.dto.DPhoebeDocument;
import me.phoibe.doc.cms.domain.po.*;

import java.util.List;

/**
 * @author pc
 * @Title: PhoibeDocumnetService
 * @Description: 文档管理Service
 * @date 2018/8/230:30
 */
public interface PhoibeDocumentService {

    Integer save(PhoibeDocument phoibeDocument);

    Integer save_v2(PhoibeDocument phoibeDocument);
    
    Integer update(PhoibeDocument phoibeDocument);

    Integer update_v2(PhoibeDocument phoibeDocument);

    PageList<DPhoebeDocument> fetchDocumentByPageList(PageParam<DPhoebeDocument> pageParam);

    List<DPhoebeDocument> fetchDocumentUserList(PageParam<DPhoebeDocument> pageParam);

    void removeDocumentById(Integer id) throws Exception;

    void modifyDocumentById(PhoibeDocument phoibeDocument) throws Exception;

    DPhoebeDocument fetchDocumentById(Long id);

    void browse(PhoibeBrowse phoibeBrowse);

    void collection(PhoibeCollection phoibeCollection);

    void subscribe(PhoibeSubscribe phoibeSubscribe);


}
