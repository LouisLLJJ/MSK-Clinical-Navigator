const STORAGE_KEY = "msk-clinical-navigator-data-v1";
const CUSTOM_REGIONS_KEY = "msk-clinical-navigator-custom-regions-v1";
const ENTITY_META_KEY = "msk-clinical-navigator-entity-meta-v1";
const CLINICAL_STATE_KEY = "msk-clinical-navigator-clinical-state-v1";
const SFMA_PATTERNS = [
  { id: "cervical-flexion", label: "頸部屈曲", group: "cervical" },
  { id: "cervical-extension", label: "頸部伸展", group: "cervical" },
  { id: "cervical-rotation-right", label: "頸部回旋（右）", group: "cervical" },
  { id: "cervical-rotation-left", label: "頸部回旋（左）", group: "cervical" },
  { id: "multi-segmental-flexion", label: "多分節屈曲", group: "multisegmental" },
  { id: "multi-segmental-extension", label: "多分節伸展", group: "multisegmental" }
];
const SFMA_BREAKOUTS = [
  { id: "breakout-upper-cervical", label: "頸椎上部", group: "cervical" },
  { id: "breakout-lower-cervical", label: "頸椎下部", group: "cervical" },
  { id: "breakout-thoracic", label: "胸椎", group: "multisegmental" },
  { id: "breakout-scapulothoracic", label: "肩甲胸郭", group: "cervical" },
  { id: "breakout-glenohumeral", label: "肩関節", group: "cervical" },
  { id: "breakout-lumbar", label: "腰椎", group: "multisegmental" },
  { id: "breakout-hip", label: "股関節", group: "multisegmental" },
  { id: "breakout-knee", label: "膝", group: "multisegmental" },
  { id: "breakout-ankle", label: "足関節", group: "multisegmental" }
];

const seedData = [
  {
    id: "rotator-cuff-related-shoulder-pain",
    name: "腱板関連肩痛",
    summary: "肩峰下周囲の痛みを含む臨床像。単一組織の断定より、負荷に対する症状と機能をまとめて評価します。",
    regions: ["肩", "上腕外側"],
    movements: ["腕を上げる", "物を持ち上げる", "患側を下にして寝る", "背中に手を回す"],
    keywords: ["夜間痛", "ペインフルアーク", "筋力低下", "オーバーヘッド"],
    muscles: ["棘上筋", "棘下筋", "肩甲下筋", "小円筋", "三角筋"],
    joints: ["肩甲上腕関節", "肩鎖関節", "肩甲胸郭機構"],
    nerves: ["肩甲上神経", "腋窩神経"],
    tests: [
      { id: "painful-arc", name: "Painful arc", finding: "肩外転のおよそ中間域で痛みが増え、終末域で軽くなる" },
      { id: "resisted-er", name: "外旋抵抗テスト", finding: "抵抗下外旋で疼痛または明らかな筋力低下" },
      { id: "hawkins-kennedy", name: "Hawkins-Kennedy test", finding: "肩を屈曲・内旋方向へ動かした際に既知の肩痛が再現" }
    ],
    treatments: ["活動量と負荷の調整", "腱板・肩甲帯の段階的な筋力トレーニング", "可動域制限に応じた運動療法", "必要時は医療者による疼痛管理の相談"],
    selfCare: ["痛みが長く残らない範囲で肩を動かす", "反復する頭上作業を一時的に分散する", "軽い外旋・挙上運動から徐々に負荷を上げる"],
    cautions: ["急な外傷後に腕を上げられない、著明な筋力低下がある場合は早期評価", "胸痛、息切れ、発汗を伴う肩痛は緊急評価"]
  },
  {
    id: "adhesive-capsulitis",
    name: "凍結肩（肩関節周囲の拘縮）",
    summary: "自動・他動の両方で多方向の可動域が制限され、とくに外旋制限が目立つ臨床像です。",
    regions: ["肩"],
    movements: ["腕を上げる", "背中に手を回す", "髪を結ぶ", "着替える"],
    keywords: ["可動域制限", "夜間痛", "徐々に悪化", "外旋制限"],
    muscles: ["腱板筋群", "三角筋"],
    joints: ["肩甲上腕関節", "関節包"],
    nerves: [],
    tests: [
      { id: "passive-er", name: "他動外旋可動域", finding: "健側と比べて他動外旋が明らかに制限" },
      { id: "capsular-pattern", name: "多方向の他動可動域", finding: "外旋を中心に外転・内旋も制限される" }
    ],
    treatments: ["病期と刺激性に合わせた可動域運動", "疼痛教育と活動調整", "必要時は医師と注射などの選択肢を相談"],
    selfCare: ["強く押し込まず、許容範囲で短時間の可動域運動", "日常動作を小分けにして痛みの蓄積を避ける"],
    cautions: ["外傷、発熱、強い腫脹がある場合は別の原因を評価", "糖尿病などの併存症も医療者に共有"]
  },
  {
    id: "cervical-radiculopathy",
    name: "頸部神経根症の疑い",
    summary: "頸部から上肢へ広がる痛み・しびれ・筋力低下を、神経学的所見と複数の誘発・軽減所見から評価します。",
    regions: ["首", "肩甲骨周囲", "腕", "手"],
    movements: ["首を反らす", "首を回す", "長く座る", "上を向く"],
    keywords: ["しびれ", "放散痛", "握力低下", "感覚低下", "反射"],
    muscles: ["頸部深層筋", "斜角筋", "上肢筋群"],
    joints: ["頸椎椎間関節", "椎間孔"],
    nerves: ["頸神経根 C5-C8", "正中神経", "橈骨神経", "尺骨神経"],
    tests: [
      { id: "spurling", name: "Spurling test", finding: "頸部伸展・回旋・圧迫で上肢の既知症状が再現" },
      { id: "distraction", name: "Cervical distraction test", finding: "軽い頸椎牽引で上肢症状が軽減" },
      { id: "ultt-a", name: "Upper limb neurodynamic test A", finding: "左右差を伴って既知の神経症状が再現し、構造分化で変化" },
      { id: "rotation", name: "頸部患側回旋", finding: "患側回旋が約60度未満または明らかな左右差" }
    ],
    treatments: ["神経学的所見を追跡しながら活動を維持", "症状に応じた頸部・肩甲帯運動", "医療者による運動療法、必要に応じた徒手療法の併用"],
    selfCare: ["症状を強く末梢へ広げる姿勢を長時間続けない", "短い休憩と姿勢変更を増やす", "軽い運動で症状が腕から首側へ戻るか観察する"],
    cautions: ["進行する筋力低下、歩行障害、手の巧緻運動低下、膀胱直腸障害は早急に評価", "発熱、がん既往、重大外傷を伴う頸部痛は医療機関へ"]
  },
  {
    id: "lumbar-radicular-pain",
    name: "腰部神経根性疼痛／坐骨神経痛の疑い",
    summary: "腰殿部から下肢へ広がる症状を、神経学的所見と神経伸張テスト、症状の変化から整理します。",
    regions: ["腰", "臀部", "太もも", "下腿", "足"],
    movements: ["前かがみ", "長く座る", "立ち上がる", "歩く"],
    keywords: ["しびれ", "放散痛", "坐骨神経痛", "感覚低下", "筋力低下"],
    muscles: ["多裂筋", "脊柱起立筋", "殿筋群", "下肢筋群"],
    joints: ["腰椎", "椎間板", "椎間孔", "仙腸関節"],
    nerves: ["腰仙部神経根 L4-S1", "坐骨神経"],
    tests: [
      { id: "slr", name: "Straight leg raise", finding: "下肢挙上で既知の下肢症状が再現し、足関節や頸部操作で変化" },
      { id: "crossed-slr", name: "Crossed straight leg raise", finding: "健側下肢の挙上で患側の下肢症状が再現" },
      { id: "neuro-screen", name: "下肢神経学的スクリーニング", finding: "筋力・感覚・腱反射に神経根分布と整合する左右差" }
    ],
    treatments: ["重篤疾患を除外したうえで通常活動を可能な範囲で継続", "個別化した運動療法", "徒手療法は運動を含む治療パッケージの一部として検討", "症状や神経脱落所見に応じて医師へ紹介"],
    selfCare: ["完全な安静を続けず、短い歩行など可能な活動を維持", "症状が下肢へ強く広がる動作量を一時調整", "座位を定期的に中断する"],
    cautions: ["尿閉・失禁、会陰部感覚低下、両脚の進行性脱力は緊急評価", "発熱、がん既往、重大外傷、説明しにくい体重減少を伴う場合は医療機関へ"]
  },
  {
    id: "patellofemoral-pain",
    name: "膝蓋大腿痛",
    summary: "膝蓋骨周囲・後面の痛みが、荷重下で膝を曲げる活動により再現される臨床像です。",
    regions: ["膝前面", "膝"],
    movements: ["階段を下りる", "階段を上る", "しゃがむ", "走る", "長く座る"],
    keywords: ["膝前面痛", "階段", "スクワット", "ランニング"],
    muscles: ["大腿四頭筋", "中殿筋", "大殿筋", "下腿三頭筋"],
    joints: ["膝蓋大腿関節", "脛骨大腿関節"],
    nerves: [],
    tests: [
      { id: "squat", name: "スクワット", finding: "荷重下膝屈曲で膝蓋骨周囲の既知症状が再現" },
      { id: "stairs", name: "階段昇降", finding: "とくに降段で膝前面痛が再現" },
      { id: "patellar-palpation", name: "膝蓋骨周囲の触診", finding: "膝蓋骨辺縁の圧痛が症状と一致" }
    ],
    treatments: ["股関節・膝を組み合わせた筋力トレーニング", "走行・階段・スクワット負荷の一時調整", "個別評価に基づくテーピングや足部介入の短期併用"],
    selfCare: ["痛みが翌日まで増え続けない範囲で運動量を調整", "浅いスクワットから段階的に深さと負荷を増やす", "走行距離・速度・坂道を一度に増やさない"],
    cautions: ["大きな腫れ、ロッキング、外傷後の荷重不能、発熱を伴う場合は評価を優先"]
  },
  {
    id: "meniscal-injury",
    name: "半月板損傷の疑い",
    summary: "捻転機転、関節裂隙痛、腫脹、引っかかりなどを組み合わせて評価します。単一テストだけでは確定しません。",
    regions: ["膝内側", "膝外側", "膝"],
    movements: ["ひねる", "しゃがむ", "方向転換", "階段を下りる"],
    keywords: ["ロッキング", "引っかかり", "関節裂隙", "腫れ", "捻った"],
    muscles: ["大腿四頭筋", "ハムストリングス", "膝窩筋"],
    joints: ["脛骨大腿関節", "内側半月板", "外側半月板"],
    nerves: [],
    tests: [
      { id: "joint-line", name: "関節裂隙圧痛", finding: "内側または外側関節裂隙の圧痛が主訴と一致" },
      { id: "thessaly", name: "Thessaly test", finding: "軽度膝屈曲位での回旋により関節裂隙痛や引っかかりが再現" },
      { id: "mcmurray", name: "McMurray test", finding: "膝屈伸と回旋で症状に一致する疼痛またはクリック" }
    ],
    treatments: ["腫脹と症状に応じた負荷調整", "膝・股関節の筋力と動作の段階的回復", "持続するロッキングや機能障害では整形外科評価"],
    selfCare: ["急性期は深い屈曲と強い捻転を減らす", "可能な範囲で歩行と軽い膝運動を維持", "腫れと翌日の反応を見ながら負荷を増やす"],
    cautions: ["膝が物理的に伸びないロッキング、外傷後の荷重不能、大きな急性腫脹は早期評価"]
  }
];

