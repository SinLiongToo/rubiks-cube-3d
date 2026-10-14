/**
 * Rubik's Cube Logical State, WCA Scrambler, Move Inverter &
 * Beginner-Friendly LBL Tutorial Curriculum with Detailed Visual & Linguistic Explanations.
 */

class CubeLogic {
  constructor() {
    this.faces = ['U', 'D', 'L', 'R', 'F', 'B'];
    this.defaultColors = {
      U: 'W', // White
      D: 'Y', // Yellow
      L: 'O', // Orange
      R: 'R', // Red
      F: 'G', // Green
      B: 'B'  // Blue
    };
    this.reset();
  }

  reset() {
    this.state = {};
    for (const f of this.faces) {
      this.state[f] = Array(9).fill(this.defaultColors[f]);
    }
    this.moveHistory = [];
  }

  // WCA Standard Scrambler (20 to 25 moves, no consecutive same face or redundant axes)
  generateScramble(length = 20) {
    const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
    const modifiers = ['', "'", '2'];
    const opposite = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'B', B: 'F' };

    const moves = [];
    let lastFace = '';
    let secondLastFace = '';

    while (moves.length < length) {
      const face = faces[Math.floor(Math.random() * faces.length)];
      if (face === lastFace) continue;
      if (face === secondLastFace && opposite[face] === lastFace) continue;

      const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
      moves.push(face + mod);
      secondLastFace = lastFace;
      lastFace = face;
    }

    return moves.join(' ');
  }

  // Invert a single move
  invertMove(move) {
    if (move.endsWith("2")) return move;
    if (move.endsWith("'")) return move.slice(0, -1);
    return move + "'";
  }

  // Invert a sequence of moves
  invertSequence(seqStr) {
    const moves = seqStr.trim().split(/\s+/).filter(m => m.length > 0);
    return moves.reverse().map(m => this.invertMove(m)).join(' ');
  }

  // Validate a 54-sticker custom state map
  validateState(stateMap) {
    const colorCounts = {};
    for (const f of this.faces) {
      if (!stateMap[f] || stateMap[f].length !== 9) {
        return { valid: false, errorKey: 'err_invalid_count' };
      }
      for (let i = 0; i < 9; i++) {
        const c = stateMap[f][i];
        colorCounts[c] = (colorCounts[c] || 0) + 1;
      }
    }

    const counts = Object.values(colorCounts);
    if (counts.length !== 6 || counts.some(c => c !== 9)) {
      return {
        valid: false,
        errorKey: 'err_color_distribution',
        details: colorCounts
      };
    }

    return { valid: true };
  }
}

// Beginner Glossary & Anatomy Guide
const CUBE_ANATOMY = [
  {
    nameZh: "中心塊 (Center Piece)",
    nameEn: "Center Piece",
    countZh: "每面 1 個，共 6 個 (只有 1 個顏色)",
    descZh: "它是方塊的絕對「地基」，固定在內部轉軸上，永遠無法改變相對位置（白色永遠對著黃色，綠色永遠對著藍色，紅色永遠對著橘色）。中心塊是什麼顏色，就決定了該面最終的顏色！"
  },
  {
    nameZh: "邊塊 (Edge Piece)",
    nameEn: "Edge Piece",
    countZh: "每條邊 1 個，共 12 個 (有 2 個顏色)",
    descZh: "夾在兩個中心塊之間，呈十字形分佈。例如「白綠邊塊」一面是白色，另一面是綠色。絕對不可能變成角塊！"
  },
  {
    nameZh: "角塊 (Corner Piece)",
    nameEn: "Corner Piece",
    countZh: "頂點處 1 個，共 8 個 (有 3 個顏色)",
    descZh: "位於魔術方塊的 8 個尖角。每個角塊都有 3 種顏色（例如白-紅-綠），只會在角塊的位置之間互換。"
  }
];

