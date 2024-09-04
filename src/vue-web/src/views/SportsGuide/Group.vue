<template>
    <div id="group-page">
      <div class="container">
        
        <!-- 小组介绍模块 -->
        <div class="module group-intro">
          <h2>小组介绍</h2>
          <div class="group-list">
            <div v-for="(group, index) in groups" :key="index" class="group-item">
              <span class="group-name">{{ group.name }}</span>
              <div class="button-group">
                <button @click="viewIntro(group)" class="group-button">简介</button>
                <button @click="applyToJoin(group)" class="group-button apply-button">申请加入</button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 当前所在小组模块 -->
        <div class="module current-group">
          <h2>当前所在小组</h2>
          <div v-for="(group, index) in currentGroups" :key="index" class="current-group-item">
            <span class="group-name">{{ group.name }}</span>
            <button @click="viewMembers(group)" class="group-button">查看成员</button>
          </div>
        </div>
  
        <!-- 公共讨论区模块 -->
        <div class="module discussion-board">
          <h2>公共讨论区</h2>
          <div v-for="(discussion, index) in discussions" :key="index" class="discussion-section">
            <h3>{{ discussion.topic }}</h3>
            <div v-for="(post, index) in discussion.posts" :key="index" class="post-item">
              <span class="post-text">{{ post }}</span>
            </div>
            <button class="post-button " @click="navigateToTopic">进入话题</button>
          </div>
        </div>
      </div>
  
      <!-- 简介文本框 -->
      <div v-if="showIntroDialog" class="intro-dialog">
        <div class="dialog-content">
          <h3>{{ currentGroupIntro.name }} 简介</h3>
          <p>{{ currentGroupIntro.intro }}</p>
          <button @click="closeIntro" class="group-button">关闭</button>
        </div>
      </div>
  
      <!-- 申请加入表单 -->
      <div v-if="showApplyForm" class="apply-form-dialog">
        <div class="form-content">
          <h3>申请加入 {{ applyingGroup.name }}</h3>
          <form @submit.prevent="submitApplication">
            <div class="form-group">
              <label for="name">姓名：</label>
              <input type="text" v-model="applicantName" required />
            </div>
            <div class="form-group">
              <label for="contact">联系方式：</label>
              <input type="text" v-model="applicantContact" required />
            </div>
            <button type="submit" class="group-button apply-button">提交申请</button>
            <button type="button" @click="closeApplyForm" class="group-button">取消</button>
          </form>
        </div>
      </div>
  
      <!-- 成员详情弹出框 -->
      <div v-if="showMembersDialog" class="members-dialog">
        <div class="dialog-content">
          <h3>{{ selectedGroupName }} 成员列表</h3>
          <div v-for="(member, index) in selectedGroupMembers" :key="index" class="member-info">
            <img :src="getRandomAvatar()" alt="Random Avatar" class="member-avatar">
            <div class="member-details">
              <span class="member-name">{{ member.name }}</span>
              <span class="member-phone">{{ member.phone }}</span>
            </div>
          </div>
          <button @click="closeMembersDialog" class="group-button">关闭</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import person1 from '@/assets/Sports/person1.png';
  import person2 from '@/assets/Sports/person2.png';
  import person3 from '@/assets/Sports/person3.png';
  
  export default {
    name: 'GroupPage',
    data() {
      return {
        groups: [
          { name: '晨练小组', intro: '晨练小组是一个专为喜欢早起锻炼的社区成员而设的小组。我们每天早晨6点在社区公园集合，进行有氧运动、太极拳和轻松的步行活动。无论您的身体状况如何，我们的活动都适合各个水平，旨在帮助大家保持健康、增强体质，并享受清晨的美好时光。加入我们，开启您一天的活力之旅吧！' },
          { name: '步行爱好者', intro: '步行爱好者小组聚集了一群热爱步行的朋友。我们定期组织各种步行活动，探索社区内外的美景，从轻松的社区散步到稍具挑战性的远足活动应有尽有。步行不仅是一种锻炼方式，更是一种健康的生活态度。无论您是想保持体型还是单纯享受大自然的美景，这里都欢迎您的加入。' },
          { name: '健康饮食讨论组', intro: '健康饮食讨论组是一个致力于分享和学习健康饮食知识的社区。我们定期举办交流会，分享健康食谱、营养知识和饮食经验。无论您是希望改善饮食习惯，还是对健康烹饪感兴趣，这里都是一个与志同道合的朋友们交流的好地方。加入我们，一起探索如何通过健康饮食保持身体的活力与健康。' },
          // 更多小组...
        ],
        currentGroups: [
          { name: '晨练小组', members: [
            { name: '李奶奶', avatar: person1, phone: '123-456-7890' },
            { name: '王爷爷', avatar: person2, phone: '098-765-4321' },
            // 更多成员...
          ]},
          // 如果用户有多个小组，继续添加...
        ],
        discussions: [
          { topic: '健康饮食', posts: ['健康饮食的建议...', '大家早上吃什么？'] },
          { topic: '步行技巧', posts: ['步行时应该注意什么？', '如何提高步行耐力？'] },
          { topic: '晨练场地', posts: ['推荐一个好去处...', '哪里适合晨跑？'] },
          // 更多讨论区...
        ],
        selectedGroupMembers: [],
        selectedGroupName: '',
        showIntroDialog: false,
        currentGroupIntro: {
          name: '',
          intro: ''
        },
        showApplyForm: false,
        applyingGroup: {},
        applicantName: '',
        applicantContact: '',
        showMembersDialog: false,  // 控制成员详情弹出框的显示与隐藏
      };
    },
    methods: {
      navigateToTopic() {
    this.$router.push('/topic'); 
  },
      getRandomAvatar() {
        const avatarOptions = [person1, person2, person3];
        return avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
      },
      viewIntro(group) {
        // 显示小组简介的逻辑
        this.currentGroupIntro = group;
        this.showIntroDialog = true;
      },
      applyToJoin(group) {
        // 显示申请加入表单的逻辑
        this.applyingGroup = group;
        this.showApplyForm = true;
      },
      submitApplication() {
        if (this.applicantName && this.applicantContact) {
          const newMember = {
            name: this.applicantName,
            avatar: this.getRandomAvatar(), // 使用随机选择的头像
            phone: this.applicantContact
          };
  
          // 将新用户添加到 currentGroups 中对应的小组
          const groupIndex = this.currentGroups.findIndex(g => g.name === this.applyingGroup.name);
          if (groupIndex >= 0) {
            this.currentGroups[groupIndex].members.push(newMember);
          } else {
            this.currentGroups.push({
              name: this.applyingGroup.name,
              members: [newMember],
            });
          }
          this.closeApplyForm();
        }
      },
      closeIntro() {
        // 关闭简介对话框的逻辑
        this.showIntroDialog = false;
      },
      closeApplyForm() {
        // 关闭申请表单的逻辑
        this.showApplyForm = false;
        this.applicantName = '';
        this.applicantContact = '';
      },
      viewMembers(group) {
        // 显示小组成员列表的逻辑
        this.selectedGroupMembers = group.members;
        this.selectedGroupName = group.name;
        this.showMembersDialog = true;
      },
      closeMembersDialog() {
        // 关闭成员详情弹出框的逻辑
        this.showMembersDialog = false;
      }
    },
  };
  </script>
  
  <style scoped>
  #group-page {
    width: 100%;
    height: 100%;
    background-color: #ffe9e9;
    font-family: Arial, sans-serif;
  }
  
  .container {
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffe9e9;
    padding: 20px;
  }
  
  .module {
    background-color: #ffffff;
    border-radius: 30px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(221, 37, 37, 0.1);
    width: 400px;
    margin-bottom: 20px;
  }
  
  .group-intro {
  width: 1200px; /* 设置容器的宽度 */
  
  
}

  
  .group-name {
    font-size: 28px;
    margin-left: 100px; /* 调整小组名字向右移动 */
  }
  
  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .group-intro h2 {
    font-size: 28px; /* 如果需要，调整字体大小 */
    font-weight: bold;
    margin-bottom: 10px;
    white-space: nowrap; /* 防止文字换行 */
  }
  
  .group-list, .discussion-board {
    width: 1200px; /* 设置容器的宽度 */
  }
  
  .group-item, .current-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .button-group {
    display: flex;
    align-items: center;
  }
  
  .group-name, .member-name, .post-text {
    font-size: 20px;
  }
  
  .group-button {
    background-color: #f0b8b8;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .apply-button {
    background-color: #ff7373;
    margin-left: 5px; /* 调整两个按钮之间的间距 */
  }
  
  .member-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .member-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .discussion-section {
    margin-bottom: 20px;
  }
  
  .post-button {
    background-color: #f0b8b8;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .post-item {
    margin-bottom: 5px;
  }
  
  /* 简介文本框样式 */
  .intro-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    z-index: 1000;
  }
  
  .dialog-content h3 {
    margin-bottom: 10px;
    font-size: 20px;
  }
  
  .dialog-content p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .dialog-content .group-button {
    width: 100%;
    text-align: center;
    padding: 10px;
  }
  
  /* 申请表单样式 */
  .apply-form-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    z-index: 1000;
  }
  
  .form-content h3 {
    margin-bottom: 20px;
    font-size: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .form-content .group-button {
    width: 48%;
    text-align: center;
    padding: 10px;
    margin-right: 5%;
  }
  
  .current-group {
    background-color: #ffffff;
    border-radius: 30px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(221, 37, 37, 0.1);
    width: 1200px;  /* 调整当前所在小组模块的宽度 */
    margin-bottom: 20px;
  }
  
  .form-content .apply-button {
    width: 48%;
    margin-right: 10px;
    margin-bottom: 15px;  /* 增加提交按钮的底部间距 */
  }
  
  /* 成员详情弹出框样式 */
  .members-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    z-index: 1000;
  }
  
  .dialog-content .member-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .dialog-content .member-details {
    margin-left: 10px;
  }
  
  .dialog-content .member-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .dialog-content .member-phone {
    font-size: 14px;
    color: #555;
  }
  .discussion-board {
  width: 1200px;

}
  </style>
  