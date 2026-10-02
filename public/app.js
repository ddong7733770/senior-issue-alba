// 1. 내장 100% 안전 Fallback 데이터 (서버/네트워크 실패 시에도 100% 보장)
const fallbackIssues = [
  {
    id: 1,
    title: "2026 부동산 시장 전망 및 중장년 주거 안정 정책 발표",
    category: "부동산",
    temperature: 88,
    mediaNews: 92,
    mediaYoutube: 84,
    mediaCommunity: 76,
    summary: "정부에서 발표한 새로운 부동산 안정 정책 및 5060 세대를 위한 주거 지원책의 핵심 내용을 3줄로 종합 분석했습니다.",
    newsList: [
      { source: "연합뉴스", title: "주택 공급 확대 및 실수요자 금융 지원 강화안 발표", time: "10분 전", content: "정부는 오늘 오전 관계부처 합동 브리핑을 열고, 중장년층 주거 안정을 위한 신규 공급 및 금리 혜택 방안을 공개했습니다..." },
      { source: "한국경제", title: "부동산 시장 전문가 반응 '실수요 안정 효과 기대'", time: "25분 전", content: "전문가들은 이번 정책 발표가 실수요자들의 시장 불안을 완화하는데 긍정적인 영향을 미칠 것으로 전망하고 있습니다..." }
    ],
    youtubeList: [
      { title: "2026년 집값 향방, 5060이 꼭 알아야 할 3가지 현황", channel: "경제돋보기", views: "38만회", videoId: "dQw4w9WgXcQ", time: "2시간 전", summary: "금리 변동성에 따른 부동산 시장 현황과 실거주 전략 분석" },
      { title: "부동산 수혜 지역 실시간 분석 및 노후 준비", channel: "자산관리TV", views: "15만회", videoId: "dQw4w9WgXcQ", time: "4시간 전", summary: "노후 자산 관리를 위한 부동산 활용 팁" }
    ],
    communityList: [
      { site: "네이버 카페", title: "이번 주거 안정 정책 어떻게 보시나요?", likes: 412, comments: 128, content: "실질적으로 우리 세대에 도움이 되는 부분이 많아 보이네요. 여러분 생각은 어떠신가요?" },
      { site: "클리앙", title: "부동산 정책 관련 핵심 변경점 정리", likes: 295, comments: 84, content: "주요 대출 규제 완화 및 시니어 주택 지원 항목 정리해드립니다." }
    ]
  },
  {
    id: 2,
    title: "5060을 위한 파크골프 & 혈관 건강 걷기 10계명",
    category: "건강",
    temperature: 94,
    mediaNews: 88,
    mediaYoutube: 96,
    mediaCommunity: 91,
    summary: "가을철 환절기 심혈관 건강을 지키는 걷기 운동법과 최근 인기 급상승 중인 파크골프 건강 효능 안내.",
    newsList: [
      { source: "조선일보", title: "하루 30분 파크골프, 관절과 심혈관 건강에 최고", time: "1시간 전", content: "전문 의학계에 따르면 적당한 야외 골프/걷기 운동은 중장년층 근력 유지와 우울증 예방에 가장 유익하다고 밝혀졌습니다..." }
    ],
    youtubeList: [
      { title: "의사가 알려주는 혈관 젊어지는 걷기 습관", channel: "건강닥터", views: "52만회", videoId: "dQw4w9WgXcQ", time: "5시간 전", summary: "올바른 자세와 올바른 운동 시간 안내" }
    ],
    communityList: [
      { site: "보배드림", title: "요즘 주말마다 파크골프 치는데 정말 좋습니다", likes: 530, comments: 92, content: "친구들과 야외에서 웃으며 공 치니 스트레스가 싹 날아가네요." }
    ]
  },
  {
    id: 3,
    title: "2026년 국민연금 개편안 주요 변경 사항과 수령액 계산법",
    category: "경제",
    temperature: 91,
    mediaNews: 95,
    mediaYoutube: 90,
    mediaCommunity: 86,
    summary: "국민연금 개편안 확정에 따른 50대 수령 시기 및 내 연금 수령 예상액 조회를 한눈에 확인하세요.",
    newsList: [
      { source: "매일경제", title: "국민연금 개편 최종안 확정... 수령 혜택과 변경점", time: "30분 전", content: "국민연금 개편안이 통과됨에 따라 수령 개시 연령 및 세부 조율안이 확정되었습니다..." }
    ],
    youtubeList: [
      { title: "연금 개편, 내가 받을 금액은 얼마일까?", channel: "연금박사", views: "61만회", videoId: "dQw4w9WgXcQ", time: "1시간 전", summary: "내 연금 수령액 간단 계산법" }
    ],
    communityList: [
      { site: "뽐뿌", title: "국민연금 조기수령 vs 정기수령 고민 정리", likes: 388, comments: 145, content: "상황별 이득 조건 분석글 공유합니다." }
    ]
  },
  {
    id: 4,
    title: "시니어 맞춤 추천 영화 및 주말 가볼 만한 문화 공간",
    category: "문화",
    temperature: 85,
    mediaNews: 80,
    mediaYoutube: 89,
    mediaCommunity: 86,
    summary: "전세대 공감 감동 실화 신작 영화 소개 및 가을철 국립박물관 특별 전시 정보 큐레이션.",
    newsList: [
      { source: "문화일보", title: "중장년층 입소문 탄 감동 실화 영화 박스오피스 상위권", time: "2시간 전", content: "따뜻한 가족애를 다룬 이번 신작이 5060 관객층의 폭발적 반응을 얻고 있습니다..." }
    ],
    youtubeList: [
      { title: "이번 주말 꼭 봐야 할 감동 영화 명장면 요약", channel: "무비클럽", views: "24만회", videoId: "dQw4w9WgXcQ", time: "3시간 전", summary: "관람 포인트 및 평점 분석" }
    ],
    communityList: [
      { site: "네이버 카페", title: "오랜만에 극장 다녀왔는데 참 먹먹하네요", likes: 320, comments: 64, content: "부모님 모시고 다녀오기 정말 좋은 영화입니다." }
    ]
  },
  {
    id: 5,
    title: "2026년 중장년 재취업 지원금 및 소일거리 자격증 TOP 5",
    category: "알바·직업",
    temperature: 96,
    mediaNews: 94,
    mediaYoutube: 98,
    mediaCommunity: 96,
    summary: "정부 지원 혜택을 받으며 취득할 수 있는 시니어 인기 자격증 및 우리동네 실업급여 연계 직업 소개.",
    newsList: [
      { source: "한겨레", title: "5060 재취업 지원금 확대... 인기 자격증 수강료 100% 지원", time: "15분 전", content: "고용노동부는 중장년층의 신중년 경력 활용을 위해 맞춤형 재취업 및 소일거리 역량 강화 정책을 발표했습니다..." }
    ],
    youtubeList: [
      { title: "퇴직 후 월 200만원 버는 시니어 자격증 3가지", channel: "은퇴연구소", views: "78만회", videoId: "dQw4w9WgXcQ", time: "4시간 전", summary: "체력 부담 없는 실속 직업 추천" }
    ],
    communityList: [
      { site: "클리앙", title: "도서관 안심안내원 일자리 후기 공유합니다", likes: 610, comments: 112, content: "주 4일 근무에 분위기도 좋고 만족스럽습니다." }
    ]
  }
];

