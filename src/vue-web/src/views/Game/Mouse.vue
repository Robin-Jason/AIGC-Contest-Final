<template>
  <div id="discussion-page">
    <div class="container">
      <div class="header-row">
        <h2 class="discussion-title">打地鼠小游戏</h2>
      </div>

      <div class="content-container">
        <!-- 新增历史分数模块 -->
        <div class="history-score-module">
          <h3>历史分数</h3>
          <p class="highest-score">历史最高成绩为：{{ highestScore }}</p>
          <ul class="score-list">
            <li v-for="(score, index) in scoreHistory" :key="index">
              <span>{{ score.time }}</span> - <span>{{ score.value }} 分</span>
            </li>
          </ul>
        </div>

        <!-- 打地鼠游戏区域 -->
        <div class="content">
          <header>
            <audio src="../../assets/Game/Mouse/1.mp3" ref="audio"></audio>
            <div>
              <div>
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="startGame"
                  :disabled="isClick"
                  class="custom-button">
                  开始游戏
                </el-button>

                <el-select v-model="level" placeholder="难度选择" @change="changelevel">
                  <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <span><i class="el-icon-s-flag"></i>分数: {{ count }}</span>
                <span><i class="el-icon-time"></i>倒计时: {{ time }} S</span>
              </div>
            </div>
          </header>
          <div class="row" v-for="y in size[1]" :key="y">
            <!--在老鼠被击中时 不能触发点击事件-->
            <div class="box" v-for="x in size[0]" :key="x" @click.stop.prevent="imgSrc !== imgList[1] && hitGround(x,y)">
              <img v-show="isShow(x,y)" :src="imgSrc" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Select } from 'element-ui';

export default {
  name: 'DiscussionPage',
  components: {
    elButton: Button,
    elSelect: Select,
  },
  data() {
    return {
      size: [5, 4],
      mouseId: null,
      site: [],
      count: 0,
      time: 30,
      timerId: null,
      isClick: false,
      level: null,
      levelOptions: [
        { label: '低难度', value: 0 },
        { label: '中难度', value: 1 },
        { label: '高难度', value: 2 },
      ],
      speed: 1500,
      imgList: [require('../../assets/Game/Mouse/3.jpg'), require('../../assets/Game/Mouse/5.jpg')],
      imgSrc: null,
      scoreHistory: [], // 用于存储历史分数
      highestScore: 0, // 历史最高分
    };
  },
  mounted() {
    const ua = navigator.userAgent;
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    const isAndroid = ua.match(/(Android)\s+([\d.]+)/);
    const isMobile = isIphone || isAndroid;
    if (isMobile) {
      this.size = [3, 3];
    }
  },
  methods: {
    ready() {
      if (this.time > 0) {
        this.imgSrc = this.imgList[0];
        this.randomSite();
        this.mouseId = setInterval(this.randomSite, this.speed);
      }
    },
    isShow(x, y) {
      return this.site[0] === x && this.site[1] === y;
    },
    randomSite() {
      const x = Math.floor(Math.random() * this.size[0] + 1);
      const y = Math.floor(Math.random() * this.size[1] + 1);
      this.site = [x, y];
    },
    spendTime() {
      this.timerId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          this.site = [];
          clearInterval(this.mouseId);
          clearInterval(this.timerId);
          this.isClick = false;
          this.updateScoreHistory();
          this.$message({
            message: '游戏结束',
            type: 'success',
            center: true,
            duration: 1000,
          });
        }
      }, 1000);
    },
    hitGround(x, y) {
      if (this.site[0] === x && this.site[1] === y && this.time > 0) {
        this.count++;
        this.imgSrc = this.imgList[1];
        this.$refs.audio.play();
        clearInterval(this.mouseId);
        setTimeout(() => {
          this.site = [];
        }, 300);
        setTimeout(() => {
          this.ready();
        }, (Math.random() + 1) * 1000);
      }
    },
    startGame() {
      this.$message({
        message: '游戏开始',
        type: 'success',
        center: true,
        duration: 1000,
      });
      this.time = 30;
      this.count = 0;
      this.ready();
      this.spendTime();
      this.isClick = true;
    },
    changelevel(val) {
      switch (val) {
        case 0:
          this.speed = 1500;
          break;
        case 1:
          this.speed = 1000;
          break;
        case 2:
          this.speed = 500;
          break;
        default:
          this.speed = 1500;
          break;
      }
    },
    updateScoreHistory() {
      const timestamp = new Date().toLocaleString();
      const newScore = { time: timestamp, value: this.count };
      this.scoreHistory.push(newScore);

      if (this.count > this.highestScore) {
        this.highestScore = this.count;
      }

      this.scoreHistory.sort((a, b) => b.value - a.value);
    },
  },
};
</script>

<style scoped>
#discussion-page {
  width: 100%;
  height: 100%;
  background-color: #ffe9e9;
  font-family: Arial, sans-serif;
}

.container {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffe9e9;
  padding: 20px;
}

.header-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin-bottom: 20px;
  position: relative;
}

.discussion-title {
  font-size: 24px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.history-score-module {
  background-color: #ffffff;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(221, 37, 37, 0.1);
  width: 300px;
  height: 500px;
  margin-right: 20px;
}

.history-score-module h3 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.highest-score {
  font-size: 18px;
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
}

.score-list {
  list-style-type: none;
  padding: 0;
  max-height: 250px;
  overflow-y: auto;
}

.score-list li {
  font-size: 16px;
  margin-bottom: 10px;
  text-align: left;
  color: #333;
}

.content-container {
  display: flex;
}

.custom-button {
  background-color: #eecacb !important;
  color: #120101 !important;
  border: none !important;
  box-shadow: none !important;
}

.content {
  height: 400px;
  width: 450px;
  margin-left: 10%;
}

header {
  width: 280px;
  margin-bottom: 40px;
  padding-left: 5px;
}

header > div div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.el-input__inner {
  width: 150px !important;
  height: 35px !important;
  line-height: 35px !important;
}

.row {
  display: flex;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  cursor: url('../../assets/Game/Mouse/4.jpg'), auto;
  border: 5px solid #f9d67f;
  border-radius: 10px;
  background-image: url('../../assets/Game/Mouse/2.jpg');
}

.box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
