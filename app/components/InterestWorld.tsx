"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function InterestWorld({ active, label }: { active: number; label: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.1, 9.6);
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf7fbff, 0x16335f, 3.2));
    const key = new THREE.DirectionalLight(0xffffff, 5.5);
    key.position.set(-4, 7, 7);
    key.castShadow = true;
    scene.add(key);
    const yellowLight = new THREE.PointLight(0xffd447, 26, 16);
    yellowLight.position.set(3.5, 1.5, 4);
    scene.add(yellowLight);
    const blueLight = new THREE.PointLight(0x62baf5, 22, 16);
    blueLight.position.set(-4, -1, 4);
    scene.add(blueLight);

    const stage = new THREE.Group();
    stage.position.set(1.05, 0.15, 0);
    scene.add(stage);

    const navy = new THREE.MeshPhysicalMaterial({ color: 0x0b2a52, roughness: 0.24, clearcoat: 1 });
    const blue = new THREE.MeshPhysicalMaterial({ color: 0x2f8df0, roughness: 0.2, clearcoat: 1 });
    const paleBlue = new THREE.MeshPhysicalMaterial({ color: 0xdceeff, roughness: 0.25, clearcoat: .8 });
    const yellow = new THREE.MeshPhysicalMaterial({ color: 0xffd447, roughness: 0.22, clearcoat: 1 });
    const cream = new THREE.MeshPhysicalMaterial({ color: 0xfff8dc, roughness: 0.34, clearcoat: .65 });
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x09172b, roughness: 0.3, clearcoat: .7 });
    const dogFur = new THREE.MeshPhysicalMaterial({ color: 0xf7f2e7, roughness: .72, clearcoat: .12 });
    const dogCream = new THREE.MeshPhysicalMaterial({ color: 0xfffcf4, roughness: .68, clearcoat: .1 });
    const dogShadow = new THREE.MeshPhysicalMaterial({ color: 0xe6ddcd, roughness: .76, clearcoat: .08 });
    const vestBlue = new THREE.MeshPhysicalMaterial({ color: 0x4e6385, roughness: .48, clearcoat: .35 });
    const vestAccent = new THREE.MeshPhysicalMaterial({ color: 0x4e6385, roughness: .4, clearcoat: .5 });

    const music = new THREE.Group();
    const record = new THREE.Mesh(new THREE.CylinderGeometry(1.58, 1.58, .22, 72), navy);
    record.rotation.x = Math.PI / 2;
    record.castShadow = true;
    music.add(record);
    [1.22, .92, .63].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, .018, 8, 90), index === 1 ? yellow : paleBlue);
      ring.position.z = .14 + index * .01;
      music.add(ring);
    });
    const label = new THREE.Mesh(new THREE.CylinderGeometry(.43, .43, .26, 48), yellow);
    label.rotation.x = Math.PI / 2;
    label.position.z = .04;
    music.add(label);
    const pin = new THREE.Mesh(new THREE.SphereGeometry(.09, 18, 12), cream);
    pin.position.z = .24;
    music.add(pin);
    const equalizer = [-1.8, -1.35, -0.9, -.45, 0, .45, .9, 1.35, 1.8].map((x, index) => {
      const height = .45 + (index % 4) * .3;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(.22, height, .25), index % 3 === 1 ? yellow : blue);
      bar.position.set(x, -2.05 + height / 2, -.55);
      bar.userData.baseHeight = height;
      music.add(bar);
      return bar;
    });
    stage.add(music);

    const animal = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(1.02, 48, 34), dogFur);
    body.scale.set(.7, 1.12, .72);
    body.position.y = -.86;
    body.castShadow = true;
    animal.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.12, 56, 40), dogFur);
    head.scale.set(1.12, 1, .88);
    head.position.y = .63;
    head.castShadow = true;
    animal.add(head);
    [[-.94,.9],[-.72,1.28],[-.38,1.52],[0,1.6],[.38,1.52],[.72,1.28],[.94,.9],[-.98,.48],[.98,.48],[-.82,.15],[.82,.15],[-.42,1.23],[0,1.3],[.42,1.23]].forEach(([x,y], index) => {
      const curl = new THREE.Mesh(new THREE.SphereGeometry(index === 3 ? .48 : .44, 26, 20), index % 6 === 0 ? dogCream : dogFur);
      curl.scale.set(1.08, 1.02, .72);
      curl.position.set(x, y, .04 + (index % 2) * .03);
      animal.add(curl);
    });
    [-1, 1].forEach((side) => {
      const ear = new THREE.Mesh(new THREE.CapsuleGeometry(.38, .37, 10, 24), dogShadow);
      ear.scale.set(1.05, 1.05, .78);
      ear.position.set(side * 1.08, .38, .12);
      ear.rotation.z = side * -.18;
      animal.add(ear);
      const eye = new THREE.Mesh(new THREE.SphereGeometry(.095, 20, 14), dark);
      eye.scale.set(.9, 1.06, .68);
      eye.position.set(side * .36, .7, 1.08);
      animal.add(eye);
      const leg = new THREE.Mesh(new THREE.CapsuleGeometry(.26, .42, 10, 24), dogFur);
      leg.position.set(side * .58, -1.48, .52);
      leg.rotation.z = side * -.04;
      animal.add(leg);
      const paw = new THREE.Mesh(new THREE.SphereGeometry(.39, 28, 20), dogCream);
      paw.scale.set(1.1, .7, .86);
      paw.position.set(side * .58, -1.82, .66);
      animal.add(paw);
    });
    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(.46, 32, 24), dogCream);
    muzzle.scale.set(1.13, .7, .5);
    muzzle.position.set(0, .36, 1.05);
    animal.add(muzzle);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(.125, 20, 14), dark);
    nose.scale.set(1.12, .78, .84);
    nose.position.set(0, .48, 1.43);
    animal.add(nose);
    [-1, 1].forEach((side) => {
      const eyeGlint = new THREE.Mesh(new THREE.SphereGeometry(.028, 10, 8), cream);
      eyeGlint.position.set(side * .335, .73, 1.158);
      animal.add(eyeGlint);
    });
    // The photo shows narrow patterned straps, rather than a solid vest.
    const harnessCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-.62, -.35, .4), new THREE.Vector3(-.43, -.72, .7),
      new THREE.Vector3(0, -.91, .79), new THREE.Vector3(.43, -.72, .7),
      new THREE.Vector3(.62, -.35, .4),
    ]);
    animal.add(new THREE.Mesh(new THREE.TubeGeometry(harnessCurve, 32, .075, 8, false), vestBlue));
    const chestStrap = new THREE.Mesh(new THREE.CapsuleGeometry(.075, .69, 6, 12), vestAccent);
    chestStrap.position.set(0, -1.25, .75);
    animal.add(chestStrap);
    const harnessSpot = new THREE.MeshPhysicalMaterial({ color: 0xcbd3dd, roughness: .8 });
    for (let i = 1; i < 10; i++) {
      const point = harnessCurve.getPoint(i / 10);
      const spot = new THREE.Mesh(new THREE.SphereGeometry(.038, 8, 6), i % 3 ? harnessSpot : navy);
      spot.scale.z = .35;
      spot.position.copy(point); spot.position.z += .07;
      animal.add(spot);
    }
    const muzzleShade = new THREE.MeshPhysicalMaterial({ color: 0xd5bea0, roughness: .85 });
    [-1, 1].forEach(side => {
      const tuft = new THREE.Mesh(new THREE.SphereGeometry(.19, 20, 14), muzzleShade);
      tuft.scale.set(1, .85, .45);
      tuft.position.set(side * .24, .32, 1.24);
      animal.add(tuft);
    });
    const tail = new THREE.Mesh(new THREE.TorusGeometry(.4, .16, 14, 34, Math.PI * 1.55), dogFur);
    tail.position.set(1.02, -.93, -.5);
    tail.rotation.set(.3, -.4, -.35);
    animal.add(tail);
    stage.add(animal);

    const travel = new THREE.Group();
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1.5, 48, 34), new THREE.MeshPhysicalMaterial({ color: 0x2f8df0, transparent: true, opacity: .32, roughness: .16, clearcoat: 1 }));
    globe.castShadow = true;
    travel.add(globe);
    const wire = new THREE.Mesh(new THREE.SphereGeometry(1.53, 24, 16), new THREE.MeshBasicMaterial({ color: 0xdceeff, wireframe: true, transparent: true, opacity: .56 }));
    travel.add(wire);
    [0, Math.PI / 2].forEach((rotation) => {
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.05, .035, 10, 110), rotation ? yellow : paleBlue);
      orbit.rotation.set(rotation * .55, rotation, rotation * .16);
      travel.add(orbit);
    });
    const plane = new THREE.Group();
    const planeBody = new THREE.Mesh(new THREE.CapsuleGeometry(.13, .85, 8, 18), cream);
    planeBody.rotation.z = Math.PI / 2;
    plane.add(planeBody);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(.62, .08, .9), yellow);
    plane.add(wing);
    plane.position.set(1.95, 1.35, .55);
    plane.rotation.z = .18;
    travel.add(plane);
    const clouds: THREE.Group[] = [];
    [[-2.1, 1.35], [2.15, -1.35], [-2.35, -1.2]].forEach(([x, y], index) => {
      const cloud = new THREE.Group();
      [0, .42, -.42].forEach((offset, sphereIndex) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(sphereIndex ? .38 : .55, 24, 18), sphereIndex === 1 ? cream : paleBlue);
        puff.position.x = offset;
        cloud.add(puff);
      });
      cloud.position.set(x, y, -.15 - index * .25);
      travel.add(cloud);
      clouds.push(cloud);
    });
    stage.add(travel);

    const groups = [music, animal, travel];
    groups.forEach((group, index) => {
      const selected = index === activeRef.current;
      group.scale.setScalar(selected ? 1 : .001);
      group.position.x = selected ? 0 : (index < activeRef.current ? -3.2 : 3.2);
      group.visible = selected;
    });

    const floor = new THREE.Mesh(new THREE.CircleGeometry(3.25, 72), new THREE.MeshBasicMaterial({ color: 0x0b2a52, transparent: true, opacity: .16 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(1.05, -2.45, -.4);
    floor.scale.y = .35;
    scene.add(floor);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width < 2 || height < 2) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      const mobile = width < 760;
      stage.scale.setScalar(mobile ? .68 : width < 1100 ? .84 : 1);
      stage.position.set(mobile ? 0 : 1.05, mobile ? .65 : .15, 0);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("resize", resize);
    const firstResizeFrame = requestAnimationFrame(resize);
    const routeResizeTimer = window.setTimeout(resize, 560);
    resize();

    let pointerX = 0;
    let pointerY = 0;
    let dragging = false;
    let lastDragX = 0;
    let lastDragY = 0;
    let dragYaw = 0;
    let dragPitch = 0;
    let dragVelocity = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;
    let pointerDownHit = false;
    const raycaster = new THREE.Raycaster();
    const rayPointer = new THREE.Vector2();
    const hitsActiveIcon = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return false;
      rayPointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      scene.updateMatrixWorld(true);
      raycaster.setFromCamera(rayPointer, camera);
      return raycaster.intersectObject(groups[activeRef.current], true).length > 0;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        const deltaX = event.clientX - lastDragX;
        const deltaY = event.clientY - lastDragY;
        dragYaw += deltaX * .012;
        dragPitch = THREE.MathUtils.clamp(dragPitch + deltaY * .006, -.32, .32);
        dragVelocity = deltaX * .0018;
        lastDragX = event.clientX;
        lastDragY = event.clientY;
        event.stopPropagation();
        return;
      }
      host.classList.toggle("is-clickable", hitsActiveIcon(event));
      pointerX = (event.clientX / window.innerWidth - .5) * .22;
      pointerY = (event.clientY / window.innerHeight - .5) * .14;
    };
    const onPointerDown = (event: PointerEvent) => {
      pointerDownHit = hitsActiveIcon(event);
      if (!pointerDownHit) return;
      pointerDownX = event.clientX;
      pointerDownY = event.clientY;
      lastDragX = event.clientX;
      lastDragY = event.clientY;
      dragging = true;
      dragVelocity = 0;
      host.classList.add("is-dragging");
      renderer.domElement.setPointerCapture(event.pointerId);
      event.preventDefault();
      event.stopPropagation();
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!pointerDownHit) return;
      if (Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY) < 8 && hitsActiveIcon(event)) dragYaw += .4;
      dragging = false;
      pointerDownHit = false;
      if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
      host.classList.remove("is-dragging");
      event.preventDefault();
      event.stopPropagation();
    };
    const onPointerCancel = (event: PointerEvent) => {
      dragging = false;
      pointerDownHit = false;
      if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
      host.classList.remove("is-dragging");
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") dragYaw -= .22;
      else if (event.key === "ArrowRight") dragYaw += .22;
      else if (event.key === "ArrowUp") dragPitch = THREE.MathUtils.clamp(dragPitch - .12, -.32, .32);
      else if (event.key === "ArrowDown") dragPitch = THREE.MathUtils.clamp(dragPitch + .12, -.32, .32);
      else if (event.key === "Enter" || event.key === " ") dragYaw += .4;
      else return;
      event.preventDefault();
      dragVelocity = 0;
    };
    window.addEventListener("pointermove", onPointerMove);
    host.addEventListener("keydown", onKeyDown);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerCancel);

    const animationStarted = performance.now();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, lastFrame = 0;
    let visible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(host);
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      if (document.hidden || !visible || now-lastFrame < 32) return;
      lastFrame = now;
      const reducedMotion = motionQuery.matches;
      const time = (performance.now() - animationStarted) * .001;
      stage.rotation.y += ((reducedMotion ? 0 : pointerX) - stage.rotation.y) * .035;
      stage.rotation.x += ((reducedMotion ? 0 : -pointerY) - stage.rotation.x) * .035;
      groups.forEach((group, index) => {
        const selected = index === activeRef.current;
        group.visible = selected || group.scale.x > .015;
        const targetScale = selected ? 1 : .001;
        const nextScale = reducedMotion ? targetScale : group.scale.x + (targetScale - group.scale.x) * .095;
        group.scale.setScalar(nextScale);
        const targetX = selected ? 0 : (index < activeRef.current ? -3.2 : 3.2);
        group.position.x += (targetX - group.position.x) * (reducedMotion ? 1 : .09);
      });
      const motionScale = reducedMotion ? 0 : 1;
      music.rotation.z += .006 * motionScale;
      music.rotation.y = dragYaw;
      music.rotation.x = dragPitch;
      equalizer.forEach((bar, index) => { bar.scale.y = .82 + Math.sin(time * 2.7 + index * .7) * .25 * motionScale; });
      if (!dragging) {
        dragYaw += dragVelocity;
        dragVelocity *= .94;
      }
      animal.position.y = Math.sin(time * 1.25) * .13 * motionScale;
      animal.rotation.y = dragYaw + Math.sin(time * .8) * .055 * motionScale;
      animal.rotation.x = dragPitch + Math.sin(time * .62) * .02 * motionScale;
      tail.rotation.z = -.35 + Math.sin(time * 3.4) * .28 * motionScale;
      travel.rotation.y = dragYaw + time * .16 * motionScale;
      travel.rotation.x = dragPitch;
      plane.position.y = 1.35 + Math.sin(time * 1.35) * .22 * motionScale;
      plane.rotation.z = -.18 + Math.sin(time * .9) * .08 * motionScale;
      clouds.forEach((cloud, index) => { cloud.position.x += Math.sin(time * .5 + index) * .003 * motionScale; });
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      cancelAnimationFrame(firstResizeFrame);
      window.clearTimeout(routeResizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("keydown", onKeyDown);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerCancel);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div
    className="interest-world-canvas is-draggable"
    ref={hostRef}
    role="button"
    tabIndex={0}
    aria-label={label}
  />;
}
