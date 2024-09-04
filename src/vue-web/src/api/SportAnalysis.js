// src/api/chat.js
import request from '@/utils/request';

// 提交用户输入到后端
export function sendChatPrompt(requestBody) {
    return request({
        url: '/chat/send',
        method: 'post',
        data: requestBody
    });
}