<template>
  <div>
    <!-- section 1 总体目标 -->
    <div class="main-content">
      <div class="image-container">
        <img src="../../assets/HomeContent/总体目标配图.png" alt="目标图片">
      </div>
      <div class="content-box">
        <h1>我们致力于保持您的至亲认知健康</h1>
        <p>测试并帮助提高大脑的敏锐</p>
        <button @click="handleClick">现在开始</button>
      </div>
    </div>

    <!-- section 1和2 过渡区域 -->
    <div class="transition-section">
      <p>健康是智慧的条件，快乐的标志</p>
      <img src="../../assets/HomeContent/transition_pic.png" alt="过渡图片"> <!-- 根据实际图片路径更改 -->
    </div>

    <!-- section 2 评估测试 -->
    <div class="additional-content">
      <div class="phones">
        <img src="../../assets/HomeContent/手机.png" alt="手机图片">
      </div>
      <div class="text-content">
        <h2>发现您的认知优势和劣势</h2>
        <p>我们的评估可以测试多种认知技能</p>
        <button @click="handleClick">现在开始测试你的大脑</button>
      </div>
    </div>

    <!-- section 3 认知锻炼 -->
    <div class="cognitive-training" style="background-image: url('../../assets/HomeContent/section3bg.png');">
      <h2>轻松愉快地进行认知锻炼</h2>
      <p>我们的团队设计了这些游戏，希望您能在娱乐的同时锻炼认知能力</p>
      <div class="game-grid">
        <div class="game-item">
          <img src="../../assets/HomeContent/打地鼠.png" alt="打地鼠">
        </div>
        <div class="game-item">
          <img src="../../assets/HomeContent/贪吃蛇.png" alt="贪吃蛇">
        </div>
        <div class="game-item">
          <img src="../../assets/HomeContent/数独.png" alt="数独">
        </div>
        <div class="game-item">
          <img src="../../assets/HomeContent/2048.png" alt="2048">
        </div>
        <div class="game-item">
          <img src="../../assets/HomeContent/卡片记忆.png" alt="记忆游戏">
        </div>
        <div class="game-item">
          <img src="../../assets/HomeContent/疯狂的数字.png" alt="疯狂的数字">
        </div>
      </div>
    </div>

    <!-- section 4 评估指标 -->
    <div class="home-section">
      <div class="top-section">
        <div class="row">
          <div class="column">
            <img src="../../assets/HomeContent/指标1.png" alt="指标1" class="image" />
          </div>
          <div class="column">
            <img src="../../assets/HomeContent/指标2.png" alt="指标2" class="image" />
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="text-container">
              <h2>发现您的每一个进步</h2>
              <p>记录您的认知训练过程和脚步，帮助您更好地保持认知健康</p>
              <button class="start-button" @click="handleClick">现在开始</button>
            </div>
          </div>
          <div class="column">
            <img src="../../assets/HomeContent/每周训练计划.png" alt="每周训练计划" class="image" />
          </div>
        </div>
      </div>
      <div class="bottom-section">
        <div class="result-report">
          <h2>结果报告</h2>
          <button class="sample-button" @click="handleClick">参见示例</button>
        </div>
        <img src="../../assets/HomeContent/评估报告.png" alt="评估报告" class="report-image" />
      </div>
    </div>

    <!-- section 5 AI chat -->
    <div class="ai-chat-section">
      <div class="content">
        <div class="text-container">
          <h1>AI情景聊天</h1>
          <h2>为您的生活增添乐趣</h2>
          <p>搭载蓝心大模型</p>
          <p>为您定制不同性格的AI聊天模式</p>
          <p>满足您的个性化社交需求</p>
          <button class="experience-button" @click="handleClick">立即体验</button>
        </div>
      </div>
    </div>

    <!-- section 6 health assistant -->
    <div class="health-assistant-section">
      <div class="content">
        <div class="text-container">
          <h1>健康状况小助手</h1>
          <p>实时录入您的个人运动情况和健康信息</p>
          <p>帮助您更好进行日常锻炼和身体健康管理</p>
          <p>您的身体健康能够了然于胸</p>
        </div>
      </div>
    </div>

    <!-- section 7 cognitive health -->
    <div class="cognitive-health-section">
      <div class="content">
        <div class="text-container">
          <h1>什么是认知健康？</h1>
          <p>
            认知健康是指大脑功能，例如注意力、学习、记忆、语言和执行功能。这包括更高阶的功能，例如决策、目标设定、计划和判断。
          </p>
          <p>
            研究表明，来自许多不同种族和族裔的人们对于组成健康的大脑有着一套核心信念。他们最常将认知健康描述为“保持敏锐”或“头脑正常”。他们通常将其定义为生活到高龄，身体健康并具有积极的精神面貌。它们还包括保持警惕，具有良好的记忆力以及参与社交活动。
          </p>
          <button class="start-button" @click="handleClick">现在开始</button>
        </div>
        <div class="image-container">
          <img src="../../assets/HomeContent/认知健康配图.png" alt="Cognitive Health" class="cognitive-image" />
        </div>
      </div>
    </div>

    <!-- section 7 cognitive game -->
    <div class="cognitive-games-section">
      <div class="content">
        <div class="text-container">
          <h1>认知游戏</h1>
          <p>
            认知游戏程序提供了一种方便快捷的思维锻炼方法。通过问题解决、记忆回忆、注意力训练、文字游戏等活动，您可以在享受趣味的同时挑战自己的认知能力。
          </p>
          <p>
            这些游戏可以根据您的特定需求和偏好进行定制，更容易保持积极性并参与活动。那么，为什么不锻炼一下您的大脑呢？现在就是让您的神经元放电并开始锻炼脑细胞的最佳时机！
          </p>
          <button class="start-button" @click="handleClick">现在开始</button>
        </div>
        <div class="image-container">
          <img src="../../assets/HomeContent/认知测试.png" alt="Cognitive Games" class="cognitive-image" />
        </div>
      </div>
    </div>

    <!-- section 8 brain health -->
    <div class="brain-health-section">
      <div class="content">
        <div class="text-container">
          <h1>大脑健康</h1>
          <p>
            除了身体健康之外，大脑健康的重要性也不容低估。它对于维持我们先进的认知功能、情绪健康和整体生活质量至关重要。保持大脑活跃可以提高解决问题的能力、增强记忆力、提高注意力和注意力，并防止认知能力下降。
          </p>
          <p>
            定期锻炼、保持均衡饮食、充足睡眠、积极参与社交和参与大脑训练活动都是大脑健康的关键组成部分。
          </p>
          <button class="start-button" @click="handleClick">现在开始</button>
        </div>
        <div class="image-container">
          <img src="../../assets/HomeContent/大脑健康配图.png" alt="Brain Health" class="brain-image" />
        </div>
      </div>
    </div>

    <div class="elderlyCognitive-health-section">
      <div class="content">
        <div class="image-container">
          <img src="../../assets/HomeContent/老年人认知健康.png" alt="Cognitive Health" class="cognitive-image" />
        </div>
        <div class="text-container">
          <h1>认知健康</h1>
          <p>
            管理健康状况对于避免认知健康问题至关重要。任何用于改善认知健康的有效脑部健康计划，包括定期运动、充足的睡眠和以植物为基础的饮食。可以提供认知健康支持的其他步骤包括：培养社交联系、控制压力以及继续挑战大脑。
          </p>
          <p>
            通过避免健康问题，患者可以控制环境和生活方式的危险因素。心脏病、糖尿病、中风和抑郁症以及脑损伤等问题都是会干扰心理功能的因素。禁止药物或药物使用不当以及缺乏体育锻炼可导致认知能力下降。其他因素包括不良饮食、吸烟、饮酒过多和睡眠问题。
          </p>
          <button class="start-button" @click="handleClick">现在开始</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getAccessToken } from '@/utils/auth'

