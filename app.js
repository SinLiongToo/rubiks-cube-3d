/**
 * Main Application Controller for Rubik's Cube WebApp
 * Features:
 * - Adjustable Turning Speed (from 100ms to 1500ms with presets)
 * - Orientation Compass & Reset View
 * - Interactive Step-by-Step Formula Trainer (Next, Prev, Auto-play)
 * - Beginner Anatomy & Jargon Glossary
 * - WCA Speedcubing Timer & Scrambler
 * - 2D Net State Editor & Theme Studio
 */

const i18n = {
  zh: {
    appTitle: "魔術方塊大師 Rubik's Cube 3D",
    appSubtitle: "互動學習 • 自由暢玩 • 客製解法",
    tabLearn: "📖 教 • 教學學院",
    tabPlay: "🎮 玩 • 自由競速",
    tabMake: "🛠️ 做 • 自訂與求解",
    soundOn: "🔊 音效：開", soundOff: "🔇 音效：關",
    scrambleBtn: "隨機打亂 (Scramble)",
    resetBtn: "一鍵復原", undoBtn: "復原一步", solveReverseBtn: "倒帶自動還原",
    timerHint: "按住「空白鍵」或「點擊長按」準備，鬆開開始計時；任意鍵或點擊停止",
    timerReady: "準備就緒！鬆開開始", timerHolding: "按住中...",
    statPB: "個人最佳 (PB)", statAo5: "最近五次平均 (Ao5)", statMoves: "總轉動步數", statTPS: "每秒轉速 (TPS)",
    controlsTitle: "轉動控制面板 (可直接在方塊上拖曳旋轉)",
    notationTitle: "基礎轉動符號速查 (點擊即時 3D 演示)",
    notationDesc: "單字母為順時針旋轉 90°，加上「'」為逆時針 90°，加上「2」為旋轉 180°。",
    btnSetupCase: "🎯 示範此步驟局面 (Setup)",
    btnPlayFormula: "▶ 自動連續播放",
    btnStepNext: "單步下一步 ▶",
    btnStepPrev: "◀ 單步退回",
    btnRestartStep: "↺ 重新演練",
    btnNextStep: "下個教學步驟 →", btnPrevStep: "← 上個教學步驟",
    formulaLabel: "核心公式：", mnemonicLabel: "口訣：",
    netTitle: "2D 展開圖實體魔方填色器",
    netDesc: "先點選下方色盤，再點擊展開圖中的貼紙，即可將手邊真實魔術方塊的顏色輸入系統！",
    paletteTitle: "選擇貼紙顏色：",
    btnValidateSync: "驗證並載入至 3D 方塊", btnResetNet: "重設為完成狀態",
    customizerTitle: "外觀材質工坊",
    themeClassic: "經典標準 (Classic WCA)", themePastel: "馬卡龍 (Pastel Dream)",
    themeNeon: "賽博霓虹 (Cyber Neon)", themeCarbon: "碳纖維黑曜 (Stealth)",
    gapLabel: "方塊間隙 (爆炸展示)：", speedLabel: "轉動速度：",
    valSuccess: "✅ 驗證成功！方塊狀態完美無誤，已同步至 3D 模型！",
    valErrCounts: "❌ 顏色數量錯誤：每種顏色必須恰好 9 格！目前統計：",
    langToggle: "🌐 English",
    resetViewBtn: "🎯 標準視角",
    flipViewBtn: "🔄 翻轉視角",
    backViewTitle: "🪞 背面/底面後照鏡",
    backViewBadge: "後: 藍 • 底: 白 • 左: 橘",
    speedTitle: "轉速調節：",
    speedUltraSlow: "🐢 超慢速 (1000ms)",
    speedSlow: "🚶 慢速 (600ms)",
    speedNormal: "⚡ 正常 (350ms)",
    speedFast: "🚀 快速 (150ms)",
    anatomyTitle: "💡 新手必看：魔術方塊結構與名詞大白話",
    whyDaisyTitle: "🌼 為什麼叫「黃心白花」？",
    holdingTitle: "🧭 正確手持方位指引"
  },
  en: {
    appTitle: "Rubik's Cube 3D Master",
    appSubtitle: "Learn • Play • Create & Solve",
    tabLearn: "📖 Learn • Academy",
    tabPlay: "🎮 Play • Speedcube",
    tabMake: "🛠️ Create • Studio & Solver",
    soundOn: "🔊 Sound: ON", soundOff: "🔇 Sound: OFF",
    scrambleBtn: "Random Scramble",
    resetBtn: "Reset Cube", undoBtn: "Undo Move", solveReverseBtn: "Auto Solve (Reverse)",
    timerHint: "Hold SPACE or Tap & Hold to prepare, release to start timer; tap anywhere to stop",
    timerReady: "READY! Release to start", timerHolding: "Holding...",
    statPB: "Personal Best (PB)", statAo5: "Average of 5 (Ao5)", statMoves: "Total Moves", statTPS: "Turns Per Sec (TPS)",
    controlsTitle: "Rotation Controls (Or drag directly on the 3D cube)",
    notationTitle: "Cube Notation Guide (Click for instant 3D demo)",
    notationDesc: "A single letter denotes a 90° clockwise turn. An apostrophe (') means counter-clockwise, and '2' means 180°.",
    btnSetupCase: "🎯 Setup Case",
    btnPlayFormula: "▶ Auto Play All",
    btnStepNext: "Step Forward ▶",
    btnStepPrev: "◀ Step Back",
    btnRestartStep: "↺ Restart Step",
    btnNextStep: "Next Lesson →", btnPrevStep: "← Previous Lesson",
    formulaLabel: "Algorithm:", mnemonicLabel: "Mnemonic:",
    netTitle: "2D Unfolded Net State Editor",
    netDesc: "Select a color below, then click any sticker on the unfolded net to clone your physical scrambled cube!",
    paletteTitle: "Select Palette Color:",
    btnValidateSync: "Validate & Load to 3D Cube", btnResetNet: "Reset to Solved Net",
    customizerTitle: "Appearance & Physics Studio",
    themeClassic: "Classic Standard (WCA)", themePastel: "Pastel Dream",
    themeNeon: "Cyberpunk Neon", themeCarbon: "Stealth Carbon",
    gapLabel: "Piece Gap (Explode view):", speedLabel: "Rotation Speed:",
    valSuccess: "✅ Validated successfully! State synced to the 3D cube!",
    valErrCounts: "❌ Color distribution error: exactly 9 of each color required! Current: ",
    langToggle: "🌐 繁體中文",
    resetViewBtn: "🎯 Reset View",
    flipViewBtn: "🔄 Flip View",
    backViewTitle: "🪞 Rear Mirror View",
    backViewBadge: "B: Blue • D: White • L: Orange",
    speedTitle: "Speed:",
    speedUltraSlow: "🐢 Very Slow (1000ms)",
    speedSlow: "🚶 Slow (600ms)",
    speedNormal: "⚡ Normal (350ms)",
    speedFast: "🚀 Fast (150ms)",
    anatomyTitle: "💡 Beginner Guide: Cube Anatomy & Jargon Explained",
    whyDaisyTitle: "🌼 What is 'Daisy'?",
    holdingTitle: "🧭 Holding Orientation Guide"
  }
};

