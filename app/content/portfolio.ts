import type { Lang } from "../components/usePersistentLanguage";

export type Story = {
  title: string;
  org: string;
  date: string;
  image: string;
  alt: string;
  summary: string;
  narrative: string[];
  tags: string[];
  sourceUrl?: string;
  sourceLabel?: string;
  imageClass?: string;
  placeholder?: boolean;
};

export const copy = {
  en: {
    nav: ["About", "Research", "Work Experience", "Beyond Academics", "Contact"],
    navAria: "Primary navigation",
    menu: "Menu",
    menuKicker: "Portfolio navigation",
    menuNote: "Research, experience, and contact information.",
    portraitLabel: "NEUROSCIENCE · NEUROENGINEERING",
    scroll: "SCROLL",
    lifeLabel: "OFF DUTY",
    life: "LIFE",
    name: "Xingtong Lin",
    alias: "Louisa Lin · Carnegie Mellon University",
    eyebrow: "NEUROSCIENCE / NEUROENGINEERING",
    headline: "Computational neuroscience.\nNeuroengineering.",
    intro: "Research in human EEG, animal behavior, and cell experiments at Carnegie Mellon University.",
    researchCta: "View research",
    resume: "View résumé",
    latest: "LATEST",
    latestDate: "JUL 2026",
    latestBody: "Joined Next Capital as a Venture Fellow, exploring healthcare and technology opportunities.",
    aboutKicker: "01 · ABOUT",
    aboutTitle: "Education & background",
    aboutBody: "I’m a junior at Carnegie Mellon University pursuing a B.S. in Neuroscience on the Computational Neuroscience track, with an additional major in Biomedical Technology on the Neuroengineering track and a minor in Business Administration. I’m most curious about how neural signals become behavior—and how better experiments, better analysis, and better products can turn that curiosity into something useful.",
    facts: [["Degree", "B.S. in Neuroscience"], ["Neuroscience Track", "Computational Neuroscience"], ["Additional Major", "Biomedical Technology · Neuroengineering Track"], ["Minor", "Business Administration"], ["Languages", "Mandarin · English · Cantonese · French"], ["Recognition", "Dean’s List with High Honors"]],
    coursesLabel: "SELECTED COURSEWORK",
    courses: ["Brain-Computer Interface", "Introduction to Neuroscience", "Physiology", "Biomedical Engineering Laboratory", "Probability Theory & Random Processes", "Principles of Imperative Computation"],
    researchKicker: "02 · RESEARCH",
    researchTitle: "Research",
    researchIntro: "I began with a summer cell-culture project to understand wet-lab research, then moved into a much deeper behavioral-neuroscience workflow at Yttri Lab—from 27-port experiments to trial-pair analysis. I have now moved on to Bin He’s lab, working with human EEG and supporting deep-learning research.",
    experienceKicker: "03 · EXPERIENCE",
    experienceTitle: "Experience",
    experienceIntro: "Beyond the lab, I’ve worked across early-stage investing, product design, healthcare business development, and teaching—roles where I had to turn complex ideas into clear next steps.",
    open: "View more",
    close: "Close",
    toolkitKicker: "SKILLS ACROSS MY WORK",
    toolkitTitle: "Methods & tools",
    interestsKicker: "04 · OFF DUTY",
    interestsTitle: "Interests",
    interestsBody: "Music, animals, and travel. Photos and personal records.",
    interestsCta: "View interests",
    nodes: ["MUSIC", "ANIMAL LOVER", "TRAVELLER"],
    contactKicker: "05 · CONTACT",
    contactTitle: "Contact",
    contactBody: "For research, collaboration, or investment inquiries, use the form below.",
    email: "Email me",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formCategory: "Inquiry type",
    formCategories: ["Research inquiry", "Collaboration", "Other"],
    formSubject: "Subject",
    formSubjectPlaceholder: "Briefly describe your inquiry",
    formActivation: "The contact form is awaiting mailbox verification. Please try again after activation.",
    formNamePlaceholder: "Your name",
    formEmailPlaceholder: "you@example.com",
    formMessagePlaceholder: "Enter your message",
    formSubmit: "Send message",
    formSending: "Sending…",
    formSuccess: "Message sent. Thank you—I’ll get back to you soon.",
    formError: "The message could not be sent. Please try again later.",
    footerLine: "© 2026 By Xingtong Lin",
    updated: "Updated November 2026",
  },
  zh: {
    nav: ["关于我", "科研", "工作经历", "学业之外", "联系"],
    navAria: "主要导航",
    menu: "菜单",
    menuKicker: "浏览网站",
    menuNote: "科研、工作经历与兴趣。",
    portraitLabel: "神经科学 · 神经工程",
    scroll: "向下浏览",
    lifeLabel: "学业之外",
    life: "生活",
    name: "林星潼",
    alias: "也可以叫我 Louisa。",
    eyebrow: "计算神经科学 · 神经工程 · CMU",
    headline: "计算神经科学 · 神经工程",
    intro: "我参与人体脑电采集、小鼠行为实验和细胞培养，关注神经活动与行为之间的关系。",
    researchCta: "查看科研经历",
    resume: "查看英文简历",
    latest: "最新动态",
    latestDate: "2026.07",
    latestBody: "现任嘉程资本 Venture Fellow，关注医疗健康与科技领域的早期项目。",
    aboutKicker: "01 · 关于我",
    aboutTitle: "教育与研究背景",
    aboutBody: "我在卡内基梅隆大学主修神经科学，方向是计算神经科学；同时修读生物医学技术第二专业（神经工程方向），辅修工商管理。",
    facts: [["主修", "神经科学"], ["专业方向", "计算神经科学"], ["第二专业", "生物医学技术 · 神经工程方向"], ["辅修", "工商管理"], ["语言", "普通话 · 英语 · 粤语 · 法语"], ["荣誉", "Dean’s List with High Honors"]],
    coursesLabel: "相关课程",
    courses: ["脑机接口：原理与应用", "神经科学导论", "生理学", "生物医学工程实验", "概率论与随机过程", "命令式计算原理"],
    researchKicker: "02 · 科研经历",
    researchTitle: "科研经历",
    researchIntro: "我从细胞培养与水凝胶实验开始，随后在 Yttri Lab 独立运行 27 孔开放场行为实验，并开展试次配对分析。目前在 Bin He Lab 参与人体脑电实验和深度学习研究支持。",
    experienceKicker: "03 · 工作经历",
    experienceTitle: "工作经历",
    experienceIntro: "我参与过早期投资、医疗产品海外商务拓展和产品设计，也带领过课程讨论。",
    open: "查看详情",
    close: "关闭",
    toolkitKicker: "能力汇总",
    toolkitTitle: "研究方法与工具",
    interestsKicker: "04 · 学业之外",
    interestsTitle: "学业之外",
    interestsBody: "音乐、淘淘和旅行中的照片。",
    interestsCta: "查看兴趣",
    nodes: ["音乐", "淘淘", "旅行"],
    contactKicker: "05 · 联系我",
    contactTitle: "联系我",
    contactBody: "如果想交流科研、医疗健康与科技项目，欢迎通过下方表单留言。",
    email: "给我发邮件",
    formName: "姓名",
    formEmail: "邮箱",
    formMessage: "留言",
    formCategory: "留言类型",
    formCategories: ["科研交流", "合作交流", "其他"],
    formSubject: "主题",
    formSubjectPlaceholder: "简要说明来意",
    formActivation: "收件邮箱尚未完成验证。请在表单启用后重试。",
    formNamePlaceholder: "请输入姓名",
    formEmailPlaceholder: "you@example.com",
    formMessagePlaceholder: "写下想交流的内容",
    formSubmit: "发送留言",
    formSending: "正在发送…",
    formSuccess: "留言已发送。我会尽快回复。",
    formError: "发送失败。请稍后重试。",
    footerLine: "© 2026 By Xingtong Lin",
    updated: "更新于 2026 年 11 月",
  },
};

