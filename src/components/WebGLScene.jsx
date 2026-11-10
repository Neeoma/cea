import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Interactive WebGL particle network sphere — reacts to mouse, pauses off-screen.
export default function WebGLScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 7;

    // Particle sphere (Fibonacci distribution)
    const N = 900, R = 2.6;
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const cCyan = new THREE.Color('#00D9FF'), cGreen = new THREE.Color('#39FF88'), cViolet = new THREE.Color('#885CFF');
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = golden * i;
      pos[i * 3] = Math.cos(th) * rad * R; pos[i * 3 + 1] = y * R; pos[i * 3 + 2] = Math.sin(th) * rad * R;
      const c = i % 3 === 0 ? cCyan : i % 3 === 1 ? cGreen : cViolet;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(pts);

    // Connection lines between near neighbours
    const linePos = [];
    for (let i = 0; i < N; i += 7) {
      for (let j = i + 1; j < Math.min(i + 14, N); j++) {
        const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
        if (dx*dx+dy*dy+dz*dz < 0.55) linePos.push(pos[i*3],pos[i*3+1],pos[i*3+2],pos[j*3],pos[j*3+1],pos[j*3+2]);
      }
    }
    const lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3));
    scene.add(new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color: 0x00D9FF, transparent: true, opacity: 0.16 })));

    // Inner glow core
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.15, 32, 32), new THREE.MeshBasicMaterial({ color: 0x00D9FF, transparent: true, opacity: 0.07 })));

    let mx = 0, my = 0, visible = true, raf;
    const onMove = (e) => { mx = (e.clientX / window.innerWidth - .5) * 2; my = (e.clientY / window.innerHeight - .5) * 2; };
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix();
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(mount);
    window.addEventListener('mousemove', onMove); window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = clock.getElapsedTime();
      if (!reduced) { pts.rotation.y = t * 0.12; pts.rotation.x = Math.sin(t * 0.2) * 0.12; }
      pts.rotation.y += mx * 0.002;
      camera.position.x += (mx * 1.1 - camera.position.x) * 0.04;
      camera.position.y += (-my * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    loop();
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); renderer.dispose(); mount.removeChild(renderer.domElement); };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
