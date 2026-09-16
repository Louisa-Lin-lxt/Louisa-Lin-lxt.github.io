"use client";

import { useEffect, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { HeroNeuralField } from "./components/HeroNeuralField";
import { SmoothLink } from "./components/SmoothLink";
import { usePersistentLanguage, type Lang } from "./components/usePersistentLanguage";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;
const contactEndpoint = "https://formsubmit.co/ajax/xingtongl@andrew.cmu.edu";

type Story = {
  title: string;
  org: string;
  date: string;
  image: string;
  alt: string;
  summary: string;
  details: string[];
  tags: string[];
  sourceUrl?: string;
  sourceLabel?: string;
  imageClass?: string;
  placeholder?: boolean;
};

const copy = {
  en: {
    nav: ["About", "Research", "Experience", "Interests", "Contact"],
    navAria: "Primary navigation",
    menu: "Menu",
    menuKicker: "Explore the portfolio",
    menuNote: "Neuroscience, technology, and the work that connects them.",
    portraitLabel: "NEUROSCIENCE · NEUROENGINEERING",
    scroll: "SCROLL",
    lifeLabel: "OFF DUTY",
    life: "LIFE",
    name: "Xingtong Lin",
    alias: "You can also call me Louisa Lin.",
    eyebrow: "COMPUTATIONAL NEUROSCIENCE · NEUROENGINEERING · CMU",
    headline: "Studying how signals become choices.",
    intro: "I work across EEG, animal behavior, cells, and technology—asking what the brain is doing, then finding a practical way to measure it.",
    researchCta: "Explore my research",
    resume: "View résumé",
    latest: "LATEST",
    latestDate: "JUL 2026",
    latestBody: "Joined Next Capital as a Venture Capital Fellow, exploring healthcare and technology opportunities.",
    aboutKicker: "01 · ABOUT",
    aboutTitle: "A little about me.",
    aboutBody: "I’m a junior at Carnegie Mellon University pursuing a B.S. in Neuroscience on the Computational Neuroscience track, with an additional major in Biomedical Technology on the Neuroengineering track and a minor in Business Administration. I’m most curious about how neural signals become behavior—and how better experiments, better analysis, and better products can turn that curiosity into something useful.",
    facts: [["Degree", "B.S. in Neuroscience"], ["Neuroscience Track", "Computational Neuroscience"], ["Additional Major", "Biomedical Technology · Neuroengineering Track"], ["Minor", "Business Administration"], ["Languages", "Mandarin · English · Cantonese · French"], ["Recognition", "Dean’s List with High Honors"]],
    coursesLabel: "SELECTED COURSEWORK",
    courses: ["Brain-Computer Interface", "Introduction to Neuroscience", "Physiology", "Biomedical Engineering Laboratory", "Probability Theory & Random Processes", "Principles of Imperative Computation"],
    researchKicker: "02 · RESEARCH",
    researchTitle: "What I’m exploring in the lab.",
    researchIntro: "I began with a summer cell-culture project to understand wet-lab research, then moved into a much deeper behavioral-neuroscience workflow at Yttri Lab—from 27-port experiments to trial-pair analysis. I have now moved on to Bin He’s lab, working with human EEG and supporting deep-learning research.",
    experienceKicker: "03 · EXPERIENCE",
    experienceTitle: "What I’ve worked on beyond research.",
    experienceIntro: "Beyond the lab, I’ve worked across early-stage investing, product design, healthcare business development, and teaching—roles where I had to turn complex ideas into clear next steps.",
    open: "View more",
    close: "Close",
    whatIDid: "What I did",
    toolkitKicker: "SKILLS ACROSS MY WORK",
    toolkitTitle: "Skills, grouped by how I use them.",
    interestsKicker: "04 · OFF DUTY",
    interestsTitle: "My world beyond the lab.",
    interestsBody: "Music, animals, and travel keep me curious, grounded, and open to new places. I’m saving this space for the stories behind each one.",
    interestsCta: "Explore my world of interests",
    nodes: ["MUSIC", "ANIMAL LOVER", "TRAVELLER"],
    contactKicker: "05 · CONTACT",
    contactTitle: "Let’s start a conversation.",
    contactBody: "If you’d like to learn more about my work, are currently interested in fundraising, or simply want to have a coffee chat, I’d be happy to hear from you.",
    email: "Email me",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formNamePlaceholder: "Your name",
    formEmailPlaceholder: "you@example.com",
    formMessagePlaceholder: "What would you like to talk about?",
    formSubmit: "Send message",
    formSending: "Sending…",
    formSuccess: "Message sent. Thank you—I’ll get back to you soon.",
    formError: "The message could not be sent. Please try again or email xingtongl@andrew.cmu.edu.",
    footerLine: "© 2026 By Xingtong Lin",
    updated: "Updated August 2026",
  },
  zh: {
    nav: ["关于我", "科研经历", "其他经历", "兴趣", "联系我"],
    navAria: "主要导航",
    menu: "菜单",
    menuKicker: "浏览网站",
    menuNote: "神经科学、技术实践与个人生活。",
    portraitLabel: "神经科学 · 神经工程",
    scroll: "向下浏览",
    lifeLabel: "研究之外",
    life: "生活",
    name: "林星潼",
    alias: "英文名 Louisa Lin。",
    eyebrow: "计算神经科学 · 神经工程 · CMU",
    headline: "研究神经信号如何影响行为与决策。",
    intro: "我的研究涉及人类脑电、动物行为和细胞实验。重点关注神经活动的测量方法及其与行为的关系。",
    researchCta: "查看科研经历",
    resume: "查看英文简历",
    latest: "最新动态",
    latestDate: "2026.07",
    latestBody: "现任嘉程资本 Venture Capital Fellow。主要关注医疗健康与科技领域的早期项目。",
    aboutKicker: "01 · 关于我",
    aboutTitle: "教育与研究背景",
    aboutBody: "我就读于卡内基梅隆大学。主修神经科学并选择计算神经科学方向。同时修读生物医学技术第二专业与工商管理辅修。生物医学技术专业方向为神经工程。",
    facts: [["主修", "神经科学"], ["专业方向", "计算神经科学"], ["第二专业", "生物医学技术 · 神经工程方向"], ["辅修", "工商管理"], ["语言", "普通话 · 英语 · 粤语 · 法语"], ["荣誉", "Dean’s List with High Honors"]],
    coursesLabel: "相关课程",
    courses: ["脑机接口：原理与应用", "神经科学导论", "生理学", "生物医学工程实验", "概率论与随机过程", "命令式计算原理"],
    researchKicker: "02 · 科研经历",
    researchTitle: "科研方向与实验经历",
    researchIntro: "我从细胞培养和水凝胶实验开始接触湿实验。随后在 Yttri Lab 参与行为神经科学研究。工作包括独立运行 27 孔开放场实验、整理数据和开展 trial-pair 分析。目前在 Bin He Lab 参与人类 EEG 实验及深度学习相关研究。",
    experienceKicker: "03 · 其他经历",
    experienceTitle: "科研之外的实践经历",
    experienceIntro: "我还参与过早期投资、产品设计、医疗产品海外商务拓展和课程辅导。这些经历提升了我的信息分析、沟通协作和项目推进能力。",
    open: "查看详情",
    close: "关闭",
    whatIDid: "主要职责",
    toolkitKicker: "能力汇总",
    toolkitTitle: "研究与实践中的核心能力",
    interestsKicker: "04 · 实验室之外",
    interestsTitle: "研究之外",
    interestsBody: "音乐、动物和旅行构成了我的日常生活。这里记录科研之外的兴趣与经历。",
    interestsCta: "查看兴趣内容",
    nodes: ["音乐", "动物", "旅行"],
    contactKicker: "05 · 联系我",
    contactTitle: "欢迎联系",
    contactBody: "欢迎就科研、医疗健康或科技领域相关问题与我联系。如需进一步交流可通过下方表单留言。",
    email: "给我发邮件",
    formName: "姓名",
    formEmail: "邮箱",
    formMessage: "留言",
    formNamePlaceholder: "请输入姓名",
    formEmailPlaceholder: "you@example.com",
    formMessagePlaceholder: "请输入留言内容",
    formSubmit: "发送留言",
    formSending: "正在发送…",
    formSuccess: "留言已发送。我会尽快回复。",
    formError: "发送失败。请重试或发送邮件至 xingtongl@andrew.cmu.edu。",
    footerLine: "© 2026 By Xingtong Lin",
    updated: "更新于 2026 年 8 月",
  },
};

const skillGroups = {
  en: [
    { number: "01", title: "Data & Computation", skills: ["Python", "MATLAB", "Trial-pair analysis", "Data analysis", "Deep-learning support"] },
    { number: "02", title: "Research Methods", skills: ["Human EEG", "EEG capping", "Animal behavior", "27-port experiments", "Cell culture", "Sterile technique", "Hydrogel experiments"] },
    { number: "03", title: "Product & Business", skills: ["Deal sourcing", "Market research", "Technical diligence", "Product design", "User flows", "Business development", "Partnerships"] },
    { number: "04", title: "Communication", skills: ["Scientific communication", "Teaching", "Session design", "Facilitation", "Cross-cultural communication", "Training"] },
  ],
  zh: [
    { number: "01", title: "数据与计算", skills: ["Python", "MATLAB", "Trial-pair 分析", "数据分析", "深度学习研究支持"] },
    { number: "02", title: "实验与研究方法", skills: ["人类 EEG", "EEG capping", "动物行为实验", "27 孔实验", "细胞培养", "无菌操作", "水凝胶实验"] },
    { number: "03", title: "产品与商业", skills: ["项目挖掘", "市场研究", "技术尽调", "产品设计", "用户流程", "商务拓展", "合作推进"] },
    { number: "04", title: "沟通与协作", skills: ["学术沟通", "教学", "课程设计", "讨论引导", "跨文化沟通", "研究培训"] },
  ],
};

const research: Record<Lang, Story[]> = {
  en: [
    { title: "EEG + Deep Learning", org: "Bin He Lab · CMU Biomedical Engineering", date: "May 2025 — Present", image: "/orgs/he-lab.gif", alt: "Brain imaging animation from the official He Lab website", summary: "I have now moved on to Bin He’s lab, where my current workflow starts with human EEG recording and continues toward the lab’s deep-learning research.", details: ["Prepare the session::Ready participants for EEG recording and support the practical setup needed before collection begins.", "Fit the EEG cap::Carry out EEG capping carefully and help confirm that the recording setup is ready for a consistent session.", "Move toward computation::Support auxiliary work for the lab’s deep-learning models after the experimental setup, while keeping model details and research results private."], tags: ["Human EEG", "EEG capping", "Signal acquisition", "Deep-learning support"], sourceUrl: "https://www.cmu.edu/bme/helab/", sourceLabel: "He Lab website", imageClass: "official-he" },
    { title: "Behavior → Trial Pairs", org: "Yttri Lab · CMU Biological Sciences", date: "Jan 2025 — Sep 2026", image: "/orgs/yttri-lab.png", alt: "Fluorescent brain section from the official Yttri Lab website", summary: "I move from running daily behavior in a 27-port open-field arena to a Python/MATLAB trial-pair workflow that compares rewarded and unrewarded trials without publishing the underlying data.", details: ["Prepare the behavior::Train mice for the task, check the 27-port open-field arena and Arduino-supported setup, and observe the related surgical workflow.", "Run daily experiments::Independently operate mouse behavioral sessions and keep the task procedure consistent from one session to the next.", "Make the workflow transferable::Train PhD students on the behavioral task and the relevant data structure so new sessions enter the same analysis-ready format.", "Build trial pairs::Organize trials by outcome and pair rewarded with unrewarded trials for a structured comparison in Python and MATLAB.", "Check reproducibility::Evaluate whether the analysis behaves consistently across animals, document the pipeline, and make it usable for the lab’s follow-up work—without exposing experimental values or result direction.", "Communicate the work::Connect the behavioral and analysis workflow to my SURA 2025 poster on decision-making in an open-field arena."], tags: ["Behavioral experiments", "Trial-pair analysis", "Python", "MATLAB", "Arduino", "Research training"], sourceUrl: "https://labs.bio.cmu.edu/yttri/", sourceLabel: "Yttri Lab website", imageClass: "official-yttri" },
    { title: "Summer Cell-Culture Exploration", org: "Wang Lab · Tsinghua University", date: "May — Aug 2025", image: "/orgs/wang-research.jpg", alt: "Neural stem cell migration research figure from Tsinghua University", summary: "My first step was a summer research project that gave me an initial understanding of wet-lab work through cell cultivation and hydrogel-related experiments.", details: ["Prepare cell work::Ready materials and follow sterile technique for neural stem cell, neuroglia, HAPI, and HUVIC cultures.", "Cultivate and maintain::Carry out routine cultivation and monitor cell condition so cultures remain suitable for the next experimental step.", "Learn the hydrogel workflow::Use the summer project to understand how cell-culture preparation connects with hydrogel-related experiments, without presenting it as my primary research focus or exposing measurements."], tags: ["Cell culture", "Sterile technique", "Hydrogel experiments"], sourceUrl: "https://www.mse.tsinghua.edu.cn/info/1061/2080.htm", sourceLabel: "Tsinghua research feature", imageClass: "official-wang" },
  ],
  zh: [
    { title: "EEG 与深度学习", org: "Bin He Lab · CMU 生物医学工程系", date: "2025.05 — 至今", image: "/orgs/he-lab.gif", alt: "He Lab 官网的脑成像动画", summary: "我目前在 Bin He Lab 参与人类 EEG 实验。工作包括受试者准备、信号采集和深度学习研究支持。", details: ["实验准备::协助受试者完成 EEG 记录前准备并检查采集设置。", "佩戴 EEG 帽::完成 EEG capping 并确认电极与记录系统状态。", "计算研究支持::协助深度学习模型相关工作。具体模型与研究结果暂不公开。"], tags: ["人类 EEG", "EEG capping", "信号采集", "深度学习研究支持"], sourceUrl: "https://www.cmu.edu/bme/helab/", sourceLabel: "He Lab 官网", imageClass: "official-he" },
    { title: "行为实验 → Trial Pairs", org: "Yttri Lab · CMU 生物科学系", date: "2025.01 — 2026.09", image: "/orgs/yttri-lab.png", alt: "Yttri Lab 官网的荧光脑切片", summary: "我独立运行 27 孔开放场行为实验。使用 Python 和 MATLAB 建立 trial-pair 分析流程。该流程用于比较获得奖励与未获得奖励的试次。", details: ["行为任务准备::训练小鼠并检查 27 孔开放场与 Arduino 实验装置。了解相关手术流程。", "实验执行::按照统一流程独立完成日常小鼠行为实验。确保不同场次之间的一致性。", "流程交接::向博士生讲解行为任务与数据结构。支持后续实验使用统一分析格式。", "Trial-pair 分析::按实验结果整理试次。将获得奖励与未获得奖励的 trial 配对并使用 Python 和 MATLAB 完成分析。", "可重复性检查::比较分析流程在不同动物上的稳定性。记录完整步骤并整理为实验室可继续使用的流程。具体数值和结果方向不公开。", "研究展示::将行为实验与分析流程整理为 SURA 2025 开放场决策研究海报。"], tags: ["行为实验", "Trial-pair 分析", "Python", "MATLAB", "Arduino", "研究培训"], sourceUrl: "https://labs.bio.cmu.edu/yttri/", sourceLabel: "Yttri Lab 官网", imageClass: "official-yttri" },
    { title: "暑期细胞实验", org: "王秀梅课题组 · 清华大学", date: "2025.05 — 2025.08", image: "/orgs/wang-research.jpg", alt: "清华大学官网发布的神经干细胞迁移研究图", summary: "该暑期研究项目使我系统接触湿实验。主要工作包括细胞培养和水凝胶相关实验。", details: ["实验准备::为神经干细胞、神经胶质细胞、HAPI 和 HUVIC 培养准备材料。严格遵循无菌操作规范。", "细胞培养与维护::完成日常培养并观察细胞状态。为后续实验步骤做好准备。", "水凝胶实验::学习细胞培养与水凝胶实验的衔接流程。具体测量结果不公开。"], tags: ["细胞培养", "无菌操作", "水凝胶实验"], sourceUrl: "https://www.mse.tsinghua.edu.cn/info/1061/2080.htm", sourceLabel: "清华官方研究报道", imageClass: "official-wang" },
  ],
};

const researchTimeline: Record<Lang, Story[]> = {
  en: [research.en[0], research.en[1], research.en[2]],
  zh: [research.zh[0], research.zh[1], research.zh[2]],
};

const experience: Record<Lang, Story[]> = {
  en: [
    { title: "Venture Capital Fellow", org: "Next Capital · Jiacheng Capital", date: "Jul 2026 — Present", image: "/orgs/jiacheng-capital.webp", alt: "Jiacheng Capital logo", summary: "I help build the top of the investment pipeline by finding early-stage companies and turning an initial signal into a clearer question for further review.", details: ["Opportunity sourcing::Look for companies and projects that may fit USD-denominated funds, with particular attention to healthcare and technology.", "Initial screening::Organize what is known about the team, product, market, and financing context so promising opportunities can be discussed efficiently.", "Technical translation::Turn specialized product or research claims into practical questions about the problem, differentiation, adoption, and next diligence step."], tags: ["Deal sourcing", "Market research", "Technical diligence"], sourceUrl: "https://www.jiachengcap.com/", sourceLabel: "Jiacheng Capital website", imageClass: "official-next" },
    { title: "Business Development Intern", org: "Glunovo · Infinovo Medical", date: "Feb — Jun 2025", image: "/orgs/glunovo.png", alt: "Glunovo continuous glucose monitoring product from the official Infinovo website", summary: "I supported cross-border partnership conversations for a continuous glucose monitoring company and learned how a technical product story changes across markets.", details: ["Partner communication::Present company and product information to prospective partners in the United States, Uzbekistan, and Malaysia.", "Message adaptation::Adjust the level of technical, clinical, and commercial detail for different organizations and regional contexts.", "Follow-through::Organize conversation context and next steps so an introductory meeting could move toward a more concrete partnership discussion."], tags: ["Business development", "Partner communication", "Cross-cultural communication"], sourceUrl: "https://cn.infinovo.com/", sourceLabel: "Infinovo website", imageClass: "official-glunovo" },
    { title: "SI Leader", org: "CMU Student Academic Success Center", date: "Aug 2025 — Present", image: "/orgs/cmu-logo.png", alt: "Carnegie Mellon University logo", summary: "I lead collaborative Modern Biology sessions and help students move from memorizing material to explaining how the concepts work together.", details: ["Session design::Turn weekly course concepts into guided questions, practice activities, and explanations that students can work through together.", "Teaching in real time::Listen for where a group is getting stuck, reframe difficult biology ideas, and adjust the pace without simply giving away answers.", "Course coordination::Communicate with faculty and the academic success team so sessions stay aligned with the course and recurring student needs inform future planning."], tags: ["Teaching", "Session design", "Facilitation"], sourceUrl: "https://www.cmu.edu/student-success/", sourceLabel: "CMU Student Success", imageClass: "official-cmu" },
    { title: "Product Design Intern", org: "Yovo · AI Counselor", date: "Sep 2024 — Jan 2025", image: "/orgs/yovo.png", alt: "Yovo official logo", summary: "I worked on early product flows for Yovo, turning an AI counseling idea into the screens, decisions, and interactions a student would actually move through.", details: ["Map the journey::Lay out an end-to-end product flow for college, career, and extracurricular guidance.", "Define the interactions::Clarify the key user actions and screen-to-screen logic for the pre-launch experience.", "Guide the first interface::Translate product requirements into clear flow diagrams that could support early UI development and team discussions."], tags: ["Product design", "User flows", "UX"], sourceUrl: "https://yovo.ai/home", sourceLabel: "Yovo website", imageClass: "official-yovo" },
  ],
  zh: [
    { title: "风险投资 Fellow", org: "Next Capital · 嘉程资本", date: "2026.07 — 至今", image: "/orgs/jiacheng-capital.webp", alt: "嘉程资本标志", summary: "我参与投资流程前端的项目挖掘与初步评估。重点关注医疗健康和科技领域的早期项目。", details: ["项目挖掘::寻找可能适合美元基金的早期公司与项目。重点覆盖医疗健康和科技领域。", "初步评估::梳理团队、产品、市场和融资背景。支持团队高效讨论潜在机会。", "技术分析::将专业产品或研究主张转化为可验证的问题。重点评估真实需求、差异化、落地路径和后续尽调方向。"], tags: ["项目挖掘", "市场研究", "技术尽调"], sourceUrl: "https://www.jiachengcap.com/", sourceLabel: "嘉程资本官网", imageClass: "official-next" },
    { title: "海外商务拓展实习生", org: "Glunovo · 九诺医疗", date: "2025.02 — 2025.06", image: "/orgs/glunovo.png", alt: "九诺医疗官网的 Glunovo 持续血糖监测产品", summary: "我参与持续血糖监测产品的海外商务拓展。工作涉及合作方沟通、信息调整和后续推进。", details: ["合作方沟通::向美国、乌兹别克斯坦和马来西亚的潜在合作方介绍公司与产品。", "信息调整::根据机构类型和地区差异调整技术、临床与商业信息。", "后续推进::整理会谈背景、核心问题和下一步安排。推动初步接触进入后续讨论。"], tags: ["商务拓展", "合作沟通", "跨文化沟通"], sourceUrl: "https://cn.infinovo.com/", sourceLabel: "九诺医疗官网", imageClass: "official-glunovo" },
    { title: "SI Leader", org: "CMU 学术成功中心", date: "2025.08 — 至今", image: "/orgs/cmu-logo.png", alt: "卡内基梅隆大学标志", summary: "我负责 Modern Biology 协作学习活动。目标是帮助学生理解概念之间的联系。", details: ["活动设计::将课程内容整理为引导问题、练习和小组讨论流程。", "现场教学::识别学生的理解难点。调整解释方式与活动节奏。", "课程协作::与授课教师及学术成功中心保持沟通。确保活动内容与课程进度一致。"], tags: ["教学", "课程设计", "讨论引导"], sourceUrl: "https://www.cmu.edu/student-success/", sourceLabel: "CMU 学术成功中心", imageClass: "official-cmu" },
    { title: "产品设计实习生", org: "Yovo · AI 升学与职业规划产品", date: "2024.09 — 2025.01", image: "/orgs/yovo.png", alt: "Yovo 官方标志", summary: "我参与 Yovo 的早期产品流程设计。工作重点是将 AI 顾问概念转化为具体页面、步骤和交互。", details: ["用户路径::梳理专业选择、职业规划和课外活动咨询的完整流程。", "关键交互::定义核心操作与页面跳转逻辑。统一团队对产品体验的理解。", "界面设计支持::使用流程图表达产品需求。为早期 UI 开发和团队讨论提供依据。"], tags: ["产品设计", "用户流程", "UX"], sourceUrl: "https://yovo.ai/home", sourceLabel: "Yovo 官网", imageClass: "official-yovo" },
  ],
};

function StoryModal({ story, lang, onClose }: { story: Story; lang: Lang; onClose: () => void }) {
  const t = copy[lang];
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.classList.remove("modal-open"); };
  }, [onClose]);
  return <div className="story-modal" role="dialog" aria-modal="true" aria-label={story.title}>
    <article>
      <button className="modal-close" onClick={onClose} aria-label={t.close}>×</button>
      {story.placeholder ? <div className="confidential-art"><span>CONFIDENTIAL</span><b>Product × Flow</b><i>Details intentionally withheld</i></div> : <img className={story.imageClass} src={assetPath(story.image)} alt={story.alt} />}
      <div className="modal-copy"><p className="modal-date">{story.date}</p><h2>{story.title}</h2><h3>{story.org}</h3><p>{story.summary}</p><h4>{t.whatIDid}</h4><ol className="workflow-list">{story.details.map((item, index) => { const [lead, detail] = item.split("::"); return <li key={item}><i>{String(index + 1).padStart(2, "0")}</i><div><span>{lead}</span>{detail && <p>{detail}</p>}</div></li>; })}</ol><div className="modal-tags">{story.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{story.sourceUrl && <a className="official-source" href={story.sourceUrl} target="_blank" rel="noreferrer">{story.sourceLabel} ↗</a>}</div>
    </article>
  </div>;
}

