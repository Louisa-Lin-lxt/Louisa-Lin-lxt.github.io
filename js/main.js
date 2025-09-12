// 语言切换功能
const translations = {
  en: {
      home: 'Home',
      portfolio: 'Portfolio',
      about: 'About Me',
      contact: 'Contact',
      welcome: 'Hi, welcome to',
      world: "'s world...",
      bio: "Hi! Welcome to my channel! I'm Xingtong Lin (you can call me Louisa), a freshman studying at Carnegie Mellon University, a musician (non-professional type), a traveler, and an animal lover. I really relish the process of exploring what I love and passionate about, building up my own academic skills, solving problems for a more glamorous world.",
      gallery: 'Gallery',
      aboutMe: 'About Me',
      moreAboutMe: 'More About Me',
      currentResearch: 'Current Research',
      myDog: 'My Dog',
      performingTraveling: 'Photo Dump',
      downloadCV: 'Download CV',
      blessing: 'May your future be filled with endless possibilities',
      name: 'Xingtong Lin',
      showZhBlessing: false,
      showEnBlessing: true
  },
  zh: {
      home: '首页',
      portfolio: '作品集',
      about: '关于我',
      contact: '联系方式',
      welcome: '你好，欢迎来到',
      world: '的世界...',
      bio: '我是卡内基梅隆大学的大一学生，一个非专业音乐家，旅行家和动物爱好者。探索我所热爱的事物，建立自己的学术技能，励志创造一个更美好的世界。',
      gallery: '作品展示',
      aboutMe: '关于我',
      moreAboutMe: '更多关于我',
      currentResearch: '当前研究',
      myDog: '我的狗狗',
      performingTraveling: '照片轰炸',
      downloadCV: '下载简历',
      blessing: '愿你得偿所愿',
      name: '林星潼',
      showZhBlessing: true,
      showEnBlessing: false
  }
};

let currentLang = localStorage.getItem('language') || 'en';

document.documentElement.lang = currentLang;

function switchLanguage() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  localStorage.setItem('language', currentLang);
  document.documentElement.lang = currentLang;
  document.querySelector('.current-lang').textContent = currentLang === 'en' ? 'EN' : '中';
  updateContent(currentLang);
  // 切换字体
  document.body.style.fontFamily = currentLang === 'en' ? "'Big Caslon', serif" : "'SimHei', serif";
}

function updateContent(lang) {
    // 更新导航栏
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html') {
            link.textContent = translations[lang].home;
        } else if (href === 'about.html') {
            link.textContent = translations[lang].about;
        } else if (href === 'portfolio.html') {
            link.textContent = translations[lang].portfolio;
        } else if (href === 'contact.html') {
            link.textContent = translations[lang].contact;
        }
    });

    // 切换所有.en和.zh内容的显示和字体
    document.querySelectorAll('.en, .zh').forEach(element => {
        if (element.classList.contains('en')) {
            element.style.display = lang === 'en' ? '' : 'none';
            element.style.fontFamily = "Times New Roman, serif";
        } else if (element.classList.contains('zh')) {
            element.style.display = lang === 'zh' ? '' : 'none';
            element.style.fontFamily = "SimHei, 黑体, sans-serif";
        }
    });

    // 更新简历下载链接
    const cvDownloadLinks = document.querySelectorAll('.cv-download');
    cvDownloadLinks.forEach(link => {
        if (lang === 'en') {
            link.href = 'resumes/resume_en.pdf';
            link.download = 'Xingtong_Lin_Resume_EN.pdf';
        } else {
            link.href = 'resumes/resume_zh.pdf';
            link.download = '林星潼_简历_中文.pdf';
        }
        console.log('Updated CV link:', link.href, 'for language:', lang);
    });

    // 祝福语字体
    const blessingEn = document.querySelector('.blessing');
    const blessingZh = document.querySelector('.blessing-zh');
    if (blessingEn && blessingZh) {
        blessingEn.style.display = lang === 'en' ? '' : 'none';
        blessingZh.style.display = lang === 'zh' ? '' : 'none';
        blessingEn.style.fontFamily = "Times New Roman, serif";
        blessingZh.style.fontFamily = "SimHei, 黑体, sans-serif";
    }

    // 整体body字体
    document.body.style.fontFamily = lang === 'en' ? "Times New Roman, serif" : "SimHei, 黑体, sans-serif";

  const elements = {
      '.nav-link[href="#home"]': 'home',
      '.nav-link[href="#portfolio"]': 'portfolio',
      '.nav-link[href="#about"]': 'about',
      '.nav-link[href="#contact"]': 'contact',
      '.welcome-text': 'welcome',
      '.world-text': 'world',
      '.bio p': 'bio',
      '#portfolio h2': 'gallery',
      '#about h2': 'aboutMe',
      '.more-about h3': 'moreAboutMe',
      '.research h4': 'currentResearch',
      '.dog h4': 'myDog',
      '.travel h4': 'performingTraveling',
      '.cv-download': 'downloadCV',
      '.blessing': 'blessing'
  };

  for (const [selector, key] of Object.entries(elements)) {
      const element = document.querySelector(selector);
      if (element) {
          if (selector === '.cv-download') {
              element.innerHTML = `<i class="fas fa-download"></i> ${translations[lang][key]}`;
          } else {
              element.textContent = translations[lang][key];
          }
      }
  }

  // 姓名
  const nameEl = document.querySelector('.name');
  if (nameEl) nameEl.textContent = translations[lang].name;

  // 切换 about.html 中的内容
  const aboutElements = {
      '.about-name': 'name',
      '.about-school': 'school',
      '.about-year': 'year',
      '.about-major': 'major',
      '.cv-download': 'downloadCV',
      '.research-title': 'currentResearch',
      '.dog h4': 'myDog',
      '.travel h4': 'performingTraveling'
  };

  for (const [selector, key] of Object.entries(aboutElements)) {
      const element = document.querySelector(selector);
      if (element) {
          const enSpan = element.querySelector('.en');
          const zhSpan = element.querySelector('.zh');
          if (enSpan && zhSpan) {
              enSpan.style.display = lang === 'en' ? '' : 'none';
              zhSpan.style.display = lang === 'zh' ? '' : 'none';
          }
      }
  }
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
  } else {
      header.style.background = 'rgba(255, 255, 255, 0.8)';
  }
});

// 页面加载时根据 localStorage 设置语言
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'en';
  currentLang = savedLang;
  document.documentElement.lang = currentLang;
  document.querySelector('.current-lang').textContent = currentLang === 'en' ? 'EN' : '中';
  updateContent(currentLang);
  
  // 强制更新简历链接，防止缓存问题
  setTimeout(() => {
    const cvLinks = document.querySelectorAll('.cv-download');
    cvLinks.forEach(link => {
      if (currentLang === 'en') {
        link.href = 'resumes/resume_en.pdf';
        link.download = 'Xingtong_Lin_Resume_EN.pdf';
      } else {
        link.href = 'resumes/resume_zh.pdf';
        link.download = '林星潼_简历_中文.pdf';
      }
      console.log('Force updated CV link:', link.href, 'for language:', currentLang);
    });
  }, 100);
}); 