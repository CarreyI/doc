package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeUserPostil;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhoibeUserPostilMapper {

    int insertUserPostil(PhoibeUserPostil phoibeUserPostil);
}
