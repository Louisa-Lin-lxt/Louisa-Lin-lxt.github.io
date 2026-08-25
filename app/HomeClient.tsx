"use client";

import { useEffect, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { HeroNeuralField } from "./components/HeroNeuralField";
import { SmoothLink } from "./components/SmoothLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

type Lang = "en" | "zh";
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
    nav: ["About", "Research", "Experience", "Pub / Projects", "Interests", "Contact"],
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
    projectsKicker: "04 · PUBLICATIONS / PROJECTS",
    projectsTitle: "Publications and projects.",
    projectsIntro: "A dedicated home for publications, posters, and selected projects. The shelves are ready; the work is being prepared.",
    publication: "Publication",
    project: "Selected project",
    comingSoon: "Coming soon",
    open: "View more",
    close: "Close",
    whatIDid: "What I did",
    toolkitKicker: "SKILLS ACROSS MY WORK",
    toolkitTitle: "Skills, grouped by how I use them.",
    interestsKicker: "05 · OFF DUTY",
    interestsTitle: "My world beyond the lab.",
    interestsBody: "Music, animals, and travel keep me curious, grounded, and open to new places. I’m saving this space for the stories behind each one.",
    interestsCta: "Explore my world of interests",
    nodes: ["MUSIC", "ANIMAL LOVER", "TRAVELLER"],
    contactKicker: "06 · CONTACT",
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
    footerLine: "© 2026 By Xingtong Lin",
    updated: "Updated August 2026",
  },
  zh: {
    nav: ["关于我", "科研经历", "其他经历", "论文 / 项目", "兴趣", "联系我"],
    name: "林星潼",
    alias: "也可以叫我 Louisa。",
    eyebrow: "计算神经科学 · 神经工程 · CMU",
    headline: "我想弄清楚，神经信号如何变成选择。",
    intro: "我做过脑电、动物行为和细胞相关研究，也一直在想：怎样用更合适的实验、分析和技术，把大脑里的问题测得更清楚。",
    researchCta: "看看我的科研经历",
    resume: "查看英文简历",
    latest: "最新动态",
    latestDate: "2026.07",
    latestBody: "加入嘉程资本，担任 Venture Capital Fellow，关注医疗健康和科技领域的早期项目。",
    aboutKicker: "01 · 关于我",
    aboutTitle: "关于我。",
    aboutBody: "我是卡内基梅隆大学大三学生，主修神经科学（计算神经科学方向），同时修读生物医学技术第二专业（神经工程方向）和工商管理辅修。我最感兴趣的是神经信号怎样影响行为，也喜欢把实验、数据分析和产品思维放在一起解决问题。",
    facts: [["学位", "神经科学理学学士"], ["神经科学方向", "计算神经科学"], ["第二专业", "生物医学技术 · 神经工程方向"], ["辅修", "工商管理"], ["语言", "普通话 · 英语 · 粤语 · 法语"], ["荣誉", "Dean’s List with High Honors"]],
    coursesLabel: "部分课程",
    courses: ["脑机接口：原理与应用", "神经科学导论", "生理学", "生物医学工程实验", "概率论与随机过程", "命令式计算原理"],
    researchKicker: "02 · 研究",
    researchTitle: "我的科研经历。",
    researchIntro: "我先在暑研中接触细胞培养和水凝胶实验，之后在 Yttri Lab 参与了更完整的行为神经科学流程：从每天的 27 孔小鼠实验，到数据整理，再到 trial-pair 分析。现在，我的研究重心已经转到 Bin He Lab，参与人类 EEG 实验和深度学习相关工作。",
    experienceKicker: "03 · 经历",
    experienceTitle: "实验室之外，我也做过这些。",
    experienceIntro: "除了科研，我还做过早期投资、产品设计、医疗产品的海外业务拓展和课程辅导。这些经历让我学会把复杂问题讲清楚，也把想法一步步推进下去。",
    projectsKicker: "04 · 论文 / 项目",
    projectsTitle: "论文与项目。",
    projectsIntro: "这里会集中展示论文、海报和我想长期保留的项目。内容还在整理，之后会陆续补上。",
    publication: "论文成果",
    project: "精选项目",
    comingSoon: "整理中",
    open: "查看详情",
    close: "关闭",
    whatIDid: "我做了什么",
    toolkitKicker: "能力汇总",
    toolkitTitle: "这些经历里，我实际用到的能力。",
    interestsKicker: "05 · 实验室之外",
    interestsTitle: "实验室之外的我。",
    interestsBody: "我喜欢音乐、动物和旅行。它们没有写进科研问题里，但同样组成了我看世界的方式。具体故事会在下一步慢慢补进来。",
    interestsCta: "看看我的兴趣世界",
    nodes: ["音乐", "动物爱好者", "旅行者"],
    contactKicker: "06 · 联系",
    contactTitle: "想聊聊的话，欢迎来找我。",
    contactBody: "如果你想了解我的研究、最近在关注 fundraising，或者只是想约一次 coffee chat，都可以给我留言。",
    email: "给我发邮件",
    formName: "姓名",
    formEmail: "邮箱",
    formMessage: "留言",
    formNamePlaceholder: "你的名字",
    formEmailPlaceholder: "you@example.com",
    formMessagePlaceholder: "你想聊些什么？",
    formSubmit: "发送信息",
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
    { number: "01", title: "数据与计算", skills: ["Python", "MATLAB", "Trial-pair 分析", "数据分析", "深度学习辅助"] },
    { number: "02", title: "实验与研究方法", skills: ["人类 EEG", "EEG capping", "动物行为实验", "27 孔实验", "细胞培养", "无菌操作", "水凝胶实验"] },
    { number: "03", title: "产品与商业", skills: ["项目搜寻", "市场研究", "技术尽调", "产品设计", "用户流程", "商务拓展", "合作推进"] },
    { number: "04", title: "沟通与协作", skills: ["科研表达", "教学", "课程设计", "讨论引导", "跨文化沟通", "培训"] },
  ],
};

