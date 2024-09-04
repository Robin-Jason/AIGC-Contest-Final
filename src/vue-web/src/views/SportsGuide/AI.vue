<template>
  <div id="app">
    <div class="containerAI">
      <!-- AI健康助手 -->
      <div class="moduleAI AI-assistant">
        <!-- 心率数据选择 -->
        <div class="data-selection">
          <div class="selection-row">
            <div class="label">心率：</div>
            <select v-model="selectedHeartRateType" @change="onHeartRateTypeChange" class="custom-select">
              <option value="day">每天</option>
              <option value="month">每月</option>
            </select>

            <select v-model="selectedHeartRateTime" class="custom-select">
              <option v-for="option in heartRateTimeOptions" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>

            <button @click="addHeartRateData" class="add-button">添加</button>
          </div>
          <!-- 步数数据选择 -->
          <div class="selection-row">
            <div class="label">步数：</div>
            <select v-model="selectedStepYear" @change="onStepYearChange" class="custom-select">
              <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
            </select>

            <select v-model="selectedStepMonth" class="custom-select">
              <option value="all">全部</option>
              <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
            </select>

            <button @click="addStepData" class="add-button">添加</button>
          </div>
        </div>

        <div class="input-container">
          <textarea v-model="userPrompt" placeholder="请输入您的问题或聊天记录"></textarea>
          <button @click="submitPrompt" class="submit-button">提交</button>
        </div>

        <div class="result">
          <h2>分析结果</h2>
          <textarea readonly v-model="analysisResult"></textarea>
          <button @click="readAloud" class="read-button">朗读</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import {sendChatPrompt} from "@/api/SportAnalysis";

export default {
  name: 'HealthInfo',
  data() {
    return {
      userPrompt: '', // 用户输入的内容
      analysisResult: '',
      sessionId: uuidv4(), // 在页面加载时生成一个唯一的sessionId
      selectedHeartRateType: 'day',
      selectedHeartRateTime: null,
      heartRateTimeOptions: [],
      selectedStepYear: null,
      selectedStepMonth: null,
      availableYears: [2023, 2024],
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      dailyData: {
        '2024-09-01': [70, 65, 60, 75, 62, 68, 72, 70],
        '2024-09-02': [68, 62, 66, 70, 65, 62, 64, 70],
        // 更多数据...
      },
      monthlyData: {
        '2024-01': [65, 66, 70, 64, 72, 68, 70],
        '2024-02': [64, 63, 65, 67, 68, 66, 70],
        // 更多数据...
      }
    };
  },
  mounted() {
    this.onHeartRateTypeChange();
    this.selectedStepYear = this.availableYears[0]; // 默认选择第一个年份
  },
  methods: {
    onHeartRateTypeChange() {
      if (this.selectedHeartRateType === 'day') {
        this.heartRateTimeOptions = Object.keys(this.dailyData).map((date) => ({
          value: date,
          text: date,
        }));
      } else if (this.selectedHeartRateType === 'month') {
        this.heartRateTimeOptions = Object.keys(this.monthlyData).map((month) => ({
          value: month,
          text: month,
        }));
      }
      this.selectedHeartRateTime = this.heartRateTimeOptions[0].value;
    },
    addHeartRateData() {
      let heartRateData = '';
      if (this.selectedHeartRateType === 'day') {
        heartRateData = this.dailyData[this.selectedHeartRateTime].map((bpm, index) => {
          return `${this.selectedHeartRateTime} 第${index + 1}小时的心率是${bpm} BPM`;
        }).join('，');
      } else if (this.selectedHeartRateType === 'month') {
        heartRateData = this.monthlyData[this.selectedHeartRateTime].map((bpm, index) => {
          return `${this.selectedHeartRateTime} 第${index * 5 + 1}日的心率是${bpm} BPM`;
        }).join('，');
      }
      this.userPrompt += heartRateData + '。';
    },
    onStepYearChange() {
      this.selectedStepMonth = "all"; // 默认选择“全部”
    },
    addStepData() {
      if (this.selectedStepMonth === 'all') {
        // 添加所有月份的步数数据
        const allStepsData = this.months.map((month, index) => {
          return `2024年${month}的平均步数是${this.fetchChartDataForYear(this.selectedStepYear)[index] * 50}步`;
        }).join('，');
        this.userPrompt += allStepsData + '。';
      } else {
        // 只添加选中的月份数据
        const stepData = `2024年${this.months[this.selectedStepMonth - 1]}的平均步数是${this.fetchChartDataForYear(this.selectedStepYear)[this.selectedStepMonth - 1] * 50}步`;
        this.userPrompt += stepData + '。';
      }
    },
    fetchChartDataForYear(year) {
      const data = {
        2023: [20, 40, 60, 80, 50, 30, 40, 60, 50, 70, 60, 50],
        2024: [50, 70, 90, 30, 40, 60, 80, 20, 40, 50, 70, 60],
      };
      return data[year] || [];
    },
    submitPrompt() {
      const prompt = `${this.userPrompt}`;
      const requestBody = {
        content: prompt,
        sessionId: this.sessionId
      };

      sendChatPrompt(requestBody)
          .then(responseData => {
            if (responseData && responseData.data && responseData.code === 0) {
              this.analysisResult = responseData.data.content; // 显示从大语言模型返回的内容
            } else {
              console.error('接收到错误或格式无效:', responseData);
              this.analysisResult = '接收到错误或格式无效';
            }
          })
          .catch(error => {
            console.error('发送消息错误:', error);
            this.analysisResult = `错误：${error.message || "与服务器通信失败"}`;
          });
    },
    readAloud() {
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(this.analysisResult);
        speech.lang = 'zh-CN'; // 设置语言为中文
        window.speechSynthesis.speak(speech);
      } else {
        alert('您的浏览器不支持语音合成功能');
      }
    }
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #ffe9e9;
  font-family: Arial, sans-serif;
}

.containerAI {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffe9e9;
  padding: 20px;
}

.moduleAI {
  background-color: #ffffff;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(221, 37, 37, 0.1);
  display: flex;
  flex-direction: column;
  width: 1200px;
}

.data-selection {
  margin-bottom: 20px;
}

.selection-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  margin-right: 10px;
  font-weight: bold;
}

.custom-select {
  position: relative;
  border-radius: 15px;
  background-color: #f0b8b8;
  color: white;
  border: none;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  width: 100px;
  height: 30px;
  margin-right: 10px;
}

.add-button {
  border-radius: 15px;
  background-color: #f0b8b8;
  color: white;
  border: none;
  font-size: 12px;
  cursor: pointer;
  padding: 5px 15px;
}

.add-button:hover {
  background-color: #e09090;
}

.input-container textarea {
  width: 100%;
  height: 100px;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  resize: none;
}

.submit-button {
  border-radius: 15px;
  background-color: #f0b8b8;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 10px;
  align-self: flex-end;
}

.submit-button:hover {
  background-color: #e09090;
}

.read-button {
  border-radius: 15px;
  background-color: #f0b8b8;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 10px;
  align-self: flex-end;
}

.read-button:hover {
  background-color: #e09090;
}

.result textarea {
  width: 100%;
  height: 150px;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  resize: none;
}
</style>
