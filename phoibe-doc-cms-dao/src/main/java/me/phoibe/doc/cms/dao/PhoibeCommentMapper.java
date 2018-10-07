package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.dto.DPhoibeComment;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeComment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PhoibeCommentMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeComment record);

    int insertSelective(PhoibeComment record);

    PhoibeComment selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeComment record);

    int updateByPrimaryKey(PhoibeComment record);

    List<DPhoibeComment> selectByPage(PageParam<DPhoibeComment> pageParam);

    Long selectCountByPage(PageParam<DPhoibeComment> pageParam);

    double selectAvgScore(Long documentId);
}