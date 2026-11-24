"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { HeroNeuralField } from "./components/HeroNeuralField";
import { CourseworkDisclosure } from "./components/CourseworkDisclosure";
import { useSectionMotion } from "./components/useSectionMotion";
import { NeuralProgress } from "./components/NeuralProgress";
import { InterestArtwork } from "./components/InterestArtwork";
import { ContactForm } from "./components/ContactForm";
import { VisitorCounter } from "./components/VisitorCounter";
import { ProjectShelf, storyIdentity } from "./components/ProjectShelf";
import { PublicationsProjects } from "./components/PublicationsProjects";
import { DetailDialog } from "./components/DetailDialog";
import { ResearchFilm, ResearchSupplement } from "./components/ResearchMedia";
import { SmoothLink } from "./components/SmoothLink";
import { usePersistentLanguage } from "./components/usePersistentLanguage";
import { copy, experience, researchTimeline, ui, type Story } from "./content/portfolio";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const emailAddress = "xingtonl@andrew.cmu.edu";
const sectionIds = ["about", "research", "outputs", "experience", "interests", "contact"];

function Arrow({ external = false }: { external?: boolean }) {
  return <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={external ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export default function Home() {
  const { lang, toggleLang } = usePersistentLanguage();
  useSectionMotion(lang);
  const t = ui[lang];
  const formCopy = copy[lang];
  const resumeHref = asset(lang === "zh" ? "/Xingtong-Lin-Resume-ZH.pdf" : "/Xingtong-Lin-Resume.pdf");
  const [selected, setSelected] = useState<{ kind: "research" | "experience"; index: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeStory = selected ? (selected.kind === "research" ? researchTimeline[lang] : experience[lang])[selected.index] : null;
  const activeIdentity = activeStory && selected ? storyIdentity(activeStory, selected.kind, selected.index, lang) : null;

  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    let frame = 0;
    const update = () => {
      const threshold = window.innerHeight * .35;
      let current = "home";
      for (const section of sections) if (section.getBoundingClientRect().top <= threshold) current = section.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = "contact";
      setActiveSection(current);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1100px)");
    const close = () => { if (media.matches) setMenuOpen(false); };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  async function copyContact(value: string, message: string) {
    let success = false;
    try { await navigator.clipboard.writeText(value); success = true; } catch {
      const text = document.createElement("textarea"); text.value = value; text.style.position = "fixed"; text.style.opacity = "0";
      document.body.appendChild(text); text.select(); success = document.execCommand("copy"); text.remove();
    }
    setToast(success ? message : t.copyFailed);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }

  function renderStoryDetail(story: Story, identity: NonNullable<typeof activeIdentity>) {
    const isResearch = selected?.kind === "research";
    const researchVideoIndex = isResearch && selected.index < 2 ? selected.index : null;
    const storyImage = <figure className={`inline-media story-figure ${story.imageClass ?? ""}`}><div className="inline-media-frame"><img src={asset(story.image)} alt={story.alt} /></div><figcaption>{story.alt}</figcaption></figure>;
    return <article className="detail-copy">
      <header className="detail-heading"><h2>{story.sourceUrl ? <a className="detail-heading-link" href={story.sourceUrl} target="_blank" rel="noreferrer" aria-label={`${identity.organization} · ${story.sourceLabel ?? identity.organization}`} title={story.sourceLabel}>{identity.organization}<Arrow external /></a> : identity.organization}</h2><p className="detail-role">{identity.position}</p><p className="detail-context">{identity.affiliation && <span>{identity.affiliation}</span>}<time>{story.date}</time></p></header>
      <div className="detail-prose">{isResearch ? <>
        <div className="research-contribution">
          {story.narrative.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          {selected.index === 1 && <a className="research-output-link" href={asset("/research-media/yttri-2025-first-year-poster.pdf")} target="_blank" rel="noreferrer">{lang === "en" ? "Open my poster" : "查看我的研究海报"}<Arrow external /></a>}
        </div>
        <div className="research-lab-context">
          {researchVideoIndex !== null ? <><ResearchFilm index={researchVideoIndex} lang={lang} /><ResearchSupplement index={researchVideoIndex} lang={lang} /></> : storyImage}
        </div>
      </> : story.narrative.map((paragraph, index) => <Fragment key={index}>
        <p>{paragraph}</p>
        {index === 0 && storyImage}
      </Fragment>)}</div>
    </article>;
  }

  return <>
    <a className="skip-link" href="#main-content">{t.skip}</a>
    <header className="site-header" style={{ backdropFilter: "var(--site-header-glass)" }}>
      <div className="header-inner">
        <a className="brand home-link" href="#home">{lang === "en" ? "Home" : "首页"}</a>
        <nav className="primary-nav" aria-label={formCopy.navAria}>{sectionIds.map((id,i) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{t.nav[i]}</a>)}</nav>
        <div className="header-actions"><button type="button" className="language-control" onClick={() => { if (document.documentElement.dataset.nameIntro === "play") document.documentElement.dataset.nameIntro = "done"; toggleLang(); }} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}><span className={lang === "en" ? "selected" : ""}>EN</span><i /><span className={lang === "zh" ? "selected" : ""}>中</span></button><button className="menu-control" aria-label={t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg></button></div>
      </div>
    </header>
    <NeuralProgress lang={lang} activeSection={activeSection} />
    <main id="main-content" className="portfolio" lang={lang === "zh" ? "zh-CN" : "en"}>
      <section className="hero" id="home">
        <HeroNeuralField />
        <div className="hero-inner content-width">
          <div className="hero-copy">
            <p className="hero-eyebrow">{lang === "en" ? "Carnegie Mellon University" : "卡内基梅隆大学"}</p>
            <h1 aria-label={t.name}><span className="hero-name-reveal" onAnimationEnd={event => { if (event.animationName === "hero-name-letter" && event.target === event.currentTarget.lastElementChild && document.documentElement.dataset.nameIntro === "play") document.documentElement.dataset.nameIntro = "done"; }}>{Array.from(t.name).map((letter, index) => <span className="hero-name-letter" key={`${lang}-${index}`} style={{ animationDelay: `${120 + index * (lang === "en" ? 65 : 130)}ms` }}>{letter === " " ? "\u00a0" : letter}</span>)}</span></h1>
            <p className="hero-intro">{t.heroIntro}</p>
            <div className="hero-actions"><a className="button button-primary" href="#contact">{t.contact}<Arrow /></a><a className="button button-secondary" href={resumeHref} target="_blank" rel="noreferrer">{t.resume}<Arrow external /></a></div>
          </div>
          <div className="hero-composition">
            <figure className="hero-portrait"><img src={asset('/optimized/louisa-portrait-beach.jpg')} alt={lang === "en" ? "Louisa Lin smiling by the sea" : "林星潼在海边微笑"} width="1350" height="1500" fetchPriority="high" /><figcaption><strong>{t.photoCaption}</strong><span>{t.photoMeta}</span></figcaption></figure>
          </div>
        </div>

      </section>

      <section id="about" className="section about-section content-width" aria-labelledby="about-heading">
        <div className="about-copy" data-reveal><p className="section-label">01 / {lang === "en" ? "A little background" : "关于我"}</p><h2 id="about-heading">{t.aboutTitle}</h2><p>{t.aboutBody}</p></div>
        <div className="education-panel" data-reveal="support"><div className="education-heading"><img src={asset('/orgs/cmu-logo.png')} alt="" width="44" height="44" loading="lazy" /><div><span className="meta">{t.education}</span><h3>{t.university}</h3></div></div><dl className="education-list"><div><dt>{t.major}</dt><dd>{t.track}</dd></div><div><dt>{t.additional}</dt><dd>{t.additionalTrack}</dd></div><div><dt>{t.minor}</dt><dd>{t.minorLabel}</dd></div></dl><p className="honor">Dean’s List with High Honors</p><CourseworkDisclosure label={t.coursework} groups={formCopy.courseGroups} /></div>
      </section>

      <section id="research" className="section research-section" aria-labelledby="research-heading">
        <div className="content-width"><div className="section-heading" data-reveal><div><p className="section-label">02 / {lang === "en" ? "In the lab" : "实验室里"}</p><h2 id="research-heading">{t.researchTitle}</h2></div></div>
          <ProjectShelf kind="research" lang={lang} onOpen={index=>setSelected({kind:'research',index})}/>
        </div>
      </section>

      <PublicationsProjects lang={lang} />

      <section id="experience" className="section content-width experience-section" aria-labelledby="experience-heading">
        <div className="section-heading" data-reveal><div><p className="section-label">04 / {lang === "en" ? "Putting ideas to work" : "从想法到实践"}</p><h2 id="experience-heading">{t.experienceTitle}</h2></div></div>
        <ProjectShelf kind="experience" lang={lang} onOpen={index=>setSelected({kind:'experience',index})}/>
      </section>

      <section id="interests" className="section interests-section" aria-labelledby="interests-heading"><div className="content-width"><div className="section-heading" data-reveal><div><p className="section-label">05 / {lang === "en" ? "A few favorite things" : "生活里的小喜欢"}</p><h2 id="interests-heading">{t.interestsTitle}</h2></div><p className="section-intro">{lang === "en" ? "Off the clock, and a little more me." : "忙碌之外，生活的另一面。"}</p></div><div className="interest-list" data-reveal="support">{t.interestNames.map((name,index) => <SmoothLink key={name} href={`/interests#${['music','taotao','travel'][index]}`} className="interest-item" ariaLabel={`${t.interestsLink}: ${name}`}><InterestArtwork index={index} /><div><h3>{name}</h3></div><Arrow /></SmoothLink>)}</div></div></section>

      <section id="contact" className="section content-width contact-section" aria-labelledby="contact-heading">
        <div className="contact-info" data-reveal><p className="section-label">06 / {lang === "en" ? "Start a conversation" : "保持联系"}</p><h2 id="contact-heading">{t.contactTitle}</h2><p>{t.contactBody}</p>
          <a className="contact-email" href={`mailto:${emailAddress}`}>{emailAddress}</a>
          <div className="contact-email-actions">
            <a className="button button-primary" href={`mailto:${emailAddress}`}>{formCopy.email}<Arrow /></a>
            <button type="button" className="contact-copy" onClick={() => copyContact(emailAddress,t.copied)} aria-label={`${t.copy}: ${emailAddress}`}>{lang === "en" ? "Copy address" : "复制邮箱"}</button>
          </div>
          <div className="contact-links social-links">
          <a href="https://www.linkedin.com/in/lxt/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><img src={asset('/social/linkedin.svg')} alt="" width="25" height="25"/></a>
          <a href="https://xhslink.cn/m/6kHp1Z9VdG5" target="_blank" rel="noreferrer" aria-label={lang==='en'?'Xiaohongshu':'小红书'} title={lang==='en'?'Xiaohongshu':'小红书'}><img src={asset('/social/xiaohongshu.svg')} alt="" width="32" height="32"/></a>
          <button type="button" onClick={() => copyContact('13910969793',t.wechatCopied)} aria-label={t.wechat} title={lang==='en'?'Copy WeChat ID':'复制微信号'}><img src={asset('/social/wechat.svg')} alt="" width="29" height="29"/></button>
        </div></div>
        <ContactForm lang={lang} />
      </section>
    </main>
    <footer className="site-footer content-width"><span>© 2026 Xingtong Lin</span><VisitorCounter lang={lang} /><a href="#home">{lang === "en" ? "Back to top ↑" : "回到顶部 ↑"}</a></footer>
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    {activeStory && activeIdentity && <DetailDialog className="story-detail-dialog" title={activeIdentity.organization} closeLabel={t.close} onClose={() => setSelected(null)}>{renderStoryDetail(activeStory, activeIdentity)}</DetailDialog>}
    {menuOpen && <DetailDialog title={formCopy.navAria} closeLabel={t.closeMenu} onClose={() => setMenuOpen(false)} className="mobile-menu-dialog"><nav aria-label={formCopy.navAria}>{sectionIds.map((id,i) => <a href={`#${id}`} key={id} aria-current={activeSection===id?'location':undefined} onClick={() => setMenuOpen(false)}>{t.nav[i]}<Arrow /></a>)}</nav><a className="menu-resume" href={resumeHref} target="_blank" rel="noreferrer">{t.resume}<Arrow external /></a></DetailDialog>}
  </>;
}