export default {
  name: 'HomeContent',
  methods: {
    handleClick() {
      if (getAccessToken()) {
        this.$router.push({ name: 'AfterLogin' }); // 如果已登录，跳转到 AfterLogin 页面
      } else {
        this.$router.push({ name: 'login' }); // 如果未登录，跳转到 Login 页面
      }
    }
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: #fdece4;
  height: calc(100vh - 80px); /* 减去头部的高度 */
}

/* section 1 总体目标 */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  padding: 60px; /* 确保图片不紧贴父容器 */
}

.image-container img {
  width: 100%;
  height: auto; /* 保持图片的宽高比 */
  border-radius: 10px; /* 圆角 */
}

.content-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff5f0;
  padding: 80px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  flex: 3;
  margin-left: 20px;
  margin-right: 80px;
}

.content-box h1 {
  color: #2a9d8f;
  font-size: 42px; /* 增大字体 */
  margin-bottom: 10px;
  text-align: center; /* 居中对齐 */
}

.content-box p {
  color: #6b705c;
  margin-bottom: 20px;
  font-size: 24px; /* 增大字体 */
  text-align: center; /* 居中对齐 */
}

.content-box button {
  background-color: #d2691e;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px; /* 增大字体 */
}

.content-box button:hover {
  background-color: #e07a5f;
}

/* section 1&2 过渡区域 */
.transition-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b0c4de; /* 过渡区域背景色 */
  padding: 20px;
  text-align: center;
}

.transition-section p {
  font-size: 24px;
  color: white;
}

.transition-section img {
  height: 40px; /* 根据需要调整图片大小 */
}

/* section 2 评估测试 */
.additional-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffe5d4; /* 新增内容区域背景色 */
  padding: 40px 20px;
}

.phones {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.phones img {
  width: 100%;
  height: auto; /* 保持图片的宽高比 */
  max-width: 600px; /* 限制最大宽度 */
}

.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
}

.text-content h2 {
  color: #2a9d8f;
  font-size: 42px; /* 增大字体 */
  margin-bottom: 10px;
}

.text-content p {
  color: #6b705c;
  margin-bottom: 20px;
  font-size: 20px; /* 增大字体 */
}