const research: Record<Lang, Story[]> = {
  en: [
    { title: "EEG + Deep Learning", org: "Bin He Lab · CMU Biomedical Engineering", date: "May 2025 — Present", image: "/orgs/he-lab.gif", alt: "Brain imaging animation from the official He Lab website", summary: "I have now moved on to Bin He’s lab, where my current workflow starts with human EEG recording and continues toward the lab’s deep-learning research.", details: ["Prepare the session::Ready participants for EEG recording and support the practical setup needed before collection begins.", "Fit the EEG cap::Carry out EEG capping carefully and help confirm that the recording setup is ready for a consistent session.", "Move toward computation::Support auxiliary work for the lab’s deep-learning models after the experimental setup, while keeping model details and research results private."], tags: ["Human EEG", "EEG capping", "Signal acquisition", "Deep-learning support"], sourceUrl: "https://www.cmu.edu/bme/helab/", sourceLabel: "He Lab website", imageClass: "official-he" },
    { title: "Behavior → Trial Pairs", org: "Yttri Lab · CMU Biological Sciences", date: "Jan 2025 — Sep 2026", image: "/orgs/yttri-lab.png", alt: "Fluorescent brain section from the official Yttri Lab website", summary: "I move from running daily behavior in a 27-port open-field arena to a Python/MATLAB trial-pair workflow that compares rewarded and unrewarded trials without publishing the underlying data.", details: ["Prepare the behavior::Train mice for the task, check the 27-port open-field arena and Arduino-supported setup, and observe the related surgical workflow.", "Run daily experiments::Independently operate mouse behavioral sessions and keep the task procedure consistent from one session to the next.", "Make the workflow transferable::Train PhD students on the behavioral task and the relevant data structure so new sessions enter the same analysis-ready format.", "Build trial pairs::Organize trials by outcome and pair rewarded with unrewarded trials for a structured comparison in Python and MATLAB.", "Check reproducibility::Evaluate whether the analysis behaves consistently across animals, document the pipeline, and make it usable for the lab’s follow-up work—without exposing experimental values or result direction.", "Communicate the work::Connect the behavioral and analysis workflow to my SURA 2025 poster on decision-making in an open-field arena."], tags: ["Behavioral experiments", "Trial-pair analysis", "Python", "MATLAB", "Arduino", "Research training"], sourceUrl: "https://labs.bio.cmu.edu/yttri/", sourceLabel: "Yttri Lab website", imageClass: "official-yttri" },
    { title: "Summer Cell-Culture Exploration", org: "Wang Lab · Tsinghua University", date: "May — Aug 2025", image: "/orgs/wang-research.jpg", alt: "Neural stem cell migration research figure from Tsinghua University", summary: "My first step was a summer research project that gave me an initial understanding of wet-lab work through cell cultivation and hydrogel-related experiments.", details: ["Prepare cell work::Ready materials and follow sterile technique for neural stem cell, neuroglia, HAPI, and HUVIC cultures.", "Cultivate and maintain::Carry out routine cultivation and monitor cell condition so cultures remain suitable for the next experimental step.", "Learn the hydrogel workflow::Use the summer project to understand how cell-culture preparation connects with hydrogel-related experiments, without presenting it as my primary research focus or exposing measurements."], tags: ["Cell culture", "Sterile technique", "Hydrogel experiments"], sourceUrl: "https://www.mse.tsinghua.edu.cn/info/1061/2080.htm", sourceLabel: "Tsinghua research feature", imageClass: "official-wang" },
  ],
  zh: [
    { title: "EEG 与深度学习", org: "Bin He Lab · CMU 生物医学工程系", date: "2025.05 — 至今", image: "/orgs/he-lab.gif", alt: "He Lab 官网的脑成像动画", summary: "现在我继续进入 Bin He Lab，从人类 EEG 实验记录开始，并把工作推进到实验室的深度学习研究流程。", details: ["准备实验::协助参与者完成 EEG 记录前准备，处理采集开始前需要确认的实际设置。", "佩戴 EEG 帽::完成 EEG capping，并帮助确认记录系统已经适合进行一致的实验。", "推进到计算环节::在实验设置之后，为实验室的深度学习模型提供辅助支持，同时不公开模型细节和研究结果。"], tags: ["人类 EEG", "EEG capping", "信号采集", "深度学习辅助"], sourceUrl: "https://www.cmu.edu/bme/helab/", sourceLabel: "He Lab 官网", imageClass: "official-he" },
    { title: "行为实验 → Trial Pairs", org: "Yttri Lab · CMU 生物科学系", date: "2025.01 — 2026.09", image: "/orgs/yttri-lab.png", alt: "Yttri Lab 官网的荧光脑切片", summary: "我从独立运行 27 孔开放场中的日常行为实验，推进到使用 Python/MATLAB 比较 rewarded 与 unrewarded trials 的 trial-pair 分析，但不会公开底层数据。", details: ["准备行为任务::训练小鼠，检查 27 孔开放场与 Arduino 支持的装置，并观察相关手术流程。", "运行日常实验::独立执行小鼠行为实验，让每次 session 都遵循一致的任务流程。", "让流程可交接::培训博士生完成行为任务并理解相关数据结构，使新实验能够进入同样的分析格式。", "建立 trial pairs::按照结果整理每个 trial，把 rewarded 和 unrewarded trials 组成结构化对照，并在 Python 与 MATLAB 中实现分析。", "检查可重复性::判断分析在不同动物中是否保持一致，记录整个 pipeline，并让实验室可以继续用于后续研究；不披露数值或结果方向。", "表达研究过程::把行为实验与分析流程整合进 SURA 2025 关于开放场决策研究的海报。"], tags: ["行为实验", "Trial-pair 分析", "Python", "MATLAB", "Arduino", "研究培训"], sourceUrl: "https://labs.bio.cmu.edu/yttri/", sourceLabel: "Yttri Lab 官网", imageClass: "official-yttri" },
    { title: "暑期细胞实验初探", org: "王秀梅课题组 · 清华大学", date: "2025.05 — 2025.08", image: "/orgs/wang-research.jpg", alt: "清华大学官网发布的神经干细胞迁移研究图", summary: "我的第一步是一段暑期研究项目，通过细胞培养和水凝胶相关实验，对湿实验研究形成初步了解。", details: ["准备细胞工作::为神经干细胞、神经胶质细胞、HAPI 和 HUVIC 培养准备材料，并遵循无菌操作。", "培养与维护::进行日常培养并观察细胞状态，让细胞适合进入后续实验步骤。", "了解水凝胶流程::通过暑期项目理解细胞培养如何与水凝胶相关实验衔接；不把它描述为主要研究方向，也不公开实验测量结果。"], tags: ["细胞培养", "无菌操作", "水凝胶实验"], sourceUrl: "https://www.mse.tsinghua.edu.cn/info/1061/2080.htm", sourceLabel: "清华官方研究报道", imageClass: "official-wang" },
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
    { title: "风险投资 Fellow", org: "Next Capital · 嘉程资本", date: "2026.07 — 至今", image: "/orgs/jiacheng-capital.webp", alt: "嘉程资本标志", summary: "我参与投资流程最前端的项目寻找，把一个初步信号整理成更适合继续讨论和判断的问题。", details: ["项目寻找::寻找可能适合美元基金的公司与项目，重点关注医疗健康与科技方向。", "初步筛选::整理团队、产品、市场和融资背景等已知信息，让有潜力的机会能够被高效讨论。", "技术转译::把专业产品或研究主张转化为关于真实问题、差异化、采用路径和下一步尽调的具体问题。"], tags: ["项目搜寻", "市场研究", "技术尽调"], sourceUrl: "https://www.jiachengcap.com/", sourceLabel: "嘉程资本官网", imageClass: "official-next" },
    { title: "海外商务拓展实习生", org: "Glunovo · 九诺医疗", date: "2025.02 — 2025.06", image: "/orgs/glunovo.png", alt: "九诺医疗官网的 Glunovo 持续血糖监测产品", summary: "我协助持续血糖监测公司的跨境合作沟通，也理解了同一个技术产品如何面对不同市场讲清自己的价值。", details: ["合作沟通::向美国、乌兹别克斯坦和马来西亚的潜在合作方介绍公司与产品。", "信息调整::根据不同组织和地区，调整技术、临床和商业信息的表达重点。", "后续推进::整理沟通背景与下一步，让一次初步会面能够继续走向更具体的合作讨论。"], tags: ["商务拓展", "合作沟通", "跨文化沟通"], sourceUrl: "https://cn.infinovo.com/", sourceLabel: "九诺医疗官网", imageClass: "official-glunovo" },
    { title: "SI Leader", org: "CMU 学术成功中心", date: "2025.08 — 至今", image: "/orgs/cmu-logo.png", alt: "卡内基梅隆大学标志", summary: "我负责 Modern Biology 的协作学习活动，帮助同学不只记住知识点，也能把概念之间的关系讲清楚。", details: ["准备每周活动::把课程内容变成引导问题、练习和适合小组一起完成的讨论流程。", "根据现场调整::判断大家真正卡住的地方，换一种方式解释复杂概念，并根据理解程度调整节奏。", "和课程团队配合::与授课教师及学术成功中心沟通，让活动跟上课程进度，也把常见问题带回下一次准备。"], tags: ["教学", "课程设计", "讨论引导"], sourceUrl: "https://www.cmu.edu/student-success/", sourceLabel: "CMU 学术成功中心", imageClass: "official-cmu" },
    { title: "产品设计实习生", org: "Yovo · AI 升学与职业规划产品", date: "2024.09 — 2025.01", image: "/orgs/yovo.png", alt: "Yovo 官方标志", summary: "我参与了 Yovo 的早期产品流程设计，把 AI 顾问从一个想法拆成用户真正会走过的页面、步骤和交互。", details: ["梳理完整路径::整理大学专业、职业和课外活动咨询的端到端用户流程。", "明确关键交互::确定核心操作和页面之间的跳转逻辑，让团队对产品行为有一致理解。", "支持早期界面设计::用清楚的产品流程图表达需求，为早期 UI 开发和团队讨论提供依据。"], tags: ["产品设计", "用户流程", "UX"], sourceUrl: "https://yovo.ai/home", sourceLabel: "Yovo 官网", imageClass: "official-yovo" },
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
  return <div className="story-modal" role="dialog" aria-modal="true" aria-label={story.title} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
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
  const [lang, setLang] = useState<Lang>("en");
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [copied, setCopied] = useState(false);
  const t = copy[lang];
  const navHrefs = ["#about", "#research", "#experience", "#projects", "/interests", "#contact"];
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
  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:xingtongl@andrew.cmu.edu?subject=${subject}&body=${body}`;
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
      <a className="xl-mark" href="#home" aria-label="Home">XL</a>
      <nav>{t.nav.map((item, index) => index === 4 ? <SmoothLink href="/interests" key={item}>{item} ↗</SmoothLink> : <a href={navHrefs[index]} key={item}>{item}</a>)}</nav>
      <button className="language-switch" onClick={() => setLang(lang === "en" ? "zh" : "en")} aria-label="Switch language"><span className={lang === "en" ? "active" : ""}>EN</span><i /><span className={lang === "zh" ? "active" : ""}>中</span></button>
    </header>

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
            <div className="profile-photo"><div className="portrait-label"><span>CMU</span><b>NEUROSCIENCE · NEUROENGINEERING</b></div><img src={assetPath("/xingtong-profile.jpg")} alt={`Portrait of ${t.name}`} /></div>
            <div className="latest-card"><div><strong>{t.latest}</strong><time>{t.latestDate}</time></div><p>{t.latestBody}</p></div>
          </div>
        </aside>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span>SCROLL</span><i /></a>
    </section>

    <section className="about section-pad" id="about" data-reveal>
      <div className="section-lead"><p className="eyebrow">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><div className="course-list"><p>{t.coursesLabel}</p>{t.courses.map((course, index) => <span key={course}><i>{String(index + 1).padStart(2, "0")}</i><b>{course}</b></span>)}</div></div>
      <div className="about-body">
        {lang === "en" ? <p>I’m a junior at <a className="inline-link" href="https://www.cmu.edu/" target="_blank" rel="noreferrer">Carnegie Mellon University</a>, pursuing a <span className="soft-emphasis">B.S. in Neuroscience</span> on the <span className="soft-emphasis">Computational Neuroscience track</span>, with an additional major in <span className="soft-emphasis">Biomedical Technology</span> on the <span className="soft-emphasis">Neuroengineering track</span> and a minor in <span className="soft-emphasis">Business Administration</span>. I’m most curious about how neural signals become behavior—and how better experiments, analysis, and products can turn that curiosity into something useful.</p> : <p>我是<a className="inline-link" href="https://www.cmu.edu/" target="_blank" rel="noreferrer">卡内基梅隆大学</a>大三学生，主修<span className="soft-emphasis">神经科学</span>，选择<span className="soft-emphasis">计算神经科学方向</span>；同时修读<span className="soft-emphasis">生物医学技术</span>第二专业，选择<span className="soft-emphasis">神经工程方向</span>，并辅修<span className="soft-emphasis">工商管理</span>。我最感兴趣的是神经信号怎样影响行为，也喜欢把实验、数据分析和产品思维放在一起解决问题。</p>}
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

    <section className="projects-section section-pad" id="projects" data-reveal>
      <div className="section-top"><div><p className="eyebrow">{t.projectsKicker}</p><h2>{t.projectsTitle}</h2></div><p>{t.projectsIntro}</p></div>
      <div className="project-placeholders">
        <article><span>01</span><div><p>{t.publication}</p><h3>{t.comingSoon}</h3></div><i>DOI</i></article>
        <article><span>02</span><div><p>{t.project}</p><h3>{t.comingSoon}</h3></div><i>LAB</i></article>
      </div>
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
          <div className="life-core"><span>OFF DUTY</span><b>LIFE</b></div>
        </div>
      </div>
    </SmoothLink>

    <section className="contact section-pad" id="contact" data-reveal>
      <div className="contact-shell">
        <div className="contact-intro"><p className="eyebrow">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactBody}</p></div>
        <form className="contact-form" onSubmit={sendMessage}>
          <label><span>{t.formName}</span><input name="name" type="text" placeholder={t.formNamePlaceholder} required /></label>
          <label><span>{t.formEmail}</span><input name="email" type="email" placeholder={t.formEmailPlaceholder} required /></label>
          <label className="message-field"><span>{t.formMessage}</span><textarea name="message" rows={5} placeholder={t.formMessagePlaceholder} required /></label>
          <button className="send-button" type="submit"><span>{t.formSubmit}</span><i>↗</i></button>
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