export const skillGroups = {
  en: [
    { number: "01", title: "Data & Computation", skills: ["Python", "MATLAB", "Trial-pair analysis", "Data analysis", "Deep-learning support"] },
    { number: "02", title: "Research Methods", skills: ["Human EEG", "EEG capping", "Animal behavior", "27-port experiments", "Cell culture", "Sterile technique", "Hydrogel experiments"] },
    { number: "03", title: "Product & Business", skills: ["Deal sourcing", "Market research", "Technical diligence", "Product design", "User flows", "Business development", "Partnerships"] },
    { number: "04", title: "Communication", skills: ["Scientific communication", "Teaching", "Session design", "Facilitation", "Cross-cultural communication", "Training"] },
  ],
  zh: [
    { number: "01", title: "数据与计算", skills: ["Python", "MATLAB", "试次配对分析", "数据分析", "深度学习研究支持"] },
    { number: "02", title: "实验与研究方法", skills: ["人体脑电（EEG）", "脑电帽佩戴", "小鼠行为实验", "27 孔开放场实验", "细胞培养", "无菌操作", "水凝胶实验"] },
    { number: "03", title: "产品与商业", skills: ["项目挖掘", "市场研究", "技术尽调", "产品设计", "用户流程", "商务拓展", "合作推进"] },
    { number: "04", title: "沟通与协作", skills: ["学术沟通", "教学", "课程设计", "讨论引导", "跨文化沟通", "研究培训"] },
  ],
};

