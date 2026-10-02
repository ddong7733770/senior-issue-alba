// Global State
let issuesData = [];
let albasData = [];
let currentTab = 'alba';
let currentFontSizeIndex = 0; // 0: normal, 1: lg, 2: xl
const fontClasses = ['', 'font-size-lg', 'font-size-xl'];
let isTTSSpeaking = false;
let currentOpenContent = null;

// 6-Minute Single Hand Clock Timer State
const TOTAL_CYCLE_SECONDS = 360; // 6 minutes = 360 seconds
let remainingSeconds = TOTAL_CYCLE_SECONDS;
let clockTimerInterval = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  start6MinClockTimer();
});

// 6-Minute Clock Rotation & Auto Refresh Logic
function start6MinClockTimer() {
  if (clockTimerInterval) clearInterval(clockTimerInterval);

  clockTimerInterval = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds < 0) {
      remainingSeconds = TOTAL_CYCLE_SECONDS;
      // Auto refresh content!
      loadData();
      showToast("⚡ [6분 갱신 완료] 새로운 실시간 화제와 알바 정보가 업데이트되었습니다!");
    }

    updateClockUI();
  }, 1000);
}

function updateClockUI() {
  const clockHand = document.getElementById('clockHand');
  const clockTimerText = document.getElementById('clockTimerText');

  if (!clockHand || !clockTimerText) return;

  // Calculate rotation angle (0 deg to 360 deg in 6 minutes)
  const elapsedSeconds = TOTAL_CYCLE_SECONDS - remainingSeconds;
  const rotateDeg = (elapsedSeconds / TOTAL_CYCLE_SECONDS) * 360;

  // Rotate single clock hand
  clockHand.style.transform = `rotate(${rotateDeg}deg)`;

  // Format mm:ss
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  clockTimerText.innerText = `${formattedTime} 후 갱신`;
}

async function loadData() {
  try {
    const [resIssues, resAlbas] = await Promise.all([
      fetch('/api/issues'),
      fetch('/api/albas')
    ]);
    issuesData = await resIssues.json();
    albasData = await resAlbas.json();

    renderAlbas();
    renderIssues();
    render5Min();
  } catch (err) {
    console.error("데이터 로딩 실패:", err);
  }
}

// 1. Render Albas & Map Pins (Google Map Simulation)
function renderAlbas() {
  const pinsContainer = document.getElementById('mapPinsContainer');
  const jobListContainer = document.getElementById('jobListContainer');

  pinsContainer.innerHTML = '';
  jobListContainer.innerHTML = '';

  albasData.forEach((job, index) => {
    // Simulated Pin Coordinates on Map Canvas
    const pinTop = 25 + (index * 20) + (index % 2 === 0 ? 5 : -5);
    const pinLeft = 20 + (index * 22) + (index % 2 === 1 ? 10 : -5);

    // Create Map Pin Button
    const pinBtn = document.createElement('button');
    pinBtn.className = `absolute transform -translate-x-1/2 -translate-y-1/2 ${job.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform flex items-center gap-1`;
    pinBtn.style.top = `${pinTop}%`;
    pinBtn.style.left = `${pinLeft}%`;
    pinBtn.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${job.platform}`;
    pinBtn.onclick = () => openJobInAppDetail(job.id);
    pinsContainer.appendChild(pinBtn);

    // Create Job Card
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer space-y-2";
    card.onclick = () => openJobInAppDetail(job.id);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-white px-2 py-0.5 rounded-md ${job.badgeColor}">${job.platform}</span>
        <span class="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full"><i class="fa-solid fa-person-walking"></i> 내위치 ${job.distance}</span>
      </div>
      <h3 class="font-bold text-gray-900 text-base leading-snug hover:text-blue-700">${job.title}</h3>
      <p class="text-xs text-gray-500">${job.company} · ${job.address}</p>
      <div class="flex justify-between items-center pt-2 border-t text-sm font-bold">
        <span class="text-red-600 font-extrabold">${job.pay}</span>
        <span class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">${job.workTime}</span>
      </div>
    `;

    jobListContainer.appendChild(card);
  });
}

