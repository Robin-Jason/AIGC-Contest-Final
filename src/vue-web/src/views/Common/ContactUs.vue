<template>
  <div class="contact-us-container">
    <!-- 联系信息 -->
    <div class="contact-info">
      <h2>联系信息</h2>
      <p>如果您在体验过程中有任何疑问或者修改建议以及任何其他的想法，欢迎向我们发送邮件进行交流，我们会尽可能快的回复您的邮件!</p>
      <p><strong>地址：</strong> 北京市大兴区观音寺街道金苑路24号</p>
      <p><strong>电话：</strong> 13537028898</p>
      <p><strong>邮箱：</strong> luowenbin@stu.pku.edu.cn</p>
    </div>

    <!-- 提交表单 -->
    <div class="contact-form">
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <input type="text" placeholder="你的名字" v-model="formData.name" />
          <input type="email" placeholder="你的邮箱" v-model="formData.email" />
        </div>
        <input type="text" placeholder="邮件标题" v-model="formData.subject" />
        <textarea placeholder="正文内容" v-model="formData.message"></textarea>
        <div class="form-actions">
          <button type="button" class="voice-input-btn" @click="startVoiceInput">🎤</button>
          <button type="submit" class="submit-btn">发送</button>
        </div>
      </form>
    </div>

    <!-- 地图展示 -->
    <div class="map-container">
      <iframe
          src="https://maps.google.com/maps?q=北京大学软件与微电子学院&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          style="border:0; width: 100%; height: 100%;"
          allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
    };
  },
  methods: {
    startVoiceInput() {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'zh-CN';
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.formData.message += transcript; // 语音输入到正文内容
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
      };
    },
    submitForm() {
      // 处理表单提交逻辑
      alert('表单已提交');
    },
  },
};
</script>

<style scoped>
.contact-us-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  grid-template-rows: auto 1fr; /* 自动高度行 */
  gap: 20px; /* 各区域之间的间距 */
  padding: 30px;
  background-color: #fef6f0;
}

.contact-info {
  grid-column: 1 / 2; /* 第一列 */
  grid-row: 1 / 2; /* 第一行 */
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  background-color: #fef6f0;
}

.contact-info h2 {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
}

.contact-info p {
  margin: 5px 0;
  line-height: 1.6;
}

.contact-form {
  grid-column: 2 / 3; /* 第二列 */
  grid-row: 1 / 2; /* 第一行 */
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 10px;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  resize: none;
  height: 100px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.voice-input-btn {
  background-color: #007bff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.map-container {
  grid-column: 1 / 3; /* 跨越两列 */
  grid-row: 2 / 3; /* 第二行 */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 300px; /* 固定高度 */
}
</style>