let items = loadItems();
let clinicalState = loadClinicalState();
let selectedId = clinicalState.selectedId && items.some(item => item.id === clinicalState.selectedId) ? clinicalState.selectedId : items[0]?.id ?? null;
let testResults = clinicalState.testResults || {};
let selectedMovements = new Set(clinicalState.selectedMovements || []);
let sfmaResults = clinicalState.sfmaResults || {};
let sfmaBreakoutResults = clinicalState.sfmaBreakoutResults || {};
let customRegions = loadCustomRegions();
let entityMeta = loadEntityMeta();

const $ = (selector) => document.querySelector(selector);
const elements = {
  region: $("#regionSelect"), movementChoices: $("#movementChoices"), keyword: $("#keywordInput"),
  newRegion: $("#newRegionInput"), addRegion: $("#addRegionButton"), sfma: $("#sfmaInputs"),
  sfmaBreakouts: $("#sfmaBreakoutInputs"), autosaveStatus: $("#autosaveStatus"),
  clinicalEntityKind: $("#clinicalEntityKind"), clinicalEntityInput: $("#clinicalEntityInput"),
  clinicalEntityDescription: $("#clinicalEntityDescription"), clinicalEntitySuggestions: $("#clinicalEntitySuggestions"),
  addClinicalEntity: $("#addClinicalEntityButton"), editClinicalEntity: $("#editClinicalEntityButton"),
  quickRegions: $("#quickRegions"), candidates: $("#candidateList"), count: $("#resultCount"),
  detail: $("#detailPanel"), reset: $("#resetButton"), openEditor: $("#openEditorButton"),
  dialog: $("#editorDialog"), editorSelect: $("#editorItemSelect"), editorForm: $("#editorForm"),
  newItem: $("#newItemButton"), deleteItem: $("#deleteItemButton"), toast: $("#toast"),
  entityDialog: $("#entityDialog"), entityForm: $("#entityForm"), entityRelations: $("#entityRelations")
};
elements.region.value = clinicalState.region || "";
elements.keyword.value = clinicalState.keyword || "";
if (clinicalState.clinicalDraft && elements.clinicalEntityKind) {
  elements.clinicalEntityKind.value = clinicalState.clinicalDraft.kindSubtype || elements.clinicalEntityKind.value;
  elements.clinicalEntityInput.value = clinicalState.clinicalDraft.name || "";
  elements.clinicalEntityDescription.value = clinicalState.clinicalDraft.description || "";
}

function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : structuredClone(seedData);
  } catch { return structuredClone(seedData); }
}

function loadCustomRegions() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOM_REGIONS_KEY));
    return Array.isArray(saved) ? saved.filter(Boolean) : [];
  } catch { return []; }
}

function loadEntityMeta() {
  try { return JSON.parse(localStorage.getItem(ENTITY_META_KEY)) || {}; }
  catch { return {}; }
}

function loadClinicalState() {
  try { return JSON.parse(localStorage.getItem(CLINICAL_STATE_KEY)) || {}; }
  catch { return {}; }
}

function saveItems() { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
function saveCustomRegions() { localStorage.setItem(CUSTOM_REGIONS_KEY, JSON.stringify(customRegions)); }
function saveEntityMeta() { localStorage.setItem(ENTITY_META_KEY, JSON.stringify(entityMeta)); }
function saveClinicalState() {
  const state = {
    selectedId,
    region: elements.region?.value || "",
    keyword: elements.keyword?.value || "",
    selectedMovements: [...selectedMovements],
    sfmaResults,
    sfmaBreakoutResults,
    testResults,
    clinicalDraft: elements.clinicalEntityKind ? {
      kindSubtype: elements.clinicalEntityKind.value || "",
      name: elements.clinicalEntityInput?.value || "",
      description: elements.clinicalEntityDescription?.value || ""
    } : {}
  };
  localStorage.setItem(CLINICAL_STATE_KEY, JSON.stringify(state));
  if (elements.autosaveStatus) {
    elements.autosaveStatus.textContent = "保存済み";
    clearTimeout(saveClinicalState.timer);
    saveClinicalState.timer = setTimeout(() => { elements.autosaveStatus.textContent = "自動保存"; }, 1200);
  }
}
function unique(values) { return [...new Set(values.flat().filter(Boolean))].sort((a, b) => a.localeCompare(b, "ja")); }
function splitComma(value) { return value.split(/[、,]/).map(v => v.trim()).filter(Boolean); }
function splitLines(value) { return value.split(/\r?\n/).map(v => v.trim()).filter(Boolean); }
function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]); }

