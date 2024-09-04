<template>
  <div class="main-content">
    <!-- 综合训练卡片 -->
    <div class="card training-card">
      <div class="training-left">
        <div class="training-text">
          <h3 class="training-title">综合训练</h3>
          <p class="training-description">
            我们提供专业的训练为您加强最基本的认知能力。<br />
            我们将综合您的报告结果，为您安排个性化的学习进度。
          </p>
        </div>
      </div>
      <div class="training-right">
        <div class="training-action">
          <span class="target-score">今日目标是450分</span>
          <button class="start-button" @click="navigateTo('GameSelection')">现在开始</button>
        </div>
      </div>
    </div>

    <!-- 技能训练卡片 -->
    <div class="card skill-card">
      <div class="skill-left">
        <img src="@/assets/GameSelection/2048.png" alt="技能训练" class="skill-image" />
      </div>
      <div class="skill-right">
        <h3 class="skill-title">2048</h3>
        <p class="skill-description">训练技能</p>
        <button class="start-button" @click="navigateTo('2048')">现在开始</button>
      </div>
    </div>

    <!-- 认知领域卡片 -->
        <div class="cognition-field">
          <div class="cognition-left">
            <h3 class="cognition-title">认知领域</h3>
            <p class="cognition-description">认知功能结果</p>
          </div>
          <div class="cognition-right">
            <div class="card-image">
              <img src="@/assets/AfterLogin/认知领域.png" alt="认知领域图片">
            </div>
          </div>
        </div>


    <!-- 推荐训练项目卡片 -->
      <div class="card recommended-training">
        <div class="training-left">
          <h3 class="training-title">推荐训练项目</h3>
          <p class="training-subtitle">建议您每周锻炼三次<br />每次锻炼20分钟</p>
        </div>
        <div class="training-middle">
          <h4 class="training-option-title">推理</h4>
          <p class="training-option-description">建议您训练并提高计划</p>
          <button class="more-info-button" @click="navigateTo('GameSelection')">更多信息</button>
        </div>
        <div class="training-right">
          <h4 class="training-option-title">协调</h4>
          <p class="training-option-description">建议您训练并提高反应时间</p>
          <button class="more-info-button" @click="navigateTo('GameSelection')">更多信息</button>
        </div>
      </div>

    <!-- 认知技能卡片 -->
    <div class="card cognitive-skill-card">
      <div class="card-left">
        <h3 class="card-title">认知技能</h3>
        <p class="card-subtitle">结果仅适用50岁以上的人</p>
      </div>
      <div class="card-right">
        <div class="card-image">
          <img src="@/assets/AfterLogin/认知技能.png" alt="认知技能图片">
        </div>
      </div>
    </div>

    <!-- 每周训练计划卡片 -->
    <div class="weekly-plan-card">
      <h3>每周训练计划</h3>
      <div class="days-container">
        <div class="day" :class="{ completed: isCompleted(1) }">周一</div>
        <div class="day" :class="{ completed: isCompleted(2) }">周二</div>
        <div class="day" :class="{ completed: isCompleted(3) }">周三</div>
        <div class="day" :class="{ completed: isCompleted(4) }">周四</div>
        <div class="day" :class="{ completed: isCompleted(5) }">周五</div>
        <div class="day" :class="{ completed: isCompleted(6) }">周六</div>
        <div class="day" :class="{ completed: isCompleted(7) }">周日</div>
      </div>
      <p class="recommendation">建议您每周锻炼三次，每次锻炼20分钟</p>
    </div>

    <!-- 健康提醒卡片 -->
    <div class="health-reminder-card">
      <div class="header">健康提醒</div>
      <div class="content">
        <p>血压：</p>
        <p>血糖：</p>
        <p>心率：</p>
        <p>睡眠质量：</p>
        <button class="sync-button" @click="navigateTo('HealthInfo')">立即同步</button>
      </div>
    </div>

    <!-- 运动引导卡片 -->
    <div class="exercise-guide-card">
      <div class="header">运动引导</div>
      <div class="content">
        <p>步数：</p>
        <p>用时：</p>
        <p>最高心率：</p>
        <button class="start-exercise-button" @click="navigateTo('SportGuide')">开始运动</button>
      </div>
    </div>

    <!-- 情景聊天卡片 -->
    <div class="scenario-chat-card">
      <div class="left-section">
        <h3>情景聊天</h3>
        <p>定制您的个性化聊天AI</p>
      </div>
      <div class="right-section">
        <p class="welcome-text">欢迎您的到来~开始进行聊天吧！</p>
        <button class="experience-button" @click="navigateTo('AIChat')">立即体验</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AfterLogin',
  methods: {
    isCompleted(day) {
      // Replace this with actual logic to check if a day is completed
      return [1, 4, 6].includes(day); // Example: Mon, Thu, Sat are completed
    },
    // 跳转到指定的页面
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>


<style scoped>
.main-content {
  display: grid;
  grid-template-columns: 0.6fr 0.6fr 0.8fr; /* 3列布局 */
  gap: 20px; /* 卡片之间的间距 */
  padding: 100px;
  padding-top: 50px;
  background-color: #fef6f0;
}

.card {
  flex: 1 1 calc(50% - 1rem); /* Adjusts the width of the cards to align properly */
  margin-bottom: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s ease;
}

.card-image {
  flex: 0 0 100px; /* 固定宽度，可以根据需求调整 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.card-image img {
  width: 100%;
  height: auto;
}

/* 综合训练卡片 */
.training-card {
  grid-column: 1 / 3; /* 占据前两列 */
  display: flex;
  flex-direction: row; /* 左右并列布局 */
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
}

.training-left {
  flex: 3; /* 左侧区域占比 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.training-text {
  width: 80%; /* 占据左侧中间80%的区域 */
}

.training-title {
  margin: 0;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 50px;
}

.training-description {
  margin: 0;
  font-size: 20px;
  line-height: 1.6;
  color: #666;
}

.training-right {
  flex: 1; /* 右侧区域占比 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.training-action {
  width: 80%; /* 占据右侧中间80%的区域 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* 文字和按钮之间的间距 */
}

.target-score {
  font-size: 18px;
  margin-bottom: 100px;
  color: #ffa500;
}

.start-button {
  background-color: #f89d35;
  color: #ffffff;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: #d9862d;
}

.card:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

/* 技能训练卡片 */
.skill-card {
  display: flex;
  flex-direction: row; /* 左右并列布局 */
  padding: 10px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

.skill-left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skill-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
}

.skill-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding:30px;
}

.skill-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.skill-description {
  font-size: 12px;
  color: #666;
  margin: 0;
}

/* 认知领域卡片 */
.cognition-field {
  grid-column: 1/3;
  display: flex;
  flex-direction: row; /* 左右并列显示 */
  border-radius: 20px;
  overflow: hidden; /* 确保背景颜色不超出卡片范围 */
  flex: 1;
}

.cognition-left {
  flex: 1.5;
  background-color: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cognition-title {
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.cognition-description {
  margin: 50px 0 0;
  font-size: 24px;
  color: #666;
}

.cognition-right {
  flex: 2;
  background: rgba(255, 255, 255, 0.8); /* 白色虚化背景 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.cognition-text {
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
}

.evaluate-button {
  background-color: #f89d35;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.evaluate-button:hover {
  background-color: #d9862d;
}

/* 推荐训练项目卡片 */
.recommended-training {
  display: flex;
  flex-direction: row; /* 左中右布局 */
  background-color: #f0f0f0;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* 确保背景不溢出卡片 */
}

.recommended-training .training-left {
  flex: 2;
  background-color: #f0f0f0; /* 内部左侧区域也为灰色 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recommended-training .training-title {
  margin: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.recommended-training .training-subtitle {
  margin: 10px 0 0;
  font-size: 14px;
  color: #666;
}

.recommended-training .training-middle,
.recommended-training .training-right {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-left: 1px solid #ddd; /* 分隔线 */
  background-color: #fff;
}

.recommended-training .training-option-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.recommended-training .training-option-description {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.recommended-training .more-info-button {
  background-color: transparent;
  color: #d9862d;
  border: 1px solid #d9862d;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.recommended-training .more-info-button:hover {
  background-color: #d9862d;
  color: #fff;
}

/* 认知技能卡片 */
.cognitive-skill-card {
  grid-column: 1/3;
  display: flex;
  flex-direction: row; /* 左右并列显示 */
  border-radius: 20px;
  overflow: hidden; /* 确保背景颜色不超出卡片范围 */
  flex: 1;
}

.card-left{
  flex: 1.5;
  background-color: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.card-title {
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.card-subtitle {
  margin: 50px 0 0;
  font-size: 24px;
  color: #666;
}

.cognitive-skill-card .card-right {
  flex: 2;
  background: rgba(255, 255, 255, 0.8); /* 白色虚化背景 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.evaluation-message {
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
}

.continue-evaluation-button {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #e07a5f;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.continue-evaluation-button:hover {
  background-color: #d65f4f;
}

/* 每周训练计划卡片 */
.weekly-plan-card {
  background-color: #e6f7f7;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
}

.days-container {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}

.day {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: #fff;
  margin-top: 40px;
}

.day.completed {
  background-color: #a8d5a2;
  color: white;
}

.recommendation {
  margin-top: 50px;
  font-size: 14px;
  color: #555;
}

/* 健康提醒卡片 */
.health-reminder-card {
  background-color: #fff; /* 卡片背景颜色 */
  border-radius: 20px; /* 圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.header {
  background-color: #f0f0f0; /* 顶部区域背景颜色 */
  padding: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}

.content {
  padding: 15px 10px;
  text-align: left;
  margin-left: 20px;
}

p {
  margin: 10px 0;
  font-size: 18px;
}

.sync-button {
  display: block;
  margin: 10px auto;
  padding: 5px 15px;
  border: 1px solid #cc6633; /* 按钮边框颜色 */
  border-radius: 12px; /* 按钮圆角 */
  background-color: transparent; /* 透明背景 */
  color: #cc6633; /* 按钮文字颜色 */
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.sync-button:hover {
  background-color: #f7e3d3; /* 悬停时背景颜色 */
}

/* 运动引导卡片 */
.exercise-guide-card {
  background-color: #fff; /* 卡片背景颜色 */
  border-radius: 20px; /* 圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.header {
  background-color: #e0e0e0; /* 标题背景颜色 */
  padding: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-weight: bold;
  text-align: center;
}

.content {
  padding: 15px 10px;
  text-align: left;
}

p {
  margin: 10px 0;
  font-size: 16px;
}

.start-exercise-button {
  display: block;
  margin: 10px auto;
  padding: 5px 15px;
  border: 1px solid #cc6633; /* 按钮边框颜色 */
  border-radius: 12px; /* 按钮圆角 */
  background-color: transparent; /* 透明背景 */
  color: #cc6633; /* 按钮文字颜色 */
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.start-exercise-button:hover {
  background-color: #f7e3d3; /* 悬停时按钮背景颜色 */
}

/* 情景聊天卡片 */
.scenario-chat-card {
  display: flex;
  background-color: #f8f9fa; /* 卡片背景色 */
  border-radius: 20px; /* 卡片圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  overflow: hidden;
}

.left-section {
  background-color: #f0f0f0; /* 左侧背景色 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  width:20%;
}

.left-section h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.left-section p {
  font-size: 14px;
  margin-top: 10px;
  color: #333;
}

.right-section {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("../../assets/AI聊天.png");
}

.welcome-text {
  font-size: 16px;
  color: #777;
  margin-bottom: 20px;
}

.experience-button {
  padding: 10px 20px;
  border: 1px solid #cc6633; /* 按钮边框颜色 */
  border-radius: 20px; /* 按钮圆角 */
  background-color: transparent; /* 按钮背景透明 */
  color: #cc6633; /* 按钮文字颜色 */
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  margin-top: 80px;
}

.experience-button:hover {
  background-color: #f7e3d3; /* 悬停时按钮背景色 */
}

.evaluate-button,
.sync-button,
.start-exercise-button,
.chat-button,
.more-info-button {
  background-color: #f89d35;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.evaluate-button:hover,
.sync-button:hover,
.start-exercise-button:hover,
.chat-button:hover,
.more-info-button:hover {
  background-color: #d9862d;
}

.day {
  padding: 10px;
  border-radius: 50%;
  background-color: #e0e0e0;
  text-align: center;
  font-size: 14px;
}

.day.active {
  background-color: #4caf50;
  color: #fff;
}

.chat-input {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px;
  margin-top: 10px;
  width: 100%;
}
</style>