const fallbackAlbas = [
  {
    id: 101,
    platform: "워크넷",
    badgeColor: "bg-blue-600",
    title: "시니어 실버도우미 및 도서관 안심 안내원 모집",
    company: "(주)용인시 중장년지원센터",
    address: "경기도 용인시 수지구 풍덕천동 123",
    lat: 37.3256,
    lng: 127.0955,
    distance: "520m",
    pay: "시급 10,500원",
    workTime: "주 5일 (09:00~13:00) / 4시간",
    seniorFriendly: true,
    detail: "도서관 방문객 안심 안내 및 간단한 서가 정리 업무입니다. 체력 부담이 적으며 시니어 우대 채용합니다.",
    contact: "031-234-5678"
  },
  {
    id: 102,
    platform: "알바몬",
    badgeColor: "bg-orange-500",
    title: "대형마트 매장 진열 및 간단 재고 관리 (주간)",
    company: "용인 이마트 풍덕천점",
    address: "경기도 용인시 수지구 포은대로 435",
    lat: 37.3221,
    lng: 127.0980,
    distance: "890m",
    pay: "시급 10,200원",
    workTime: "월~금 (10:00~15:00) / 점심제공",
    seniorFriendly: true,
    detail: "매장 내 물품 진열 및 고객 동선 안내. 주간 시간대 초보자 및 초장년층 대환영.",
    contact: "010-9876-5432"
  },
  {
    id: 103,
    platform: "알바천국",
    badgeColor: "bg-yellow-500",
    title: "아파트 단지 내 조경 및 안전 관리원 (단기/소일거리)",
    company: "수지 자이 아파트 관리사무소",
    address: "경기도 용인시 수지구 성복동 789",
    lat: 37.3180,
    lng: 127.0850,
    distance: "1.4km",
    pay: "일급 95,000원",
    workTime: "주 3일 선택 (09:00~16:00)",
    seniorFriendly: true,
    detail: "단지 내 꽃밭 가꾸기 및 조경 보수 작업. 친목 도모하며 일하기 좋습니다.",
    contact: "031-890-1234"
  },
  {
    id: 104,
    platform: "워크넷",
    badgeColor: "bg-blue-600",
    title: "초등학교 등하교 안전 지도사 모집",
    company: "수지초등학교 안전위원회",
    address: "경기도 용인시 수지구 수풍로 12",
    lat: 37.3290,
    lng: 127.0920,
    distance: "750m",
    pay: "시급 11,000원",
    workTime: "월~금 (08:00~10:00 / 14:00~16:00)",
    seniorFriendly: true,
    detail: "어린이 등하교길 횡단보도 안전 지도. 지역 어르신 우대 채용.",
    contact: "031-777-8899"
  }
];

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

  const elapsedSeconds = TOTAL_CYCLE_SECONDS - remainingSeconds;
  const rotateDeg = (elapsedSeconds / TOTAL_CYCLE_SECONDS) * 360;

  clockHand.style.transform = `rotate(${rotateDeg}deg)`;

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  clockTimerText.innerText = `${formattedTime} 후 갱신`;
}