function StoryCard({ story, index, lang, onOpen }: { story: Story; index: number; lang: Lang; onOpen: () => void }) {
  return <button className="story-card" data-reveal onClick={onOpen} aria-label={`${copy[lang].open}: ${story.title}`}>
    <div className={`story-image ${story.imageClass ?? ""}`}>{story.placeholder ? <div className="confidential-art"><span>CONFIDENTIAL</span><b>Product × Flow</b><i>Identity protected</i></div> : <img src={assetPath(story.image)} alt="" />}<span>0{index + 1}</span></div>
    <div className="story-card-copy"><p>{story.date}</p><h3>{story.title}</h3><h4>{story.org}</h4><div className="story-card-tags">{story.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}{story.tags.length > 3 && <span>+{story.tags.length - 3}</span>}</div><div className="story-card-action"><span>{copy[lang].open}</span><i>↗</i></div></div>
  </button>;
}

export default function Home() {
  const { lang, toggleLang } = usePersistentLanguage();
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = copy[lang];
  const navHrefs = ["#about", "#research", "#experience", "/interests", "#contact"];
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    revealItems.forEach((item) => observer.observe(item));

    const root = document.documentElement;
    const onScroll = () => {
      const distance = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${distance > 0 ? window.scrollY / distance : 0}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [lang]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.toggle("nav-open", menuOpen);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);

  const copyWeChat = async () => {
    const id = "13910969793";
    try {
      await navigator.clipboard.writeText(id);
    } catch {
      const input = document.createElement("textarea");
      input.value = id;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const honey = String(data.get("_honey") ?? "");
    if (honey) {
      form.reset();
      setSubmitState("success");
      return;
    }

    setSubmitState("sending");
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: lang === "en" ? `Portfolio message from ${name}` : `来自个人网站的留言：${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const result = await response.json().catch(() => null) as { success?: boolean | string } | null;
      const accepted = result?.success === true || result?.success === "true";
      if (!response.ok || !accepted) throw new Error("Submission rejected");
      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };
  const tiltNetwork = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.setProperty("--network-rx", `${-4 - y * 9}deg`);
    event.currentTarget.style.setProperty("--network-ry", `${-7 + x * 14}deg`);
  };
  const resetNetwork = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--network-rx", "-4deg");
    event.currentTarget.style.setProperty("--network-ry", "-7deg");
  };
  return <main className="portfolio">
    <div className="scroll-progress" aria-hidden="true"><i /></div>
    <header className="site-nav">
      <a className="xl-mark" href="#home" aria-label={lang === "en" ? "Home" : "返回首页"} onClick={() => setMenuOpen(false)}>XL</a>
      <nav className="desktop-nav" aria-label={t.navAria}>{t.nav.map((item, index) => index === 3 ? <SmoothLink href="/interests" key={item}>{item} ↗</SmoothLink> : <a href={navHrefs[index]} key={item}>{item}</a>)}</nav>
      <div className="nav-actions">
        <button className="language-switch" onClick={toggleLang} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}><span className={lang === "en" ? "active" : ""}>EN</span><i /><span className={lang === "zh" ? "active" : ""}>中</span></button>
        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (lang === "en" ? "Close menu" : "关闭菜单") : t.menu} onClick={() => setMenuOpen((open) => !open)}><span /><span /><b>{t.menu}</b></button>
      </div>
    </header>
    <aside className={`mobile-nav-panel ${menuOpen ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen}>
      <div className="mobile-nav-inner">
        <p>{t.menuKicker}</p>
        <nav aria-label={t.navAria}>{t.nav.map((item, index) => index === 3 ? <SmoothLink href="/interests" onNavigate={() => setMenuOpen(false)} key={item}><i>0{index + 1}</i><span>{item}</span><b>↗</b></SmoothLink> : <a href={navHrefs[index]} key={item} onClick={() => setMenuOpen(false)}><i>0{index + 1}</i><span>{item}</span><b>↓</b></a>)}</nav>
        <small>{t.menuNote}</small>
      </div>
    </aside>

    <section className="hero" id="home">
      <HeroNeuralField />
      <div className="hero-signal" aria-hidden="true"><b><i /><i /><i /></b></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <div className="hero-name-line"><h1>{t.name}</h1>{lang === "en" && <span lang="zh">林星潼</span>}</div>
          <p className="hero-alias">{t.alias}</p>
          <h2>{t.headline}</h2>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions"><a className="button primary" href="#research">{t.researchCta} <span>↓</span></a><a className="button secondary" href={assetPath("/Xingtong-Lin-Resume.pdf")} target="_blank" rel="noreferrer">{t.resume} <span>↗</span></a></div>
        </div>
        <aside className="hero-visual" aria-label={lang === "en" ? "Portrait of Xingtong Lin" : "林星潼个人照片"}>
          <div className="hero-profile">
            <div className="profile-photo"><div className="portrait-label"><span>CMU</span><b>{t.portraitLabel}</b></div><img src={assetPath("/xingtong-profile.jpg")} alt={lang === "en" ? `Portrait of ${t.name}` : `${t.name}的个人照片`} /></div>
            <div className="latest-card"><div><strong>{t.latest}</strong><time>{t.latestDate}</time></div><p>{t.latestBody}</p></div>
          </div>
        </aside>
      </div>
      <a className="scroll-cue" href="#about" aria-label={lang === "en" ? "Scroll to about" : "向下浏览关于我"}><span>{t.scroll}</span><i /></a>
    </section>

    <section className="about section-pad" id="about" data-reveal>
      <div className="section-lead"><p className="eyebrow">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><div className="course-list"><p>{t.coursesLabel}</p>{t.courses.map((course, index) => <span key={course}><i>{String(index + 1).padStart(2, "0")}</i><b>{course}</b></span>)}</div></div>
      <div className="about-body">
        {lang === "en" ? <p>I’m a junior at <a className="inline-link" href="https://www.cmu.edu/" target="_blank" rel="noreferrer">Carnegie Mellon University</a>, pursuing a <span className="soft-emphasis">B.S. in Neuroscience</span> on the <span className="soft-emphasis">Computational Neuroscience track</span>, with an additional major in <span className="soft-emphasis">Biomedical Technology</span> on the <span className="soft-emphasis">Neuroengineering track</span> and a minor in <span className="soft-emphasis">Business Administration</span>. I’m most curious about how neural signals become behavior—and how better experiments, analysis, and products can turn that curiosity into something useful.</p> : <p>我就读于<a className="inline-link" href="https://www.cmu.edu/" target="_blank" rel="noreferrer">卡内基梅隆大学</a>。主修<span className="soft-emphasis">神经科学</span>并选择<span className="soft-emphasis">计算神经科学方向</span>。同时修读<span className="soft-emphasis">生物医学技术</span>第二专业与<span className="soft-emphasis">工商管理</span>辅修。生物医学技术专业方向为<span className="soft-emphasis">神经工程</span>。研究兴趣集中于神经信号、行为和实验测量方法之间的关系。</p>}
        <div className="fact-grid">{t.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      </div>
    </section>

    <section className="stories-section research" id="research" data-reveal>
      <div className="section-top"><div><p className="eyebrow">{t.researchKicker}</p><h2>{t.researchTitle}</h2></div><p>{t.researchIntro}</p></div>
      <div className="story-grid research-grid">{researchTimeline[lang].map((story, index) => <StoryCard key={story.title} story={story} index={index} lang={lang} onOpen={() => setActiveStory(story)} />)}</div>
    </section>

    <section className="stories-section experience" id="experience" data-reveal>
      <div className="section-top"><div><p className="eyebrow">{t.experienceKicker}</p><h2>{t.experienceTitle}</h2></div><p>{t.experienceIntro}</p></div>
      <div className="story-grid experience-grid">{experience[lang].map((story, index) => <StoryCard key={story.title} story={story} index={index} lang={lang} onOpen={() => setActiveStory(story)} />)}</div>
    </section>

    <section className="toolkit section-pad" data-reveal>
      <div><p className="eyebrow">{t.toolkitKicker}</p><h2>{t.toolkitTitle}</h2></div>
      <div className="skill-groups">{skillGroups[lang].map((group) => <article key={group.title}><header><span>{group.number}</span><h3>{group.title}</h3></header><div>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div>
    </section>

    <SmoothLink className="interests-network" href="/interests" reveal>
      <div className="network-copy"><p className="eyebrow">{t.interestsKicker}</p><h2>{t.interestsTitle}</h2><p>{t.interestsBody}</p><span>{t.interestsCta} ↗</span></div>
      <div className="network-demo" aria-hidden="true" onPointerMove={tiltNetwork} onPointerLeave={resetNetwork}>
        <div className="triangle-network">
          <i className="triangle-edge edge-left" /><i className="triangle-edge edge-right" /><i className="triangle-edge edge-bottom" />
          <i className="triangle-spoke spoke-top" /><i className="triangle-spoke spoke-left" /><i className="triangle-spoke spoke-right" />
          {t.nodes.map((node, index) => <div className={`triangle-node triangle-node-${index + 1}`} key={node}><span>0{index + 1}</span><b className={`node-symbol node-symbol-${index + 1}`}><i /></b><strong>{node}</strong></div>)}
          <div className="life-core"><span>{t.lifeLabel}</span><b>{t.life}</b></div>
        </div>
      </div>
    </SmoothLink>

    <section className="contact section-pad" id="contact" data-reveal>
      <div className="contact-shell">
        <div className="contact-intro"><p className="eyebrow">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactBody}</p></div>
        <form className="contact-form" onSubmit={sendMessage} onChange={() => submitState !== "sending" && setSubmitState("idle")} aria-busy={submitState === "sending"}>
          <label><span>{t.formName}</span><input name="name" type="text" placeholder={t.formNamePlaceholder} required /></label>
          <label><span>{t.formEmail}</span><input name="email" type="email" placeholder={t.formEmailPlaceholder} required /></label>
          <label className="message-field"><span>{t.formMessage}</span><textarea name="message" rows={5} placeholder={t.formMessagePlaceholder} required /></label>
          <div className="form-honey" aria-hidden="true"><label>Leave this field empty<input name="_honey" type="text" tabIndex={-1} autoComplete="off" /></label></div>
          <button className="send-button" type="submit" disabled={submitState === "sending"}><span>{submitState === "sending" ? t.formSending : t.formSubmit}</span><i>{submitState === "sending" ? "…" : "↗"}</i></button>
          <p className={`form-status ${submitState}`} role={submitState === "error" ? "alert" : "status"} aria-live="polite">{submitState === "success" ? t.formSuccess : submitState === "error" ? t.formError : ""}</p>
        </form>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/lxt/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><b className="app-logo"><img src={assetPath("/social/linkedin.svg")} alt="" /></b></a>
          <a href="https://xhslink.cn/m/6kHp1Z9VdG5" target="_blank" rel="noreferrer" aria-label="小红书"><b className="app-logo"><img src={assetPath("/social/xiaohongshu.svg")} alt="" /></b></a>
          <button type="button" onClick={copyWeChat} aria-label={lang === "en" ? "Copy WeChat ID" : "复制微信号"}><b className="app-logo"><img src={assetPath("/social/wechat.svg")} alt="" /></b></button>
        </div>
      </div>
      <div className={`copy-toast ${copied ? "show" : ""}`} role="status">{lang === "en" ? "WeChat ID 13910969793 copied" : "微信号 13910969793 已复制"}</div>
    </section>

    <footer><a className="xl-mark" href="#home">XL</a><p>{t.footerLine}</p><span>{t.updated}</span></footer>
    {activeStory && <StoryModal story={activeStory} lang={lang} onClose={() => setActiveStory(null)} />}
  </main>;
}
