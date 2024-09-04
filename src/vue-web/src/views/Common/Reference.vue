<template>
  <div class="reference-container">
    <div class="reference-card" v-for="reference in references" :key="reference.id">
      <div class="reference-logo">
        <img :src="reference.logo" alt="Logo" />
      </div>
      <div class="reference-info">
        <h3 class="reference-title">{{ reference.title }}</h3>
        <p class="reference-authors">{{ reference.authors }}</p>
        <a :href="reference.link" class="reference-link" target="_blank">{{ reference.linkText }} ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reference',
  data() {
    return {
      references: [
        {
          id: 1,
          logo: require('@/assets/Reference/YezreelValleyCollege.jpg'),
          title: '认知训练可改善失眠老年人的睡眠质量和认知功能',
          authors: 'Haimov I, Shatil E (2013)',
          link: 'https://pubmed.ncbi.nlm.nih.gov/23577218/',
          linkText: '通过PubMed查看全文',
        },
        {
          id: 2,
          logo: require('@/assets/Reference/YezreelValleyCollege.jpg'),
          title: 'MS患者居家个性化认知训练：依从性和认知表现的研究',
          authors: 'Shatil E, Metzer A, Horvitz O, Miller A (2010)',
          link: 'https://pubmed.ncbi.nlm.nih.gov/20203380/',
          linkText: '通过PubMed查看全文',
        },
        {
          id: 3,
          logo: require('@/assets/Reference/YezreelValleyCollege.jpg'),
          title: '老年人的慢性失眠和认知功能',
          authors: 'Haimov I, Hanuka E, Horowitz Y (2008)',
          link: 'https://pubmed.ncbi.nlm.nih.gov/18412036/',
          linkText: '通过PubMed查看全文',
        },
        {
          id: 4,
          logo: require('@/assets/Reference/Hogskolen.jpg'),
          title: '痴呆症严肃游戏分类',
          authors: 'McCallum S., Boletsis C. (2013)',
          link: 'https://link.springer.com/chapter/10.1007/978-3-658-02897-8_17',
          linkText: '请参阅Springer的完整出版物',
        },
        {
          id: 5,
          logo: require('@/assets/Reference/GriffithUniversity.jpg'),
          title: '每天一次游戏能让认知衰退远离我们？对健康和有认知障碍老年人的商业大脑训练计划的系统回顾和荟萃分析',
          authors: 'Nguyen L., Murphy K., & Andrews G. (2021)',
          link: 'https://link.springer.com/article/10.1007/s11065-021-09515-2',
          linkText: '通过PubMed查看全文',
        },
        {
          id: 6,
          logo: require('@/assets/Reference/EinsteinCollege.jpg'),
          title: '认知训练是否可以提高行动能力，增强认知和促进神经激活？',
          authors: 'Marusic U., Verghese J., & Mahoney J. R. (2022)',
          link: 'https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2022.845825/full',
          linkText: '见全文文章',
        },
        {
          id: 7,
          logo: require('@/assets/Reference/UniversityOfHaifa.jpg'),
          title: '共同依赖（运动内思考[TIM]）与单一模式（CogniFit）干预对社区居住有认知障碍的老年人认知和步态的影响：一项随机对照研究',
          authors: 'Embon-Magal S., Krasovsky T., Doron I., et al. (2022)',
          link: 'https://bmcgeriatr.biomedcentral.com/articles/10.1186/s12877-022-03403-x',
          linkText: '见全文文章',
        },
      ],
    };
  },
};
</script>

<style scoped>
.reference-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f8ebe7;
}

.reference-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 80%;
}

.reference-logo img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.reference-info {
  flex-grow: 1;
}

.reference-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.reference-authors {
  font-size: 14px;
  color: #777;
}

.reference-link {
  font-size: 14px;
  color: #1e88e5;
  text-decoration: none;
}

.reference-link:hover {
  text-decoration: underline;
}
</style>