function populateFilters() {
  const selectedRegion = elements.region.value;
  const regions = unique([...items.map(item => item.regions), customRegions]);
  const symptoms = unique(items.flatMap(item => [...item.movements, ...item.keywords]));
  elements.region.innerHTML = '<option value="">部位を選択</option>' + regions.map(v => `<option>${escapeHtml(v)}</option>`).join("");
  elements.region.value = regions.includes(selectedRegion) ? selectedRegion : "";
  elements.movementChoices.innerHTML = symptoms.map(movement => `
    <label class="choice-item">
      <input type="checkbox" value="${escapeHtml(movement)}" ${selectedMovements.has(movement) ? "checked" : ""}>
      <span>${escapeHtml(movement)}</span>
    </label>`).join("");
  elements.quickRegions.innerHTML = regions.map(region => `<button class="chip ${region === elements.region.value ? "active" : ""}" type="button" data-region="${escapeHtml(region)}">${escapeHtml(region)}</button>`).join("");
  elements.sfma.innerHTML = SFMA_PATTERNS.map(pattern => `
    <label class="sfma-item">${escapeHtml(pattern.label)}
      <select data-sfma-id="${pattern.id}">
        <option value="">未入力</option>
        <option value="FN" ${sfmaResults[pattern.id] === "FN" ? "selected" : ""}>FN</option>
        <option value="FP" ${sfmaResults[pattern.id] === "FP" ? "selected" : ""}>FP</option>
        <option value="DN" ${sfmaResults[pattern.id] === "DN" ? "selected" : ""}>DN</option>
        <option value="DP" ${sfmaResults[pattern.id] === "DP" ? "selected" : ""}>DP</option>
      </select>
    </label>`).join("");
  elements.sfmaBreakouts.innerHTML = SFMA_BREAKOUTS.map(pattern => `
    <label class="sfma-item">${escapeHtml(pattern.label)}
      <select data-sfma-breakout-id="${pattern.id}">
        <option value="">未入力</option>
        <option value="FN" ${sfmaBreakoutResults[pattern.id] === "FN" ? "selected" : ""}>FN</option>
        <option value="FP" ${sfmaBreakoutResults[pattern.id] === "FP" ? "selected" : ""}>FP</option>
        <option value="DN" ${sfmaBreakoutResults[pattern.id] === "DN" ? "selected" : ""}>DN</option>
        <option value="DP" ${sfmaBreakoutResults[pattern.id] === "DP" ? "selected" : ""}>DP</option>
      </select>
    </label>`).join("");
}

function getSfmaScore(item) {
  let score = 0;
  const reasons = [];
  const cervicalRelevant = item.regions.some(region => ["首", "肩甲骨周囲", "肩", "腕", "手"].includes(region));
  const multisegmentalRelevant = item.regions.some(region => ["腰", "臀部", "太もも", "下腿", "足"].includes(region));
  SFMA_PATTERNS.forEach(pattern => {
    const result = sfmaResults[pattern.id];
    if (!result || result === "FN") return;
    const relevant = pattern.group === "cervical" ? cervicalRelevant : multisegmentalRelevant;
    if (!relevant) return;
    if (result === "FP" || result === "DP") score += 7;
    if (result === "DN") score += 3;
    reasons.push(`${pattern.label} ${result}`);
  });
  SFMA_BREAKOUTS.forEach(pattern => {
    const result = sfmaBreakoutResults[pattern.id];
    if (!result || result === "FN") return;
    const relevant = pattern.group === "cervical" ? cervicalRelevant : multisegmentalRelevant;
    if (!relevant) return;
    if (result === "FP" || result === "DP") score += 5;
    if (result === "DN") score += 2;
    reasons.push(`${pattern.label} ${result}`);
  });
  return { score, reasons };
}

function getItemEntityDescriptions(item) {
  const refs = [
    ...item.regions.map(name => ["symptom", "region", name]),
    ...item.movements.map(name => ["symptom", "movement", name]),
    ...item.keywords.map(name => ["symptom", "keyword", name]),
    ...item.muscles.map(name => ["anatomy", "muscle", name]),
    ...item.joints.map(name => ["anatomy", "joint", name]),
    ...item.nerves.map(name => ["anatomy", "nerve", name]),
    ...item.treatments.map(name => ["treatment", "treatment", name]),
    ...item.selfCare.map(name => ["treatment", "selfCare", name])
  ];
  return refs.map(([kind, subtype, name]) => entityMeta[metaKey(kind, subtype, name)]?.description || "").join(" ");
}

function scoreItem(item) {
  let score = 0;
  const reasons = [];
  const region = elements.region.value;
  const query = elements.keyword.value.trim().toLowerCase();
  if (region) {
    if (item.regions.includes(region)) { score += 35; reasons.push(region); }
    else score -= 18;
  }
  selectedMovements.forEach(movement => {
    if (item.movements.includes(movement) || item.keywords.includes(movement)) { score += 22; reasons.push(movement); }
    else score -= 5;
  });
  if (query) {
    const fields = [item.name, item.summary, ...item.regions, ...item.movements, ...item.keywords, ...item.muscles, ...item.joints, ...item.nerves, getItemEntityDescriptions(item)].join(" ").toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    const hits = terms.filter(term => fields.includes(term));
    score += hits.length * 18;
    if (hits.length) reasons.push(...hits);
    else score -= 10;
  }
  item.tests.forEach(test => {
    const result = testResults[`${item.id}:${test.id}`];
    if (result === "positive") { score += 14; reasons.push(`${test.name}＋`); }
    if (result === "negative") score -= 9;
  });
  const sfma = getSfmaScore(item);
  score += sfma.score;
  reasons.push(...sfma.reasons);
  return { item, score: Math.max(0, score), reasons: [...new Set(reasons)].slice(0, 3) };
}

function getRankedItems() {
  const ranked = items.map((item, index) => ({ ...scoreItem(item), index })).sort((a, b) => b.score - a.score || a.index - b.index);
  const max = Math.max(...ranked.map(entry => entry.score), 1);
  return ranked.map(entry => ({ ...entry, displayScore: Math.round((entry.score / max) * 100) }));
}

function render() {
  populateFilters();
  const ranked = getRankedItems();
  if (!ranked.some(entry => entry.item.id === selectedId)) selectedId = ranked[0]?.item.id ?? null;
  elements.count.textContent = ranked.length;
  elements.candidates.innerHTML = ranked.length ? ranked.map(({ item, displayScore, reasons }) => `
    <button class="candidate-card ${item.id === selectedId ? "selected" : ""}" type="button" data-id="${escapeHtml(item.id)}">
      <span class="candidate-top"><span class="candidate-name">${escapeHtml(item.name)}</span><span class="score">関連度 ${displayScore}</span></span>
      <span class="score-track"><span class="score-fill" style="width:${displayScore}%"></span></span>
      <span class="candidate-reason">${reasons.length ? `一致: ${reasons.map(escapeHtml).join(" / ")}` : "検査やキーワードで絞り込めます"}</span>
    </button>`).join("") : '<p class="empty">候補がありません。条件を変えるか、各ページから追加できます。</p>';
  const selected = items.find(item => item.id === selectedId);
  elements.detail.innerHTML = selected ? renderDetail(selected) : '<p class="empty">候補を選択してください。</p>';
  renderDirectories();
  renderClinicalEntitySuggestions();
  saveClinicalState();
}

