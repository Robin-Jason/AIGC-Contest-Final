<template>
  <div id="app">
    <div class="container">
<!-- 第一模块: 问候和天气 -->
<div class="module greeting">
  <div style="margin-left: 180px;"> <!-- 向右移动 -->
    <p style="font-weight: bold;font-size: 28px;">你好，李奶奶！</p>
    <p style="font-weight: bold;font-size: 25px;">今天也要坚持运动哦~</p>
  </div>

  <div class="weather-container" style="margin-right: 180px;"> <!-- 向左移动 -->
    <img src="@/assets/Sports/sun.png" alt="Sunny" class="weather-icon">
    <span style="font-weight: bold;font-size: 28px;">晴，29°C</span>
  </div>
</div>


      <!-- 第二模块: 心率 -->
      <div class="module1 heart-rate-module">
        <div class="header">
          <span class="heart-rate-title" style="font-weight: bold;font-size: 28px;">心率</span>
          <span class="bpm-range">{{ bpmRange }}</span>
        </div>

        <div>
          <!-- 下拉选择框 -->
          <select v-model="selectedType" @change="onTypeChange" class="custom-select">
            <option value="day" >每天</option>
            <option value="month">每月</option>
          </select>

          <select v-model="selectedTime" @change="updateChart" class="custom-select">
            <option v-for="option in timeOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>

        <div class="chart-container">
          <div class="y-axis-heart-rate">
            <div>90 BPM</div>
            <div>72 BPM</div>
            <div>36 BPM</div>
            <div>0 BPM</div>
          </div>
          <div class="bar-chart-container">
            <div class="bar-chart">
              <div
                  v-for="(bar, index) in chartData"
                  :key="index"
                  class="bar"
                  :style="{ height: bar + '%' }"
                  @mouseover="showTooltipForHeartRate(bar, $event)"
                  @mouseleave="hideTooltip"
              >
                <div class="tooltip">{{ bar }} BPM</div>
              </div>
            </div>
            <div class="x-axis">
              <span v-for="label in xLabels" :key="label" :class="{ 'tilted-label': selectedType === 'day' }">
                {{ label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 第三模块: 数据统计 -->
      <div class="module4 data-statistics-module">
        <div class="statistics-header">
          <span class="statistics-title" style="font-weight: bold;font-size: 28px;" >数据统计（平均步数/天）</span>
          <select class="year-selector" v-model="selectedYear" @change="handleYearChange">
            <option selected disabled >选择年份</option>
            <option v-for="year in availableYears" :key="year">{{ year }}</option>
          </select>
        </div>
        <div class="chart-container">
          <div class="y-axis">
            <div>5K</div>
            <div>4K</div>
            <div>3K</div>
            <div>2K</div>
            <div>1K</div>
          </div>
          <div class="bar-chart-container">
            <div class="bar1-chart">
              <div
                  v-for="(height, index) in yearChartData"
                  :key="index"
                  class="bar1"
                  :style="{ height: height + '%' }"
                  @mouseover="showTooltipForSteps(height, $event)"
                  @mouseleave="hideTooltip"
              >
                <div class="tooltip">{{ height }} 步</div>
              </div>
            </div>
            <div class="x-axis">
              <div v-for="(month, index) in months" :key="index">{{ month }}</div>
            </div>
          </div>
        </div>
        <div class="tooltip">{{ selectedYear }}: {{ yearTooltipText }}</div>
      </div>

      <!-- 第四模块: 加入运动小组 -->
      <div class="module join-sports-group">
        <div class="profile-pics">
          <img src="@/assets/Sports/person1.png" alt="Person 1" class="profile-pic">
          <img src="@/assets/Sports/person2.png" alt="Person 2" class="profile-pic">
          <img src="@/assets/Sports/person3.png" alt="Person 3" class="profile-pic">
        </div>
        <a href="#" class="join-link" @click.prevent="navigateToGroup" style="font-weight: bold;font-size: 28px;">加入运动小组 ></a>
      </div>

      <!-- 第五模块: AI运动分析与建议 -->
      <div class="module ai-analysis">
        <a href="#" class="aai-link" @click.prevent="navigateToAI" style="font-weight: bold;font-size: 28px;">AI运动分析与建议 ></a>
      </div>

      <!-- 右边第一模块: 设备概览 -->
      <div class="module2 device-overview">
        <div class="device">
          <img src="@/assets/Sports/smartwatch.png" alt="智能手表">
          <p style="font-weight: bold;font-size: 20px;">智能手表</p>
          <div class="status-dot-smartwatch" :style="{ backgroundColor: getDotColor('智能手表') }"></div>
        </div>
        <div class="device">
          <img src="@/assets/Sports/bloodpressure.png" alt="血压计">
          <p style="font-weight: bold;font-size: 20px;">血压计</p>
          <div class="status-dot-bloodpressure" :style="{ backgroundColor: getDotColor('血压计') }"></div>
        </div>
        <div class="device">
          <img src="@/assets/Sports/medicinebox.png" alt="智能药盒">
          <p style="font-weight: bold;font-size: 20px;">智能药盒</p>
          <div class="status-dot-medicinebox" :style="{ backgroundColor: getDotColor('智能药盒') }"></div>
        </div>
        <div class="device">
          <img src="@/assets/Sports/thermometer.png" alt="体温计">
          <p style="font-weight: bold;font-size: 20px;">体温计</p>
          <div class="status-dot-thermometer" :style="{ backgroundColor: getDotColor('体温计') }"></div>
        </div>
      </div>


      <!-- 右边第二模块: 设备管理 -->
      <div class="modulede device-management">
        <div class="menu-item active" style="font-weight: bold;font-size: 25px;">设备连接</div>
        <div class="menu-item " @click="openDeviceModal('connect')" style="font-size: 25px;">设备连接 ></div>
        <div class="menu-item" @click="openDeviceModal('disconnect')" style="font-size: 25px;">解除设备连接 ></div>
        <div class="menu-item" @click="openDeviceModal('sync')" style="font-size: 25px;">同步记录 ></div>
        <div class="menu-item" @click="openDeviceModal('update')" style="font-size: 25px;">检查设备更新 ></div>


        <div v-if="showDeviceModal" class="device-modal">
          <div class="modal-content">
            <h3 class="modal-title">{{ getModalTitle() }}</h3>

            <ul>
              <li
                  v-for="device in devices"
                  :key="device"
                  @click="selectDevice(device)"
                  :class="['device-item', { 'highlighted': selectedDevice === device }]"
              >
                {{ device }}
              </li>

            </ul>
            <div v-if="selectedDevice">
              <img :src="getDeviceImage(selectedDevice)" alt="设备图片" class="device-image">
              <div class="progress-bar">
                <div class="progress" :style="{ width: connectionProgress + '%' }"></div>
              </div>
              <p>{{ connectionProgress < 100 ? getActionText() : getSuccessText() }}</p>
            </div>
          </div>
        </div>





      </div>
    </div>
  </div>
</template>

<script>

import smartwatch from '@/assets/Sports/smartwatch.png';
import bloodpressure from '@/assets/Sports/bloodpressure.png';
import medicinebox from '@/assets/Sports/medicinebox.png';
import thermometer from '../../assets/Sports/thermometer.png';

export default {
  name: 'HealthInfo',
  data() {
    return {
      selectedType: 'day',
      selectedTime: null,
      timeOptions: [],
      chartData: [],
      xLabels: [],
      bpmRange: '',
      dailyData: {
        // 每天心率数据按小时分，举例
        '2024-09-01': [70, 65, 60, 75, 62, 68, 72, 70],
        '2024-09-02': [68, 62, 66, 70, 65, 62, 64, 70],
        // 更多数据...
      },
      monthlyData: {
        // 每月心率数据按天分，每三天一次，举例
        '2024-01': [65, 66, 70, 64, 72, 68, 70],
        '2024-02': [64, 63, 65, 67, 68, 66, 70],
        // 更多数据...
      },
      selectedYear: null,
      availableYears: [2023, 2024],
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月','11月','12月'],
      yearChartData: [],  // 替代 chartData
      yearTooltipText: '', // 替代 tooltipText
      showDeviceModal: false,
      selectedDevice: null,
      connecting: false,
      connectionProgress: 0,
      devices: ['智能手表', '血压计', '智能药盒', '体温计'],
      operationType: '', // 用于区分当前操作的类型
      deviceStatus: { // 管理设备连接状态，true 表示连接，false 表示未连接
        '智能手表': false,
        '血压计': false,
        '智能药盒': false,
        '体温计': false,
      }

    };
  },
  mounted() {
    this.onTypeChange();
    this.selectedYear = this.availableYears[0]; // 默认选择第一个年份
    this.handleYearChange(); // 初始化数据
    this.onTypeChange();
    this.selectedYear = this.availableYears[0];
    this.handleYearChange();
  },
  methods: {
    navigateToGroup() {
      this.$router.push('/group'); // 替换为你想要的路由路径
    },
    navigateToAI() {
      this.$router.push('/AI'); // 替换为你想要的路由路径
    },
    onTypeChange() {
      if (this.selectedType === 'day') {
        this.timeOptions = Object.keys(this.dailyData).map((date) => ({
          value: date,
          text: date,
        }));
      } else if (this.selectedType === 'month') {
        this.timeOptions = Object.keys(this.monthlyData).map((month) => ({
          value: month,
          text: month,
        }));
      }
      this.selectedTime = this.timeOptions[0].value;
      this.updateChart();
      this.updateXLabels(); // 更新横坐标标签
    },
    getDotColor(device) {
      return this.deviceStatus[device] ? '#4CAF50' : '#f06868'; // 连接状态为 true 时显示绿色，否则显示红色
    },
    openDeviceModal(operationType) {
      this.showDeviceModal = true;
      this.selectedDevice = null;
      this.connecting = false;
      this.connectionProgress = 0;
      this.operationType = operationType; // 设置当前的操作类型
    },
    selectDevice(device) {
      this.selectedDevice = device;
      this.startOperation();
    },
    startOperation() {
      this.connecting = true;
      const interval = setInterval(() => {
        if (this.connectionProgress < 100) {
          this.connectionProgress += 20; // 每秒进度增加20%
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (this.operationType === 'connect') {
              this.deviceStatus[this.selectedDevice] = true; // 连接成功，将状态设置为 true
            } else if (this.operationType === 'disconnect') {
              this.deviceStatus[this.selectedDevice] = false; // 解除连接成功，将状态设置为 false
            }
            this.closeDeviceModal(); // 在操作成功后自动关闭弹窗
          }, 1000); // 1秒后关闭弹窗
        }
      }, 1000);
    },

    closeDeviceModal() {
      this.showDeviceModal = false;
    },
    getDeviceImage(device) {
      const images = {
        '智能手表': smartwatch,
        '血压计': bloodpressure,
        '智能药盒': medicinebox,
        '体温计': thermometer,
      };
      return images[device];
    },
    getActionText() {
      const actionTexts = {
        connect: '正在连接',
        disconnect: '正在解除',
        sync: '正在同步',
        update: '正在检查更新',
      };
      return actionTexts[this.operationType];
    },
    getSuccessText() {
      const successTexts = {
        connect: '连接成功',
        disconnect: '解除成功',
        sync: '同步成功',
        update: '当前已是最新版本',
      };
      return successTexts[this.operationType];
    },
    getModalTitle() {
      const titles = {
        connect: '请选择要连接的设备',
        disconnect: '请选择要解除连接的设备',
        sync: '请选择要同步记录的设备',
        update: '请选择要检查更新的设备',
      };
      return titles[this.operationType];
    },
    showTooltipForSteps(value, event) {
      const tooltip = event.target.querySelector('.tooltip');
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';

      const offsetX = 15; // 向右偏移量
      const offsetY = 15; // 向下偏移量

      tooltip.style.position = 'fixed';
      tooltip.style.top = `${event.clientY + offsetY}px`;
      tooltip.style.left = `${event.clientX + offsetX}px`;

      // 计算步数/天的值
      const stepsPerDay = (value / 100) * 5000;
      tooltip.innerHTML = `${stepsPerDay.toFixed(0)} 步/天`; // 显示步数/天
    },
    hideTooltip(event) {
      const tooltip = event.target.querySelector('.tooltip');
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    },
    showTooltipForHeartRate(value, event) {
      const tooltip = event.target.querySelector('.tooltip');
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';

      const offsetX = 15; // 向右偏移量
      const offsetY = 15; // 向下偏移量

      tooltip.style.position = 'fixed';
      tooltip.style.top = `${event.clientY + offsetY}px`;
      tooltip.style.left = `${event.clientX + offsetX}px`;

      tooltip.innerHTML = `${value} BPM`; // 显示 BPM 值
    },
    handleYearChange() {
      if (this.selectedYear) {
        this.yearChartData = this.fetchChartDataForYear(this.selectedYear);
        this.yearTooltipText = this.fetchTooltipTextForYear(this.selectedYear);
      }
    },
    fetchChartDataForYear(year) {
      // 模拟不同年份的数据，可以根据实际数据来源来修改
      const data = {
        2023: [20, 40, 60, 80, 50, 30, 40, 60, 50,70,60,50],
        2024: [50, 70, 90, 30, 40, 60, 80, 20, 40,50,70,60],
      };
      return data[year] || [];
    },
    fetchTooltipTextForYear(year) {
      // 根据年份返回相应的提示文本
      const tooltipData = {
        2023: '5月~6月: 2,100步 / 天',
        2024: '5月~6月: 3,000步 / 天',
      };
      return tooltipData[year] || '';
    },
    updateChart() {
      if (this.selectedType === 'day') {
        this.chartData = this.dailyData[this.selectedTime];
      } else if (this.selectedType === 'month') {
        this.chartData = this.monthlyData[this.selectedTime];
      }
      this.updateBpmRange();
    },
    updateXLabels() {
      if (this.selectedType === 'day') {
        this.xLabels = [
          '0:00',
          '3:00',
          '6:00',
          '9:00',
          '12:00',
          '15:00',
          '18:00',
          '21:00',
        ]; // 0:00 到 21:00
      } else if (this.selectedType === 'month') {
        this.xLabels = ['1日', '6日', '11日', '16日', '21日', '26日', '31日']; // 每隔5天一次
      }
    },
    updateBpmRange() {
      if (this.chartData.length > 0) {
        const minBpm = Math.min(...this.chartData);
        const maxBpm = Math.max(...this.chartData);
        this.bpmRange = `${minBpm}~${maxBpm} BPM`;
      } else {
        this.bpmRange = '';
      }
    },
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #ffe9e9;

  font-family: Arial, sans-serif;
}

.container {
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffe9e9;
  padding: 20px;
}
.custom-select {
  position: relative;
  top: -35px; /* 向上移动10px */
  border-radius: 15px; /* 设置圆角矩形 */
  background-color: #f0b8b8; /* 设置背景颜色为橙色 */
  color: white; /* 设置文本颜色 */
  border: none; /* 去除默认边框 */

  font-size: 15px; /* 设置字体大小 */
  appearance: none; /* 去除默认的浏览器外观 */
  -webkit-appearance: none; /* 去除Webkit浏览器的默认外观 */
  -moz-appearance: none; /* 去除Mozilla浏览器的默认外观 */
  cursor: pointer; /* 鼠标悬停时显示为指针 */
  text-align: center; /* 文本左右居中 */
  width: 80px; /* 设置宽度为容器的100% */
  height: 30px;
}
.modal-title {
  display: inline-block;
  background-color: #f18585; /* 设置背景颜色 */
  padding: 10px 20px; /* 添加内边距 */
  border-radius: 15px; /* 设置圆角 */
  font-size: 1.2em; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  margin-bottom: 20px; /* 与下方内容的间距 */
  color: #333; /* 文本颜色 */
}
.device-item {
  display: block; /* 确保设备名称竖着排列 */
  background-color: #e0e0e0; /* 设置设备名称背景颜色 */
  padding: 8px 15px; /* 添加内边距 */
  border-radius: 10px; /* 设置圆角 */
  font-size: 1em; /* 字体大小 */
  margin-bottom: 10px; /* 与下方内容的间距 */
  color: #333; /* 文本颜色 */
  cursor: pointer; /* 鼠标指针变为手型 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
}

.device-item:hover {
  background-color: #d0d0d0; /* 悬停时的背景颜色 */
}

.highlighted {
  background-color: #f0b8b8; /* 黄色背景以高亮显示 */
  color: #333; /* 改变文本颜色以适应高亮背景 */
  border-radius: 5px; /* 可选：添加圆角 */
  padding: 5px 10px; /* 可选：增加内边距 */
}

.custom-select:focus {
  outline: none; /* 去除点击时的默认高亮边框 */
  box-shadow: 0 0 5px rgba(255, 165, 0, 0.5); /* 可选：添加点击时的阴影效果 */
}

.custom-select option {
  background-color: #ffffff; /* 下拉选项的背景色 */
  color: #333; /* 下拉选项的文字颜色 */
}


.y-axis-heart-rate {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px; /* 纵轴的高度 */
  margin-right: -5px; /* 调整与条形图之间的距离 */
  margin-left: -30px; /* 调整纵轴向左移动 */
  color: #888;
  font-size: 20px; /* 纵轴字体大小 */
  font-weight: bold; 
}

.module {
  background-color: #ffffff;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(221, 37, 37, 0.1);
  display: flex;
  align-items: center; /* 模块内部元素垂直居中 */
  justify-content: space-between; /* 模块内部元素水平分布 */
}

/* 特定模块的尺寸和位置调整 */
.greeting {
  position: relative;
  left: -200px;
  top: 50px;
  width: 800px;
  width: 900px;
  height: 150px;
  padding: 20px;
  left: -250px;
  top: 50px;
}
.device-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 确保在最上层 */
  width: 300px;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-content ul {
  list-style-type: none;
  padding: 0;
}

.modal-content li {
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: bold;
}

.modal-content li:hover {
  color: #ffe9e9; /* 可选：悬停时的颜色 */
}

.device-image {
  width: 80px;
  height: 80px;
  margin: 20px 0;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 20px;
}

.progress {
  height: 100%;
  background-color: #15a5be; /* 可选：进度条颜色 */
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

.heart-rate-module {
  position: relative;
  left: -200px;
  top: 80px;
  width: 400px;
  height: 200px;
  background-image: url('@/assets/Sports/Heart.png');
  background-size: 300px 300px;
  background-repeat: no-repeat; /* 避免图片重复 */
  background-position: 200px 50px;
}

.data-statistics-module {
  position: relative;
  left: -200px;
  top: 110px;
  width: 400px;
}

.join-sports-group {
  position: relative;
  left: -250px;
  top: 280px;
  width: 900px;
  background-color: #f0b8b8;
}

.ai-analysis {
  position: relative;
  left: 500px;
  top: 200px;
  width: 400px;
  background-image: url('@/assets/Sports/AI.png');
  background-size: 50px 50px;
  background-repeat: no-repeat; /* 避免图片重复 */
  background-position: 20px center;
}

.module2 {
  background-color: #ffffff;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(240, 151, 151, 0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列，每列占据一半宽度 */
  grid-gap: 20px; /* 网格项之间的间距 */
}

.aai-link {
  display: inline-block; /* Ensures margin and padding adjustments are effective */
  margin-left: 90px; /* Adjust the value as needed to move the text left */
  font-weight: bold;
  color: black;
  text-decoration: none; /* Optional: to remove underline if there is any */
}

.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px; /* Adjust width as needed */
  height: 120px; /* Adjust height as needed */
  background-color: #ffe9e9; /* Background color of the rectangle */
  border: 1px solid #e0e0e0; /* Border color and thickness */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: for slight shadow */
  margin: 10px; /* Space between each device */
  padding: 10px; /* Space inside the rectangle */
  text-align: center; /* Center text below the image */
  top:5px;
  left:5px;
}

.device img {
  width: 80px;
  height: 80px;
}

.device-overview {
  position: relative;
  left: 500px;
  top: -875px;
  width: 350px;
  height: 350px;
}

.device-management {
  position: relative;
  left: 420px;
  top: -750px;
  width: 800px;
}

/* General styles for the module */
.module4 {
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  top:200px;
  font-family: 'Arial', sans-serif;
  width: 900px;
  left: -250px;
}

.statistics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.statistics-title {
  font-size: 1.2em;
  font-weight: bold;
}

.month-selector {
  background-color: #fcecec;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1em;
  color: #333;
}

.chart-container {
  display: flex;
  position: relative;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px; /* Adjust as necessary */
  margin-right: 30px; /* Reduced the margin-right value */
  margin-left: -10px; /* Added margin-left to move it to the left */
  color: #888;
  font-size: 0.8em;
}

.bar-chart-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.bar1-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px; /* Adjust as necessary */
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px;
  width: 100%;
}