const research: Record<Lang, Story[]> = {
  en: [
    { title: "EEG + Deep Learning", org: "Bin He Lab · Carnegie Mellon University · Biomedical Engineering", date: "May 2025 — Present", image: "/optimized/he-lab.jpg", alt: "Static frame from a brain imaging illustration on the official He Lab website", summary: "At Bin He Lab, I help prepare participants, fit EEG caps, and support human EEG recording and deep-learning research.", narrative: ["At Bin He Lab, I take part in human EEG experiments by preparing electrode caps, fitting them to participants, and supporting the recording setup under the team’s experimental protocol.", "I also assist with data preparation for deep-learning-based neural signal analysis. This work spans the practical demands of signal collection and the preparation needed before computational analysis."], tags: ["Human EEG", "EEG capping", "Signal acquisition", "Deep-learning support"], sourceUrl: "https://www.cmu.edu/bme/helab/", sourceLabel: "He Lab website", imageClass: "official-he" },
    { title: "Behavior → Trial Pairs", org: "Yttri Lab · Carnegie Mellon University · Biological Sciences", date: "Jan 2025 — Sep 2026", image: "/optimized/yttri-lab.jpg", alt: "Fluorescent brain section from the official Yttri Lab website", summary: "I independently ran 27-port open-field behavioral sessions and built a Python/MATLAB trial-pair workflow to compare rewarded and unrewarded trials.", narrative: ["At Yttri Lab, I independently ran daily mouse behavioral experiments in a 27-port open-field arena. I prepared and checked the task setup, maintained consistent session procedures and data organization, and trained PhD researchers on the behavioral protocol and its data structure.", "I developed a Python and MATLAB trial-transition analysis comparing rewarded and unrewarded trials. The analysis identified reproducible, opposing D1-striatal activity shifts across animals and was adopted by the lab for follow-up studies.", "Through CMU’s 2025 SURA program, I analyzed behavioral and neural data and presented the resulting poster, Decision Making Along a Semi-continuous Dimension in an Open Field Arena, at the Meeting of the Minds symposium."], tags: ["Behavioral experiments", "Trial-pair analysis", "Python", "MATLAB", "Arduino", "Research training"], sourceUrl: "https://labs.bio.cmu.edu/yttri/", sourceLabel: "Yttri Lab website", imageClass: "official-yttri" },
    { title: "Summer Cell-Culture Exploration", org: "Wang Lab · Tsinghua University", date: "May — Aug 2025", image: "/optimized/wang-research.jpg", alt: "Neural stem cell migration research figure from Tsinghua University", summary: "My first step was a summer research project that gave me an initial understanding of wet-lab work through cell cultivation and hydrogel-related experiments.", narrative: ["During my summer research in the Wang Lab, I performed cell-culture work involving neural stem cells, neuroglia, HAPI, and HUVIC. I prepared materials under sterile conditions, maintained the cultures, and monitored their condition during routine work.", "I also participated in hydrogel-related experiments, following the lab’s preparation and handling procedures as part of the wider wet-lab workflow."], tags: ["Cell culture", "Sterile technique", "Hydrogel experiments"], sourceUrl: "https://www.mse.tsinghua.edu.cn/info/1061/2080.htm", sourceLabel: "Tsinghua research feature", imageClass: "official-wang" },
  ],
  zh: [
    { title: "脑电实验与深度学习", org: "Bin He Lab · 卡内基梅隆大学 · 生物医学工程系", date: "2025.05 — 至今", image: "/optimized/he-lab.jpg", alt: "He Lab 官网脑成像示意动画的静态画面", summary: "我在 Bin He Lab 参与人体脑电采集，协助受试者准备、佩戴脑电帽，并支持深度学习相关研究。", narrative: ["在 Bin He Lab，我参与人体脑电实验，协助准备与佩戴脑电帽，并按照研究团队的实验流程支持受试者准备及采集前设置。", "在计算分析环节，我协助准备深度学习神经信号分析所需的数据，参与衔接实验采集与后续分析。"], tags: ["人体脑电（EEG）", "脑电帽佩戴", "信号采集", "深度学习研究支持"], sourceUrl: "https://www.cmu.edu/bme/helab/", sourceLabel: "He Lab 官网", imageClass: "official-he" },
    { title: "行为实验与试次配对", org: "Yttri Lab · 卡内基梅隆大学 · 生物科学系", date: "2025.01 — 2026.09", image: "/optimized/yttri-lab.jpg", alt: "Yttri Lab 官网的荧光脑切片", summary: "我独立运行 27 孔开放场行为实验，并用 Python 和 MATLAB 建立试次配对分析流程，比较获得奖励与未获得奖励的试次。", narrative: ["在 Yttri Lab，我独立运行 27 孔开放场小鼠行为实验，按统一流程完成任务装置准备、日常实验和数据整理，并培训博士研究人员掌握行为实验流程及数据组织方法。", "我使用 Python 和 MATLAB 开发试次转换分析，比较获得奖励与未获得奖励的试次。分析在不同动物的数据中识别出方向相反且可重复的 D1 纹状体活动变化，随后被实验室用于后续研究。", "在 CMU 2025 年 SURA 项目中，我进一步分析行为与神经数据，并在 Meeting of the Minds 研究展示会上汇报海报《Decision Making Along a Semi-continuous Dimension in an Open Field Arena》。"], tags: ["小鼠行为实验", "试次配对分析", "Python", "MATLAB", "Arduino", "研究培训"], sourceUrl: "https://labs.bio.cmu.edu/yttri/", sourceLabel: "Yttri Lab 官网", imageClass: "official-yttri" },
    { title: "暑期细胞实验", org: "王秀梅课题组 · 清华大学", date: "2025.05 — 2025.08", image: "/optimized/wang-research.jpg", alt: "清华大学官网发布的神经干细胞迁移研究图", summary: "在暑期研究项目中，我参与细胞培养和水凝胶相关实验，学习湿实验的基本流程。", narrative: ["在清华大学王秀梅课题组的暑期研究中，我参与神经干细胞、神经胶质细胞、HAPI 和 HUVIC 的培养工作，按照无菌操作规范准备材料、维护培养并观察细胞状态。", "我也参与水凝胶相关实验，按照课题组流程完成所需的准备与操作。"], tags: ["细胞培养", "无菌操作", "水凝胶实验"], sourceUrl: "https://www.mse.tsinghua.edu.cn/info/1061/2080.htm", sourceLabel: "清华大学研究报道", imageClass: "official-wang" },
  ],
};