const SUBTYPE_TO_KIND = {
  region: "symptom", movement: "symptom", keyword: "symptom",
  muscle: "anatomy", joint: "anatomy", nerve: "anatomy",
  test: "test", treatment: "treatment", selfCare: "treatment"
};

function catalogOptions(kind, subtype) {
  return getEntityCatalog(kind)
    .filter(entity => entity.subtype === subtype)
    .map(entity => `<option value="${escapeHtml(entity.name)}"></option>`)
    .join("");
}

function renderEditableTags(item, property, subtype, listId) {
  const kind = SUBTYPE_TO_KIND[subtype];
  const values = item[property] || [];
  const tags = values.map((value, index) => `
    <span class="entity-pill">
      <input class="pill-input" data-token-edit="${escapeHtml(property)}" data-token-index="${index}" data-token-subtype="${escapeHtml(subtype)}" list="${escapeHtml(listId)}" value="${escapeHtml(value)}" aria-label="${escapeHtml(value)}">
      <button class="pill-remove" type="button" data-remove-token="${escapeHtml(property)}" data-token-value="${escapeHtml(encodeURIComponent(value))}" aria-label="${escapeHtml(value)}を外す">×</button>
    </span>`).join("");
  return `
    <div class="tag-list">${tags || '<span class="source-note">登録なし</span>'}</div>
    <div class="inline-add inline-add-compact">
      <input data-add-token="${escapeHtml(property)}" data-token-subtype="${escapeHtml(subtype)}" list="${escapeHtml(listId)}" placeholder="追加" autocomplete="off">
      <button class="button button-secondary" type="button" data-add-token-button="${escapeHtml(property)}">追加</button>
      <datalist id="${escapeHtml(listId)}">${catalogOptions(kind, subtype)}</datalist>
    </div>`;
}

function renderEditableLines(item, property) {
  return `<textarea class="inline-lines" data-list-property="${escapeHtml(property)}" rows="4">${escapeHtml((item[property] || []).join("\n"))}</textarea>`;
}

