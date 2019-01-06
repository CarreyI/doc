package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeUserPostil;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PhoibeUserPostilMapper {

    int insertUserPostil(PhoibeUserPostil phoibeUserPostil);

    List<PhoibeUserPostil> selectUserPostil(int userId);
}