export const researchTimeline: Record<Lang, Story[]> = {
  en: [research.en[0], research.en[1], research.en[2]],
  zh: [research.zh[0], research.zh[1], research.zh[2]],
};

export const experience: Record<Lang, Story[]> = {
  en: [
    { title: "Venture Fellow", org: "Next Capital · Jiacheng Capital", date: "Jul 2026 — Present", image: "/orgs/jiacheng-capital.webp", alt: "Jiacheng Capital logo", summary: "I help build the top of the investment pipeline by finding early-stage companies and turning an initial signal into a clearer question for further review.", narrative: ["As a Venture Fellow at Next Capital, I source and screen early-stage technology companies through founder outreach, university and laboratory networks, accelerators, and targeted market mapping. My screening work has covered AI, robotics, semiconductors, and advanced hardware.", "I conduct founder diligence calls and prepare structured post-call briefs that assess technical differentiation, customer traction, business model, team, financing, competition, and key risks. I have recommended opportunities for further investment-team review based on fund fit, commercial validation, and unresolved diligence questions.", "I also organized a CMU AI and Robotics event, coordinating external outreach, speaker logistics, and on-campus execution for more than 30 attendees."], tags: ["Deal sourcing", "Market research", "Technical diligence"], sourceUrl: "https://www.jiachengcap.com/", sourceLabel: "Jiacheng Capital website", imageClass: "official-next" },
    { title: "Business Development Intern", org: "Glunovo · Infinovo Medical", date: "Feb — Jun 2025", image: "/orgs/glunovo.png", alt: "Glunovo continuous glucose monitoring product from the official Infinovo website", summary: "I supported cross-border partnership conversations for a continuous glucose monitoring company and learned how a technical product story changes across markets.", narrative: ["At Glunovo, I supported overseas business development for continuous glucose monitoring products. I introduced the company and its products to prospective partners in the United States, Uzbekistan, and Malaysia, adapting the technical, clinical, and commercial discussion to each organization and market.", "After these conversations, I documented partner needs, open questions, and next steps so the commercial team could continue the appropriate follow-up."], tags: ["Business development", "Partner communication", "Cross-cultural communication"], sourceUrl: "https://www.infinovo.com/", sourceLabel: "Infinovo website", imageClass: "official-glunovo" },
    { title: "SI Leader", org: "CMU Student Academic Success Center", date: "Aug 2025 — Present", image: "/orgs/cmu-logo.png", alt: "Carnegie Mellon University logo", summary: "I lead collaborative Modern Biology sessions and help students move from memorizing material to explaining how the concepts work together.", narrative: ["As a Supplemental Instruction Leader for Physiology and Modern Biology at CMU, I design practice materials and lead group sessions that help students work through difficult concepts rather than rely on memorization.", "I adjust questions and explanations in response to students’ work during each session and use recurring points of confusion to plan subsequent discussions."], tags: ["Teaching", "Session design", "Facilitation"], sourceUrl: "https://www.cmu.edu/student-success/", sourceLabel: "CMU Student Success", imageClass: "official-cmu" },
    { title: "Product Design Intern", org: "Yovo · AI Counselor", date: "Sep 2024 — Jan 2025", image: "/orgs/yovo.png", alt: "Yovo official logo", summary: "I worked on early product flows for Yovo, turning an AI counseling idea into the screens, decisions, and interactions a student would actually move through.", narrative: ["At Yovo, I designed and proposed product-flow diagrams for a pre-launch AI guidance experience. I mapped how students would move between college, career, and extracurricular questions, then defined the core actions and transitions between screens.", "These diagrams gave the team a concrete structure for discussing the user journey and informed development of the initial interface."], tags: ["Product design", "User flows", "UX"], sourceUrl: "https://yovo.ai/home", sourceLabel: "Yovo website", imageClass: "official-yovo" },
  ],
  zh: [
    { title: "Venture Fellow", org: "Next Capital · 嘉程资本", date: "2026.07 — 至今", image: "/orgs/jiacheng-capital.webp", alt: "嘉程资本标志", summary: "我参与医疗健康与科技领域早期项目的寻找和初步评估。", narrative: ["在 Next Capital 担任 Venture Fellow 期间，我通过创始人沟通、高校与实验室网络、加速器和定向行业研究挖掘早期科技公司，并参与初步筛选，覆盖人工智能、机器人、半导体和先进硬件等方向。", "我参与创始人尽调访谈，并撰写结构化的会后初筛报告，评估技术差异、客户验证、商业模式、团队、融资、竞争和主要风险。我根据基金匹配度、商业验证情况和待核实的问题，向投资团队推荐进入下一轮评估的项目。", "我还组织了 CMU 的人工智能与机器人活动，负责校外联络、嘉宾协调与校内执行，参与人数超过 30 人。"], tags: ["项目挖掘", "市场研究", "技术尽调"], sourceUrl: "https://www.jiachengcap.com/", sourceLabel: "嘉程资本官网", imageClass: "official-next" },
    { title: "海外商务拓展实习生", org: "Glunovo · 九诺医疗", date: "2025.02 — 2025.06", image: "/orgs/glunovo.png", alt: "九诺医疗官网的 Glunovo 持续血糖监测产品", summary: "我参与持续血糖监测产品的海外商务拓展，联系潜在合作方并整理后续沟通事项。", narrative: ["在九诺医疗，我参与持续血糖监测产品的海外商务拓展，向美国、乌兹别克斯坦和马来西亚的潜在合作方介绍公司与产品，并根据机构和市场差异调整技术、临床与商业信息的表达重点。", "沟通后，我记录合作方需求、待回答的问题和下一步事项，供商务团队持续跟进。"], tags: ["商务拓展", "合作沟通", "跨文化沟通"], sourceUrl: "https://www.infinovo.com/", sourceLabel: "九诺医疗官网", imageClass: "official-glunovo" },
    { title: "SI Leader", org: "CMU 学术成功中心", date: "2025.08 — 至今", image: "/orgs/cmu-logo.png", alt: "卡内基梅隆大学标志", summary: "我带领 Modern Biology 课程的协作学习讨论，帮助学生梳理知识点之间的联系。", narrative: ["我在 CMU 学术成功中心担任生理学与现代生物学课程的 Supplemental Instruction Leader，设计练习材料并带领小组讨论，帮助学生通过解决问题理解复杂概念。", "讨论过程中，我根据学生的作答情况调整提问和解释方式，并把反复出现的疑难点纳入后续课程活动的设计。"], tags: ["教学", "课程设计", "讨论引导"], sourceUrl: "https://www.cmu.edu/student-success/", sourceLabel: "CMU 学术成功中心", imageClass: "official-cmu" },
    { title: "产品设计实习生", org: "Yovo · AI 升学与职业规划产品", date: "2024.09 — 2025.01", image: "/orgs/yovo.png", alt: "Yovo 官方标志", summary: "我参与 Yovo 早期产品流程设计，梳理咨询路径、页面跳转和关键交互。", narrative: ["在 Yovo 的早期产品设计中，我设计并提出产品流程图，梳理学生在升学、职业规划和课外活动咨询中的关键操作及页面之间的转换逻辑。", "这些流程图为团队讨论用户路径提供了具体依据，也为初始界面的开发提供了参考。"], tags: ["产品设计", "用户流程", "UX"], sourceUrl: "https://yovo.ai/home", sourceLabel: "Yovo 官网", imageClass: "official-yovo" },
  ],
};


