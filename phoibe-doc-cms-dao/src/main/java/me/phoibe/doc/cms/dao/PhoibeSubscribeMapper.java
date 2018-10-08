package me.phoibe.doc.cms.dao;

import me.phoibe.doc.cms.domain.po.PhoibeSubscribe;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhoibeSubscribeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PhoibeSubscribe record);

    int insertSelective(PhoibeSubscribe record);

    PhoibeSubscribe selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PhoibeSubscribe record);

    int updateByPrimaryKey(PhoibeSubscribe record);

    int selectCountByParam(PhoibeSubscribe phoibeSubscribe);

    int deleteByParam(PhoibeSubscribe phoibeSubscribe);
}