export default {
  'pages.common.buttonBeginGen': '开始生成',
  'pages.common.buttonUpload': '上传',
  'pages.common.knowMore': '了解更多',
  'pages.layouts.userLayout.title': ' ',

  //welcome
  'pages.welcome.link': '欢迎使用',
  'pages.welcome.title': 'Workshop - 营销场景生成式 AI',
  'pages.welcome.brief': `
  <li>
    本工具完整的展示了如何利用Amazon SageMaker, 大模型,
    和前后端框架来构建一个基于业务场景的生成式AI应用。
  </li>
  <li>
    体验最新的专为大模型推理性能优化的新框架和技术, 如: SageMaker LMI, DJL,
    Streaming 等。
  </li>
  <li>用户界面友好，易用。用于和客户的沟通和交流，启发更多业务场景。</li>`,
  'pages.welcome.infoCard01.title': `部署实验手册`,
  'pages.welcome.infoCard01.desc': `通过实验手册，指导您一步步将本系统部署至自有帐号中`,
  'pages.welcome.infoCard02.title': `亚马逊云科技生成式AI`,
  'pages.welcome.infoCard02.desc': `帮助客户更快地创新，重塑客户体验和应用程序  `,
  'pages.welcome.infoCard03.title': `了解亚马逊云科技`,
  'pages.welcome.infoCard03.desc': `全球领先的云计算平台，提供强大的计算、存储、数据库等一系列云服务。客户可以灵活地构建、部署和扩展各种应用程序  `,

  //marketingText
  'pages.marketingText.prompt.title': `商品描述`,
  'pages.marketingText.style.title': `文案风格`,
  'pages.marketingText.prompt.required': `必须填写商品描述`,
  'pages.marketingText.prompt.placeholder': `请填写商品描述`,
  'pages.marketingText.result.help': `您的商品描述开始撰写文案，持续聊天可以进行修改。`,
  'pages.marketingText.modelId.title': '大语言模型',
  'pages.marketingText.model.chatglm2': 'SageMaker: ChatGLM v2',
  'pages.marketingText.model.chatglm3': 'SageMaker-ChatGLM v3',
  'pages.marketingText.model.bedrockClaude2': 'Bedrock: Claude2',
  'pages.marketingText.model.bedrockClaude3': 'Bedrock: Claude3 Sonnet',
  'pages.marketingText.prompt.defaultValue': '汽车，时尚',
  'pages.marketingText.patterns.twitter': 'X.com',
  'pages.marketingText.patterns.instagram': 'Instagram',
  'pages.marketingText.patterns.tiktok': 'TikTok',
  'pages.marketingText.patterns.youtube': 'Youtube',
  'pages.marketingText.patterns.medium': 'Medium',
  'pages.marketingText.patterns.redbook': '小红书',
  'pages.marketingText.patterns.weibo': '微博',
  'pages.marketingText.patterns.douyin': '抖音',
  'pages.marketingText.patterns.zhihu': '知乎',
  'pages.marketingText.patterns.toutiao': '头条',
  'pages.marketingText.patterns.gongzhonghao': '公众号',
  'pages.marketingText.patterns.zhidemai': '值得买',
  'pages.marketingText.patterns.dianping': '点评',
  'pages.marketingText.patterns.kuaishou': '快手',

  //productDesign
  'pages.productDesign.modelId.title': `选择模型`,
  'pages.productDesign.inputImage.title': `上传草图（可选）`,
  'pages.productDesign.prompt.title': `生成内容提示词  `,
  'pages.productDesign.nprompt.title': `避免出现在画面中的内容`,
  'pages.productDesign.width.title': `宽(px)`,
  'pages.productDesign.height.title': `高(px)`,
  'pages.productDesign.count.title': `数量`,
  'pages.productDesign.size.title': `尺寸`,

  'pages.productDesign.stylePreset.title': `样式`,
  'pages.productDesign.model.realityStyle': 'SageMaker - 真实风格设计模型',
  'pages.productDesign.model.bedrockSDXL': `Bedrock - SDXL`,
  'pages.productDesign.model.bedrockTitan': 'Bedrock - Amazon Titan',

  //Inpainting
  'pages.inpainting.modelId.title': `选择模型`,
  'pages.inpainting.model.realityStyle': '抠图渲染模型',
  'pages.inpainting.model.optionStyle': '备用模型',
  'pages.inpainting.inputImage.title': `产品图片`,
  'pages.inpainting.samPrompt.title': `产品描述(保留内容)`,
  'pages.inpainting.samPrompt.placeHolder': `产品描述(保留内容)`,
  'pages.inpainting.prompt.title': `背景描述(重绘内容)`,
  'pages.inpainting.prompt.placeHolder': `背景描述(重绘内容)`,
  'pages.inpainting.nprompt.title': `不想出现在背景里的内容`,
  'pages.inpainting.nprompt.placeHolder': `不想出现在背景里的内容`,
  'pages.inpainting.count.title': `数量`,
  // Agent
  'pages.Agent.input.placeholder': `请输入您的问题，如：请根据以下提示词生成图片：现代风帐篷，或者 （s3://sample/sample.png）中人的背景替换为雪山`,
  'pages.Agent.prompt.required': `请输入您的提示词`,
  'pages.agent.result.help': `请输入任务提示词。如："请根据以下提示词生成图片：现代风帐篷" 或者 "请将以下图片（s3://sample/sample.png）中人的背景替换为雪山"。`,
  //KB
  'pages.bedrockKB.prompt.title': `请输入您的问题`,
  'pages.bedrockKB.prompt.placeholder': ``,
  'pages.bedrockKB.prompt.required': `请输入您的问题`,
  'pages.bedrockKB.prompt.defaultValue': `如何保护S3数据？`,
  'pages.bedrockKB.result.help': `请输入内部知识库相关问题。如："如何保护S3数据？"。`,
};
