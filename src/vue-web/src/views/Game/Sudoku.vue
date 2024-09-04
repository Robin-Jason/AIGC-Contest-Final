<template>
  <div class="sudoku-container">
    <div class="header">
      欢迎来到数独游戏训练
    </div>
    <div class="main-content">
      <div class="left-panel">
        <el-card class="sudoku-card">
          <div class="profile-section">
            <!-- 添加难度选择下拉菜单 -->
            <el-select v-model="difficulty" placeholder="选择难度">
              <el-option label="简单" value="easy"></el-option>
              <el-option label="中等" value="medium"></el-option>
              <el-option label="困难" value="hard"></el-option>
            </el-select>
            <!-- 显示计时器 -->
            <div class="timer">时间: {{ elapsedTime }} 秒</div>
          </div>
          <div class="game-and-buttons">
            <div class="game-area">
              <div class="sudoku-grid">
                <div
                    v-for="(cell, index) in cells"
                    :key="index"
                    class="sudoku-cell"
                    :class="{ fixed: cell.fixed }"
                >
                  <input
                      ref="input-{{ index }}"
                      type="number"
                      min="1"
                      max="9"
                      v-model.number="cell.value"
                      :disabled="cell.fixed"
                      @keypress="handleKeyPress($event, index)"
                  />
                </div>
              </div>
            </div>
            <div class="button-section">
              <div class="button-group">
                <el-button class="button" type="primary" @click="generateSudoku">生成</el-button>
                <el-button class="button" type="warning" @click="resetGame">重置</el-button>
                <el-button class="button" type="info" @click="fillGrid">填充</el-button>
                <el-button class="button" type="default" @click="provideHint">提示</el-button>
                <el-button class="button" type="primary">检查</el-button>
                <el-button class="button" type="primary" @click="checkSolution">验证</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="right-panel">
        <div class="history">
          历史训练记录
          <ul>
            <li v-for="(record, index) in historyRecords" :key="index">
              {{ record.date }} - 难度: {{ record.difficulty }} - 用时: {{ record.time }}秒 - 提示: {{ record.hints }}次 - 分数: {{ record.score }} - 结果: {{ record.result }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sudoku from 'sudoku';
export default {
  data() {
    return {
      cells: Array.from({ length: 81 }, () => ({ value: 0, fixed: false })),
      difficulty: 'easy', // 默认难度
      timer: null,
      elapsedTime: 0,
      hintsUsed: 0, // 用于跟踪提示次数
      historyRecords: [], // 历史记录数组
    };
  },
  created() {
    this.generateSudoku();
  },
  methods: {
    generateSudoku() {
      let puzzle, solution;
      do {
        puzzle = sudoku.makepuzzle();
        solution = sudoku.solvepuzzle(puzzle);
      } while (!solution);

      this.cells = puzzle.map((value, index) => ({
        value: value === null ? 0 : value + 1,
        fixed: value !== null,
      }));
      this.solution = solution.map(value => value + 1);
      this.resetTimer();
      this.startTimer();
    },
    resetGame() {
      this.cells.forEach((cell) => {
        if (!cell.fixed) {
          cell.value = 0;
        }
      });
      this.resetTimer();
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer); // 确保之前的计时器被清除
      }
      this.timer = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    },
    resetTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.elapsedTime = 0;
    },
    checkSolution() {
      const validGroup = (group) => {
        const seen = new Set();
        for (let i = 0; i < 9; i++) {
          const num = group[i].value;
          if (num < 1 || num > 9 || seen.has(num)) return false;
          seen.add(num);
        }
        return true;
      };

      // 检查行、列和小方块
      for (let i = 0; i < 9; i++) {
        const row = this.cells.slice(i * 9, i * 9 + 9);
        const col = this.cells.filter((_, index) => index % 9 === i);
        const box = this.cells.filter(
            (_, index) =>
                Math.floor(index / 27) === Math.floor(i / 3) &&
                Math.floor((index % 9) / 3) === i % 3
        );
        if (!validGroup(row) || !validGroup(col) || !validGroup(box)) {
          this.$message.error("解答错误，请再试一次！");
          return;
        }
      }

      // 如果解答正确，停止计时器并计算得分
      clearInterval(this.timer);
      const date = new Date().toLocaleDateString();
      const baseScore = 1000;
      const timePenalty = this.elapsedTime * 2; // 用时惩罚因子
      const hintPenalty = this.hintsUsed * 50; // 提示次数惩罚因子
      const score = Math.max(baseScore - timePenalty - hintPenalty, 0); // 确保分数不为负

      // 更新历史记录
      this.historyRecords.push({
        date: date,
        difficulty: this.difficulty === 'easy' ? '简单' : this.difficulty === 'medium' ? '中等' : '困难',
        time: this.elapsedTime,
        hints: this.hintsUsed,
        score: score,
        result: '成功',
      });

      this.$message.success(`恭喜你！解答正确！用时：${this.elapsedTime} 秒，得分：${score}`);
    },
    provideHint() {
      // 示例提示逻辑：找到一个空的可填入的正确值的位置
      const emptyCells = this.cells
          .map((cell, index) => ({ cell, index }))
          .filter(({ cell }) => !cell.fixed && cell.value === 0);
      if (emptyCells.length > 0) {
        const randomEmpty = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const correctValue = this.solution[randomEmpty.index];
        this.cells[randomEmpty.index].value = correctValue;
        this.hintsUsed++;
      } else {
        this.$message.warning("没有可以提示的位置！");
      }
    },
  },
};
</script>

<style scoped>
.sudoku-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff6f3;
}

.header, .left-panel, .right-panel, .footer {
  background-color: #fff;
  border: 1px solid #dcdcdc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.left-panel, .right-panel {
  flex: 1;
  background-color: #f7ebe4
}

.right-panel{
  background-color: #fbf5f2;
}

.sudoku-card {
  width: 100%;
}

.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timer {
  font-size: 1.2em;
  font-weight: bold;
}

.game-area {
  margin-top: 20px;
}

.sudoku-grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 5px;
}

.sudoku-cell {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sudoku-cell input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.2em;
}

.sudoku-cell.fixed input {
  background-color: #e0e0e0;
}

.button-section {
  margin-top: 20px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.history {
  font-size: 1em;
  font-weight: bold;
  text-align: center;
}

.history-table th, .history-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.history-table th {
  background-color: #f2f2f2;
}

.history-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.history-table tr:hover {
  background-color: #ddd;
}

</style>