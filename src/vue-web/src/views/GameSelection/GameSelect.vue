<template>
  <div class="game-select">
    <div class="firstcontainer">
      <div class="game-box">
        <div class="content">
          <img src="@/assets/GameSelection/打地鼠.png" alt="打地鼠游戏" class="game-image" @click="navigateTo('Mouse')">
          <div class="description">
            <h3>打地鼠</h3>
            <p>当游戏开始时，地鼠会随机从洞中冒出。</p>
            <p>游戏的目标是用锤子打地鼠的头，使地鼠回到洞中，以增加玩家的分数。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏选择区域 -->
    <div class="tabs">
      <div
          v-for="tab in tabs"
          :key="tab"
          :class="['tab', { active: selectedTab === tab }]"
          @click="selectTab(tab)"
      >
        {{ tab }}
        <div v-if="selectedTab === tab" class="underline"></div>
      </div>
    </div>
    <div class="game-cards">
      <div
          v-for="game in filteredGames"
          :key="game.name"
          class="game-card"
      >
        <img :src="getImagePath(game.image)" :alt="game.name" class="game-image-card" @click="navigateTo(game.name)">
        <div class="game-name">{{ game.name }}</div>
      </div>
    </div>
    <!-- 游戏选择区域结束 -->

  </div>
</template>

<script>
const images = require.context('@/assets/GameSelection', false, /\.(png|jpe?g|svg)$/);

export default {
  name: 'GameSelection',
  data() {
    return {
      selectedTab: '所有',
      tabs: ['所有', '记忆', '协调', '推理', '创造力'],
      games: [
        { name: '打地鼠', image: '打地鼠.png', category: '协调' },
        { name: '数独', image: '数独.png', category: '推理' },
        { name: '2048', image: '2048.png', category: '推理' },
        { name: '卡牌记忆', image: '卡片记忆.png', category: '记忆' },
        { name: '诗词创作', image: '故事接龙图片.png', category: '创造力' },
      ],
    };
  },
  computed: {
    filteredGames() {
      if (this.selectedTab === '所有') {
        return this.games;
      }
      return this.games.filter(game => game.category === this.selectedTab);
    },
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    getImagePath(image) {
      return images(`./${image}`);
    },
    // 根据游戏名称跳转到对应的路由
    navigateTo(gameName) {
      const routes = {
        '打地鼠': 'Mouse',
        '数独': 'Sudoku',
        '2048': '2048',
        '卡牌记忆': 'memory',
        '诗词创作': 'poem',
      };
      this.$router.push({ name: routes[gameName] });
    },
  },
};
</script>

<style scoped>
.firstcontainer {
  background-color: #fee6dc;
  background: url("@/assets/GameSelection/GameSelectionbg.png");
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 60vh;
  width: 100%;
}

.game-box {
  background-color: #f4d6cf;
  opacity: 0.7;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  display: flex;
  align-items: center;
}

.game-image {
  max-width: 300px;
  height: auto;
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.game-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.description {
  color: #000;
}

.description h3 {
  margin: 0;
  font-size: 56px;
}

.description p {
  margin: 10px 0 0 0;
  font-size: 24px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  width: 100%;
}

.tab {
  position: relative;
  cursor: pointer;
  padding: 10px;
  font-size: 36px;
}

.tab.active {
  color: #00ced1;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #00ced1;
}

.game-cards {
  background-color: #fff6f3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.game-card {
  text-align: center;
  margin: 10px;
  padding: 10px;
  width: calc(33% - 20px);
  box-sizing: border-box;
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
}

.game-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.game-image-card {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s;
}

.game-name {
  margin-top: 10px;
  font-size: 36px;
}
</style>