class AppController {
  constructor() {
    this.currentLang = 'zh';
    this.currentThemeMode = 'dark';
    this.currentTab = 'learn'; // Default to Learn tab so user immediately sees the rich explanations!
    this.currentTutorialStep = 0;
    this.tutorialMode = 'chain'; // 'chain' (接續闖關模式) or 'isolated' (獨立單題模式)

    // Step-by-step trainer state
    this.stepMovesList = [];
    this.stepCurrentIndex = 0;

    // Timer state
    this.timerState = 'idle';
    this.timerStartTime = 0;
    this.timerInterval = null;
    this.timerHoldTimeout = null;
    this.solveTimes = [];
    this.moveCount = 0;

    // Net state editor: 6 faces x 9 stickers (U=Yellow, D=White)
    this.selectedPaletteColor = 'Y';
    this.netColors = {
      Y: '#ffd500', W: '#ffffff', O: '#ff5800', R: '#b71234', G: '#009b48', B: '#0046ad'
    };
    this.netState = {
      U: Array(9).fill('Y'), L: Array(9).fill('O'), F: Array(9).fill('G'),
      R: Array(9).fill('R'), B: Array(9).fill('B'), D: Array(9).fill('W')
    };

    this.init();
  }

  init() {
    // 3D Engine with friendly 600ms default speed
    this.cube3d = new RubiksCube3D('canvas3d-container', {
      gap: 0.04,
      animationSpeed: 600,
      pauseBetweenMoves: 180,
      soundEnabled: true,
      theme: 'classic'
    });

    this.logic = new CubeLogic();

    this.cube3d.onMoveCallback = (move) => {
      this.moveCount++;
      this.updateStatsUI();
    };

    this.renderNetEditor();
    this.renderTutorialCard();
    this.setupEventListeners();
    this.applyTranslations();
    this.updateSpeedUI(600);
  }