.bar1 {
  background-color: #fcbaba;
  border-radius: 5px;
  width: 20px; /* Adjust as necessary */
  position: relative;
}

.bar1:hover + .tooltip,
.bar1:hover::after {
  visibility: visible;
  opacity: 1;
}

.x-axis {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
  padding-left: 400px;
  font-size: 15px;
  color: #888;
  font-weight: bold; 
}

.x-axis div {
  flex: 1;
  text-align: center;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000; /* 确保 tooltip 显示在最上层 */
}

/* 其他元素的样式 */
.weather-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon,
.profile-pic,
.device img {
  width: 80px;
  height: 80px;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.module1 {
  background-color: #f0f8ff; /* Light blue background color */
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(221, 37, 37, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  left: -250px;
  top:120px;
}

.heart-rate-title,
.bpm-range {
  font-size: 18px;
  font-weight: bold; /* Make the text bold */
}

.bar-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100px; /* Adjust height as needed */
  margin-top: 10px;
}

.bar {
  width: 10px;
  background-color: #00bfff; /* Deep Sky Blue */
  margin: 0 2px;
  border-radius: 5px; /* Make the bars have rounded corners */
}

.ai-link,
.join-link {
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  color: #333;
}

.device {
  position: relative; /* 设置为相对定位 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item {
  font-size: 16px;
  color: #333;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}

.modulede {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px; /* Adjust width as necessary */
  left: 500px;
  font-family: 'Arial', sans-serif;
  top:-700px
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 10px; /* Rounded corners */
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f2f2f2; /* Optional: highlight on hover */
}

.menu-item.active {
  background-color: #fcecec; /* Background color for active item */
  font-weight: bold; /* Make text bold */
  color: #333; /* Text color */
}
.status-dot-smartwatch {
  width: 10px;
  height: 10px;

  border-radius: 50%;
  display: inline-block;
  position: absolute; /* 绝对定位 */
  top: 125px;
  left: 70px;
  z-index: 1000; /* 确保在所有元素上方 */
}
.status-dot-bloodpressure {
  width: 10px;
  height: 10px;

  border-radius: 50%;
  display: inline-block;
  position: absolute; /* 绝对定位 */
  top: 125px;
  left: 70px;
  z-index: 1000; /* 确保在所有元素上方 */
}
.status-dot-medicinebox {
  width: 10px;
  height: 10px;

  border-radius: 50%;
  display: inline-block;
  position: absolute; /* 绝对定位 */
  top: 125px;
  left: 70px;
  z-index: 1000; /* 确保在所有元素上方 */
}
.status-dot-thermometer {
  width: 10px;
  height: 10px;

  border-radius: 50%;
  display: inline-block;
  position: absolute; /* 绝对定位 */
  top: 125px;
  left: 70px;
  z-index: 1000; /* 确保在所有元素上方 */
}
</style>
