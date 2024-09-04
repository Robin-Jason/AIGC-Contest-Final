<template>
  <footer>
    <div class="footer-container">
      <div class="footer-logo">
        <img src="../assets/logo.png" alt="Logo">
        <h2>颐智</h2>
        <p>给老人更多的关爱是我们<br>应当一直努力的方向和一致的共识</p>
      </div>
      <div class="footer-links">
        <h3>常用链接</h3>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/game-select">大脑游戏</router-link></li>
          <li><router-link to="/HealthInfo">健康提醒</router-link></li>
          <li><router-link to="/SportGuide">运动引导</router-link></li>
          <li><router-link to="/AIChat">情景聊天</router-link></li>
          <li><router-link to="/Reference">科学验证</router-link></li>
          <li><router-link to="/ContactUs">联系我们</router-link></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h3>联系我们</h3>
        <p>地址：北京市大兴区观音寺街道金苑路24号</p>
        <p>电话：13537028898</p>
        <p>邮箱：luowenbin@stu.pku.edu.cn</p>
        <img src="../assets/qrcode.png" alt="QR Code">
      </div>
    </div>
    <div class="footer-bottom">
      <p>Copyright AI帕鲁.elf All Rights Reserved</p>
      <p>Designed by Robin&Jane</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

.footer-logo {
  text-align: center;
}

.footer-logo img {
  height: 50px;
}

.footer-logo h2 {
  margin: 10px 0;
}

.footer-logo p {
  line-height: 1.5;
}

.footer-links, .footer-contact {
  text-align: left;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  font-size: 24px;
}

.footer-links li {
  margin: 5px 0;
}

.footer-links a {
  color: #fff;
  text-decoration: none;
}

.footer-contact p {
  margin: 5px 0;
}

.footer-contact img {
  height: 100px;
  margin-top: 10px;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid #555;
  padding: 10px 0;
  margin-top: 20px;
}

.footer-bottom p {
  margin: 5px 0;
}
</style>