function renderDetail(item) {
  return `
    <div class="detail-hero">
      <p class="step-label">STEP 3</p>
      <input class="inline-title" data-candidate-field="name" value="${escapeHtml(item.name)}" aria-label="候補名">
      <textarea class="inline-summary" data-candidate-field="summary" rows="3" aria-label="概要">${escapeHtml(item.summary)}</textarea>
    </div>
    <section class="detail-section"><h3>関連する部位・症状</h3>
      <h3>部位</h3>${renderEditableTags(item, "regions", "region", `region-options-${item.id}`)}
      <h3>動作・活動</h3>${renderEditableTags(item, "movements", "movement", `movement-options-${item.id}`)}
      <h3>症状・特徴</h3>${renderEditableTags(item, "keywords", "keyword", `keyword-options-${item.id}`)}
    </section>
    <section class="detail-section"><h3>関連する筋・関節・神経</h3><div class="anatomy-grid">
      <div class="anatomy-box"><h3>筋</h3>${renderEditableTags(item, "muscles", "muscle", `muscle-options-${item.id}`)}</div>
      <div class="anatomy-box"><h3>関節・組織</h3>${renderEditableTags(item, "joints", "joint", `joint-options-${item.id}`)}</div>
      <div class="anatomy-box"><h3>神経</h3>${renderEditableTags(item, "nerves", "nerve", `nerve-options-${item.id}`)}</div>
    </div></section>
    <section class="detail-section"><h3>検査項目</h3><p class="helper">結果を選ぶと全候補の関連度を再計算します。検査は病歴・神経学的所見などと組み合わせて解釈してください。</p><div class="test-list">
      ${item.tests.map(test => { const key = `${item.id}:${test.id}`; const current = testResults[key] || "unknown"; return `
        <article class="test-card" data-test-id="${escapeHtml(test.id)}">
          <div class="test-card-head">
            <input class="inline-test-name" data-test-field="name" value="${escapeHtml(test.name)}" list="test-options-${item.id}" aria-label="検査名">
            <button class="pill-remove" type="button" data-remove-test="${escapeHtml(test.id)}" aria-label="${escapeHtml(test.name)}を外す">×</button>
          </div>
          <textarea class="inline-finding" data-test-field="finding" rows="2" aria-label="陽性の目安">${escapeHtml(test.finding)}</textarea>
          <div class="segmented" data-test-key="${escapeHtml(key)}">
            <button type="button" data-result="positive" class="${current === "positive" ? "active" : ""}">陽性</button>
            <button type="button" data-result="negative" class="${current === "negative" ? "active" : ""}">陰性</button>
            <button type="button" data-result="unknown" class="${current === "unknown" ? "active" : ""}">未実施</button>
          </div>
        </article>`; }).join("")}
      <div class="inline-add inline-add-compact">
        <input data-add-test-input list="test-options-${item.id}" placeholder="検査を追加" autocomplete="off">
        <button class="button button-secondary" type="button" data-add-test-button>追加</button>
        <datalist id="test-options-${item.id}">${catalogOptions("test", "test")}</datalist>
      </div>
    </div></section>
    <section class="detail-section"><h3>治療候補</h3>${renderEditableLines(item, "treatments")}</section>
    <section class="detail-section"><h3>セルフケア候補</h3>${renderEditableLines(item, "selfCare")}</section>
    <section class="detail-section"><div class="caution-box"><h3>注意・紹介の目安</h3>${renderEditableLines(item, "cautions")}</div></section>
    <p class="source-note">表示内容は教育・臨床推論支援用の初期データです。個別の診断・治療指示ではありません。</p>`;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function fillEditor(item) {
  $("#editId").value = item?.id || "";
  $("#editName").value = item?.name || "";
  $("#editSummary").value = item?.summary || "";
  $("#editRegions").value = item?.regions?.join(", ") || "";
  $("#editMovements").value = item?.movements?.join(", ") || "";
  $("#editKeywords").value = item?.keywords?.join(", ") || "";
  $("#editMuscles").value = item?.muscles?.join(", ") || "";
  $("#editJoints").value = item?.joints?.join(", ") || "";
  $("#editNerves").value = item?.nerves?.join(", ") || "";
  $("#editTests").value = item?.tests?.map(t => `${t.name} | ${t.finding}`).join("\n") || "";
  $("#editTreatments").value = item?.treatments?.join("\n") || "";
  $("#editSelfCare").value = item?.selfCare?.join("\n") || "";
  $("#editCautions").value = item?.cautions?.join("\n") || "";
  elements.deleteItem.disabled = !item;
}

function refreshEditorSelect(id = selectedId) {
  elements.editorSelect.innerHTML = items.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join("");
  if (items.some(item => item.id === id)) elements.editorSelect.value = id;
  fillEditor(items.find(item => item.id === elements.editorSelect.value));
}

function slugify(name) {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "item"}-${Date.now().toString(36)}`;
}

const ENTITY_TYPES = {
  symptom: [
    { value: "region", label: "部位" },
    { value: "movement", label: "動作・活動" },
    { value: "keyword", label: "症状・特徴" }
  ],
  anatomy: [
    { value: "muscle", label: "筋" },
    { value: "joint", label: "関節・組織" },
    { value: "nerve", label: "神経" }
  ],
  test: [{ value: "test", label: "検査" }],
  treatment: [
    { value: "treatment", label: "治療候補" },
    { value: "selfCare", label: "セルフケア" }
  ]
};

function metaKey(kind, subtype, name) { return `${kind}|${subtype}|${name}`; }

function getEntityCatalog(kind) {
  const map = new Map();
  const add = (name, subtype, conditionId, description = "") => {
    if (!name) return;
    const key = `${subtype}|${name}`;
    if (!map.has(key)) map.set(key, { kind, subtype, name, description, conditionIds: [] });
    const entity = map.get(key);
    if (conditionId && !entity.conditionIds.includes(conditionId)) entity.conditionIds.push(conditionId);
    if (!entity.description && description) entity.description = description;
  };
  items.forEach(item => {
    if (kind === "symptom") {
      item.regions.forEach(name => add(name, "region", item.id));
      item.movements.forEach(name => add(name, "movement", item.id));
      item.keywords.forEach(name => add(name, "keyword", item.id));
    }
    if (kind === "anatomy") {
      item.muscles.forEach(name => add(name, "muscle", item.id));
      item.joints.forEach(name => add(name, "joint", item.id));
      item.nerves.forEach(name => add(name, "nerve", item.id));
    }
    if (kind === "test") item.tests.forEach(test => add(test.name, "test", item.id, test.finding));
    if (kind === "treatment") {
      item.treatments.forEach(name => add(name, "treatment", item.id));
      item.selfCare.forEach(name => add(name, "selfCare", item.id));
    }
  });
  if (kind === "symptom") customRegions.forEach(name => add(name, "region", null));
  Object.keys(entityMeta).forEach(key => {
    const [metaKind, subtype, name] = key.split("|");
    if (metaKind === kind) add(name, subtype, null, entityMeta[key]?.description || "");
  });
  return [...map.values()].map(entity => ({
    ...entity,
    description: entityMeta[metaKey(kind, entity.subtype, entity.name)]?.description || entity.description
  })).sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

function subtypeLabel(kind, subtype) {
  return ENTITY_TYPES[kind]?.find(type => type.value === subtype)?.label || subtype;
}

function renderEntityRelations(entity) {
  return items.map(item => `
    <label class="relation-option">
      <input type="checkbox" data-directory-relation="${escapeHtml(item.id)}" ${entityHasRelation(item, entity.subtype, entity.name) ? "checked" : ""}>
      <span>${escapeHtml(item.name)}</span>
    </label>`).join("");
}

function renderDirectory(kind, targetId, searchKey) {
  const target = document.querySelector(targetId);
  if (!target) return;
  const query = (document.querySelector(`[data-directory-search="${searchKey}"]`)?.value || "").trim().toLowerCase();
  const entities = getEntityCatalog(kind).filter(entity => {
    const conditionNames = entity.conditionIds.map(id => items.find(item => item.id === id)?.name || "").join(" ");
    return `${entity.name} ${entity.description} ${conditionNames}`.toLowerCase().includes(query);
  });
  target.innerHTML = entities.length ? entities.map(entity => {
    const key = escapeHtml(encodeURIComponent(`${kind}|${entity.subtype}|${entity.name}`));
    return `<article class="directory-card directory-edit-card" data-directory-entity="${key}">
      <select class="directory-subtype-input" data-directory-subtype aria-label="分類">
        ${ENTITY_TYPES[kind].map(type => `<option value="${type.value}" ${type.value === entity.subtype ? "selected" : ""}>${escapeHtml(type.label)}</option>`).join("")}
      </select>
      <input class="directory-name-input" data-directory-name value="${escapeHtml(entity.name)}" aria-label="${escapeHtml(subtypeLabel(kind, entity.subtype))}名">
      <textarea class="directory-description-input" data-directory-description rows="3" aria-label="説明">${escapeHtml(entity.description || "")}</textarea>
      <div class="relation-grid directory-relation-grid">${renderEntityRelations(entity)}</div>
      <button class="text-button directory-delete" type="button" data-directory-delete>削除</button>
    </article>`;
  }).join("") : '<p class="empty panel">該当するデータがありません。</p>';
}

function renderDirectories() {
  renderDirectory("symptom", "#symptomsDirectory", "symptoms");
  renderDirectory("anatomy", "#anatomyDirectory", "anatomy");
  renderDirectory("test", "#testsDirectory", "tests");
  renderDirectory("treatment", "#treatmentsDirectory", "treatments");
}

function entityHasRelation(item, subtype, name) {
  if (subtype === "test") return item.tests.some(test => test.name === name);
  const property = { region: "regions", movement: "movements", keyword: "keywords", muscle: "muscles", joint: "joints", nerve: "nerves", treatment: "treatments", selfCare: "selfCare" }[subtype];
  return property ? item[property].includes(name) : false;
}

function openEntityEditor(kind, subtype = ENTITY_TYPES[kind][0].value, name = "") {
  const entity = getEntityCatalog(kind).find(entry => entry.subtype === subtype && entry.name === name);
  $("#entityDialogTitle").textContent = kind === "symptom" ? "症状・部位" : kind === "anatomy" ? "解剖" : kind === "test" ? "検査" : "治療";
  $("#entityKind").value = kind;
  $("#entityOriginalName").value = name;
  $("#entityOriginalSubtype").value = subtype;
  $("#entityName").value = name;
  $("#entitySubtype").innerHTML = ENTITY_TYPES[kind].map(type => `<option value="${type.value}" ${type.value === subtype ? "selected" : ""}>${type.label}</option>`).join("");
  $("#entityDescription").value = entity?.description || "";
  $("#entityDescriptionLabel").querySelector("span")?.remove();
  elements.entityRelations.innerHTML = items.map(item => `<label class="relation-option"><input type="checkbox" value="${escapeHtml(item.id)}" ${entityHasRelation(item, subtype, name) ? "checked" : ""}><span>${escapeHtml(item.name)}</span></label>`).join("");
  $("#deleteEntityButton").disabled = !name;
  elements.entityDialog.showModal();
}

function removeEntityReference(item, subtype, name) {
  if (!name) return;
  if (subtype === "test") { item.tests = item.tests.filter(test => test.name !== name); return; }
  const property = { region: "regions", movement: "movements", keyword: "keywords", muscle: "muscles", joint: "joints", nerve: "nerves", treatment: "treatments", selfCare: "selfCare" }[subtype];
  if (property) item[property] = item[property].filter(value => value !== name);
}

function addEntityReference(item, subtype, name, description) {
  if (subtype === "test") {
    const existing = item.tests.find(test => test.name === name);
    if (existing) existing.finding = description || "登録なし";
    else item.tests.push({ id: slugify(name), name, finding: description || "登録なし" });
    return;
  }
  const property = { region: "regions", movement: "movements", keyword: "keywords", muscle: "muscles", joint: "joints", nerve: "nerves", treatment: "treatments", selfCare: "selfCare" }[subtype];
  if (property && !item[property].includes(name)) item[property].push(name);
}

function parseDirectoryEntity(card) {
  const [kind, subtype, name] = decodeURIComponent(card.dataset.directoryEntity || "").split("|");
  return { kind, subtype, name };
}

function renameEntityEverywhere(kind, subtype, oldName, newName) {
  if (!newName || oldName === newName) return;
  items.forEach(item => {
    if (subtype === "test") {
      item.tests.forEach(test => { if (test.name === oldName) test.name = newName; });
      return;
    }
    const property = { region: "regions", movement: "movements", keyword: "keywords", muscle: "muscles", joint: "joints", nerve: "nerves", treatment: "treatments", selfCare: "selfCare" }[subtype];
    if (property) item[property] = item[property].map(value => value === oldName ? newName : value);
  });
  if (subtype === "region") customRegions = customRegions.map(value => value === oldName ? newName : value);
  const oldKey = metaKey(kind, subtype, oldName);
  const oldMeta = entityMeta[oldKey];
  if (oldMeta) {
    entityMeta[metaKey(kind, subtype, newName)] = oldMeta;
    delete entityMeta[oldKey];
  }
  saveItems();
  saveCustomRegions();
  saveEntityMeta();
}

function moveEntitySubtype(kind, oldSubtype, name, newSubtype) {
  if (!newSubtype || oldSubtype === newSubtype) return;
  const description = entityMeta[metaKey(kind, oldSubtype, name)]?.description || "";
  items.forEach(item => {
    if (entityHasRelation(item, oldSubtype, name)) {
      removeEntityReference(item, oldSubtype, name);
      addEntityReference(item, newSubtype, name, description);
    }
  });
  if (oldSubtype === "region") customRegions = customRegions.filter(region => region !== name);
  if (newSubtype === "region" && !customRegions.includes(name)) customRegions.push(name);
  delete entityMeta[metaKey(kind, oldSubtype, name)];
  entityMeta[metaKey(kind, newSubtype, name)] = { description };
  saveItems();
  saveCustomRegions();
  saveEntityMeta();
}

function updateEntityDescription(kind, subtype, name, description) {
  entityMeta[metaKey(kind, subtype, name)] = { description };
  if (subtype === "test") {
    items.forEach(item => item.tests.forEach(test => {
      if (test.name === name) test.finding = description || "登録なし";
    }));
    saveItems();
  }
  saveEntityMeta();
}

function setEntityRelation(conditionId, subtype, name, description, linked) {
  const item = items.find(entry => entry.id === conditionId);
  if (!item) return;
  if (linked) addEntityReference(item, subtype, name, description);
  else removeEntityReference(item, subtype, name);
  saveItems();
}

function addDirectoryEntity(kind, searchKey) {
  const search = document.querySelector(`[data-directory-search="${searchKey}"]`);
  const name = (search?.value || "").trim();
  if (!name) return;
  const subtype = ENTITY_TYPES[kind][0].value;
  entityMeta[metaKey(kind, subtype, name)] = entityMeta[metaKey(kind, subtype, name)] || { description: "" };
  if (kind === "symptom" && subtype === "region" && !customRegions.includes(name)) {
    customRegions.push(name);
    saveCustomRegions();
  }
  saveEntityMeta();
  render();
}

function switchPage(page) {
  document.querySelectorAll("[data-page-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.pagePanel === page));
  document.querySelectorAll("[data-page]").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getClinicalEntitySelection() {
  const [kind, subtype] = elements.clinicalEntityKind.value.split("|");
  return { kind, subtype, name: elements.clinicalEntityInput.value.trim(), description: elements.clinicalEntityDescription.value.trim() };
}

function renderClinicalEntitySuggestions() {
  if (!elements.clinicalEntitySuggestions) return;
  const { kind, subtype } = getClinicalEntitySelection();
  const query = elements.clinicalEntityInput.value.trim().toLowerCase();
  const suggestions = getEntityCatalog(kind)
    .filter(entity => entity.subtype === subtype)
    .filter(entity => !query || `${entity.name} ${entity.description}`.toLowerCase().includes(query))
    .slice(0, 10);
  elements.clinicalEntitySuggestions.innerHTML = suggestions.map(entity => `<button class="suggestion-button" type="button" data-clinical-suggestion="${escapeHtml(encodeURIComponent(entity.name))}" data-clinical-description="${escapeHtml(encodeURIComponent(entity.description || ""))}">${escapeHtml(entity.name)}</button>`).join("");
}

function addClinicalEntityToSelected() {
  const selected = items.find(item => item.id === selectedId);
  const { kind, subtype, name, description } = getClinicalEntitySelection();
  if (!selected || !name) return;
  addEntityReference(selected, subtype, name, description);
  if (kind === "symptom" && subtype === "region" && !customRegions.includes(name) && !unique(items.map(item => item.regions)).includes(name)) {
    customRegions.push(name);
    saveCustomRegions();
  }
  if (description) {
    entityMeta[metaKey(kind, subtype, name)] = { description };
    saveEntityMeta();
  }
  saveItems();
  render();
  showToast(`「${name}」を選択中の候補に追加しました`);
}

function selectedItem() {
  return items.find(item => item.id === selectedId);
}

function persistInlineChange() {
  saveItems();
  renderDirectories();
  populateFilters();
  saveClinicalState();
}

function scheduleDetailSave(handler) {
  clearTimeout(scheduleDetailSave.timer);
  scheduleDetailSave.timer = setTimeout(() => {
    const item = selectedItem();
    if (!item) return;
    handler(item);
    saveItems();
    saveClinicalState();
  }, 350);
}

function addTokenToSelected(property, subtype, value) {
  const item = selectedItem();
  const name = value.trim();
  if (!item || !name) return false;
  if (!item[property].includes(name)) item[property].push(name);
  if (subtype === "region" && !customRegions.includes(name) && !unique(items.map(entry => entry.regions)).includes(name)) {
    customRegions.push(name);
    saveCustomRegions();
  }
  const kind = SUBTYPE_TO_KIND[subtype];
  if (kind && !entityMeta[metaKey(kind, subtype, name)]) {
    entityMeta[metaKey(kind, subtype, name)] = { description: "" };
    saveEntityMeta();
  }
  saveItems();
  render();
  return true;
}

function updateSelectedToken(property, subtype, index, value) {
  const item = selectedItem();
  const name = value.trim();
  if (!item || !Array.isArray(item[property]) || !item[property][index]) return false;
  const oldName = item[property][index];
  if (!name) {
    item[property] = item[property].filter((_, entryIndex) => entryIndex !== index);
  } else if (oldName !== name) {
    item[property][index] = name;
    item[property] = unique([item[property]]);
    const kind = SUBTYPE_TO_KIND[subtype];
    const oldMeta = kind ? entityMeta[metaKey(kind, subtype, oldName)] : null;
    if (kind && oldMeta && !entityMeta[metaKey(kind, subtype, name)]) {
      entityMeta[metaKey(kind, subtype, name)] = oldMeta;
      saveEntityMeta();
    }
  }
  if (subtype === "region" && name && !customRegions.includes(name) && !unique(items.map(entry => entry.regions)).includes(name)) {
    customRegions.push(name);
    saveCustomRegions();
  }
  saveItems();
  render();
  return true;
}

function addTestToSelected(name) {
  const item = selectedItem();
  const testName = name.trim();
  if (!item || !testName) return false;
  const existing = getEntityCatalog("test").find(entity => entity.name === testName);
  if (!item.tests.some(test => test.name === testName)) {
    item.tests.push({ id: slugify(testName), name: testName, finding: existing?.description || "登録なし" });
    saveItems();
    render();
  }
  return true;
}

elements.region.addEventListener("change", render);
elements.keyword.addEventListener("input", render);
elements.clinicalEntityKind?.addEventListener("change", () => {
  elements.clinicalEntityInput.value = "";
  elements.clinicalEntityDescription.value = "";
  renderClinicalEntitySuggestions();
  saveClinicalState();
});
elements.clinicalEntityInput?.addEventListener("input", () => { renderClinicalEntitySuggestions(); saveClinicalState(); });
elements.clinicalEntityDescription?.addEventListener("input", saveClinicalState);
elements.clinicalEntitySuggestions?.addEventListener("click", event => {
  const button = event.target.closest("[data-clinical-suggestion]");
  if (!button) return;
  elements.clinicalEntityInput.value = decodeURIComponent(button.dataset.clinicalSuggestion);
  elements.clinicalEntityDescription.value = decodeURIComponent(button.dataset.clinicalDescription || "");
  renderClinicalEntitySuggestions();
  saveClinicalState();
});
elements.addClinicalEntity?.addEventListener("click", addClinicalEntityToSelected);
elements.editClinicalEntity?.addEventListener("click", () => {
  const { kind, subtype, name } = getClinicalEntitySelection();
  if (!name) return;
  openEntityEditor(kind, subtype, name);
});
elements.movementChoices.addEventListener("change", event => {
  const input = event.target.closest('input[type="checkbox"]');
  if (!input) return;
  if (input.checked) selectedMovements.add(input.value); else selectedMovements.delete(input.value);
  render();
});
elements.sfma.addEventListener("change", event => {
  const select = event.target.closest("[data-sfma-id]");
  if (!select) return;
  if (select.value) sfmaResults[select.dataset.sfmaId] = select.value; else delete sfmaResults[select.dataset.sfmaId];
  render();
});
elements.sfmaBreakouts.addEventListener("change", event => {
  const select = event.target.closest("[data-sfma-breakout-id]");
  if (!select) return;
  if (select.value) sfmaBreakoutResults[select.dataset.sfmaBreakoutId] = select.value; else delete sfmaBreakoutResults[select.dataset.sfmaBreakoutId];
  render();
});
elements.addRegion.addEventListener("click", () => {
  const region = elements.newRegion.value.trim();
  if (!region) return;
  const allRegions = unique(items.map(item => item.regions));
  if (!allRegions.includes(region) && !customRegions.includes(region)) {
    customRegions.push(region);
    saveCustomRegions();
  }
  elements.newRegion.value = "";
  populateFilters();
  elements.region.value = region;
  render();
  showToast(`部位「${region}」を追加しました`);
});
elements.newRegion.addEventListener("keydown", event => {
  if (event.key === "Enter") { event.preventDefault(); elements.addRegion.click(); }
});
document.addEventListener("click", event => {
  const nav = event.target.closest("[data-page]");
  if (nav) { switchPage(nav.dataset.page); return; }
  const directoryAddButton = event.target.closest("[data-directory-add]");
  if (directoryAddButton) {
    addDirectoryEntity(directoryAddButton.dataset.directoryAdd, directoryAddButton.dataset.directorySearchSource);
    return;
  }
  const addButton = event.target.closest("[data-add-entity]");
  if (addButton) { openEntityEditor(addButton.dataset.addEntity); return; }
  const conditionButton = event.target.closest("[data-open-condition]");
  if (conditionButton) {
    selectedId = conditionButton.dataset.openCondition;
    switchPage("clinical");
    render();
    setTimeout(() => elements.detail.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    return;
  }
  const directoryLink = event.target.closest("[data-directory-link]");
  if (directoryLink) {
    const page = directoryLink.dataset.directoryLink;
    const search = document.querySelector(`[data-directory-search="${directoryLink.dataset.directoryKey}"]`);
    if (search) search.value = decodeURIComponent(directoryLink.dataset.directoryValue);
    switchPage(page);
    renderDirectories();
  }
});
document.querySelectorAll("[data-directory-search]").forEach(input => input.addEventListener("input", renderDirectories));
document.querySelectorAll(".directory-grid").forEach(grid => {
  grid.addEventListener("change", event => {
    const card = event.target.closest("[data-directory-entity]");
    if (!card) return;
    const entity = parseDirectoryEntity(card);
    const subtypeInput = event.target.closest("[data-directory-subtype]");
    if (subtypeInput) {
      moveEntitySubtype(entity.kind, entity.subtype, entity.name, subtypeInput.value);
      render();
      return;
    }
    const nameInput = event.target.closest("[data-directory-name]");
    if (nameInput) {
      const newName = nameInput.value.trim();
      if (!newName) { nameInput.value = entity.name; return; }
      renameEntityEverywhere(entity.kind, entity.subtype, entity.name, newName);
      const search = event.target.closest("[data-page-panel]")?.querySelector("[data-directory-search]");
      if (search && search.value.trim() === entity.name) search.value = newName;
      render();
      return;
    }
    const descriptionInput = event.target.closest("[data-directory-description]");
    if (descriptionInput) {
      updateEntityDescription(entity.kind, entity.subtype, entity.name, descriptionInput.value.trim());
      render();
      return;
    }
    const relationInput = event.target.closest("[data-directory-relation]");
    if (relationInput) {
      const description = card.querySelector("[data-directory-description]")?.value.trim() || "";
      setEntityRelation(relationInput.dataset.directoryRelation, entity.subtype, entity.name, description, relationInput.checked);
      render();
    }
  });

  grid.addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-directory-delete]");
    if (!deleteButton) return;
    const card = deleteButton.closest("[data-directory-entity]");
    const entity = parseDirectoryEntity(card);
    if (!entity.name || !confirm(`「${entity.name}」をすべての関連候補から削除しますか？`)) return;
    items.forEach(item => removeEntityReference(item, entity.subtype, entity.name));
    if (entity.subtype === "region") {
      customRegions = customRegions.filter(region => region !== entity.name);
      saveCustomRegions();
    }
    delete entityMeta[metaKey(entity.kind, entity.subtype, entity.name)];
    saveEntityMeta();
    saveItems();
    render();
  });
});
document.querySelectorAll("[data-directory-search]").forEach(input => input.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  const button = document.querySelector(`[data-directory-search-source="${input.dataset.directorySearch}"]`);
  if (!button) return;
  event.preventDefault();
  addDirectoryEntity(button.dataset.directoryAdd, button.dataset.directorySearchSource);
}));
$("#entitySubtype").addEventListener("change", () => {
  const kind = $("#entityKind").value;
  const originalName = $("#entityOriginalName").value;
  const subtype = $("#entitySubtype").value;
  elements.entityRelations.innerHTML = items.map(item => `<label class="relation-option"><input type="checkbox" value="${escapeHtml(item.id)}" ${entityHasRelation(item, subtype, originalName) ? "checked" : ""}><span>${escapeHtml(item.name)}</span></label>`).join("");
});
elements.entityForm.addEventListener("submit", event => {
  event.preventDefault();
  const kind = $("#entityKind").value;
  const originalName = $("#entityOriginalName").value;
  const newName = $("#entityName").value.trim();
  const newSubtype = $("#entitySubtype").value;
  const description = $("#entityDescription").value.trim();
  const originalSubtype = $("#entityOriginalSubtype").value || newSubtype;
  const linkedIds = new Set([...elements.entityRelations.querySelectorAll('input:checked')].map(input => input.value));
  items.forEach(item => {
    removeEntityReference(item, originalSubtype, originalName);
    if (linkedIds.has(item.id)) addEntityReference(item, newSubtype, newName, description);
  });
  if (kind === "symptom") {
    customRegions = customRegions.filter(region => region !== originalName);
    if (newSubtype === "region" && !customRegions.includes(newName)) customRegions.push(newName);
    saveCustomRegions();
  }
  if (originalName) delete entityMeta[metaKey(kind, originalSubtype, originalName)];
  entityMeta[metaKey(kind, newSubtype, newName)] = { description };
  saveEntityMeta();
  saveItems();
  elements.entityDialog.close();
  render();
  showToast(`「${newName}」を保存しました`);
});
$("#deleteEntityButton").addEventListener("click", () => {
  const kind = $("#entityKind").value;
  const name = $("#entityOriginalName").value;
  const subtype = $("#entityOriginalSubtype").value;
  const entity = getEntityCatalog(kind).find(entry => entry.name === name && entry.subtype === subtype);
  if (!entity || !confirm(`「${name}」をすべての関連候補から削除しますか？`)) return;
  items.forEach(item => removeEntityReference(item, entity.subtype, name));
  if (entity.subtype === "region") { customRegions = customRegions.filter(region => region !== name); saveCustomRegions(); }
  delete entityMeta[metaKey(kind, entity.subtype, name)];
  saveEntityMeta(); saveItems(); elements.entityDialog.close(); render(); showToast(`「${name}」を削除しました`);
});
elements.quickRegions.addEventListener("click", event => {
  const button = event.target.closest("[data-region]");
  if (!button) return;
  elements.region.value = elements.region.value === button.dataset.region ? "" : button.dataset.region;
  render();
});
elements.candidates.addEventListener("click", event => {
  const card = event.target.closest("[data-id]");
  if (!card) return;
  selectedId = card.dataset.id;
  render();
  if (matchMedia("(max-width: 760px)").matches) elements.detail.scrollIntoView({ behavior: "smooth", block: "start" });
});
elements.detail.addEventListener("click", event => {
  const button = event.target.closest("[data-result]");
  if (button) {
    const group = button.closest("[data-test-key]");
    testResults[group.dataset.testKey] = button.dataset.result;
    render();
    return;
  }
  const removeToken = event.target.closest("[data-remove-token]");
  if (removeToken) {
    const item = selectedItem();
    const property = removeToken.dataset.removeToken;
    const value = decodeURIComponent(removeToken.dataset.tokenValue);
    if (!item || !Array.isArray(item[property])) return;
    item[property] = item[property].filter(entry => entry !== value);
    saveItems();
    render();
    return;
  }
  const addToken = event.target.closest("[data-add-token-button]");
  if (addToken) {
    const input = elements.detail.querySelector(`[data-add-token="${CSS.escape(addToken.dataset.addTokenButton)}"]`);
    if (input && addTokenToSelected(addToken.dataset.addTokenButton, input.dataset.tokenSubtype, input.value)) input.value = "";
    return;
  }
  const removeTest = event.target.closest("[data-remove-test]");
  if (removeTest) {
    const item = selectedItem();
    if (!item) return;
    item.tests = item.tests.filter(test => test.id !== removeTest.dataset.removeTest);
    saveItems();
    render();
    return;
  }
  const addTest = event.target.closest("[data-add-test-button]");
  if (addTest) {
    const input = elements.detail.querySelector("[data-add-test-input]");
    if (input && addTestToSelected(input.value)) input.value = "";
  }
});

elements.detail.addEventListener("keydown", event => {
  const tokenInput = event.target.closest("[data-add-token]");
  if (tokenInput && (event.key === "Enter" || event.key === ",")) {
    event.preventDefault();
    addTokenToSelected(tokenInput.dataset.addToken, tokenInput.dataset.tokenSubtype, tokenInput.value);
    tokenInput.value = "";
    return;
  }
  const testInput = event.target.closest("[data-add-test-input]");
  if (testInput && event.key === "Enter") {
    event.preventDefault();
    addTestToSelected(testInput.value);
    testInput.value = "";
  }
});

elements.detail.addEventListener("input", event => {
  const candidateField = event.target.closest("[data-candidate-field]");
  if (candidateField) {
    scheduleDetailSave(item => {
      item[candidateField.dataset.candidateField] = candidateField.value.trim() || item[candidateField.dataset.candidateField];
    });
    return;
  }
  const listField = event.target.closest("[data-list-property]");
  if (listField) {
    scheduleDetailSave(item => {
      item[listField.dataset.listProperty] = splitLines(listField.value);
    });
    return;
  }
  const testField = event.target.closest("[data-test-field]");
  if (testField) {
    const card = testField.closest("[data-test-id]");
    scheduleDetailSave(item => {
      const test = item.tests.find(entry => entry.id === card?.dataset.testId);
      if (!test) return;
      test[testField.dataset.testField] = testField.value.trim() || "登録なし";
      if (testField.dataset.testField === "finding") {
        entityMeta[metaKey("test", "test", test.name)] = { description: test.finding };
        saveEntityMeta();
      }
    });
  }
});

elements.detail.addEventListener("change", event => {
  const item = selectedItem();
  if (!item) return;
  const tokenField = event.target.closest("[data-token-edit]");
  if (tokenField) {
    updateSelectedToken(tokenField.dataset.tokenEdit, tokenField.dataset.tokenSubtype, Number(tokenField.dataset.tokenIndex), tokenField.value);
    return;
  }
  const candidateField = event.target.closest("[data-candidate-field]");
  if (candidateField) {
    const field = candidateField.dataset.candidateField;
    item[field] = candidateField.value.trim() || item[field];
    saveItems();
    render();
    return;
  }
  const listField = event.target.closest("[data-list-property]");
  if (listField) {
    item[listField.dataset.listProperty] = splitLines(listField.value);
    saveItems();
    render();
    return;
  }
  const testField = event.target.closest("[data-test-field]");
  if (testField) {
    const card = testField.closest("[data-test-id]");
    const test = item.tests.find(entry => entry.id === card?.dataset.testId);
    if (!test) return;
    test[testField.dataset.testField] = testField.value.trim() || "登録なし";
    if (testField.dataset.testField === "finding") {
      entityMeta[metaKey("test", "test", test.name)] = { description: test.finding };
      saveEntityMeta();
    }
    saveItems();
    renderDirectories();
    saveClinicalState();
  }
});
elements.reset.addEventListener("click", () => {
  elements.region.value = ""; elements.keyword.value = ""; selectedMovements.clear(); sfmaResults = {}; sfmaBreakoutResults = {}; testResults = {}; render();
});
elements.openEditor.addEventListener("click", () => { refreshEditorSelect(); elements.dialog.showModal(); });
elements.editorSelect.addEventListener("change", () => fillEditor(items.find(item => item.id === elements.editorSelect.value)));
elements.newItem.addEventListener("click", () => { elements.editorSelect.value = ""; fillEditor(null); $("#editName").focus(); });

elements.editorForm.addEventListener("submit", event => {
  event.preventDefault();
  const existingId = $("#editId").value;
  const name = $("#editName").value.trim();
  const tests = splitLines($("#editTests").value).map((line, index) => {
    const [testName, ...finding] = line.split("|");
    return { id: `test-${index}-${slugify(testName).slice(0, 30)}`, name: testName.trim(), finding: finding.join("|").trim() || "登録なし" };
  });
  const item = {
    id: existingId || slugify(name), name, summary: $("#editSummary").value.trim(),
    regions: splitComma($("#editRegions").value), movements: splitComma($("#editMovements").value), keywords: splitComma($("#editKeywords").value),
    muscles: splitComma($("#editMuscles").value), joints: splitComma($("#editJoints").value), nerves: splitComma($("#editNerves").value),
    tests, treatments: splitLines($("#editTreatments").value), selfCare: splitLines($("#editSelfCare").value), cautions: splitLines($("#editCautions").value)
  };
  const index = items.findIndex(entry => entry.id === existingId);
  if (index >= 0) items[index] = item; else items.push(item);
  selectedId = item.id; saveItems(); refreshEditorSelect(item.id); render(); showToast("データを保存しました");
});

elements.deleteItem.addEventListener("click", () => {
  const id = $("#editId").value;
  if (!id || !confirm("この候補を削除しますか？")) return;
  items = items.filter(item => item.id !== id);
  selectedId = items[0]?.id ?? null; saveItems(); saveClinicalState(); refreshEditorSelect(); render(); showToast("削除しました");
});

$("#exportButton").addEventListener("click", () => {
  const bundle = { version: 2, items, customRegions, entityMeta };
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
  const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "msk-data.json"; link.click(); URL.revokeObjectURL(link.href);
});
$("#importInput").addEventListener("change", async event => {
  try {
    const data = JSON.parse(await event.target.files[0].text());
    const importedItems = Array.isArray(data) ? data : data.items;
    if (!Array.isArray(importedItems) || !importedItems.every(item => item.id && item.name && Array.isArray(item.tests))) throw new Error();
    items = importedItems;
    if (!Array.isArray(data)) {
      customRegions = Array.isArray(data.customRegions) ? data.customRegions : [];
      entityMeta = data.entityMeta && typeof data.entityMeta === "object" ? data.entityMeta : {};
    }
    selectedId = items[0]?.id ?? null; saveItems(); saveCustomRegions(); saveEntityMeta(); refreshEditorSelect(); render(); showToast("全データを読み込みました");
  } catch { alert("読み込めるJSON形式ではありません。"); }
  event.target.value = "";
});
$("#restoreButton").addEventListener("click", () => {
  if (!confirm("追加・変更した内容を破棄して初期データに戻しますか？")) return;
  items = structuredClone(seedData); customRegions = []; entityMeta = {}; selectedId = items[0].id; testResults = {}; selectedMovements.clear(); sfmaResults = {}; sfmaBreakoutResults = {}; saveItems(); saveCustomRegions(); saveEntityMeta(); saveClinicalState(); refreshEditorSelect(); render(); showToast("初期データに戻しました");
});

render();