// 7-Step LBL Curriculum with Exhaustive Beginner Clarifications
const LBL_COURSE = [
  {
    id: 'step1',
    icon: '🌼',
    titleZh: '步驟一：黃心白花與底面十字 (Daisy to White Cross)',
    titleEn: 'Step 1: Daisy to White Cross',
    targetZh: '目標：在白色底面做出 4 條「側邊顏色與中心對齊」的白色十字！',
    holdingZh: '🧭 拿法：黃色中心朝上(U)、白色中心朝下(D)、綠色中心朝自己(F)',
    whyDaisyZh: '🤔 為什麼叫「黃心白花」？新手若直接在白色底面做十字，常會把邊塊側面的顏色搞錯（例如白綠邊塊放在了藍色中心旁）。所以最聰明的做法是：先將 4 個白色邊塊湊到頂部「黃色中心」四周，看起來就像一朵黃色花蕊、白色花瓣的「雛菊(Daisy)」。接著轉動頂層，讓花瓣側面顏色跟側面的中心塊同色連線，再轉 180°(兩下)送到底部，完美的白色十字就自然做好了！',
    formula: "F2 R2 B2 L2",
    setup: "F2 R2 B2 L2",
    movesGuide: [
      { move: "F2", textZh: "前層轉 180°（轉兩下將對齊的前方白色花瓣送到底部）" },
      { move: "R2", textZh: "右層轉 180°（轉兩下將對齊的右方白色花瓣送到底部）" },
      { move: "B2", textZh: "後層轉 180°（轉兩下將對齊的後方白色花瓣送到底部）" },
      { move: "L2", textZh: "左層轉 180°（轉兩下將對齊的左方白色花瓣送到底部）" }
    ],
    tipZh: '口訣：黃心湊白花 ➔ 對齊側面顏色 ➔ 轉兩次 180° 翻到底面。'
  },
  {
    id: 'step2',
    icon: '🔻',
    titleZh: '步驟二：還原第一層角塊 (First Layer Corners)',
    titleEn: 'Step 2: First Layer Corners',
    targetZh: '目標：把 4 個帶有白色的角塊放回底層，側面形成漂亮的「倒 T 字形」！',
    holdingZh: '🧭 拿法：白色底面朝下(D)、黃色朝上(U)。將要放進底部的目標角塊放在頂層「右上角」。',
    whyDaisyZh: '🤔 什麼是「右手公式 (Sexy Move)」？即 R U R\' U\'。這是魔方界最經典好記的 4 個動作（上、左、下、右），重複做 1~5 次，就能把位於右上角的角塊，精準轉進右下角的正確位置，且白色自動翻到朝下！',
    formula: "R U R' U'",
    setup: "U R U' R'",
    movesGuide: [
      { move: "R", textZh: "【上】右層向上推 90°" },
      { move: "U", textZh: "【左】頂層向左撥 90°" },
      { move: "R'", textZh: "【下】右層向下拉回 90°" },
      { move: "U'", textZh: "【右】頂層向右撥回 90°" }
    ],
    tipZh: '口訣：目標放右上角 ➔ 做右手公式【上、左、下、右】➔ 白面朝下即歸位！'
  },
  {
    id: 'step3',
    icon: '🧱',
    titleZh: '步驟三：還原第二層中層邊塊 (Second Layer Edges)',
    titleEn: 'Step 3: Second Layer Edges',
    targetZh: '目標：將頂層不含黃色的邊塊，送進中層的左右位置，完成前兩層 (F2L)！',
    holdingZh: '🧭 拿法：白色朝下(D)、黃色朝上(U)。把要歸位的邊塊轉到正面對齊中心顏色。',
    whyDaisyZh: '🤔 如何送進中層？如果邊塊要往右邊放，就「先往左遠離目標」，做一次右手公式，接著整個方塊轉向右邊，再做一次左手公式把它裝進去！',
    formula: "U R U' R' U' F' U F",
    setup: "F' U' F U R U R' U'",
    movesGuide: [
      { move: "U", textZh: "頂層向左撥（遠離目標位置）" },
      { move: "R", textZh: "右層向上推" },
      { move: "U'", textZh: "頂層向右撥" },
      { move: "R'", textZh: "右層向下拉回" },
      { move: "U'", textZh: "頂層向右撥（準備換手）" },
      { move: "F'", textZh: "前層逆時針推開" },
      { move: "U", textZh: "頂層向左撥入" },
      { move: "F", textZh: "前層順時針復原" }
    ],
    tipZh: '口訣：遠離目標 ➔ 做同側公式 ➔ 轉身抓角 ➔ 做另一手公式送入！'
  },
  {
    id: 'step4',
    icon: '➕',
    titleZh: '步驟四：頂層黃色十字 (Yellow Cross)',
    titleEn: 'Step 4: Top Yellow Cross',
    targetZh: '目標：不管角塊顏色，先讓頂層 4 個黃色邊塊朝上，形成「黃色十字架」！',
    holdingZh: '🧭 拿法：黃色頂面朝上(U)。如果有橫線請「水平橫放」，如果有拐角請放在「9點鐘與12點鐘」。',
    whyDaisyZh: '🤔 只需要一條萬能公式：順時針轉開前面 (F) ➔ 做一次右手公式 (R U R\' U\') ➔ 逆時針轉回前面 (F\')。頂面會按照【中心點 ➔ 拐角 ➔ 一字線 ➔ 十字】依序演變！',
    formula: "F R U R' U' F'",
    setup: "F U R U' R' F'",
    movesGuide: [
      { move: "F", textZh: "前面順時針轉 90°（順時針轉開正臉）" },
      { move: "R", textZh: "【上】右層向上推 90°" },
      { move: "U", textZh: "【左】頂層向左撥 90°" },
      { move: "R'", textZh: "【下】右層向下拉回 90°" },
      { move: "U'", textZh: "【右】頂層向右撥回 90°" },
      { move: "F'", textZh: "前面逆時針轉回 90°（轉回正臉）" }
    ],
    tipZh: '口訣：轉開正面 F ➔ 右手四步 (R U R\' U\') ➔ 轉回正面 F\'。'
  },
  {
    id: 'step5',
    icon: '🐟',
    titleZh: '步驟五：頂層全黃翻色 (OLL - Sune / 小魚公式)',
    titleEn: 'Step 5: Yellow Face Orientation (Sune)',
    targetZh: '目標：翻轉頂層角塊朝向，讓頂面 9 個格子全部變成黃色！',
    holdingZh: '🧭 拿法：黃色頂面朝上(U)。如果有魚的形狀（1個黃色角塊朝上），請將「魚頭朝向左下角」！',
    whyDaisyZh: '🤔 為什麼叫「小魚」？頂面黃十字完成後，若正好只有 1 個角塊朝上，形狀就像一隻游動的金魚 🐟！只要把魚頭對準左下角，做一次小魚公式，頂面所有黃色貼紙就會全部翻轉朝上！',
    formula: "R U R' U R U2 R'",
    setup: "R U2 R' U' R U' R'",
    movesGuide: [
      { move: "R", textZh: "【上】右層向上推" },
      { move: "U", textZh: "【左】頂層向左撥" },
      { move: "R'", textZh: "【下】右層向下拉" },
      { move: "U", textZh: "【左】頂層向左撥" },
      { move: "R", textZh: "【上】右層向上推" },
      { move: "U2", textZh: "【左左】頂層向左撥兩次 (180°)" },
      { move: "R'", textZh: "【下】右層向下拉回復位" }
    ],
    tipZh: '口訣：魚頭朝左下 ➔ 上、左、下、左、上、左左、下！'
  },
  {
    id: 'step6',
    icon: '👀',
    titleZh: '步驟六：頂層角塊位置歸位 (PLL Corners - 車燈公式)',
    titleEn: 'Step 6: Permute Top Corners (Headlights)',
    targetZh: '目標：將頂層 4 個角塊旋轉到正確位置，讓側面每個角塊顏色與中心對齊！',
    holdingZh: '🧭 拿法：黃色朝上(U)。觀察頂層四周，如果有兩個同色角塊（稱為「車燈/眼睛 👀」），將車燈「放在左側(L)或後方(B)」。',
    whyDaisyZh: '🤔 什麼是「車燈 (Headlights)」？例如頂層某一側，左上角是紅色、右上角也是紅色（中間邊塊顏色不管），這兩個同色角塊看起來就像汽車的兩盞大燈！',
    formula: "R U R' U' R' F R2 U' R' U' R U R' F'",
    setup: "F R U' R' U R U R2 F' R U R U' R'",
    movesGuide: [
      { move: "R U R' U'", textZh: "先做一次經典右手四步" },
      { move: "R'", textZh: "右層向下拉" },
      { move: "F", textZh: "前層順時針轉開" },
      { move: "R2", textZh: "右層轉 180°" },
      { move: "U'", textZh: "頂層向右撥" },
      { move: "R'", textZh: "右層向下拉" },
      { move: "U'", textZh: "頂層向右撥" },
      { move: "R U R' F'", textZh: "送回角塊並還原正面" }
    ],
    tipZh: '口訣：車燈放左邊 ➔ 做 T-Perm 換角公式 ➔ 4 個角塊全部對齊！'
  },
  {
    id: 'step7',
    icon: '🎉',
    titleZh: '步驟七：頂層邊塊位置歸位 (PLL Edges - 最終復原!)',
    titleEn: 'Step 7: Permute Top Edges (Solved!)',
    targetZh: '目標：最後一步！將剩餘 3 個頂層邊塊三輪換到正確位置，見證魔方完全還原！',
    holdingZh: '🧭 拿法：黃色朝上(U)。檢查四周，通常有 1 面已經完全拼好，將那面「放在後方(B)」，面對未完成的三面。',
    whyDaisyZh: '🤔 三輪換 (U-Perm) 會固定後方已完成的面，將左、前、右三個邊塊進行順時針或逆時針輪換，轉完瞬間整個六面全部復原！',
    formula: "R U' R U R U R U' R' U' R2",
    setup: "R2 U R U R' U' R' U' R' U R'",
    movesGuide: [
      { move: "R U'", textZh: "右層上推，頂層向右" },
      { move: "R U", textZh: "右層上推，頂層向左" },
      { move: "R U", textZh: "右層上推，頂層向左" },
      { move: "R U'", textZh: "右層上推，頂層向右" },
      { move: "R' U'", textZh: "右層下拉，頂層向右" },
      { move: "R2", textZh: "右層轉 180° 還原底層！" }
    ],
    tipZh: '口訣：完成面放後方 ➔ 做 U-Perm 三輪換 ➔ 大功告成！'
  }
];

window.CubeLogic = CubeLogic;
window.CUBE_ANATOMY = CUBE_ANATOMY;
window.LBL_COURSE = LBL_COURSE;