export const researchNotes = {
  en: [
    { role: "EEG experiments & research support", question: "Human EEG recording and computational research in a biomedical engineering lab.", contribution: "I prepare participants, fit EEG caps, support signal acquisition, and assist with deep-learning research." },
    { role: "Behavioral experiments & data analysis", question: "Comparing rewarded and unrewarded trials in a 27-port open-field task.", contribution: "I independently ran behavioral sessions and built a Python/MATLAB trial-pair workflow, including reproducibility checks and training." },
    { role: "Summer research participant", question: "Cell cultivation and its connection to hydrogel-based experiments.", contribution: "I maintained cultures, followed sterile procedures, and participated in hydrogel-related wet-lab work." },
  ],
  zh: [
    { role: "脑电实验与研究支持", question: "参与生物医学工程实验室的脑电采集与计算研究。", contribution: "我协助受试者准备、佩戴脑电帽和采集信号，并支持深度学习相关研究。" },
    { role: "行为实验与数据分析", question: "在 27 孔开放场任务中，比较获得奖励与未获得奖励的试次。", contribution: "我独立运行行为实验，并用 Python 和 MATLAB 建立试次配对分析流程，检查可重复性并培训实验室成员。" },
    { role: "暑期研究参与者", question: "学习细胞培养与水凝胶相关实验之间的衔接。", contribution: "我完成日常细胞培养和维护，遵循无菌操作流程，并参与水凝胶相关实验。" },
  ],
};

