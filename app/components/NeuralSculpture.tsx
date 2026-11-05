"use client";

import { useEffect, useRef } from "react";

/** Decorative, abstract neural form. It does not represent scientific data. */
export function NeuralSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return; // The CSS sculpture remains visible when WebGL is unavailable.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.3 : 1.7));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, .1, 50);
      camera.position.set(0, 0, 8.5);
      const form = new THREE.Group();
      form.rotation.set(.35, -.28, -.3);
      scene.add(form);
      scene.add(new THREE.HemisphereLight(0xf0fcff, 0x466986, 3));
      const key = new THREE.DirectionalLight(0xffffff, 5);
      key.position.set(-3, 5, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x93ddf1, 4);
      rim.position.set(4, -1, 2);
      scene.add(rim);

      const shell = new THREE.MeshPhysicalMaterial({ color: 0xc0dce6, metalness: .28, roughness: .23, clearcoat: 1 });
      const filament = new THREE.MeshPhysicalMaterial({ color: 0x4f95b5, metalness: .35, roughness: .26, clearcoat: 1 });
      const geometry = new THREE.TorusGeometry(1.22, .36, 32, 120);
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
        const angle = Math.atan2(y, x);
        const wave = 1 + .11 * Math.sin(angle * 3) + .07 * Math.cos(angle * 5);
        positions.setXYZ(i, x * wave, y * wave, z + .22 * Math.sin(angle * 2));
      }
      geometry.computeVertexNormals();
      form.add(new THREE.Mesh(geometry, shell));

      // Fine curved fibres wrap the organic loop, echoing neural tract bundles.
      for (let strand = 0; strand < 17; strand++) {
        const points = [];
        const phase = strand / 17 * Math.PI * 2;
        for (let step = 0; step <= 180; step++) {
          const a = step / 180 * Math.PI * 2;
          const b = phase + a * 3;
          const radius = 1.22 + .40 * Math.cos(b);
          const wave = 1 + .11 * Math.sin(a * 3) + .07 * Math.cos(a * 5);
          points.push(new THREE.Vector3(radius * Math.cos(a) * wave, radius * Math.sin(a) * wave, .40 * Math.sin(b) + .22 * Math.sin(a * 2)));
        }
        const curve = new THREE.CatmullRomCurve3(points, true);
        form.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 180, .012, 5, true), filament));
      }

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = true;
      let frame = 0;
      let pointerX = 0, pointerY = 0, lastFrame = 0;
      const pointerHost = host.parentElement;
      const pointerMove = (event: PointerEvent) => {
        if (media.matches || event.pointerType !== "mouse" || !pointerHost) return;
        const rect = pointerHost.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - .5) * .15;
        pointerY = ((event.clientY - rect.top) / rect.height - .5) * .12;
      };
      const pointerLeave = () => { pointerX = 0; pointerY = 0; };
      pointerHost?.addEventListener("pointermove", pointerMove);
      pointerHost?.addEventListener("pointerleave", pointerLeave);
      const render = () => renderer.render(scene, camera);
      const tick = (time: number) => {
        frame = requestAnimationFrame(tick);
        if (time - lastFrame < 32) return;
        lastFrame = time;
        form.rotation.y += (-.28 + Math.sin(time * .00018) * .12 + pointerX - form.rotation.y) * .08;
        form.rotation.x += (.35 + pointerY - form.rotation.x) * .08;
        form.position.y = Math.sin(time * .0005) * .035;
        render();
      };
      const updateAnimation = () => {
        cancelAnimationFrame(frame);
        if (!media.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
        else render();
      };
      const resize = () => {
        camera.aspect = host.clientWidth / Math.max(host.clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
        render();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateAnimation();
      });
      intersection.observe(host);
      media.addEventListener("change", updateAnimation);
      document.addEventListener("visibilitychange", updateAnimation);
      resize();
      host.classList.add("is-rendered");
      updateAnimation();
      cleanup = () => {
        cancelAnimationFrame(frame);
        pointerHost?.removeEventListener("pointermove", pointerMove);
        pointerHost?.removeEventListener("pointerleave", pointerLeave);
        resizeObserver.disconnect();
        intersection.disconnect();
        media.removeEventListener("change", updateAnimation);
        document.removeEventListener("visibilitychange", updateAnimation);
        form.traverse((object) => {
          if (object instanceof THREE.Mesh) object.geometry.dispose();
        });
        shell.dispose();
        filament.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        host.classList.remove("is-rendered");
      };
    }).catch(() => { /* Keep the static decorative fallback. */ });
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={hostRef} className="neural-sculpture" aria-hidden="true"><div className="sculpture-fallback" /></div>;
}
