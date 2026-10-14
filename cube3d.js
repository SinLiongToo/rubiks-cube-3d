/**
 * 3D Rubik's Cube Engine using Three.js
 * Supports 360-degree orbit viewing, sticker raycasting gesture rotations,
 * smooth animation queue with configurable pause delay, Web Audio realistic turning clicks,
 * reset camera orientation, and theme skins.
 */

class RubiksCube3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error(`Container #${containerId} not found`);

    this.options = Object.assign({
      gap: 0.04,
      animationSpeed: 500, // ms per 90 deg turn (slower and friendly by default)
      pauseBetweenMoves: 160, // pause between sequential moves
      soundEnabled: true,
      theme: 'classic'
    }, options);

    // Color definitions
    this.themes = {
      classic: {
        U: 0xffffff, // White
        D: 0xffd500, // Yellow
        L: 0xff5800, // Orange
        R: 0xb71234, // Red
        F: 0x009b48, // Green
        B: 0x0046ad, // Blue
        inner: 0x18181b // Matte black inner core
      },
      pastel: {
        U: 0xfffaf0, // Ivory White
        D: 0xfef08a, // Soft Yellow
        L: 0xfdba74, // Peach Orange
        R: 0xf472b6, // Soft Rose
        F: 0x86efac, // Mint Green
        B: 0x93c5fd, // Sky Blue
        inner: 0x334155
      },
      neon: {
        U: 0xf8fafc, // Bright White
        D: 0xfacc15, // Cyber Yellow
        L: 0xf97316, // Blaze Orange
        R: 0xec4899, // Hot Magenta
        F: 0x10b981, // Electric Emerald
        B: 0x06b6d4, // Cyan Glow
        inner: 0x090d16
      },
      carbon: {
        U: 0xe2e8f0, // Silver White
        D: 0xeab308, // Gold Yellow
        L: 0xea580c, // Burnt Orange
        R: 0xbe123c, // Crimson
        F: 0x047857, // Forest Green
        B: 0x1d4ed8, // Deep Royal Blue
        inner: 0x0f172a
      }
    };

    this.currentTheme = this.themes[this.options.theme] || this.themes.classic;

    this.isRotating = false;
    this.animationQueue = [];
    this.onMoveCallback = null;
    this.onQueueEmptyCallback = null;
    this.queueTimer = null;

    this.initThree();
    this.initAudio();
    this.createCube();
    this.setupInteractions();
    this.animate();
  }

  initThree() {
    this.scene = new THREE.Scene();

    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 400;

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(4.8, 4.2, 5.6);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // Orbit Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.rotateSpeed = 0.8;
      this.controls.minDistance = 4;
      this.controls.maxDistance = 14;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
    dirLight1.position.set(10, 15, 10);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.45);
    dirLight2.position.set(-10, -5, -10);
    this.scene.add(dirLight2);

    // Pivot group for animated turns
    this.pivot = new THREE.Group();
    this.scene.add(this.pivot);

    // Resize listener
    window.addEventListener('resize', () => this.onWindowResize());
  }

  resetCamera() {
    if (!this.camera || !this.controls) return;
    this.camera.position.set(4.8, 4.2, 5.6);
    this.camera.lookAt(0, 0, 0);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  onWindowResize() {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      this.audioCtx = null;
    }
  }

  playTurnSound() {
    if (!this.options.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 40, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.05);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  createCube() {
    // Clear existing
    if (this.cubies) {
      this.cubies.forEach(c => this.scene.remove(c));
    }

    this.cubies = [];
    const size = 1.0 - this.options.gap;
    const geometry = new THREE.BoxGeometry(size, size, size);

    // Order: +X(R), -X(L), +Y(U), -Y(D), +Z(F), -Z(B)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue; // Skip core

          const materials = [
            this.createStickerMaterial(x === 1 ? this.currentTheme.R : this.currentTheme.inner, 'R', x === 1),
            this.createStickerMaterial(x === -1 ? this.currentTheme.L : this.currentTheme.inner, 'L', x === -1),
            this.createStickerMaterial(y === 1 ? this.currentTheme.U : this.currentTheme.inner, 'U', y === 1),
            this.createStickerMaterial(y === -1 ? this.currentTheme.D : this.currentTheme.inner, 'D', y === -1),
            this.createStickerMaterial(z === 1 ? this.currentTheme.F : this.currentTheme.inner, 'F', z === 1),
            this.createStickerMaterial(z === -1 ? this.currentTheme.B : this.currentTheme.inner, 'B', z === -1)
          ];

          const mesh = new THREE.Mesh(geometry, materials);
          mesh.position.set(x, y, z);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = {
            initialCoord: { x, y, z },
            currentCoord: { x, y, z }
          };

          this.scene.add(mesh);
          this.cubies.push(mesh);
        }
      }
    }
  }

  createStickerMaterial(colorHex, faceName, isOuter) {
    if (!isOuter) {
      return new THREE.MeshStandardMaterial({
        color: this.currentTheme.inner,
        roughness: 0.9,
        metalness: 0.1
      });
    }

    return new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.25,
      metalness: 0.08
    });
  }

  setTheme(themeName) {
    if (!this.themes[themeName]) return;
    this.currentTheme = this.themes[themeName];
    this.options.theme = themeName;
    this.createCube();
  }

  setGap(gapVal) {
    this.options.gap = gapVal;
    this.createCube();
  }

  setSpeed(speedMs) {
    this.options.animationSpeed = speedMs;
  }

  stopQueue() {
    this.animationQueue = [];
    if (this.queueTimer) {
      clearTimeout(this.queueTimer);
      this.queueTimer = null;
    }
  }

  /* Face turns: U, D, L, R, F, B, M, E, S, and their inverses */
  executeMove(move, isAnimated = true) {
    if (!move) return;
    if (isAnimated) {
      this.animationQueue.push(move);
      this.processQueue();
    } else {
      this.applyMoveInstant(move);
    }
  }

  executeMoves(movesStr, isAnimated = true) {
    const list = movesStr.trim().split(/\s+/).filter(m => m.length > 0);
    list.forEach(m => this.executeMove(m, isAnimated));
  }

  processQueue() {
    if (this.isRotating || this.animationQueue.length === 0) {
      if (!this.isRotating && this.animationQueue.length === 0 && this.onQueueEmptyCallback) {
        this.onQueueEmptyCallback();
      }
      return;
    }

    const move = this.animationQueue.shift();
    this.animateMove(move);
  }

  getMoveConfig(move) {
    let base = move[0].toUpperCase();
    let isInverse = move.includes("'");
    let isDouble = move.includes("2");

    let axis = 'y';
    let filter = () => true;
    let angle = -Math.PI / 2;

    switch (base) {
      case 'U':
        axis = 'y';
        filter = c => c.position.y > 0.5;
        angle = -Math.PI / 2;
        break;
      case 'D':
        axis = 'y';
        filter = c => c.position.y < -0.5;
        angle = Math.PI / 2;
        break;
      case 'R':
        axis = 'x';
        filter = c => c.position.x > 0.5;
        angle = -Math.PI / 2;
        break;
      case 'L':
        axis = 'x';
        filter = c => c.position.x < -0.5;
        angle = Math.PI / 2;
        break;
      case 'F':
        axis = 'z';
        filter = c => c.position.z > 0.5;
        angle = -Math.PI / 2;
        break;
      case 'B':
        axis = 'z';
        filter = c => c.position.z < -0.5;
        angle = Math.PI / 2;
        break;
      case 'M': // between L and R
        axis = 'x';
        filter = c => Math.abs(c.position.x) < 0.5;
        angle = Math.PI / 2;
        break;
      case 'E': // between U and D
        axis = 'y';
        filter = c => Math.abs(c.position.y) < 0.5;
        angle = Math.PI / 2;
        break;
      case 'S': // between F and B
        axis = 'z';
        filter = c => Math.abs(c.position.z) < 0.5;
        angle = -Math.PI / 2;
        break;
      default:
        return null;
    }

    if (isInverse) angle = -angle;
    if (isDouble) angle *= 2;

    return { axis, filter, angle, move };
  }

  animateMove(move) {
    const config = this.getMoveConfig(move);
    if (!config) {
      this.processQueue();
      return;
    }

    this.isRotating = true;
    this.playTurnSound();

    const { axis, filter, angle } = config;

    this.pivot.rotation.set(0, 0, 0);
    this.pivot.position.set(0, 0, 0);

    const activeCubies = this.cubies.filter(filter);
    activeCubies.forEach(cubie => {
      this.pivot.attach(cubie);
    });

    const startTime = performance.now();
    const duration = this.options.animationSpeed;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Smooth ease-out

      this.pivot.rotation[axis] = angle * eased;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.pivot.rotation[axis] = angle;
        this.pivot.updateMatrixWorld();

        activeCubies.forEach(cubie => {
          this.scene.attach(cubie);
          cubie.position.x = Math.round(cubie.position.x);
          cubie.position.y = Math.round(cubie.position.y);
          cubie.position.z = Math.round(cubie.position.z);
          cubie.updateMatrix();
        });

        this.pivot.rotation.set(0, 0, 0);
        this.isRotating = false;

        if (this.onMoveCallback) {
          this.onMoveCallback(move);
        }

        // Add pause between queued moves for clear visual comprehension
        if (this.animationQueue.length > 0 && this.options.pauseBetweenMoves > 0) {
          this.queueTimer = setTimeout(() => {
            this.processQueue();
          }, this.options.pauseBetweenMoves);
        } else {
          this.processQueue();
        }
      }
    };

    requestAnimationFrame(step);
  }

  applyMoveInstant(move) {
    const config = this.getMoveConfig(move);
    if (!config) return;
    const { axis, filter, angle } = config;

    this.pivot.rotation.set(0, 0, 0);
    const activeCubies = this.cubies.filter(filter);
    activeCubies.forEach(cubie => this.pivot.attach(cubie));
    this.pivot.rotation[axis] = angle;
    this.pivot.updateMatrixWorld();

    activeCubies.forEach(cubie => {
      this.scene.attach(cubie);
      cubie.position.x = Math.round(cubie.position.x);
      cubie.position.y = Math.round(cubie.position.y);
      cubie.position.z = Math.round(cubie.position.z);
      cubie.updateMatrix();
    });
    this.pivot.rotation.set(0, 0, 0);
  }

  resetCube() {
    this.stopQueue();
    this.isRotating = false;
    this.createCube();
  }

  setupInteractions() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    let dragStartPos = null;
    let selectedCubie = null;
    let selectedIntersect = null;

    const dom = this.renderer.domElement;

    const onPointerDown = (e) => {
      if (e.button !== 0 || this.isRotating) return;

      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.cubies);

      if (intersects.length > 0) {
        if (this.controls) this.controls.enabled = false;
        selectedIntersect = intersects[0];
        selectedCubie = selectedIntersect.object;
        dragStartPos = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e) => {
      if (!dragStartPos || !selectedCubie || this.isRotating) return;

      const dx = e.clientX - dragStartPos.x;
      const dy = e.clientY - dragStartPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 30) {
        this.resolveDragMove(selectedCubie, selectedIntersect.face.normal, dx, dy);
        dragStartPos = null;
        selectedCubie = null;
        selectedIntersect = null;
        if (this.controls) this.controls.enabled = true;
      }
    };

    const onPointerUp = () => {
      dragStartPos = null;
      selectedCubie = null;
      selectedIntersect = null;
      if (this.controls) this.controls.enabled = true;
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  resolveDragMove(cubie, normal, dx, dy) {
    const worldNormal = normal.clone().applyQuaternion(cubie.quaternion).round();
    const pos = cubie.position;

    if (Math.abs(worldNormal.y) > 0.5) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (pos.z > 0.5) this.executeMove(dx > 0 ? "F'" : "F");
        else if (pos.z < -0.5) this.executeMove(dx > 0 ? "B" : "B'");
        else this.executeMove(dx > 0 ? "S'" : "S");
      } else {
        if (pos.x > 0.5) this.executeMove(dy > 0 ? "R" : "R'");
        else if (pos.x < -0.5) this.executeMove(dy > 0 ? "L'" : "L");
        else this.executeMove(dy > 0 ? "M'" : "M");
      }
    } else if (Math.abs(worldNormal.z) > 0.5) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (pos.y > 0.5) this.executeMove(dx > 0 ? "U" : "U'");
        else if (pos.y < -0.5) this.executeMove(dx > 0 ? "D'" : "D");
        else this.executeMove(dx > 0 ? "E'" : "E");
      } else {
        if (pos.x > 0.5) this.executeMove(dy > 0 ? "R'" : "R");
        else if (pos.x < -0.5) this.executeMove(dy > 0 ? "L" : "L'");
        else this.executeMove(dy > 0 ? "M" : "M'");
      }
    } else if (Math.abs(worldNormal.x) > 0.5) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (pos.y > 0.5) this.executeMove(dx > 0 ? "U" : "U'");
        else if (pos.y < -0.5) this.executeMove(dx > 0 ? "D'" : "D");
        else this.executeMove(dx > 0 ? "E'" : "E");
      } else {
        if (pos.z > 0.5) this.executeMove(dy > 0 ? "F" : "F'");
        else if (pos.z < -0.5) this.executeMove(dy > 0 ? "B'" : "B");
        else this.executeMove(dy > 0 ? "S" : "S'");
      }
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.RubiksCube3D = RubiksCube3D;