.text-content button {
  background-color: #d2691e;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 36px; /* 增大字体 */
}

.text-content button:hover {
  background-color: #e07a5f;
}

/* section 3 认知锻炼 */
.cognitive-training {
  text-align: center;
  padding: 20px;
  background-color: #fceae8;
}

.cognitive-training h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.cognitive-training p {
  font-size: 16px;
  margin-bottom: 20px;
}

.game-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.game-item {
  width: 350px;
  height: 250px;
  margin: 20px;
  border-radius: 15px;
  overflow: hidden;
}

.game-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* section 4 评估指标 */
.home-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-section {
  background-color: #fbe7e7;
  width: 100%;
  padding: 20px;
  padding-bottom: 150px;
}

.bottom-section {
  background-color: #d6e8e8;
  width: 100%;
  padding: 20px;
  position: relative;
  text-align: left;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 50px;
  padding: 10px;
}

.image {
  width: 100%;
  max-width: 600px;
}

.text-container {
  text-align: left;
}

.text-container h2 {
  font-size: 56px;
}

.text-container p {
  font-size: 24px;
}

.start-button,
.sample-button {
  background-color: transparent;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 32px;
  margin-top: 10px;
  border: 1px solid black;
}

.start-button:hover,
.sample-button:hover {
  background-color: #d0733b;
}

.result-report {
  margin-left: 300px;
  margin-bottom: 30px;
}

.result-report h2 {
  font-size: 42px;
}

.report-image {
  width: 100%;
  max-width: 400px;
  position: absolute;
  bottom: -20px; /* Adjust to position the image properly */
  right: 300px;
}

/* section 5 AI chat */
.ai-chat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/HomeContent/AIChatbg.png');
  background-size: cover;
  background-position: center;
  padding: 40px;
  min-height: 600px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.ai-chat-section .text-container {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  margin-left: 500px;
}

.text-container h1 {
  font-size: 56px;
  margin-bottom: 10px;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
}

.experience-button {
  background-color: #ffffff;
  color: #00796b;
  padding: 10px 20px;
  border: 2px solid #00796b;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.experience-button:hover {
  background-color: #00796b;
  color: #ffffff;
}

/* section 6 health assistant */
.health-assistant-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/HomeContent/健康状况小助手bg.png');
  background-size: cover;
  background-position: center;
  padding: 40px;
  min-height: 600px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.health-assistant-section .text-container {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  margin-left: 500px; /* 向右平移 */
}

.health-assistant-section h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.health-assistant-section p {
  font-size: 18px;
  margin-bottom: 10px;
}

/* section 7 cognitive health */
.cognitive-health-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbe7e7;
  padding: 40px;
}

.cognitive-health-section .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.cognitive-health-section .text-container {
  flex: 2;
  padding: 20px;
}

.cognitive-health-section .image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.cognitive-health-section .cognitive-image {
  max-width: 100%;
  height: auto;
}

.cognitive-health-section h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.cognitive-health-section p {
  font-size: 18px;
  margin-bottom: 20px;
}

.cognitive-health-section .start-button {
  background-color: #f08d49;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.cognitive-health-section .start-button:hover {
  background-color: #d0733b;
}

/* section 8 cognitive game */
.cognitive-games-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff2ec;
  padding: 40px;
}

.cognitive-games-section .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.cognitive-games-section .text-container {
  flex: 2;
  padding: 20px;
}

.cognitive-games-section .image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.cognitive-games-section .cognitive-image {
  max-width: 100%;
  height: auto;
}

.cognitive-games-section h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.cognitive-games-section p {
  font-size: 18px;
  margin-bottom: 20px;
}

.cognitive-games-section .start-button {
  background-color: #f08d49;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.cognitive-games-section .start-button:hover {
  background-color: #d0733b;
}

/* section 8 brain health */
.brain-health-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbe7e7;
  padding: 40px;
}

.brain-health-section .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.brain-health-section .text-container {
  flex: 2;
  padding: 20px;
}

.brain-health-section .image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.brain-health-section .brain-image {
  max-width: 100%;
  height: auto;
}

.brain-health-section h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.brain-health-section p {
  font-size: 18px;
  margin-bottom: 20px;
}

.brain-health-section .start-button {
  background-color: #f08d49;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.brain-health-section .start-button:hover {
  background-color: #d0733b;
}

/* section 9 elderlyCognitive health */
.elderlyCognitive-health-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbe7e7;
  padding: 40px;
}

.elderlyCognitive-health-section .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.elderlyCognitive-health-section .text-container {
  flex: 2;
  padding: 20px;
}

.elderlyCognitive-health-section .image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.elderlyCognitive-health-section .cognitive-image {
  max-width: 100%;
  height: auto;
}

.elderlyCognitive-health-section h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.elderlyCognitive-health-section p {
  font-size: 18px;
  margin-bottom: 20px;
}

.elderlyCognitive-health-section .start-button {
  background-color: #f08d49;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.elderlyCognitive-health-section .start-button:hover {
  background-color: #d0733b;
}
</style>