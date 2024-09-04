<template>
    <div id="discussion-page">
      <div class="container">
        <!-- 讨论区标题和发布新话题按钮 -->
        <div class="header-row">
          <h2 class="discussion-title" style="font-size: 28px;">讨论区</h2>
          <button class="new-topic-button" @click="showNewTopicDialog = true">发布新话题</button>
        </div>
  
        <!-- 每个话题放在单独的模块中 -->
        <div v-for="(topic, index) in topics" :key="index" class="module topic-module">
          <h3>{{ topic.title }}</h3>
  
          <!-- 显示评论 -->
          <div class="comments-section">
            <div v-for="(comment, idx) in topic.comments" :key="idx" class="comment-item">
              <span class="commenter-name">{{ comment.name }}:</span>
              <span class="comment-text">{{ comment.text }}</span>
            </div>
          </div>
  
          <!-- 评论输入框 -->
          <div class="comment-box">
            <input 
              type="text" 
              v-model="topic.newComment" 
              placeholder="输入你的评论..." 
              class="comment-input"
            />
            <button @click="addComment(index)" class="comment-button">提交评论</button>
          </div>
        </div>
      </div>

      <!-- 新话题发布对话框 -->
      <div v-if="showNewTopicDialog" class="new-topic-dialog">
        <div class="dialog-content">
          <h3>发布新话题</h3>
          <input 
            type="text" 
            v-model="newTopicTitle" 
            placeholder="请输入话题标题" 
            class="new-topic-input"
          />
          <div class="dialog-actions">
            <button @click="publishNewTopic" class="comment-button">发布</button>
            <button @click="showNewTopicDialog = false" class="comment-button">取消</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'DiscussionPage',
    data() {
      return {
        topics: [
          {
            title: '健康饮食的建议',
            comments: [
              { name: '王爷爷', text: '我觉得少盐少油是最基本的原则，尤其是我们这个年纪。' },
              { name: '李奶奶', text: '多吃新鲜的蔬菜和水果，少吃加工食品，对身体有益。' },
            ],
            newComment: ''
          },
          {
            title: '大家早上吃什么？',
            comments: [
              { name: '张大爷', text: '我每天早上都吃小米粥配咸菜，简单又养胃。' },
              { name: '赵大妈', text: '我喜欢吃点全麦面包，再来一杯豆浆，营养丰富。' },
            ],
            newComment: ''
          },
          {
            title: '适合老年人的运动有哪些？',
            comments: [
              { name: '李爷爷', text: '我每天都会打太极拳，既锻炼身体，又能让心情平静。' },
              { name: '陈奶奶', text: '广场舞是我的最爱，可以和朋友们一起锻炼。' },
            ],
            newComment: ''
          },
          {
            title: '如何调节老年人的情绪？',
            comments: [
              { name: '王爷爷', text: '保持心态平和，不要太在意生活中的小事。' },
              { name: '刘奶奶', text: '多和子女沟通，分享自己的感受，减少孤独感。' },
            ],
            newComment: ''
          },
          // 更多话题...
        ],
        showNewTopicDialog: false,  // 控制新话题对话框的显示与隐藏
        newTopicTitle: '',  // 存储新话题的标题
      };
    },
    methods: {
      addComment(topicIndex) {
        if (this.topics[topicIndex].newComment.trim() !== '') {
          this.topics[topicIndex].comments.push({
            name: '我',
            text: this.topics[topicIndex].newComment
          });
          this.topics[topicIndex].newComment = '';
        }
      },
      publishNewTopic() {
        if (this.newTopicTitle.trim() !== '') {
          this.topics.push({
            title: this.newTopicTitle,
            comments: [],
            newComment: ''
          });
          this.newTopicTitle = '';
          this.showNewTopicDialog = false;
        }
      }
    }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffe9e9;
    padding: 20px;
  }
  
  .header-row {
    display: flex;
    justify-content: center; /* 将内容居中对齐 */
    align-items: center;
    width: 1000px;
    margin-bottom: 20px;
    position: relative;
  }
  
  .discussion-title {
    font-size: 24px;
    font-weight: bold;
    flex-grow: 1;
    text-align: center; /* 将标题文字居中 */
  }
  
  .new-topic-button {
    background-color: #f0b8b8;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    height: 30px;
    position: absolute;
    right: 0; /* 将按钮固定在右侧 */
  }
  
  .module {
    background-color: #ffffff;
    border-radius: 30px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(221, 37, 37, 0.1);
    width: 1200px;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    max-width: 300px; /* 设置标题的最大宽度 */
    word-wrap: break-word; /* 在单词内部进行换行 */
  }
  
  .comments-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .comment-item {
    margin-bottom: 10px;
    max-width: 300px; /* 设置评论文本的最大宽度 */
    word-wrap: break-word; /* 在单词内部进行换行 */
  }
  
  .commenter-name {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .comment-text {
    word-wrap: break-word;
    word-break: break-word; /* 确保长单词或文本在必要时换行 */
  }
  
  .comment-box {
    display: flex;
    margin-top: 10px;
  }
  
  .comment-input {
    flex-grow: 1;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid #ddd;
    margin-right: 10px;
  }
  
  .comment-button {
    background-color: #f0b8b8;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
  }

  /* 新话题发布对话框样式 */
  .new-topic-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  
  .dialog-content h3 {
    margin-bottom: 10px;
    font-size: 20px;
  }
  
  .new-topic-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 15px;
    border: 1px solid #ddd;
  }
  
  .dialog-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .dialog-actions .comment-button {
    flex: 1;
    margin-right: 10px;
  }
  </style>
