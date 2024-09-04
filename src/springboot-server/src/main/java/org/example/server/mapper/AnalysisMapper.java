package org.example.server.mapper;

import org.apache.ibatis.annotations.*;
import org.example.server.dataobject.SportAnalysis.AnalysisData;

@Mapper
public interface AnalysisMapper {

    @Select("SELECT * FROM wechatinfo WHERE name = #{name}")
    AnalysisData findByName(@Param("name") String name);

    @Insert("INSERT INTO wechatinfo (name, chat) VALUES (#{name}, #{chat})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(AnalysisData chatData);

    @Update("UPDATE wechatinfo SET chat = #{chat} WHERE name = #{name}")
    void update(AnalysisData chatData);
}

