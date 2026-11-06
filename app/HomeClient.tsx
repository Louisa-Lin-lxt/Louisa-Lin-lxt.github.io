"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import { HeroNeuralField } from "./components/HeroNeuralField";
import { NeuralProgress } from "./components/NeuralProgress";
import { InterestArtwork } from "./components/InterestArtwork";
import { ProjectShelf, storyIdentity } from "./components/ProjectShelf";
import { DetailDialog } from "./components/DetailDialog";
import { ResearchFilm, ResearchSupplement } from "./components/ResearchMedia";
import { SmoothLink } from "./components/SmoothLink";
import { usePersistentLanguage } from "./components/usePersistentLanguage";
import { copy, experience, researchTimeline, ui, type Story } from "./content/portfolio";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const emailAddress = "xingtonl@andrew.cmu.edu";
const categories = ["Research", "Collaboration", "Other"] as const;
const sectionIds = ["about", "research", "experience", "interests", "contact"];

function Arrow({ external = false }: { external?: boolean }) {
  return <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={external ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export default function Home() {
  const { lang, toggleLang } = usePersistentLanguage();
  const t = ui[lang];
  const formCopy = copy[lang];
  const [selected, setSelected] = useState<{ kind: "research" | "experience"; index: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error" | "activation">("idle");
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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    document.querySelectorAll("[data-reveal]").forEach(item => observer.observe(item));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1000px)");
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

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "sending") return;
    const form = event.currentTarget, data = new FormData(form);
    const name = String(data.get("name") ?? "").trim(), email = String(data.get("email") ?? "").trim(), message = String(data.get("message") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim().replace(/[\r\n]/g," ");
    const category = String(data.get("category") ?? "Other");
    if (!name || !subject || !message || !categories.some(item => item === category)) { setSubmitState("error"); return; }
    if (data.get("_honey")) return;
    setSubmitState("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, { method: "POST", headers: { "Content-Type":"application/json", Accept:"application/json" }, body: JSON.stringify({name,email,message,subject,category,_replyto:email,_subject:`[Website][${category}] ${subject}`,_template:"table",_captcha:"false"}) });
      const result = await response.json() as {success?: boolean | string; message?: string};
      if (/needs activation/i.test(result.message ?? "")) { setSubmitState("activation"); return; }
      if (!response.ok || !(result.success === true || result.success === "true")) throw new Error("Not accepted");
      form.reset(); setSubmitState("success");
    } catch { setSubmitState("error"); }
  }

  function renderStoryDetail(story: Story, identity: NonNullable<typeof activeIdentity>) {
    const researchVideoIndex = selected?.kind === "research" && selected.index < 2 ? selected.index : null;
    return <article className="detail-copy">
      <header className="detail-heading"><h2>{story.sourceUrl ? <a className="detail-heading-link" href={story.sourceUrl} target="_blank" rel="noreferrer" aria-label={`${identity.organization} · ${story.sourceLabel ?? identity.organization}`} title={story.sourceLabel}>{identity.organization}<Arrow external /></a> : identity.organization}</h2><p className="detail-role">{identity.position}</p><p className="detail-context">{identity.affiliation && <span>{identity.affiliation}</span>}<time>{story.date}</time></p></header>
      <div className="detail-prose">{story.narrative.map((paragraph, index) => <Fragment key={index}>
        <p>{paragraph}</p>
        {index === 0 && (researchVideoIndex !== null ? <ResearchFilm index={researchVideoIndex} lang={lang} /> : <figure className={`inline-media story-figure ${story.imageClass ?? ""}`}><div className="inline-media-frame"><img src={asset(story.image)} alt={story.alt} /></div><figcaption>{story.alt}</figcaption></figure>)}
        {index === 1 && researchVideoIndex !== null && <ResearchSupplement index={researchVideoIndex} lang={lang} />}
      </Fragment>)}</div>
    </article>;
  }

  return <>
    <a className="skip-link" href="#main-content">{t.skip}</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand home-link" href="#home">{lang === "en" ? "Home" : "首页"}</a>
        <nav className="primary-nav" aria-label={formCopy.navAria}>{sectionIds.map((id,i) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{t.nav[i]}</a>)}</nav>
        <div className="header-actions"><button type="button" className="language-control" onClick={toggleLang} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}><span className={lang === "en" ? "selected" : ""}>EN</span><i /><span className={lang === "zh" ? "selected" : ""}>中</span></button><a className="nav-resume" href={asset('/Xingtong-Lin-Resume.pdf')} target="_blank" rel="noreferrer">{lang === "en" ? "Résumé" : "简历"}<Arrow external /></a><button className="menu-control" aria-label={t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg></button></div>
      </div>
    </header>
    <NeuralProgress lang={lang} activeSection={activeSection} />
    <main id="main-content" className="portfolio" lang={lang === "zh" ? "zh-CN" : "en"}>
      <section className="hero" id="home">
        <HeroNeuralField />
        <div className="hero-inner content-width">
          <div className="hero-copy">
            <h1>{t.name}</h1>
            <p className="hero-intro">{t.heroIntro}</p><p className="hero-work">{t.heroWork}</p>
            <div className="hero-actions"><a className="button button-primary" href="#research">{t.research}<Arrow /></a><a className="button button-secondary" href={asset('/Xingtong-Lin-Resume.pdf')} target="_blank" rel="noreferrer">{t.resume}<Arrow external /></a></div>
          </div>
          <div className="hero-composition">
            <figure className="hero-portrait"><img src={asset('/optimized/louisa-portrait.jpg')} alt={lang === "en" ? "Portrait of Louisa Lin" : "林星潼的个人照片"} width="722" height="900" fetchPriority="high" /><figcaption><strong>{t.photoCaption}</strong><span>{t.photoMeta}</span></figcaption></figure>
          </div>
        </div>

      </section>

      <section id="about" className="section about-section content-width" aria-labelledby="about-heading">
        <div className="about-copy" data-reveal><h2 id="about-heading">{t.aboutTitle}</h2><p>{t.aboutBody}</p><p>{t.aboutBridge}</p></div>
        <div className="education-panel" data-reveal><div className="education-heading"><img src={asset('/orgs/cmu-logo.png')} alt="" width="44" height="44" loading="lazy" /><div><span className="meta">{t.education}</span><h3>{t.university}</h3></div></div><dl className="education-list"><div><dt>{t.major}</dt><dd>{t.track}</dd></div><div><dt>{t.additional}</dt><dd>{t.additionalTrack}</dd></div><div><dt>{t.minor}</dt><dd>{t.minorLabel}</dd></div></dl><p className="honor">Dean’s List with High Honors</p><details className="supporting-details"><summary>{t.coursework}<span>+</span></summary><ul>{formCopy.courses.map(course => <li key={course}>{course}</li>)}</ul></details></div>
      </section>

      <section id="research" className="section research-section" aria-labelledby="research-heading">
        <div className="content-width"><div className="section-heading" data-reveal><div><h2 id="research-heading">{t.researchTitle}</h2></div><p className="section-summary">{t.researchIntro}</p></div>
          <ProjectShelf kind="research" lang={lang} onOpen={index=>setSelected({kind:'research',index})}/>
        </div>
      </section>

      <section id="experience" className="section content-width experience-section" aria-labelledby="experience-heading">
        <div className="section-heading" data-reveal><div><h2 id="experience-heading">{t.experienceTitle}</h2></div><p className="section-summary">{t.experienceIntro}</p></div>
        <ProjectShelf kind="experience" lang={lang} onOpen={index=>setSelected({kind:'experience',index})}/>
      </section>

      <section id="interests" className="section interests-section" aria-labelledby="interests-heading"><div className="content-width"><div className="section-heading" data-reveal><div><h2 id="interests-heading">{t.interestsTitle}</h2></div></div><div className="interest-list">{t.interestNames.map((name,index) => <SmoothLink key={name} href={`/interests#${['music','taotao','travel'][index]}`} className="interest-item" ariaLabel={`${t.interestsLink}: ${name}`}><InterestArtwork index={index} /><div><h3>{name}</h3><p>{t.interestDesc[index]}</p></div><Arrow /></SmoothLink>)}</div></div></section>

      <section id="contact" className="section content-width contact-section" aria-labelledby="contact-heading">
        <div className="contact-info" data-reveal><h2 id="contact-heading">{t.contactTitle}</h2><p>{t.contactBody}</p><div className="contact-links social-links">
          <a href="https://www.linkedin.com/in/lxt/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><img src={asset('/social/linkedin.svg')} alt="" width="25" height="25"/></a>
          <a href="https://xhslink.cn/m/6kHp1Z9VdG5" target="_blank" rel="noreferrer" aria-label={lang==='en'?'Xiaohongshu':'小红书'} title={lang==='en'?'Xiaohongshu':'小红书'}><img src={asset('/social/xiaohongshu.svg')} alt="" width="32" height="32"/></a>
          <button type="button" onClick={() => copyContact('13910969793',t.wechatCopied)} aria-label={t.wechat} title={lang==='en'?'Copy WeChat ID':'复制微信号'}><img src={asset('/social/wechat.svg')} alt="" width="29" height="29"/></button>
        </div></div>
        <div className="contact-form-panel" data-reveal><form aria-label={t.form} onSubmit={sendMessage} onChange={() => submitState !== 'sending' && setSubmitState('idle')} aria-busy={submitState==='sending'}>
          <div className="form-two"><label>{formCopy.formName}<input autoComplete="name" name="name" required /></label><label>{formCopy.formEmail}<input autoComplete="email" type="email" name="email" required placeholder="you@example.com" /></label></div>
          <label>{formCopy.formCategory}<select name="category" defaultValue="Research">{categories.map((cat,i) => <option key={cat} value={cat}>{formCopy.formCategories[i]}</option>)}</select></label>
          <label>{formCopy.formSubject}<input name="subject" required maxLength={160} placeholder={formCopy.formSubjectPlaceholder} /></label><label>{formCopy.formMessage}<textarea name="message" rows={4} required /></label><div className="honeypot" aria-hidden="true"><label>Leave blank<input name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
          <button className="button button-primary submit-button" disabled={submitState==='sending'}>{submitState==='sending'?formCopy.formSending:formCopy.formSubmit}<Arrow /></button><p className={`form-feedback ${submitState}`} role={submitState==='error'||submitState==='activation'?'alert':'status'}>{submitState==='success'?formCopy.formSuccess:submitState==='activation'?formCopy.formActivation:submitState==='error'?formCopy.formError:''}</p>
        </form></div>
      </section>
    </main>
    <footer className="site-footer content-width"><span>© 2026 Xingtong Lin</span></footer>
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    {activeStory && activeIdentity && <DetailDialog className="story-detail-dialog" title={activeIdentity.organization} closeLabel={t.close} onClose={() => setSelected(null)}>{renderStoryDetail(activeStory, activeIdentity)}</DetailDialog>}
    {menuOpen && <DetailDialog title={formCopy.navAria} closeLabel={t.closeMenu} onClose={() => setMenuOpen(false)} className="mobile-menu-dialog"><nav aria-label={formCopy.navAria}>{sectionIds.map((id,i) => <a href={`#${id}`} key={id} aria-current={activeSection===id?'location':undefined} onClick={() => setMenuOpen(false)}>{t.nav[i]}<Arrow /></a>)}</nav><a className="menu-resume" href={asset('/Xingtong-Lin-Resume.pdf')} target="_blank" rel="noreferrer">{t.resume}<Arrow external /></a></DetailDialog>}
  </>;
}