  setSpeed(ms) {
    this.cube3d.setSpeed(ms);
    this.updateSpeedUI(ms);
  }

  updateSpeedUI(ms) {
    const slider = document.getElementById('speed-slider-global');
    if (slider) slider.value = ms;
    const label = document.getElementById('speed-value-badge');
    if (label) label.textContent = `${ms} ms`;

    // Highlight active preset button if match
    document.querySelectorAll('.speed-preset-btn').forEach(btn => {
      const val = parseInt(btn.getAttribute('data-speed'));
      btn.classList.toggle('active-speed', Math.abs(val - ms) < 50);
    });
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.applyTranslations();
    this.renderTutorialCard();
  }

  toggleTheme() {
    this.currentThemeMode = this.currentThemeMode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.currentThemeMode);
  }

  applyTranslations() {
    const t = i18n[this.currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });

    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) langBtn.textContent = t.langToggle;

    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) soundBtn.textContent = this.cube3d.options.soundEnabled ? t.soundOn : t.soundOff;
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(pane => {
      pane.classList.toggle('hidden', pane.id !== `tab-${tabName}`);
    });

    setTimeout(() => this.cube3d.onWindowResize(), 100);
  }

  setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.getAttribute('data-tab'));
      });
    });

    // Reset View & Flip View
    const resetViewBtn = document.getElementById('btn-reset-view');
    if (resetViewBtn) {
      resetViewBtn.addEventListener('click', () => {
        this.cube3d.resetCamera();
      });
    }

    const flipViewBtn = document.getElementById('btn-flip-view');
    if (flipViewBtn) {
      flipViewBtn.addEventListener('click', () => {
        this.cube3d.flipCamera();
      });
    }

    const togglePipBtn = document.getElementById('btn-toggle-pip');
    const pipCard = document.getElementById('pip-back-view-card');
    const pipIcon = document.getElementById('pip-toggle-icon');
    if (togglePipBtn && pipCard) {
      togglePipBtn.addEventListener('click', () => {
        const isHidden = pipCard.classList.toggle('hidden');
        if (pipIcon) {
          pipIcon.textContent = isHidden ? '🪞' : '−';
        }
      });
    }

    // Speed Preset Buttons
    document.querySelectorAll('.speed-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const speed = parseInt(btn.getAttribute('data-speed'));
        this.setSpeed(speed);
      });
    });

    // Speed Slider
    const speedSlider = document.getElementById('speed-slider-global');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.setSpeed(parseInt(e.target.value));
      });
    }

    // Language & Theme & Sound
    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        this.setLanguage(this.currentLang === 'zh' ? 'en' : 'zh');
      });
    }

    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.cube3d.options.soundEnabled = !this.cube3d.options.soundEnabled;
        this.applyTranslations();
      });
    }

    // Move Buttons (U, D, L, R, F, B)
    document.querySelectorAll('.move-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const move = btn.getAttribute('data-move');
        if (move) {
          this.cube3d.executeMove(move);
          this.logic.moveHistory.push(move);
        }
      });
    });

    // Scramble, Reset, Undo
    const scrambleBtn = document.getElementById('btn-scramble');
    if (scrambleBtn) {
      scrambleBtn.addEventListener('click', () => this.scrambleCube());
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.cube3d.resetCube();
        this.logic.reset();
        this.moveCount = 0;
        this.updateStatsUI();
      });
    }

    const undoBtn = document.getElementById('btn-undo');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => {
        if (this.logic.moveHistory.length > 0) {
          const lastMove = this.logic.moveHistory.pop();
          const inverted = this.logic.invertMove(lastMove);
          this.cube3d.executeMove(inverted);
        }
      });
    }

    const solveReverseBtn = document.getElementById('btn-solve-reverse');
    if (solveReverseBtn) {
      solveReverseBtn.addEventListener('click', () => {
        if (this.logic.moveHistory.length === 0) return;
        const revSeq = this.logic.invertSequence(this.logic.moveHistory.join(' '));
        this.logic.moveHistory = [];
        this.cube3d.executeMoves(revSeq);
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Timer trigger
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
      timerDisplay.addEventListener('mousedown', () => this.armTimer());
      window.addEventListener('mouseup', () => this.triggerTimerRelease());
      timerDisplay.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.armTimer();
      });
      window.addEventListener('touchend', () => this.triggerTimerRelease());
    }

    // Tutorial Navigation Buttons
    const prevBtn = document.getElementById('btn-tutorial-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentTutorialStep > 0) {
          this.currentTutorialStep--;
          this.renderTutorialCard();
        }
      });
    }

    const nextBtn = document.getElementById('btn-tutorial-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentTutorialStep < LBL_COURSE.length - 1) {
          this.currentTutorialStep++;
          this.renderTutorialCard();
        }
      });
    }

    // Mode Toggle: Chain Progression vs Isolated Drill
    const chainModeBtn = document.getElementById('btn-mode-chain');
    if (chainModeBtn) {
      chainModeBtn.addEventListener('click', () => this.setTutorialMode('chain'));
    }

    const isolatedModeBtn = document.getElementById('btn-mode-isolated');
    if (isolatedModeBtn) {
      isolatedModeBtn.addEventListener('click', () => this.setTutorialMode('isolated'));
    }

    // Step Trainer Buttons (Guaranteed State Synchronization)
    const setupBtn = document.getElementById('btn-tutorial-setup');
    if (setupBtn) {
      setupBtn.addEventListener('click', () => {
        const lesson = LBL_COURSE[this.currentTutorialStep];
        if (lesson) {
          this.setupCase(lesson);
        }
      });
    }

    const playAllBtn = document.getElementById('btn-tutorial-play');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', () => {
        const lesson = LBL_COURSE[this.currentTutorialStep];
        if (lesson) {
          if (this.stepCurrentIndex >= this.stepMovesList.length) {
            this.setupCase(lesson);
          }
          const remainingMoves = this.stepMovesList.slice(this.stepCurrentIndex);
          if (remainingMoves.length > 0) {
            this.cube3d.executeMoves(remainingMoves.join(' '));
            this.stepCurrentIndex = this.stepMovesList.length;
            this.updateStepPrompt();
            this.highlightTableRow(this.stepCurrentIndex);
            this.updateProgressBadge();
          }
        }
      });
    }

    const stepNextBtn = document.getElementById('btn-step-next');
    if (stepNextBtn) {
      stepNextBtn.addEventListener('click', () => this.stepForward());
    }

    const stepPrevBtn = document.getElementById('btn-step-prev');
    if (stepPrevBtn) {
      stepPrevBtn.addEventListener('click', () => this.stepBackward());
    }

    const restartStepBtn = document.getElementById('btn-step-restart');
    if (restartStepBtn) {
      restartStepBtn.addEventListener('click', () => {
        const lesson = LBL_COURSE[this.currentTutorialStep];
        if (lesson) {
          this.setupCase(lesson);
        }
      });
    }

    // Customizer Controls
    const themeSelect = document.getElementById('select-theme');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        this.cube3d.setTheme(e.target.value);
      });
    }

    const gapSlider = document.getElementById('slider-gap');
    if (gapSlider) {
      gapSlider.addEventListener('input', (e) => {
        this.cube3d.setGap(parseFloat(e.target.value));
      });
    }

    // Net Editor Buttons
    const btnVal = document.getElementById('btn-validate-net');
    if (btnVal) {
      btnVal.addEventListener('click', () => this.validateAndSyncNet());
    }

    const btnResetNet = document.getElementById('btn-reset-net');
    if (btnResetNet) {
      btnResetNet.addEventListener('click', () => {
        this.netState = {
          U: Array(9).fill('W'), L: Array(9).fill('O'), F: Array(9).fill('G'),
          R: Array(9).fill('R'), B: Array(9).fill('B'), D: Array(9).fill('Y')
        };
        this.renderNetEditor();
      });
    }
  }

  // Unified Step-by-Step Formula Trainer Logic (Conflict-Free State Machine)
  initStepTrainer(formulaStr) {
    this.stepMovesList = formulaStr.trim().split(/\s+/).filter(m => m.length > 0);
    this.stepCurrentIndex = 0;
    this.updateStepPrompt();
    this.updateProgressBadge();
  }

  setupCase(lesson) {
    this.cube3d.stopQueue();
    this.cube3d.resetCube();
    if (lesson.setup) {
      this.cube3d.executeMoves(lesson.setup, false); // Instant case setup
    }
    this.stepCurrentIndex = 0;
    this.updateStepPrompt();
    this.highlightTableRow(0);
    this.updateProgressBadge();
  }

  jumpToStep(targetIndex) {
    const lesson = LBL_COURSE[this.currentTutorialStep];
    if (!lesson) return;
    this.cube3d.stopQueue();
    this.cube3d.resetCube();
    if (lesson.setup) {
      this.cube3d.executeMoves(lesson.setup, false);
    }
    for (let i = 0; i < targetIndex; i++) {
      this.cube3d.executeMove(this.stepMovesList[i], false);
    }
    this.stepCurrentIndex = targetIndex;
    this.updateStepPrompt();
    this.highlightTableRow(targetIndex);
    this.updateProgressBadge();
  }

  stepForward() {
    if (this.stepCurrentIndex >= this.stepMovesList.length) return;
    const move = this.stepMovesList[this.stepCurrentIndex];
    this.cube3d.executeMove(move, true);
    this.stepCurrentIndex++;
    this.updateStepPrompt();
    this.highlightTableRow(this.stepCurrentIndex);
    this.updateProgressBadge();
  }

  stepBackward() {
    if (this.stepCurrentIndex <= 0) return;
    this.stepCurrentIndex--;
    const move = this.stepMovesList[this.stepCurrentIndex];
    const inverted = this.logic.invertMove(move);
    this.cube3d.executeMove(inverted, true);
    this.updateStepPrompt();
    this.highlightTableRow(this.stepCurrentIndex);
    this.updateProgressBadge();
  }

  updateProgressBadge() {
    const badge = document.getElementById('step-progress-badge');
    if (badge) {
      badge.textContent = `${this.stepCurrentIndex} / ${this.stepMovesList.length}`;
    }
  }

  setTutorialMode(mode) {
    this.tutorialMode = mode;
    const chainBtn = document.getElementById('btn-mode-chain');
    const isolatedBtn = document.getElementById('btn-mode-isolated');
    if (chainBtn && isolatedBtn) {
      if (mode === 'chain') {
        chainBtn.className = 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow-sm';
        isolatedBtn.className = 'px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-all';
      } else {
        isolatedBtn.className = 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow-sm';
        chainBtn.className = 'px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-all';
      }
    }
    const lesson = LBL_COURSE[this.currentTutorialStep];
    if (lesson) this.setupCase(lesson);
  }

  updateStepPrompt() {
    const promptEl = document.getElementById('step-current-prompt');
    if (!promptEl) return;

    if (this.stepMovesList.length === 0) {
      promptEl.innerHTML = `<span>點擊下方「下一步 ▶」開始依序演練！</span>`;
      return;
    }

    if (this.stepCurrentIndex >= this.stepMovesList.length) {
      if (this.currentTutorialStep < LBL_COURSE.length - 1) {
        promptEl.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 w-full">
            <span class="text-emerald-400 font-bold flex items-center gap-1 text-xs">
              🎉 本步驟動作已演練完成！
            </span>
            <button id="btn-chain-advance" class="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-lg text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer">
              👉 接續成果，挑戰步驟 ${this.currentTutorialStep + 2}！➔
            </button>
          </div>
        `;
        const advBtn = document.getElementById('btn-chain-advance');
        if (advBtn) {
          advBtn.addEventListener('click', () => {
            this.currentTutorialStep++;
            this.renderTutorialCard();
          });
        }
      } else {
        promptEl.innerHTML = `
          <div class="flex items-center gap-2 text-emerald-400 font-black text-xs">
            🏆 恭喜！7 大步驟全部通關！魔術方塊已六面完全復原！
          </div>
        `;
      }
      return;
    }

    const currentMove = this.stepMovesList[this.stepCurrentIndex];
    const lesson = LBL_COURSE[this.currentTutorialStep];
    const guideItem = lesson.movesGuide ? lesson.movesGuide.find(g => g.move === currentMove) : null;
    const action = guideItem ? guideItem.actionZh : '';
    const desc = guideItem ? guideItem.textZh : `動作：${currentMove}`;

    promptEl.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="bg-sky-500 text-slate-900 font-black px-2 py-0.5 rounded text-xs">第 ${this.stepCurrentIndex + 1} 步</span>
        <span class="font-mono font-bold text-sky-400 text-sm">${currentMove}</span>
        <span class="font-bold text-amber-300 text-xs">${action}</span>
        <span class="text-slate-300 text-xs">➔ ${desc}</span>
      </div>
    `;
  }

  renderTutorialCard() {
    const lesson = LBL_COURSE[this.currentTutorialStep];
    if (!lesson) return;

    const stepNumEl = document.getElementById('tutorial-step-indicator');
    if (stepNumEl) stepNumEl.textContent = `${this.currentTutorialStep + 1} / ${LBL_COURSE.length}`;

    const titleEl = document.getElementById('tutorial-card-title');
    if (titleEl) {
      titleEl.textContent = `${lesson.icon} ${this.currentLang === 'zh' ? lesson.titleZh : lesson.titleEn}`;
    }

    const chainDescEl = document.getElementById('tutorial-chain-desc');
    if (chainDescEl) {
      chainDescEl.textContent = lesson.chainInheritZh || '';
    }

    const targetEl = document.getElementById('tutorial-card-target');
    if (targetEl) targetEl.textContent = lesson.targetZh;

    const holdingEl = document.getElementById('tutorial-card-holding');
    if (holdingEl) holdingEl.textContent = lesson.holdingZh;

    const whyEl = document.getElementById('tutorial-card-why');
    if (whyEl) whyEl.textContent = lesson.whyDaisyZh;

    const formulaEl = document.getElementById('tutorial-card-formula');
    if (formulaEl) formulaEl.textContent = lesson.formula;

    // Render Unified Table Rows
    const tbody = document.getElementById('tutorial-moves-table-body');
    if (tbody && lesson.movesGuide) {
      tbody.innerHTML = '';
      lesson.movesGuide.forEach((g, idx) => {
        const tr = document.createElement('tr');
        tr.id = `step-table-row-${idx}`;
        tr.className = 'transition-colors cursor-pointer hover:bg-sky-500/10';
        tr.title = `點擊跳轉至第 ${idx + 1} 步`;

        tr.innerHTML = `
          <td class="py-2.5 px-2.5 text-center font-mono font-bold text-slate-400 text-xs">${idx + 1}</td>
          <td class="py-2.5 px-2.5 text-center font-mono font-black text-sky-400 text-sm">${g.move}</td>
          <td class="py-2.5 px-2.5 text-center font-bold text-amber-300">${g.actionZh || ''}</td>
          <td class="py-2.5 px-3 text-slate-200">${g.textZh}</td>
          <td class="py-2.5 px-3 text-slate-400 hidden sm:table-cell">${g.whyZh || ''}</td>
          <td class="py-2.5 px-2 text-center text-xs" id="step-status-cell-${idx}">
            <span class="text-slate-500">○ 待執行</span>
          </td>
        `;

        tr.addEventListener('click', () => {
          this.jumpToStep(idx);
        });

        tbody.appendChild(tr);
      });
    }

    const tipEl = document.getElementById('tutorial-card-tip');
    if (tipEl) tipEl.textContent = lesson.tipZh;

    // Automatically setup the case for this lesson cleanly
    this.initStepTrainer(lesson.formula);
    this.setupCase(lesson);

    const prevBtn = document.getElementById('btn-tutorial-prev');
    if (prevBtn) prevBtn.disabled = this.currentTutorialStep === 0;

    const nextBtn = document.getElementById('btn-tutorial-next');
    if (nextBtn) nextBtn.disabled = this.currentTutorialStep === LBL_COURSE.length - 1;
  }

  highlightTableRow(index) {
    document.querySelectorAll('#tutorial-moves-table-body tr').forEach((r, i) => {
      const statusCell = document.getElementById(`step-status-cell-${i}`);
      if (i < index) {
        r.className = 'transition-colors cursor-pointer bg-slate-900/40 text-slate-400';
        if (statusCell) statusCell.innerHTML = `<span class="text-emerald-400 font-bold">✓ 已完成</span>`;
      } else if (i === index) {
        r.className = 'bg-sky-500/20 font-bold transition-colors cursor-pointer border-l-4 border-l-sky-400 shadow-sm';
        if (statusCell) statusCell.innerHTML = `<span class="text-sky-400 font-black">👉 當前</span>`;
      } else {
        r.className = 'transition-colors cursor-pointer hover:bg-sky-500/10 text-slate-300';
        if (statusCell) statusCell.innerHTML = `<span class="text-slate-500">○ 待執行</span>`;
      }
    });
  }

  // Speedcubing Timer Logic
  handleKeyDown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      if (this.timerState === 'running') {
        this.stopTimer();
      } else if (this.timerState === 'idle') {
        this.armTimer();
      }
      return;
    }

    if (this.timerState === 'running') {
      this.stopTimer();
      return;
    }

    const key = e.key.toUpperCase();
    if (['U', 'D', 'L', 'R', 'F', 'B'].includes(key)) {
      const move = e.shiftKey ? key + "'" : key;
      this.cube3d.executeMove(move);
      this.logic.moveHistory.push(move);
    }
  }

  handleKeyUp(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      this.triggerTimerRelease();
    }
  }

  armTimer() {
    if (this.timerState !== 'idle') return;
    this.timerState = 'holding';
    const timerEl = document.getElementById('timer-display');
    const hintEl = document.getElementById('timer-hint');
    const t = i18n[this.currentLang];

    timerEl.className = 'text-5xl md:text-6xl font-mono font-black tracking-wider timer-holding transition-all duration-150';
    if (hintEl) hintEl.textContent = t.timerHolding;

    this.timerHoldTimeout = setTimeout(() => {
      if (this.timerState === 'holding') {
        this.timerState = 'ready';
        timerEl.className = 'text-5xl md:text-6xl font-mono font-black tracking-wider timer-ready transition-all duration-150';
        if (hintEl) hintEl.textContent = t.timerReady;
      }
    }, 450);
  }

  triggerTimerRelease() {
    if (this.timerState === 'ready') {
      this.startTimer();
    } else if (this.timerState === 'holding') {
      clearTimeout(this.timerHoldTimeout);
      this.timerState = 'idle';
      const timerEl = document.getElementById('timer-display');
      timerEl.className = 'text-5xl md:text-6xl font-mono font-black tracking-wider timer-running';
      this.applyTranslations();
    }
  }

  startTimer() {
    this.timerState = 'running';
    this.timerStartTime = performance.now();
    this.moveCount = 0;
    const timerEl = document.getElementById('timer-display');
    timerEl.className = 'text-5xl md:text-6xl font-mono font-black tracking-wider timer-running';

    this.timerInterval = setInterval(() => {
      const elapsed = (performance.now() - this.timerStartTime) / 1000;
      timerEl.textContent = elapsed.toFixed(2);
      this.updateStatsUI();
    }, 30);
  }

  stopTimer() {
    if (this.timerState !== 'running') return;
    clearInterval(this.timerInterval);
    const totalTime = (performance.now() - this.timerStartTime) / 1000;
    this.timerState = 'idle';

    const timerEl = document.getElementById('timer-display');
    timerEl.textContent = totalTime.toFixed(2);
    this.solveTimes.push(totalTime);
    this.updateStatsUI();

    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.7 } });
    }
  }

  updateStatsUI() {
    const pbEl = document.getElementById('stat-pb');
    if (pbEl && this.solveTimes.length > 0) {
      const best = Math.min(...this.solveTimes);
      pbEl.textContent = `${best.toFixed(2)}s`;
    }

    const ao5El = document.getElementById('stat-ao5');
    if (ao5El) {
      if (this.solveTimes.length >= 5) {
        const last5 = this.solveTimes.slice(-5).sort((a, b) => a - b);
        const middle3 = last5.slice(1, 4);
        const avg = middle3.reduce((a, b) => a + b, 0) / 3;
        ao5El.textContent = `${avg.toFixed(2)}s`;
      } else {
        ao5El.textContent = '--';
      }
    }

    const movesEl = document.getElementById('stat-moves');
    if (movesEl) movesEl.textContent = this.moveCount;

    const tpsEl = document.getElementById('stat-tps');
    if (tpsEl) {
      if (this.timerState === 'running') {
        const elapsed = (performance.now() - this.timerStartTime) / 1000;
        tpsEl.textContent = elapsed > 0 ? (this.moveCount / elapsed).toFixed(1) : '0.0';
      } else if (this.solveTimes.length > 0) {
        const lastTime = this.solveTimes[this.solveTimes.length - 1];
        tpsEl.textContent = lastTime > 0 ? (this.moveCount / lastTime).toFixed(1) : '0.0';
      }
    }
  }

  scrambleCube() {
    this.cube3d.resetCube();
    this.logic.reset();
    this.moveCount = 0;
    const scrambleString = this.logic.generateScramble(20);
    const scrEl = document.getElementById('scramble-text');
    if (scrEl) scrEl.textContent = scrambleString;

    const prevSpeed = this.cube3d.options.animationSpeed;
    this.cube3d.setSpeed(75);
    this.cube3d.executeMoves(scrambleString);
    this.cube3d.onQueueEmptyCallback = () => {
      this.cube3d.setSpeed(prevSpeed);
      this.cube3d.onQueueEmptyCallback = null;
    };

    this.logic.moveHistory = scrambleString.split(' ');
  }

  // 2D Net State Editor
  renderNetEditor() {
    const netContainer = document.getElementById('net-faces-grid');
    if (!netContainer) return;
    netContainer.innerHTML = '';

    const facePositions = {
      U: { row: 1, col: 2 },
      L: { row: 2, col: 1 },
      F: { row: 2, col: 2 },
      R: { row: 2, col: 3 },
      B: { row: 2, col: 4 },
      D: { row: 3, col: 2 }
    };

    for (const [face, pos] of Object.entries(facePositions)) {
      const faceBox = document.createElement('div');
      faceBox.className = 'flex flex-col items-center gap-1';
      faceBox.style.gridRow = pos.row;
      faceBox.style.gridColumn = pos.col;

      const title = document.createElement('span');
      title.className = 'text-xs font-bold text-gray-400';
      title.textContent = face;
      faceBox.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'net-face';

      for (let i = 0; i < 9; i++) {
        const sticker = document.createElement('div');
        const colorKey = this.netState[face][i];
        sticker.className = `net-sticker ${i === 4 ? 'selected-center' : ''}`;
        sticker.style.backgroundColor = this.netColors[colorKey];
        sticker.title = `${face}${i + 1}`;

        if (i !== 4) {
          sticker.addEventListener('click', () => {
            this.netState[face][i] = this.selectedPaletteColor;
            sticker.style.backgroundColor = this.netColors[this.selectedPaletteColor];
          });
        }

        grid.appendChild(sticker);
      }

      faceBox.appendChild(grid);
      netContainer.appendChild(faceBox);
    }

    this.renderPalette();
  }

  renderPalette() {
    const paletteContainer = document.getElementById('color-palette');
    if (!paletteContainer) return;
    paletteContainer.innerHTML = '';

    for (const [code, hex] of Object.entries(this.netColors)) {
      const swatch = document.createElement('div');
      swatch.className = `palette-swatch ${code === this.selectedPaletteColor ? 'active' : ''}`;
      swatch.style.backgroundColor = hex;
      swatch.title = code;

      swatch.addEventListener('click', () => {
        this.selectedPaletteColor = code;
        document.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      });

      paletteContainer.appendChild(swatch);
    }
  }

  validateAndSyncNet() {
    const result = this.logic.validateState(this.netState);
    const msgEl = document.getElementById('net-validation-msg');
    const t = i18n[this.currentLang];

    if (!result.valid) {
      if (result.details) {
        const detailsStr = Object.entries(result.details).map(([k, v]) => `${k}:${v}`).join(', ');
        msgEl.className = 'text-sm text-rose-400 font-medium';
        msgEl.textContent = `${t.valErrCounts} (${detailsStr})`;
      } else {
        msgEl.className = 'text-sm text-rose-400 font-medium';
        msgEl.textContent = "❌ 請檢查展開圖顏色設定！";
      }
      return;
    }

    msgEl.className = 'text-sm text-emerald-400 font-medium';
    msgEl.textContent = t.valSuccess;

    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
