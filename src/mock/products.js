export const products = [
  {
    id: 1,
    name: '中式极简泡茶杯',
    category: 'cup',
    markets: ['UK', 'FR', 'DE', 'DK'],
    price: 29.9,
    tags: ['中式美学', '环保', '耐用'],
    description: '以中国茶文化为核心，融合欧洲极简审美的泡茶杯。',

    hero: {
      image: '/images/teacup.jpg',
      alt: '中式极简泡茶杯',
    },

    highlights: [
      {
        title: '极简器型',
        text: '线条克制、日常耐看，融入欧洲家居风格。',
      },
      {
        title: '环保耐用',
        text: '强调可持续与长生命周期使用体验。',
      },
      {
        title: '泡茶一体',
        text: '满足“热饮 + 慢生活”场景，适配居家与办公。',
      },
    ],

    marketFit: [
      {
        code: 'DE',
        title: '德国：理性务实 + 功能耐用',
        text: '突出耐用性与功能性；设计语言更偏“形式追随功能”的简洁理性。',
      },
      {
        code: 'DK',
        title: '丹麦：Hygge 松弛感 + 极简自然',
        text: '适配“热饮 + 慢节奏”的生活哲学；偏好天然、可循环与简约。',
      },
      {
        code: 'FR',
        title: '法国：理性决策 + 性价比 + 可持续',
        text: '强调环保、耐用、可持续，并在表达上突出“值不值、用多久”。',
      },
      {
        code: 'UK',
        title: '英国：礼品属性 + 文化氛围感',
        text: '用东方茶文化做差异化，强调生活方式与礼品场景。',
      },
    ],

    cultureStory: {
      title: '中国养生与茶：把“日常的平衡”带进生活',
      text:
        '茶不只是饮品，更是一种节奏。在忙碌里留一段安静的时间，我们用更克制的设计语言，把中式茶文化的“松弛与平衡”融入欧洲日常。',
    },
  },

  {
    id: 2,
    name: '可降解环保茶包',
    category: 'teabag',
    markets: ['FR', 'DE', 'DK'],
    price: 9.9,
    tags: ['环保', '可持续', '法规友好'],
    description: '采用可降解材料的一次性茶包，兼顾便利性与环保责任。',

    hero: {
      image: '/images/teabag.jpg',
      alt: '可降解环保茶包',
    },

    highlights: [
      {
        title: '可降解材料',
        text: '减少塑料使用，符合欧洲环保法规趋势。',
      },
      {
        title: '使用便捷',
        text: '一次性设计，适合快节奏生活场景。',
      },
      {
        title: '环境友好',
        text: '兼顾日常便利与生态责任。',
      },
    ],

    marketFit: [
      {
        code: 'DE',
        title: '德国：法规意识强 + 环保理性',
        text: '突出材料合规性与可持续生产，符合德国消费者的理性决策习惯。',
      },
      {
        code: 'DK',
        title: '丹麦：环保生活方式',
        text: '强调减少浪费、轻量化包装，与北欧可持续生活理念一致。',
      },
      {
        code: 'FR',
        title: '法国：性价比 + 绿色消费',
        text: '在环保基础上强调“好用且负担得起”，更易被日常消费者接受。',
      },
    ],

    cultureStory: {
      title: '从“随手一包茶”开始的环保选择',
      text:
        '在中国，饮茶既是习惯也是节制。我们希望通过可降解茶包，让便利不再以环境为代价，把东方的节制观念转化为现代环保实践。',
    },
  },

  {
    id: 3,
    name: '养生茶组合',
    category: 'tea',
    markets: ['UK', 'FR'],
    price: 19.9,
    tags: ['养生', '日常饮用'],
    description: '基于中式养生理念的日常茶饮组合。',
  },

  {
    id: 4,
    name: '天然木材按摩梳',
    category: 'accessory',
    markets: ['DE', 'DK'],
    price: 15.9,
    tags: ['天然材质', '极简'],
    description: '强调实用性、耐用性与天然材料的日常养生配件。',
  },
]
