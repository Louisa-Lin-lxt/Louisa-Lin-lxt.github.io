import assert from 'node:assert/strict';
import { readFile, access, stat } from 'node:fs/promises';
import test from 'node:test';
const root = new URL('../dist/client/',import.meta.url);
const home = await readFile(new URL('index.html',root),'utf8');
const interests = await readFile(new URL('interests.html',root),'utf8');

test('static export renders the portfolio and navigable sections without a worker',()=>{
  assert.match(home,/<h1\b/);
  assert.match(home,/Xingtong/);
  assert.match(home,/Research Assistant/);
  assert.match(home,/Beyond Academics/);
  assert.match(home,/Work Experience/);
  assert.match(home,/Venture Fellow/);
  for (const id of ['home','about','research','experience','interests','contact']) {
    assert.ok(home.includes(`id="${id}"`),`Missing section ${id}`);
    assert.ok(home.includes(`href="#${id}"`),`Missing anchor for ${id}`);
  }
  assert.doesNotMatch(home,/Your site is taking shape|Building your site/);
});

test('all local image, script, stylesheet and PDF references exist in exported pages',async()=>{
  const refs=new Set([...`${home}${interests}`.matchAll(/(?:src|href)="(\/[^"?#]*)/g)].map(match=>match[1]).filter(path=>/\.(?:js|css|png|jpg|jpeg|webp|gif|svg|pdf)$/.test(path)));
  assert.ok(refs.size>10,'Expected real asset references');
  await Promise.all([...refs].map(path=>access(new URL(`.${path}`,root))));
  const pdf=await readFile(new URL('Xingtong-Lin-Resume.pdf',root));
  assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
  assert.ok((await stat(new URL('optimized/louisa-portrait.jpg',root))).size < 200_000);
  assert.ok((await stat(new URL('optimized/he-lab.jpg',root))).size < 150_000);
});

test('research cards identify the labs and retain direct contact links',()=>{
  assert.match(home,/Bin He Lab/);
  assert.match(home,/Yttri Lab/);
  assert.match(home,/Wang Lab/);
  assert.doesNotMatch(home,/href="mailto:/);
  for (const name of ["linkedin", "wechat", "xiaohongshu"]) assert.ok(home.includes(`/social/${name}.svg`));
  assert.match(home,/href="https:\/\/www.linkedin.com\/in\/lxt\/"/);
});

test('static HTML keeps all seven horizontal cards and usable interaction fallbacks',()=>{
  assert.equal([...home.matchAll(/class="project-card research-card"/g)].length,3);
  assert.equal([...home.matchAll(/class="project-card experience-card"/g)].length,4);
  assert.equal([...home.matchAll(/class="card-open"/g)].length,7);
  assert.equal([...home.matchAll(/aria-haspopup="dialog"/g)].length,7);
  assert.match(home,/class="hero-neural-field"/);
  assert.match(home,/class="neural-progress"/);
  assert.match(home,/aria-label="Reading progress"/);
  assert.doesNotMatch(home,/Send a signal|Illustrative signal|memo-folder|neural-explorer|shelf-signal|shelf-contribution|topic-controls|contact-resume/);
});

test('interest route exports direct topic links and keyboard tabs',()=>{
  for(const topic of ['music','taotao','travel']) assert.ok(home.includes(`/interests#${topic}`));
  assert.match(interests,/role="tablist"/);
  assert.match(interests,/role="tabpanel"/);
  assert.match(interests,/href="\/" class="brand home-link"/);
  assert.match(interests,/Music, Taotao, and travel are part of my life beyond research/);
  assert.doesNotMatch(interests,/Personal collections are being prepared|Content in preparation|STORIES COMING SOON/);
});
