"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type BlueWorldProps = { variant?: "home" | "interests" };

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function BlueWorld({ variant = "home" }: BlueWorldProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const random = seeded(variant === "home" ? 42 : 88);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
    camera.position.set(0, 0.15, 9.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xa5cdf4, 3.4));
    const key = new THREE.DirectionalLight(0xffffff, 5.2);
    key.position.set(-4, 6, 6);
    scene.add(key);
    const blush = new THREE.PointLight(0xffaeca, 35, 15);
    blush.position.set(4, 2, 5);
    scene.add(blush);

    const brain = new THREE.Group();
    brain.position.set(variant === "home" ? 1.35 : 0.4, 0, 0);
    brain.rotation.set(-0.05, -0.12, -0.025);
    scene.add(brain);

    const points: THREE.Vector3[] = [];
    const colors: THREE.Color[] = [];
    const palette = [0x4b9ee8, 0x7bc4ff, 0xff9fbe, 0xffd166, 0x9d8df1, 0xffffff];
    for (let side = -1; side <= 1; side += 2) {
      let made = 0;
      while (made < 62) {
        const x = (random() * 2 - 1) * 1.38;
        const y = (random() * 2 - 1) * 1.82;
        const z = (random() * 2 - 1) * 1.2;
        if ((x * x) / 1.9 + (y * y) / 3.2 + (z * z) / 1.4 > 1) continue;
        const pinch = 1 - Math.max(0, -y) * 0.055;
        points.push(new THREE.Vector3(side * (0.48 + Math.abs(x) * pinch), y + 0.18, z));
        colors.push(new THREE.Color(palette[Math.floor(random() * palette.length)]));
        made += 1;
      }
    }

    const nodeGeometry = new THREE.SphereGeometry(0.085, 16, 12);
    const nodeMaterial = new THREE.MeshPhysicalMaterial({ roughness: 0.18, metalness: 0.02, clearcoat: 1, vertexColors: true });
    const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, points.length);
    const matrix = new THREE.Matrix4();
    points.forEach((point, index) => {
      const scale = index % 13 === 0 ? 1.65 : 0.8 + random() * 0.55;
      matrix.makeScale(scale, scale, scale);
      matrix.setPosition(point);
      nodes.setMatrixAt(index, matrix);
      nodes.setColorAt(index, colors[index]);
    });
    brain.add(nodes);

    const edges: Array<[THREE.Vector3, THREE.Vector3]> = [];
    const linePositions: number[] = [];
    points.forEach((point, index) => {
      const neighbors = points
        .map((other, otherIndex) => ({ other, otherIndex, distance: point.distanceTo(other) }))
        .filter(({ otherIndex, distance }) => otherIndex > index && distance < 0.9)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2);
      neighbors.forEach(({ other }) => {
        edges.push([point, other]);
        linePositions.push(point.x, point.y, point.z, other.x, other.y, other.z);
      });
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const connections = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: 0x3c8ed9, transparent: true, opacity: 0.28 }),
    );
    brain.add(connections);

    const hemisphereLine = new THREE.Mesh(
      new THREE.TorusGeometry(2.24, 0.018, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x80bfee, transparent: true, opacity: 0.35 }),
    );
    hemisphereLine.scale.set(1, 0.86, 1);
    hemisphereLine.rotation.x = Math.PI / 2;
    brain.add(hemisphereLine);

    const stem = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.28, 1.05, 8, 18),
      new THREE.MeshPhysicalMaterial({ color: 0x8ecbff, roughness: 0.25, clearcoat: 1 }),
    );
    stem.position.set(0, -2.05, -0.08);
    stem.rotation.z = -0.08;
    brain.add(stem);

    const signals = Array.from({ length: 10 }, (_, index) => {
      const signal = new THREE.Mesh(
        new THREE.SphereGeometry(index % 3 === 0 ? 0.075 : 0.05, 12, 8),
        new THREE.MeshBasicMaterial({ color: index % 2 ? 0xff8fb5 : 0xffffff }),
      );
      const edgeIndex = Math.floor(random() * Math.max(edges.length, 1));
      signal.userData = { edgeIndex, progress: random(), speed: 0.08 + random() * 0.12 };
      brain.add(signal);
      return signal;
    });

    const bubbles = Array.from({ length: 18 }, (_, index) => {
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(0.035 + random() * 0.08, 12, 8),
        new THREE.MeshBasicMaterial({ color: palette[index % palette.length], transparent: true, opacity: 0.52 }),
      );
      bubble.position.set((random() * 2 - 1) * 6.5, (random() * 2 - 1) * 3.8, -1 - random() * 4);
      bubble.userData = { speed: 0.08 + random() * 0.15, phase: random() * 8 };
      scene.add(bubble);
      return bubble;
    });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      brain.scale.setScalar(width < 680 ? 0.72 : width < 1050 ? 0.88 : 1);
      brain.position.x = width < 780 ? 0.2 : variant === "home" ? 1.45 : 0.4;
      brain.position.y = width < 680 ? 0.4 : 0;
    };
    window.addEventListener("resize", resize);
    resize();

    let targetX = -0.05;
    let targetY = -0.12;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const move = (event: PointerEvent) => {
      if (dragging) {
        targetY += (event.clientX - lastX) * 0.007;
        targetX += (event.clientY - lastY) * 0.005;
        lastX = event.clientX;
        lastY = event.clientY;
      } else {
        targetY = -0.12 + (event.clientX / window.innerWidth - 0.5) * 0.3;
        targetX = -0.05 + (event.clientY / window.innerHeight - 0.5) * 0.18;
      }
    };
    const down = (event: PointerEvent) => { dragging = true; lastX = event.clientX; lastY = event.clientY; };
    const up = () => { dragging = false; };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointerleave", up);

    const start = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const animate = () => {
      const time = (performance.now() - start) / 1000;
      brain.rotation.x += (targetX - brain.rotation.x) * 0.035;
      brain.rotation.y += (targetY - brain.rotation.y) * 0.035;
      if (!reducedMotion) {
        brain.position.y += (Math.sin(time * 0.7) * 0.004 - brain.position.y * 0.00015);
        signals.forEach((signal) => {
          const data = signal.userData as { edgeIndex: number; progress: number; speed: number };
          const edge = edges[data.edgeIndex % Math.max(edges.length, 1)];
          if (!edge) return;
          data.progress = (data.progress + data.speed * 0.012) % 1;
          signal.position.lerpVectors(edge[0], edge[1], data.progress);
          const pulse = 0.7 + Math.sin(time * 4 + data.edgeIndex) * 0.3;
          signal.scale.setScalar(pulse);
        });
        bubbles.forEach((bubble) => {
          const data = bubble.userData as { speed: number; phase: number };
          bubble.position.y += Math.sin(time * data.speed + data.phase) * 0.0015;
        });
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointerleave", up);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.domElement.remove();
    };
  }, [variant]);

  return <div className="blue-world" ref={hostRef} aria-hidden="true" />;
}