// 2. Render Issues List
function renderIssues() {
  const container = document.getElementById('issueListContainer');
  container.innerHTML = '';

  issuesData.forEach(issue => {
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-400 transition-all cursor-pointer space-y-3";
    card.onclick = () => openIssueInAppDetail(issue.id);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="bg-blue-100 text-blue-800 font-bold text-xs px-2.5 py-1 rounded-full">#${issue.category}</span>
        <div class="flex items-center gap-1 text-red-600 font-black text-lg">
          <i class="fa-solid fa-fire animate-pulse"></i> ${issue.temperature}°C
        </div>
      </div>
      <h3 class="font-extrabold text-xl text-gray-900 leading-snug hover:text-blue-800">${issue.title}</h3>
      <p class="text-gray-600 text-sm line-clamp-2">${issue.summary}</p>
      
      <!-- Temperature Bar -->
      <div class="bg-gray-100 p-3 rounded-xl space-y-1.5 text-xs">
        <div class="flex justify-between font-bold text-gray-600">
          <span>언론 ${issue.mediaNews}%</span>
          <span>유튜브 ${issue.mediaYoutube}%</span>
          <span>커뮤니티 ${issue.mediaCommunity}%</span>
        </div>
        <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex">
          <div class="bg-blue-600 h-full" style="width: ${issue.mediaNews}%"></div>
          <div class="bg-red-500 h-full" style="width: ${issue.mediaYoutube}%"></div>
          <div class="bg-green-500 h-full" style="width: ${issue.mediaCommunity}%"></div>
        </div>
      </div>

      <div class="flex justify-between items-center text-xs text-blue-700 font-bold pt-1">
        <span>⚡ 클릭하여 인앱으로 3사 반응 통합 열람</span>
        <span>인앱 뷰어 ▶</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// 3. Render 5Min List
function render5Min() {
  const container = document.getElementById('fiveMinListContainer');
  container.innerHTML = '';

  issuesData.forEach((issue, idx) => {
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4 cursor-pointer hover:bg-blue-50/50 transition-colors";
    card.onclick = () => openIssueInAppDetail(issue.id);

    card.innerHTML = `
      <span class="bg-blue-900 text-yellow-300 font-black text-xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0">0${idx+1}</span>
      <div class="space-y-1 flex-1">
        <span class="text-xs font-bold text-blue-600">[오늘 핵심 이슈]</span>
        <h3 class="font-bold text-lg text-gray-900">${issue.title}</h3>
        <p class="text-sm text-gray-500 line-clamp-1">${issue.summary}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// =========================================================================
// IN-APP VIEWER MODAL LOGIC (외부 탈출 없이 사이트 내 즉시 표출)
// =========================================================================

// Open Job Detail In-App
function openJobInAppDetail(jobId) {
  const job = albasData.find(j => j.id === jobId);
  if (!job) return;

  currentOpenContent = { type: 'job', data: job };

  document.getElementById('modalCategoryBadge').innerText = `${job.platform} 채용 인앱 상세보기`;
  document.getElementById('modalTitle').innerText = job.title;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div class="space-y-4">
      <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 flex justify-between items-center">
        <div>
          <span class="text-xs font-bold ${job.badgeColor} text-white px-2 py-0.5 rounded">${job.platform} 인증 채용</span>
          <h4 class="font-extrabold text-xl text-blue-900 mt-1">${job.company}</h4>
        </div>
        <div class="text-right">
          <span class="text-xs text-gray-500">지하철/도보 거리</span>
          <p class="font-bold text-blue-700">${job.distance}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border">
        <div><span class="font-bold text-gray-500">💰 급여 조건:</span> <span class="font-extrabold text-red-600 text-lg">${job.pay}</span></div>
        <div><span class="font-bold text-gray-500">⏱️ 근무 시간:</span> <span class="font-bold">${job.workTime}</span></div>
        <div><span class="font-bold text-gray-500">📍 근무지 주소:</span> <span>${job.address}</span></div>
        <div><span class="font-bold text-gray-500">📞 문의 연락처:</span> <span class="font-bold text-blue-600">${job.contact}</span></div>
      </div>

      <div class="space-y-2">
        <h5 class="font-bold text-base text-gray-800"><i class="fa-solid fa-file-lines text-blue-600"></i> 상세 업무 내용 요약</h5>
        <p class="bg-white p-4 rounded-xl border text-gray-700 leading-relaxed">${job.detail}</p>
      </div>

      <div class="bg-green-50 p-4 rounded-xl border border-green-200 text-sm text-green-900 flex items-center justify-between">
        <span>✅ 5060 시니어/중장년 우대 채용 건입니다. 외부 사이트 이동 없이 바로 문의 가능합니다.</span>
        <button onclick="alert('담당자 연결 연락처: ${job.contact}')" class="bg-green-600 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0">전화 연결</button>
      </div>
    </div>
  `;

  showInAppModal();
}

// Open Issue Detail In-App (News + Youtube + Community)
function openIssueInAppDetail(issueId) {
  const issue = issuesData.find(i => i.id === issueId);
  if (!issue) return;

  currentOpenContent = { type: 'issue', data: issue };

  document.getElementById('modalCategoryBadge').innerText = `#${issue.category} 한 이슈 통합 모아보기`;
  document.getElementById('modalTitle').innerText = issue.title;

  const modalBody = document.getElementById('modalBody');

  // Build News List HTML
  const newsHtml = issue.newsList.map(n => `
    <div class="bg-gray-50 p-4 rounded-xl border space-y-1">
      <div class="flex justify-between text-xs text-gray-500 font-bold">
        <span class="text-blue-700">${n.source}</span>
        <span>${n.time}</span>
      </div>
      <h5 class="font-bold text-gray-900 text-base">${n.title}</h5>
      <p class="text-xs text-gray-600 line-clamp-2">${n.content}</p>
    </div>
  `).join('');

  // Build Youtube List HTML
  const youtubeHtml = issue.youtubeList.map(y => `
    <div class="bg-slate-900 text-white p-4 rounded-xl space-y-2">
      <div class="aspect-video bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-700">
        <i class="fa-brands fa-youtube text-red-500 text-5xl"></i>
        <span class="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-0.5 rounded font-bold">인앱 동영상 재생</span>
      </div>
      <h5 class="font-bold text-sm text-yellow-300">${y.title}</h5>
      <p class="text-xs text-slate-400">${y.channel} · 조회수 ${y.views}</p>
    </div>
  `).join('');

  // Build Community List HTML
  const communityHtml = issue.communityList.map(c => `
    <div class="bg-white p-4 rounded-xl border space-y-1">
      <div class="flex justify-between text-xs font-bold text-gray-500">
        <span class="bg-green-100 text-green-800 px-2 py-0.5 rounded">${c.site}</span>
        <span>👍 공감 ${c.likes} · 댓글 ${c.comments}</span>
      </div>
      <h5 class="font-bold text-gray-800 text-sm">${c.title}</h5>
      <p class="text-xs text-gray-600">${c.content}</p>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div class="space-y-6">
      <!-- AI 3줄 요약 -->
      <div class="bg-blue-50 p-4 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-900 text-sm mb-1 flex items-center gap-1"><i class="fa-solid fa-sparkles text-yellow-500"></i> AI 핵심 3줄 브리핑</h4>
        <p class="text-gray-800 text-sm font-medium leading-relaxed">${issue.summary}</p>
      </div>

      <!-- 언론사 기사 모음 -->
      <div class="space-y-3">
        <h4 class="font-bold text-lg text-gray-900 flex items-center gap-2"><i class="fa-regular fa-newspaper text-blue-600"></i> 주요 언론사 대표 보도</h4>
        ${newsHtml}
      </div>

      <!-- 관련 유튜브 -->
      <div class="space-y-3">
        <h4 class="font-bold text-lg text-gray-900 flex items-center gap-2"><i class="fa-brands fa-youtube text-red-600"></i> 관련 인기 영상</h4>
        ${youtubeHtml}
      </div>

      <!-- 커뮤니티 여론 -->
      <div class="space-y-3">
        <h4 class="font-bold text-lg text-gray-900 flex items-center gap-2"><i class="fa-solid fa-comments text-green-600"></i> 주요 커뮤니티 시선</h4>
        ${communityHtml}
      </div>
    </div>
  `;

  showInAppModal();
}

function showInAppModal() {
  const modal = document.getElementById('inAppModal');
  modal.classList.remove('hidden');
}

function closeInAppModal() {
  const modal = document.getElementById('inAppModal');
  modal.classList.add('hidden');
  currentOpenContent = null;
}


// =========================================================================
// STICKY BOTTOM BAR LOGIC (이전, 복사/공유, 다음)
// =========================================================================

// 1. 이전 버튼
function navGoPrev() {
  // 만약 모달이 떠있으면 모달 닫기
  const modal = document.getElementById('inAppModal');
  if (!modal.classList.contains('hidden')) {
    closeInAppModal();
    return;
  }

  const tabs = ['alba', 'issue', '5min', 'community'];
  let idx = tabs.indexOf(currentTab);
  if (idx > 0) {
    switchTab(tabs[idx - 1]);
  } else {
    showToast("첫번째 탭입니다.");
  }
}

// 2. 다음 버튼
function navGoNext() {
  // 만약 모달이 떠있으면 모달 닫기
  const modal = document.getElementById('inAppModal');
  if (!modal.classList.contains('hidden')) {
    closeInAppModal();
    return;
  }

  const tabs = ['alba', 'issue', '5min', 'community'];
  let idx = tabs.indexOf(currentTab);
  if (idx < tabs.length - 1) {
    switchTab(tabs[idx + 1]);
  } else {
    showToast("마지막 탭입니다.");
  }
}

// 3. 복사 (공유) 버튼: 현재 보고 있는 화면 내용 및 링크 클립보드 복사
function copyCurrentPageInfo() {
  let shareText = "";
  const currentUrl = window.location.href;

  if (currentOpenContent) {
    if (currentOpenContent.type === 'job') {
      const j = currentOpenContent.data;
      shareText = `[오늘의 기준 - 우리동네 알바 추천]\n📌 ${j.title}\n🏢 ${j.company} (${j.address})\n💰 ${j.pay} | ${j.workTime}\n\n👉 바로보기: ${currentUrl}`;
    } else if (currentOpenContent.type === 'issue') {
      const i = currentOpenContent.data;
      shareText = `[오늘의 기준 - 오늘의 HOT 이슈]\n🔥 ${i.title}\n📝 ${i.summary}\n\n👉 바로보기: ${currentUrl}`;
    }
  } else {
    const tabNames = {
      'alba': '📍 우리동네 맞춤 알바 지도',
      'issue': '🔥 오늘의 이슈 온도계 2.0',
      '5min': '⏱️ 오늘 5분 핵심 요약',
      'community': '💬 5060 세대 여론 및 반응'
    };
    shareText = `[오늘의 기준] ${tabNames[currentTab]}\n세상의 이슈와 우리동네 소식을 한눈에 확인해보세요!\n\n👉 웹사이트 연결: ${currentUrl}`;
  }

  navigator.clipboard.writeText(shareText).then(() => {
    showToast("📋 클립보드에 복사되었습니다! 카카오톡이나 문자에 붙여넣어 공유하세요.");
  }).catch(err => {
    console.error("복사 실패:", err);
    showToast("복사 기능 지원되지 않음");
  });
}

// Toast Alert Helper
function showToast(msg) {
  const toast = document.getElementById('copyToast');
  const msgEl = document.getElementById('toastMsg');
  msgEl.innerText = msg;

  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}


// =========================================================================
// UI HELPERS (TAB SWITCHING & ACCESSIBILITY)
// =========================================================================

function switchTab(tabId) {
  currentTab = tabId;
  const sections = ['alba', 'issue', '5min', 'community'];

  sections.forEach(sec => {
    const secEl = document.getElementById(`${sec}Section`);
    const tabEl = document.getElementById(`tab-${sec}`);

    if (sec === tabId) {
      secEl.classList.remove('hidden');
      tabEl.className = "py-3 px-4 border-b-4 border-yellow-400 text-yellow-300 flex items-center gap-2 font-bold";
    } else {
      secEl.classList.add('hidden');
      tabEl.className = "py-3 px-4 border-b-4 border-transparent text-gray-300 hover:text-white flex items-center gap-2 font-bold";
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeFontSize(action) {
  const body = document.body;
  body.classList.remove('font-size-lg', 'font-size-xl');

  if (action === 'inc') {
    currentFontSizeIndex = Math.min(2, currentFontSizeIndex + 1);
  } else {
    currentFontSizeIndex = Math.max(0, currentFontSizeIndex - 1);
  }

  if (fontClasses[currentFontSizeIndex]) {
    body.classList.add(fontClasses[currentFontSizeIndex]);
  }
}

function toggleTTS() {
  if ('speechSynthesis' in window) {
    if (isTTSSpeaking) {
      window.speechSynthesis.cancel();
      isTTSSpeaking = false;
      document.getElementById('ttsLabel').innerText = "음성 읽기";
    } else {
      const textToRead = "오늘의 기준 플랫폼에 오신 것을 환영합니다. 원하는 탭을 눌러 소식과 알바 정보를 확인하세요.";
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'ko-KR';
      utterance.onend = () => {
        isTTSSpeaking = false;
        document.getElementById('ttsLabel').innerText = "음성 읽기";
      };
      window.speechSynthesis.speak(utterance);
      isTTSSpeaking = true;
      document.getElementById('ttsLabel').innerText = "정지";
    }
  } else {
    alert("현재 브리핑 음성을 지원하지 않는 브라우저입니다.");
  }
}

function searchLocation() {
  const val = document.getElementById('addressSearchInput').value;
  showToast(`'${val}' 주변 검색 완료!`);
}

function filterDistance(dist) {
  showToast(`반경 ${dist} 이내 알바 검색 완료!`);
}

function voteOption(opt) {
  showToast("투표에 참여해주셔서 감사합니다!");
}
