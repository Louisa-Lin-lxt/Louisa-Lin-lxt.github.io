import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// A small, self-contained scene: no remote models, textures, audio or per-frame React updates.
export function createChristmasScene(canvas: HTMLCanvasElement, control: HTMLButtonElement, onReady: () => void) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch { return null; }
  // Render sharply enough for the entrance enlargement without resizing each frame.
  renderer.setPixelRatio(2);
  renderer.setClearColor(0xf3f8fb, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .85;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2.7, 2.7, 1.75, -1.75, .1, 30);
  camera.position.set(0, .12, 8);
  camera.lookAt(0, 0, 0);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xf6fcff, 0xc4d9d2, 1.4));
  const light = new THREE.DirectionalLight(0xfff4da, 2);
  light.position.set(-3, 5, 4);
  scene.add(light);

  const glass = new THREE.MeshPhysicalMaterial({ color: 0xf3ffff, metalness: 0, roughness: .025,
    transparent: true, opacity: .14, transmission: 1, thickness: .035, ior: 1.45, clearcoat: 1, clearcoatRoughness: .025,
    envMapIntensity: .8, depthWrite: false });
  const gold = new THREE.MeshStandardMaterial({ color: 0xdac28a, metalness: .75, roughness: .27 });
  const pine = new THREE.MeshPhysicalMaterial({ color: 0x639e8b, metalness: .08, roughness: .1, transparent: true, opacity: .72, clearcoat: 1, depthWrite: false });
  const palePine = pine.clone();
  palePine.color.set(0xb0d8c8);
  const snowMaterial = new THREE.MeshPhysicalMaterial({ color: 0xe7f5f4, roughness: .16, transparent: true, opacity: .36, clearcoat: 1, depthWrite: false });
  const cordMaterial = new THREE.LineBasicMaterial({ color: 0xb9a273, transparent: true, opacity: .7 });
  const pivot = new THREE.Group();
  pivot.position.set(-.22, 1.65, 0);
  scene.add(pivot);
  const ornament = new THREE.Group();
  ornament.position.y = -1.84;
  pivot.add(ornament);

  const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D = ornament) => {
    const object = new THREE.Mesh(geometry, material);
    parent.add(object);
    return object;
  };
  mesh(new THREE.SphereGeometry(1, 40, 24), glass);
  // Fresnel rim and narrow reflections define the glass without a milky white fill.
  // The middle remains nearly transparent, including over the real portrait.
  const rimMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    vertexShader: `varying vec3 n; varying vec3 eye;
      void main() { vec4 p = modelViewMatrix * vec4(position, 1.0);
        n = normalize(normalMatrix * normal); eye = normalize(-p.xyz);
        gl_Position = projectionMatrix * p; }`,
    fragmentShader: `varying vec3 n; varying vec3 eye;
      void main() { vec3 normal = normalize(n);
        float edge = pow(1.0 - abs(dot(normal, normalize(eye))), 2.4);
        float glint = pow(max(0.0, dot(normal, normalize(vec3(-.55, .65, .5)))), 75.0);
        float reflection = pow(max(0.0, dot(normal, normalize(vec3(.8, -.1, .48)))), 110.0);
        vec3 tint = mix(vec3(.52,.7,.76), vec3(1.0), glint + reflection);
        gl_FragColor = vec4(tint, edge * .34 + glint * .58 + reflection * .3); }`,
  });
  mesh(new THREE.SphereGeometry(1.003, 48, 32), rimMaterial).renderOrder = 5;
  const cap = mesh(new THREE.CylinderGeometry(.16, .2, .13, 20), gold);
  cap.position.y = 1.02;
  const ring = mesh(new THREE.TorusGeometry(.095, .015, 8, 24), gold);
  ring.position.y = 1.15;
  const cord = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -.59, 0),
  ]), cordMaterial);
  pivot.add(cord);

  const ground = mesh(new THREE.SphereGeometry(.68, 24, 12), snowMaterial);
  ground.scale.set(1, .13, 1);
  ground.position.y = -.65;
  const tree = new THREE.Group();
  ornament.add(tree);
  [[.48, .65, -.28], [.36, .58, .02], [.24, .48, .31]].forEach(([radius, height, y], index) => {
    const tier = mesh(new THREE.ConeGeometry(radius, height, 48), index === 1 ? palePine : pine, tree);
    tier.position.y = y;
  });
  const trunk = mesh(new THREE.CylinderGeometry(.065, .075, .2, 12), gold, tree);
  trunk.position.y = -.57;
  const starShape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? .072 : .16;
    const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
    if (i === 0) starShape.moveTo(x, y); else starShape.lineTo(x, y);
  }
  starShape.closePath();
  const star = mesh(new THREE.ExtrudeGeometry(starShape, { depth: .035, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .012, bevelThickness: .012 }), gold, tree);
  star.position.set(0, .63, .05);
  const berry = new THREE.MeshStandardMaterial({ color: 0xc57d79, roughness: .3, metalness: .35 });
  for (let i = 0; i < 12; i++) {
    const y = -.42 + i * .075;
    const radius = .4 * (1 - (y + .42) / 1.2);
    const angle = i * 2.4;
    const bead = mesh(new THREE.SphereGeometry(.035, 8, 6), i % 3 ? gold : berry, tree);
    bead.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
  }

  // A smaller rose-glass bauble gives a restrained festive accent beside the icy one.
  const companion = new THREE.Group();
  companion.position.set(1.22, 1.65, -.4);
  scene.add(companion);
  const roseGlass = glass.clone();
  roseGlass.color.set(0xe9b2a8);
  roseGlass.transmission = .95;
  roseGlass.opacity = .22;
  const littleBall = mesh(new THREE.SphereGeometry(.32, 24, 16), roseGlass, companion);
  littleBall.position.y = -1.16;
  const littleRim = mesh(new THREE.SphereGeometry(.322, 24, 16), rimMaterial, companion);
  littleRim.position.y = -1.16;
  littleRim.renderOrder = 5;
  const littleCap = mesh(new THREE.CylinderGeometry(.065, .08, .07, 16), gold, companion);
  littleCap.position.y = -.83;
  companion.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(), new THREE.Vector3(0, -.79, 0),
  ]), cordMaterial));

  // Snow lives inside the globe, so it never drifts over the portrait or text.
  const snowCount = 64;
  const positions = new Float32Array(snowCount * 3);
  const seeds = Array.from({ length: snowCount }, (_, i) => ({
    angle: i * 2.39996, radius: .28 + (i * .137 % .57), height: (i * .618) % 1,
  }));
  const snowGeometry = new THREE.BufferGeometry();
  snowGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const snow = new THREE.Points(snowGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: .025, sizeAttenuation: true }));
  ornament.add(snow);

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false, paused = false, disposed = false, dirty = true, ready = false, contextAvailable = true;
  let frame = 0, lastTime = 0, elapsed = 0, burst = 1;
  let pointerX = 0, pointerY = 0, tiltX = 0, tiltY = 0;
  let swing = -.15, velocity = 0;

  const schedule = () => {
    // The first frame also starts the entrance when the resting position is below the fold.
    if (!frame && !disposed && contextAvailable && (visible || !ready) && !document.hidden && (dirty || (!paused && !motion.matches))) frame = requestAnimationFrame(draw);
  };
  const cancel = () => { cancelAnimationFrame(frame); frame = 0; lastTime = 0; };
  function draw(now: number) {
    frame = 0;
    if (disposed || !contextAvailable || (!visible && ready) || document.hidden) return;
    if (lastTime && now - lastTime < 32 && !dirty) { schedule(); return; }
    const dt = Math.min(lastTime ? (now - lastTime) / 1000 : 1 / 30, .05);
    lastTime = now;
    const animated = !motion.matches && !paused;
    if (animated) {
      elapsed += dt;
      velocity += (-swing * 16 - velocity * 3.4) * dt;
      swing += velocity * dt;
      burst *= Math.exp(-dt * .65);
      tiltX += (pointerX - tiltX) * (1 - Math.exp(-dt * 5));
      tiltY += (pointerY - tiltY) * (1 - Math.exp(-dt * 5));
    }
    if (animated) {
      pivot.rotation.z = swing + Math.sin(elapsed * .9) * .025 - tiltX * .15;
      ornament.rotation.y = tiltX * .65;
      ornament.rotation.x = tiltY * .22;
      companion.rotation.z = -swing * .6 + Math.sin(elapsed * .9 + 1) * .04;
    } else if (motion.matches) {
      pivot.rotation.z = 0;
      ornament.rotation.set(0, 0, 0);
      companion.rotation.z = 0;
    }
    seeds.forEach(({ angle, radius, height }, i) => {
      const phase = height - elapsed * (.045 + i % 4 * .008);
      const y = (phase - Math.floor(phase)) * 1.4 - .65;
      const a = angle + elapsed * .12 + burst * Math.sin(elapsed * 2 + i) * .6;
      const r = radius * Math.sqrt(Math.max(.05, 1 - y * y));
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(a) * r;
    });
    snowGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    control.dataset.renderer = "ready";
    if (!ready) { ready = true; onReady(); }
    dirty = false;
    schedule();
  }
  const resize = () => {
    const width = control.clientWidth, height = control.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.left = -1.75 * width / height;
    camera.right = 1.75 * width / height;
    camera.updateProjectionMatrix();
    dirty = true; schedule();
  };
  const point = (event: PointerEvent) => {
    if (motion.matches || paused) return;
    const rect = control.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width * 2 - 1;
    pointerY = (event.clientY - rect.top) / rect.height * 2 - 1;
    schedule();
  };
  const leave = () => { pointerX = 0; pointerY = 0; schedule(); };
  const refresh = () => { dirty = true; cancel(); schedule(); };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(control);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible || !ready) { dirty = true; schedule(); } else cancel(); });
  intersection.observe(control);
  control.addEventListener("pointermove", point, { passive: true });
  control.addEventListener("pointerleave", leave);
  motion.addEventListener("change", refresh);
  document.addEventListener("visibilitychange", refresh);
  const contextLost = (event: Event) => { event.preventDefault(); contextAvailable = false; cancel(); delete control.dataset.renderer; };
  const contextRestored = () => { contextAvailable = true; dirty = true; schedule(); };
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  resize();

  return {
    shake() {
      if (motion.matches || paused) return;
      velocity = Math.min(velocity + 2.7, 4);
      burst = 2.3;
      control.dataset.shakes = String(Number(control.dataset.shakes ?? 0) + 1);
      dirty = true; schedule();
    },
    setPaused(value: boolean) { paused = value; refresh(); },
    dispose() {
      disposed = true; cancel();
      resizeObserver.disconnect(); intersection.disconnect();
      control.removeEventListener("pointermove", point); control.removeEventListener("pointerleave", leave);
      motion.removeEventListener("change", refresh); document.removeEventListener("visibilitychange", refresh);
      canvas.removeEventListener("webglcontextlost", contextLost); canvas.removeEventListener("webglcontextrestored", contextRestored);
      const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          const values = Array.isArray(object.material) ? object.material : [object.material];
          values.forEach(material => materials.add(material));
        }
      });
      materials.forEach(material => material.dispose());
      environment.dispose(); renderer.dispose();
    },
  };
}