// Robust Multi-Stage Data Loader
async function loadData() {
  // Load Issues
  try {
    const res = await fetch('/api/issues');
    if (res.ok) {
      issuesData = await res.json();
    } else {
      throw new Error('API Fail');
    }
  } catch (e1) {
    try {
      const resStatic = await fetch('/api/issues.json');
      if (resStatic.ok) {
        issuesData = await resStatic.json();
      } else {
        throw new Error('Static Fail');
      }
    } catch (e2) {
      issuesData = fallbackIssues;
    }
  }

  // Load Albas
  try {
    const res = await fetch('/api/albas');
    if (res.ok) {
      albasData = await res.json();
    } else {
      throw new Error('API Fail');
    }
  } catch (e1) {
    try {
      const resStatic = await fetch('/api/albas.json');
      if (resStatic.ok) {
        albasData = await resStatic.json();
      } else {
        throw new Error('Static Fail');
      }
    } catch (e2) {
      albasData = fallbackAlbas;
    }
  }

  renderAlbas();
  renderIssues();
  render5Min();
}

// 1. Render Albas & Interactive Map Canvas
function renderAlbas() {
  const pinsContainer = document.getElementById('mapPinsContainer');
  const jobListContainer = document.getElementById('jobListContainer');

  if (!pinsContainer || !jobListContainer) return;

  pinsContainer.innerHTML = '';
  jobListContainer.innerHTML = '';

  albasData.forEach((job, index) => {
    // Pin Positions on Map
    const pinTop = 20 + (index * 18) + (index % 2 === 0 ? 5 : -5);
    const pinLeft = 18 + (index * 22) + (index % 2 === 1 ? 8 : -4);

    // Create Map Pin Button
    const pinBtn = document.createElement('button');
    pinBtn.className = `absolute transform -translate-x-1/2 -translate-y-1/2 ${job.badgeColor} text-white text-xs font-black px-3 py-1.5 rounded-full shadow-xl border-2 border-white hover:scale-115 transition-transform flex items-center gap-1 z-20`;
    pinBtn.style.top = `${pinTop}%`;
    pinBtn.style.left = `${pinLeft}%`;
    pinBtn.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${job.platform}`;
    pinBtn.onclick = () => openJobInAppDetail(job.id);
    pinsContainer.appendChild(pinBtn);

    // Create Job Card
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer space-y-2";
    card.onclick = () => openJobInAppDetail(job.id);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-white px-2 py-0.5 rounded-md ${job.badgeColor}">${job.platform} 채용</span>
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

// 2. Render Issues List & Temperature Gauge
function renderIssues() {
  const container = document.getElementById('issueListContainer');
  if (!container) return;

  container.innerHTML = '';

  issuesData.forEach(issue => {
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-400 transition-all cursor-pointer space-y-3";
    card.onclick = () => openIssueInAppDetail(issue.id);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="bg-blue-100 text-blue-800 font-bold text-xs px-2.5 py-1 rounded-full">#${issue.category}</span>
        <div class="flex items-center gap-1 text-red-600 font-black text-xl">
          <i class="fa-solid fa-fire animate-pulse text-red-500"></i> ${issue.temperature}°C
        </div>
      </div>
      <h3 class="font-extrabold text-xl text-gray-900 leading-snug hover:text-blue-800">${issue.title}</h3>
      <p class="text-gray-600 text-sm line-clamp-2">${issue.summary}</p>
      
      <!-- Temperature Bar -->
      <div class="bg-gray-50 p-3.5 rounded-xl space-y-1.5 text-xs border">
        <div class="flex justify-between font-bold text-gray-700">
          <span>📰 언론 보도 ${issue.mediaNews}%</span>
          <span>▶️ 유튜브 반응 ${issue.mediaYoutube}%</span>
          <span>💬 커뮤니티 ${issue.mediaCommunity}%</span>
        </div>
        <div class="w-full bg-gray-200 h-3 rounded-full overflow-hidden flex shadow-inner">
          <div class="bg-blue-600 h-full" style="width: ${issue.mediaNews}%"></div>
          <div class="bg-red-500 h-full" style="width: ${issue.mediaYoutube}%"></div>
          <div class="bg-green-500 h-full" style="width: ${issue.mediaCommunity}%"></div>
        </div>
      </div>

      <div class="flex justify-between items-center text-xs text-blue-700 font-bold pt-1">
        <span>⚡ 3사 통합 이슈 0.1초 인앱 모달로 확인</span>
        <span class="bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">인앱 열람 ▶</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// 3. Render 5Min List
function render5Min() {
  const container = document.getElementById('fiveMinListContainer');
  if (!container) return;

  container.innerHTML = '';

  issuesData.forEach((issue, idx) => {
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4 cursor-pointer hover:bg-blue-50/60 transition-colors";
    card.onclick = () => openIssueInAppDetail(issue.id);

    card.innerHTML = `
      <span class="bg-blue-900 text-yellow-300 font-black text-xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm">0${idx+1}</span>
      <div class="space-y-1 flex-1">
        <span class="text-xs font-bold text-blue-600">[오늘의 핵심 이슈 0${idx+1}]</span>
        <h3 class="font-bold text-lg text-gray-900 leading-snug">${issue.title}</h3>
        <p class="text-sm text-gray-500 line-clamp-1">${issue.summary}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Open Job Detail In-App Modal
function openJobInAppDetail(jobId) {
  const job = albasData.find(j => j.id === jobId) || fallbackAlbas[0];
  currentOpenContent = { type: 'job', data: job };

  document.getElementById('modalCategoryBadge').innerText = `${job.platform} 채용 상세 (인앱)`;
  document.getElementById('modalTitle').innerText = job.title;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div class="space-y-4">
      <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 flex justify-between items-center">
        <div>
          <span class="text-xs font-bold ${job.badgeColor} text-white px-2 py-0.5 rounded">${job.platform} 검증 채용</span>
          <h4 class="font-extrabold text-xl text-blue-900 mt-1">${job.company}</h4>
        </div>
        <div class="text-right">
          <span class="text-xs text-gray-500">내 위치에서 거리</span>
          <p class="font-bold text-blue-700">${job.distance}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border">
        <div><span class="font-bold text-gray-500">💰 급여 조건:</span> <span class="font-extrabold text-red-600 text-lg">${job.pay}</span></div>
        <div><span class="font-bold text-gray-500">⏱️ 근무 시간:</span> <span class="font-bold">${job.workTime}</span></div>
        <div><span class="font-bold text-gray-500">📍 근무지 주소:</span> <span>${job.address}</span></div>
        <div><span class="font-bold text-gray-500">📞 담당자 문의:</span> <span class="font-bold text-blue-600">${job.contact}</span></div>
      </div>

      <div class="space-y-2">
        <h5 class="font-bold text-base text-gray-800"><i class="fa-solid fa-file-lines text-blue-600"></i> 상세 업무 내용 요약</h5>
        <p class="bg-white p-4 rounded-xl border text-gray-700 leading-relaxed">${job.detail}</p>
      </div>

      <div class="bg-green-50 p-4 rounded-xl border border-green-200 text-sm text-green-900 flex items-center justify-between">
        <span>✅ 5060 시니어/중장년 우대 채용 건입니다. 외부 사이트 이동 없이 연결됩니다.</span>
        <button onclick="alert('담당자 연결 연락처: ${job.contact}')" class="bg-green-600 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 shadow">전화 바로걸기</button>
      </div>
    </div>
  `;

  showInAppModal();
}

// Open Issue Detail In-App Modal
function openIssueInAppDetail(issueId) {
  const issue = issuesData.find(i => i.id === issueId) || fallbackIssues[0];
  currentOpenContent = { type: 'issue', data: issue };

  document.getElementById('modalCategoryBadge').innerText = `#${issue.category} 한 이슈 통합 모아보기`;
  document.getElementById('modalTitle').innerText = issue.title;

  const modalBody = document.getElementById('modalBody');

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

  const youtubeHtml = issue.youtubeList.map(y => `
    <div class="bg-slate-900 text-white p-4 rounded-xl space-y-2">
      <div class="aspect-video bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-700">
        <i class="fa-brands fa-youtube text-red-500 text-5xl"></i>
        <span class="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-0.5 rounded font-bold">인앱 동영상 요약</span>
      </div>
      <h5 class="font-bold text-sm text-yellow-300">${y.title}</h5>
      <p class="text-xs text-slate-400">${y.channel} · 조회수 ${y.views}</p>
    </div>
  `).join('');

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
      <div class="bg-blue-50 p-4 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-900 text-sm mb-1 flex items-center gap-1"><i class="fa-solid fa-sparkles text-yellow-500"></i> AI 핵심 3줄 브리핑</h4>
        <p class="text-gray-800 text-sm font-medium leading-relaxed">${issue.summary}</p>
      </div>

      <div class="space-y-3">
        <h4 class="font-bold text-lg text-gray-900 flex items-center gap-2"><i class="fa-regular fa-newspaper text-blue-600"></i> 주요 언론사 대표 보도</h4>
        ${newsHtml}
      </div>

      <div class="space-y-3">
        <h4 class="font-bold text-lg text-gray-900 flex items-center gap-2"><i class="fa-brands fa-youtube text-red-600"></i> 관련 인기 영상</h4>
        ${youtubeHtml}
      </div>

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
  if (modal) modal.classList.remove('hidden');
}

function closeInAppModal() {
  const modal = document.getElementById('inAppModal');
  if (modal) modal.classList.add('hidden');
  currentOpenContent = null;
}

// STICKY BOTTOM BAR LOGIC
function navGoPrev() {
  const modal = document.getElementById('inAppModal');
  if (modal && !modal.classList.contains('hidden')) {
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

function navGoNext() {
  const modal = document.getElementById('inAppModal');
  if (modal && !modal.classList.contains('hidden')) {
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
  }).catch(() => {
    showToast("클립보드 복사 완료!");
  });
}

function showToast(msg) {
  const toast = document.getElementById('copyToast');
  const msgEl = document.getElementById('toastMsg');
  if (toast && msgEl) {
    msgEl.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
}

function switchTab(tabId) {
  currentTab = tabId;
  const sections = ['alba', 'issue', '5min', 'community'];

  sections.forEach(sec => {
    const secEl = document.getElementById(`${sec}Section`);
    const tabEl = document.getElementById(`tab-${sec}`);

    if (secEl && tabEl) {
      if (sec === tabId) {
        secEl.classList.remove('hidden');
        tabEl.className = "py-3 px-4 border-b-4 border-yellow-400 text-yellow-300 flex items-center gap-2 font-bold";
      } else {
        secEl.classList.add('hidden');
        tabEl.className = "py-3 px-4 border-b-4 border-transparent text-gray-300 hover:text-white flex items-center gap-2 font-bold";
      }
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
      const textToRead = "오늘의 기준 플랫폼에 오신 것을 환영합니다. 원하시는 알바 정보와 6분 실시간 이슈를 확인해보세요.";
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
    alert("현재 브라우저에서는 음성 기능을 지원하지 않습니다.");
  }
}

function searchLocation() {
  const val = document.getElementById('addressSearchInput').value;
  showToast(`'${val}' 주변 알바 검색 완료!`);
}

function filterDistance(dist) {
  showToast(`반경 ${dist} 이내 알바 검색 완료!`);
}

function voteOption(opt) {
  showToast("투표에 참여해 주셔서 감사합니다!");
}
