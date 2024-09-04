package org.example.server.dataobject.SportAnalysis;

import lombok.Data;

import java.util.Map;

@Data
public class AnalysisMessage {
    private String content;
    private String sessionId;  // 添加sessionId字段
    private Map<String, String> queryParams;  // 确保在消息中包含查询参数

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Map<String, String> getQueryParams() {
        return queryParams;
    }

    public void setQueryParams(Map<String, String> queryParams) {
        this.queryParams = queryParams;
    }
}