export const ui = {
  en: {
    nav: ["About", "Research", "Work Experience", "Beyond Academics", "Contact"],
    name: "Xingtong Lin", firstName: "Xingtong", lastName: "Lin",
    heroLabel: "Neuroscience / Neuroengineering",
    heroIntro: "I study neuroscience and biomedical technology at Carnegie Mellon. You can also call me Louisa.",
    heroWork: "I currently support human EEG research at Bin He Lab and source early-stage healthcare and technology companies as a Venture Fellow at Next Capital.",
    focus: ["Neuroscience", "Technology", "Early-stage investing"],
    current: "Currently", currentRole: "Venture Fellow", currentOrg: "Next Capital", currentDetail: "Healthcare & technology",
    photoCaption: "Louisa Lin", photoMeta: "Carnegie Mellon University",
    research: "View research", resume: "View résumé", contact: "Contact", more: "View project", details: "View responsibilities", close: "Close details", menu: "Open menu", closeMenu: "Close menu",
    aboutTitle: "About",
    aboutBody: "I’m interested in how neuroscience research moves toward real-world applications, including the validation and commercialization of neurotechnology. Lab research and early-stage investing give me two perspectives on that path.",
    education: "Education", university: "Carnegie Mellon University", major: "B.S. in Neuroscience", track: "Computational Neuroscience track", additional: "Biomedical Technology", additionalTrack: "Additional major · Neuroengineering track", minor: "Business Administration", minorLabel: "Minor", coursework: "Selected coursework", methods: "Methods & tools",
    researchTitle: "Research", researchIntro: "Behavioral analysis, human EEG acquisition, and wet-lab methods have shaped my research training.", question: "Research context", contribution: "My contribution", labSource: "Image source",
    experienceTitle: "Work Experience", experienceIntro: "Early-stage company screening, medical technology, product design, and teaching.",
    ventureContext: "Early-stage investing", ventureBody: "I source healthcare and technology companies, organize initial screening, and turn technical claims into questions for further diligence.",
    ventureTags: ["Company sourcing", "Initial screening", "Technical research"],
    interestsTitle: "Beyond Academics", interestsIntro: "Music, time with Taotao, and exploring new places.", interestsLink: "Explore my interests", interestNames: ["Music", "Taotao", "Travel"], interestDesc: ["Playlists and everyday listening.", "The animal side of my life.", "Places, photographs, and observations."],
    contactTitle: "Get in touch.", contactBody: "For research, healthcare and technology opportunities, or a conversation about my work.", email: "Email", copy: "Copy email", copied: "Email copied", copyFailed: "Could not copy. Please try again.", wechat: "Copy WeChat ID", wechatCopied: "WeChat ID copied", form: "Send a message", formNote: "You can also email me directly.", footer: "Neuroscience · Technology · Early-stage investing", skip: "Skip to content", caption: "Abstract neural fibres — an illustration, not scientific data.",
  },
  zh: {
    nav: ["关于我", "科研", "工作经历", "学业之外", "联系"],
    name: "林星潼", firstName: "林星潼", lastName: "",
    heroLabel: "神经科学 / 神经工程",
    heroIntro: "我在卡内基梅隆大学学习神经科学和生物医学技术。也可以叫我 Louisa。",
    heroWork: "我目前在 Bin He Lab 参与人体脑电研究，也在嘉程资本担任 Venture Fellow，寻找医疗健康和科技领域的早期项目。",
    focus: ["神经科学", "技术", "早期投资"],
    current: "目前任职", currentRole: "Venture Fellow", currentOrg: "Next Capital · 嘉程资本", currentDetail: "医疗健康与科技",
    photoCaption: "林星潼", photoMeta: "卡内基梅隆大学",
    research: "查看科研", resume: "查看英文简历", contact: "联系我", more: "查看项目", details: "查看具体职责", close: "关闭详情", menu: "打开菜单", closeMenu: "关闭菜单",
    aboutTitle: "关于我",
    aboutBody: "我关注神经科学研究如何走向实际应用，尤其是神经技术的验证、产品开发和商业化路径。实验室研究与早期项目评估，让我从科学证据和实际需求两个角度理解这个过程。",
    education: "教育背景", university: "卡内基梅隆大学", major: "神经科学理学学士在读", track: "计算神经科学方向", additional: "生物医学技术", additionalTrack: "第二专业 · 神经工程方向", minor: "工商管理", minorLabel: "辅修", coursework: "相关课程", methods: "研究方法与工具",
    researchTitle: "科研", researchIntro: "行为实验与数据分析、人体脑电采集、细胞培养，构成了我目前的研究训练。", question: "研究背景", contribution: "我的工作", labSource: "素材来源",
    experienceTitle: "工作经历", experienceIntro: "早期项目初筛、医疗科技、产品设计与教学。",
    ventureContext: "早期投资", ventureBody: "我参与寻找医疗健康与科技领域的早期公司，整理初步评估信息，并把技术主张转化为后续尽调的问题。", ventureTags: ["项目挖掘", "初步评估", "技术研究"],
    interestsTitle: "学业之外", interestsIntro: "音乐、淘淘，还有旅途中的照片。", interestsLink: "查看我的兴趣", interestNames: ["音乐", "淘淘", "旅行"], interestDesc: ["歌单和音乐记录。", "与淘淘的日常。", "旅途照片和见闻。"],
    contactTitle: "联系我", contactBody: "欢迎就科研、医疗健康与科技项目联系我。", email: "邮箱", copy: "复制邮箱", copied: "邮箱已复制", copyFailed: "复制失败，请重试。", wechat: "复制微信号", wechatCopied: "微信号已复制", form: "发送留言", formNote: "也可以直接发送邮件。", footer: "神经科学 · 技术 · 早期投资", skip: "跳转至正文", caption: "神经纤维插画",
  },
};
