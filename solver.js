/**
 * Rubik's Cube Logical State, WCA Scrambler, Move Inverter &
 * Beginner-Friendly LBL Tutorial Curriculum with Detailed Visual & Linguistic Explanations.
 */

class CubeLogic {
  constructor() {
    this.faces = ['U', 'D', 'L', 'R', 'F', 'B'];
    this.defaultColors = {
      U: 'Y', // Yellow (頂面黃色)
      D: 'W', // White (底面白色)
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

  generateScramble(length = 20, faces = ['U', 'D', 'L', 'R', 'F', 'B']) {
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

  invertMove(move) {
    if (move.endsWith("2")) return move;
    if (move.endsWith("'")) return move.slice(0, -1);
    return move + "'";
  }

  invertSequence(seqStr) {
    const moves = seqStr.trim().split(/\s+/).filter(m => m.length > 0);
    return moves.reverse().map(m => this.invertMove(m)).join(' ');
  }

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

// 7-Step LBL Curriculum with Exhaustive 1-to-1 Action Correspondence
const LBL_COURSE = [
  {
    id: 'step1',
    icon: '🌼',
    titleZh: '步驟一：黃心白花與底面十字 (Daisy to White Cross)',
    titleEn: 'Step 1: Daisy to White Cross',
    targetZh: '在白色底面做出 4 條「側邊顏色與中心對齊」的白色十字！',
    holdingZh: '🧭 拿法：黃色中心朝上(U)、白色中心朝下(D)、綠色中心朝自己(F)',
    chainInheritZh: '🌱【教學起點】方塊頂面為黃色中心，四周為 4 個白色邊塊（黃心白花）。轉動後完成底面白十字！',
    whyDaisyZh: '🤔 為什麼叫「黃心白花」？新手若直接在白色底面做十字，常會把邊塊側面的顏色搞錯（例如白綠邊塊放在了藍色中心旁）。所以最聰明的做法是：先將 4 個白色邊塊湊到頂部「黃色中心」四周，看起來就像一朵黃色花蕊、白色花瓣的「雛菊(Daisy)」。接著轉動頂層，讓花瓣側面顏色跟側面的中心塊同色連線，再轉 180°(兩下)送到底部，完美的白色十字就自然做好了！',
    formula: "F2 R2 B2 L2",
    setup: "F2 R2 B2 L2",
    movesGuide: [
      { move: "F2", actionZh: "【前轉兩次】", textZh: "前層轉 180°，將前方對齊的白色邊塊翻到底部", whyZh: "F2 = Front 180° (前層兩次)" },
      { move: "R2", actionZh: "【右轉兩次】", textZh: "右層轉 180°，將右方對齊的白色邊塊翻到底部", whyZh: "R2 = Right 180° (右層兩次)" },
      { move: "B2", actionZh: "【後轉兩次】", textZh: "後層轉 180°，將後方對齊的白色邊塊翻到底部", whyZh: "B2 = Back 180° (後層兩次)" },
      { move: "L2", actionZh: "【左轉兩次】", textZh: "左層轉 180°，將左方對齊的白色邊塊翻到底部", whyZh: "L2 = Left 180° (左層兩次)" }
    ],
    tipZh: '黃心湊白花 ➔ 對齊側面顏色 ➔ 轉兩次 180° 翻到底面。'
  },
  {
    id: 'step2',
    icon: '🔻',
    titleZh: '步驟二：還原第一層角塊 (First Layer Corners)',
    titleEn: 'Step 2: First Layer Corners',
    targetZh: '把 4 個帶有白色的角塊放回底層，側面形成漂亮的「倒 T 字形」！',
    holdingZh: '🧭 拿法：白色底面朝下(D)、黃色朝上(U)。將要放進底部的目標角塊放在頂層「右上角」。',
    chainInheritZh: '🔗【接續步驟一】底面白色十字完整保留！目標角塊位於右上角，做右手公式歸位，完成整個第一層！',
    whyDaisyZh: '🤔 什麼是「右手公式 (Sexy Move)」？即 R U R\' U\'。英文代號與中文動作完全「一對一對應」：\n• R ➔ 【上】：右手將右層「往上推」\n• U ➔ 【左】：右手食指將頂層「往左撥」\n• R\' ➔ 【下】：右手將右層「往下拉回復位」\n• U\' ➔ 【右】：左手食指將頂層「往右撥回復位」\n重複做 1~5 次，角塊就會精準歸位且白色朝下！',
    formula: "R U R' U'",
    setup: "U R U' R'",
    movesGuide: [
      { move: "R", actionZh: "【上】", textZh: "右手向上推右層 90°", whyZh: "R = Right (右層順時針)" },
      { move: "U", actionZh: "【左】", textZh: "右手食指撥頂層向左 90°", whyZh: "U = Up (頂層順時針)" },
      { move: "R'", actionZh: "【下】", textZh: "右手向下拉回右層 90°", whyZh: "R' = Right Counter-Clockwise (右層逆時針回位)" },
      { move: "U'", actionZh: "【右】", textZh: "左手食指撥頂層向右 90°", whyZh: "U' = Up Counter-Clockwise (頂層逆時針回位)" }
    ],
    tipZh: '目標放右上角 ➔ 做右手公式【上、左、下、右】➔ 白面朝下即歸位！'
  },
  {
    id: 'step3',
    icon: '🧱',
    titleZh: '步驟三：還原第二層中層邊塊 (Second Layer Edges)',
    titleEn: 'Step 3: Second Layer Edges',
    targetZh: '將頂層不含黃色的邊塊，送進中層的左右位置，完成前兩層 (F2L)！',
    holdingZh: '🧭 拿法：白色朝下(D)、黃色朝上(U)。把要歸位的邊塊轉到正面對齊中心顏色。',
    chainInheritZh: '🔗【接續步驟二】整個第一層（白面+側面倒T）完整保留！將頂層無黃邊塊送入中層，完成前兩層 (F2L)！',
    whyDaisyZh: '🤔 如何送進中層？邊塊如果要送進右邊：先「頂層往左撥」遠離目標 ➔ 做一次右手公式 ➔ 整顆方塊轉向右側 ➔ 做一次左手公式把它裝進去！',
    formula: "U R U' R' U' F' U F",
    setup: "F' U' F U R U R' U'",
    movesGuide: [
      { move: "U", actionZh: "【遠離】", textZh: "頂層向左撥 90°（遠離右側目標槽位）", whyZh: "U = Up 順時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U'", actionZh: "【回】", textZh: "頂層向右撥回 90°", whyZh: "U' = Up 逆時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉回復位 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【換手】", textZh: "頂層向右撥 90°（準備換手裝入）", whyZh: "U' = Up 逆時針" },
      { move: "F'", actionZh: "【開面】", textZh: "前層逆時針推開 90°", whyZh: "F' = Front 逆時針" },
      { move: "U", actionZh: "【裝入】", textZh: "頂層向左撥 90° 送入槽位", whyZh: "U = Up 順時針" },
      { move: "F", actionZh: "【還原】", textZh: "前層順時針轉回復原 90°", whyZh: "F = Front 順時針" }
    ],
    tipZh: '遠離目標 ➔ 做同側公式 ➔ 轉身抓角 ➔ 做另一手公式送入！'
  },
  {
    id: 'step4',
    icon: '➕',
    titleZh: '步驟四：頂層黃色十字 (Yellow Cross)',
    titleEn: 'Step 4: Top Yellow Cross',
    targetZh: '不管角塊顏色，先讓頂層 4 個黃色邊塊朝上，形成「黃色十字架」！',
    holdingZh: '🧭 拿法：黃色頂面朝上(U)。如果有橫線請「水平橫放」，如果有拐角請放在「9點鐘與12點鐘」。',
    chainInheritZh: '🔗【接續步驟三】前兩層完全保留！在頂面黃色中心周圍做出黃色十字架！',
    whyDaisyZh: '🤔 一條萬能公式：順時針轉開前面 (F) ➔ 做一次右手公式【上、左、下、右】(R U R\' U\') ➔ 逆時針轉回前面 (F\')。頂面會按照【中心點 ➔ 拐角 ➔ 一字線 ➔ 十字】依序演變！',
    formula: "F R U R' U' F'",
    setup: "F U R U' R' F'",
    movesGuide: [
      { move: "F", actionZh: "【轉開正面】", textZh: "前面順時針轉 90°（轉開正臉）", whyZh: "F = Front 順時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉回 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥回 90°", whyZh: "U' = Up 逆時針" },
      { move: "F'", actionZh: "【轉回正面】", textZh: "前面逆時針轉回 90°（轉回正臉）", whyZh: "F' = Front 逆時針" }
    ],
    tipZh: '轉開正面 F ➔ 右手四步【上左下右】➔ 轉回正面 F\'。'
  },
  {
    id: 'step5',
    icon: '🐟',
    titleZh: '步驟五：頂層全黃翻色 (OLL - Sune / 小魚公式)',
    titleEn: 'Step 5: Yellow Face Orientation (Sune)',
    targetZh: '翻轉頂層角塊朝向，讓頂面 9 個格子全部變成黃色！',
    holdingZh: '🧭 拿法：黃色頂面朝上(U)。如果有魚的形狀（1個黃色角塊朝上），請將「魚頭朝向左下角」！',
    chainInheritZh: '🔗【接續步驟四】前兩層與頂面黃色十字完全保留！使用小魚公式將頂面所有角塊翻出全黃！',
    whyDaisyZh: '🤔 為什麼叫「小魚」？頂面黃十字完成後，若正好只有 1 個角塊朝上，形狀就像一隻游動的金魚 🐟！只要把魚頭對準左下角，做一次小魚公式【上、左、下、左、上、左左、下】，頂面所有黃色貼紙就會全部翻轉朝上！',
    formula: "R U R' U R U2 R'",
    setup: "R U2 R' U' R U' R'",
    movesGuide: [
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉回 90°", whyZh: "R' = Right 逆時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U2", actionZh: "【左左】", textZh: "頂層連續向左撥兩次 (180°)", whyZh: "U2 = Up 180°" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉回復位 90°", whyZh: "R' = Right 逆時針" }
    ],
    tipZh: '魚頭朝左下 ➔ 上、左、下、左、上、左左、下！'
  },
  {
    id: 'step6',
    icon: '👀',
    titleZh: '步驟六：頂層角塊位置歸位 (PLL Corners - 車燈公式)',
    titleEn: 'Step 6: Permute Top Corners (Headlights)',
    targetZh: '將頂層 4 個角塊旋轉到正確位置，讓側面每個角塊顏色與中心對齊！',
    holdingZh: '🧭 拿法：黃色朝上(U)。觀察頂層四周，如果有兩個同色角塊（稱為「車燈/眼睛 👀」），將車燈「放在左側(L)或後方(B)」。',
    chainInheritZh: '🔗【接續步驟五】前兩層與全黃頂面完全保留！做換角公式將四個角塊對齊側面顏色！',
    whyDaisyZh: '🤔 什麼是「車燈 (Headlights)」？例如頂層某一側面，左上角是紅色、右上角也是紅色（中間邊塊顏色先不管），這兩個同色角塊看起來就像汽車的兩盞大燈！做一次換角公式即可將所有角塊換到正確位置。',
    formula: "R U R' U' R' F R2 U' R' U' R U R' F'",
    setup: "F R U' R' U R U R2 F' R U R U' R'",
    movesGuide: [
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "F", actionZh: "【轉開】", textZh: "前層順時針開面 90°", whyZh: "F = Front 順時針" },
      { move: "R2", actionZh: "【雙推】", textZh: "右層轉 180°", whyZh: "R2 = Right 180°" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "F'", actionZh: "【轉回】", textZh: "前層逆時針還原 90°", whyZh: "F' = Front 逆時針" }
    ],
    tipZh: '車燈放左邊 ➔ 做 T-Perm 換角公式 ➔ 4 個角塊全部對齊！'
  },
  {
    id: 'step7',
    icon: '🎉',
    titleZh: '步驟七：頂層邊塊位置歸位 (PLL Edges - 最終復原!)',
    titleEn: 'Step 7: Permute Top Edges (Solved!)',
    targetZh: '最後一步！將剩餘 3 個頂層邊塊三輪換到正確位置，見證魔方完全還原！',
    holdingZh: '🧭 拿法：黃色朝上(U)。檢查四周，通常有 1 面已經完全拼好，將那面「放在後方(B)」，面對未完成的三面。',
    chainInheritZh: '🔗【接續步驟六】前兩層與四個角塊完整歸位！最後 3 個頂層邊塊三輪換，六面完全復原！',
    whyDaisyZh: '🤔 三輪換 (U-Perm) 會固定後方已完成的面，將左、前、右三個邊塊進行輪換，轉完瞬間整個六面全部復原！',
    formula: "R U' R U R U R U' R' U' R2",
    setup: "R2 U R U R' U' R' U' R' U R'",
    movesGuide: [
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R2", actionZh: "【雙還原】", textZh: "右層轉 180° 還原！", whyZh: "R2 = Right 180°" }
    ],
    tipZh: '完成面放後方 ➔ 做 U-Perm 三輪換 ➔ 大功告成！'
  }
];

// 2x2 Pocket Cube Beginner Course (3 steps — 2x2 = a 3x3 with only corners!)
const LBL_COURSE_2X2 = [
  {
    id: 'p1',
    icon: '⬜',
    titleZh: '步驟一：白色第一層 (2×2 First Layer)',
    titleEn: 'Step 1: First Layer (White)',
    targetZh: '把 4 個白色角塊放到底層，底面全白，且側面兩兩同色！',
    holdingZh: '🧭 拿法：白色朝下(D)、黃色朝上(U)。把要放入的白色角塊轉到頂層「右前上角」，正下方就是它的目標位置。',
    chainInheritZh: '🌱【教學起點】2×2 沒有中心塊也沒有邊塊，只有 8 個角塊！第一步直接做好整個白色底層。',
    whyDaisyZh: '🤔 2×2 為什麼更簡單？2×2 就是「只剩角塊的 3×3」，所以不需要黃心白花、也不需要中層。\n• 3×3 步驟二的右手公式 R U R\' U\'【上、左、下、右】在這裡直接使用！\n• 重複做 1~5 次，角塊就會白色朝下歸位。\n⚠️ 注意：2×2 沒有中心塊當參考，先任選一個白色角塊放好，其餘角塊以它的側面顏色為準。',
    formula: "R U R' U'",
    setup: "U R U' R'",
    movesGuide: [
      { move: "R", actionZh: "【上】", textZh: "右手向上推右層 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "右手食指撥頂層向左 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右手向下拉回右層 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【右】", textZh: "左手食指撥頂層向右 90°", whyZh: "U' = Up 逆時針" }
    ],
    tipZh: '角塊放右前上 ➔ 右手公式【上左下右】重複 ➔ 白色朝下即歸位！'
  },
  {
    id: 'p2',
    icon: '🐟',
    titleZh: '步驟二：頂面全黃 (小魚公式 Sune)',
    titleEn: 'Step 2: Yellow Face (Sune)',
    targetZh: '翻轉頂層 4 個角塊，讓頂面 4 格全部變成黃色！',
    holdingZh: '🧭 拿法：黃色朝上(U)。若頂面只有 1 個黃色朝上（小魚），把它放在「左前上角」。',
    chainInheritZh: '🔗【接續步驟一】白色第一層完整保留！只翻轉頂層角塊，讓頂面變全黃。',
    whyDaisyZh: '🤔 與 3×3 步驟五完全相同的「小魚公式」！\n口訣【上、左、下、左、上、左左、下】。\n若頂面沒有出現小魚形狀，先做一次公式，就會變出小魚，再做一次即可。',
    formula: "R U R' U R U2 R'",
    setup: "R U2 R' U' R U' R'",
    movesGuide: [
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉回 90°", whyZh: "R' = Right 逆時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U2", actionZh: "【左左】", textZh: "頂層連續向左撥兩次 (180°)", whyZh: "U2 = Up 180°" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉回 90°", whyZh: "R' = Right 逆時針" }
    ],
    tipZh: '小魚頭放左前 ➔ 上、左、下、左、上、左左、下！'
  },
  {
    id: 'p3',
    icon: '👀',
    titleZh: '步驟三：頂層角塊歸位 (車燈公式 → 完成!)',
    titleEn: 'Step 3: Permute Corners (Solved!)',
    targetZh: '交換頂層角塊位置，讓四個側面全部同色，2×2 完全復原！',
    holdingZh: '🧭 拿法：黃色朝上(U)。找出側面兩個同色的「車燈 👀」，把車燈放在「左側(L)」。沒有車燈就先做一次公式。',
    chainInheritZh: '🔗【接續步驟二】底層與全黃頂面保留！最後換角，六面全部復原！',
    whyDaisyZh: '🤔 與 3×3 步驟六相同的換角公式 (T-Perm)。在 2×2 上做完這一步就直接六面復原，最快的新手 2×2 只要 3 個步驟！',
    formula: "R U R' U' R' F R2 U' R' U' R U R' F'",
    setup: "F R U' R' U R U R2 F' R U R U' R'",
    movesGuide: [
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "F", actionZh: "【轉開】", textZh: "前層順時針開面 90°", whyZh: "F = Front 順時針" },
      { move: "R2", actionZh: "【雙推】", textZh: "右層轉 180°", whyZh: "R2 = Right 180°" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "U'", actionZh: "【右】", textZh: "頂層向右撥 90°", whyZh: "U' = Up 逆時針" },
      { move: "R", actionZh: "【上】", textZh: "右層向上推 90°", whyZh: "R = Right 順時針" },
      { move: "U", actionZh: "【左】", textZh: "頂層向左撥 90°", whyZh: "U = Up 順時針" },
      { move: "R'", actionZh: "【下】", textZh: "右層向下拉 90°", whyZh: "R' = Right 逆時針" },
      { move: "F'", actionZh: "【轉回】", textZh: "前層逆時針還原 90°", whyZh: "F' = Front 逆時針" }
    ],
    tipZh: '車燈放左邊 ➔ T-Perm 換角 ➔ 2×2 大功告成！'
  }
];

window.CubeLogic = CubeLogic;
window.CUBE_ANATOMY = CUBE_ANATOMY;
window.LBL_COURSE = LBL_COURSE;
window.LBL_COURSE_2X2 = LBL_COURSE_2X2;
