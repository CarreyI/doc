package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeDirectory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PhoibeDirectoryMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeDirectory record);

    int insertSelective(PhoibeDirectory record);

    PhoibeDirectory selectByPrimaryKey(Long id);

    PhoibeDirectory selectByDirName(@Param("dirName") String dirName,@Param("userId") Long userId);

    int updateByPrimaryKeySelective(PhoibeDirectory record);

    int updateByPrimaryKey(PhoibeDirectory record);

    List<PhoibeDirectory> selectByList(Long userId);
}