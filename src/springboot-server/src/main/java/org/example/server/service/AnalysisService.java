package org.example.server.service;

import org.example.server.dataobject.SportAnalysis.AnalysisData;
import org.example.server.mapper.AnalysisMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnalysisService {

    @Autowired
    private AnalysisMapper chatDataMapper;

    public void processAndSaveData(String jsonContent) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(jsonContent);

        List<JsonNode> recentMessages = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 找到最后一条记录的日期时间
        JsonNode lastNode = rootNode.get(rootNode.size() - 1);
        String lastCreateTime = lastNode.get("CreateTime").asText();
        LocalDateTime lastDateTime = LocalDateTime.parse(lastCreateTime, formatter);
        LocalDateTime sevenDaysAgo = lastDateTime.minusDays(7);

        // 过滤最近七天的记录
        for (JsonNode node : rootNode) {
            String createTime = node.get("CreateTime").asText();
            LocalDateTime messageDateTime = LocalDateTime.parse(createTime, formatter);
            if (!messageDateTime.isBefore(sevenDaysAgo)) {
                recentMessages.add(node);
            }
        }

        StringBuilder chatBuilder = new StringBuilder();
        String talkerName = "";

        for (JsonNode node : recentMessages) {
            String talker = node.get("talker").asText();
            String msg = node.get("content").get("msg").asText();

            if (talker.equals("我")) {
                chatBuilder.append("我：").append(msg).append("，");
            } else {
                chatBuilder.append("对方：").append(msg).append("，");
                if (talkerName.isEmpty()) {
                    talkerName = talker;
                }
            }
        }

        String chatContent = chatBuilder.toString();
        if (!chatContent.isEmpty()) {
            chatContent = chatContent.substring(0, chatContent.length() - 1); // 去掉最后一个逗号
        }

        AnalysisData chatData = chatDataMapper.findByName(talkerName);
        if (chatData != null) {
            chatData.setChat(chatContent);
            chatDataMapper.update(chatData);
        } else {
            chatData = new AnalysisData();
            chatData.setName(talkerName);
            chatData.setChat(chatContent);
            chatDataMapper.insert(chatData);
        }
    }
}
