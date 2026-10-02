import http.server
import socketserver
import json
import os

PORT = 3000
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), 'public')

# 1. 인앱 뷰어용 사전 정제 이슈 Mock 데이터
mock_issues = [
  {
    "id": 1,
    "title": "2026 부동산 시장 전망 및 중장년 주거 안정 정책 발표",
    "category": "부동산",
    "temperature": 88,
    "mediaNews": 92,
    "mediaYoutube": 84,
    "mediaCommunity": 76,
    "summary": "정부에서 발표한 새로운 부동산 안정 정책 및 5060 세대를 위한 주거 지원책의 핵심 내용을 3줄로 종합 분석했습니다.",
    "newsList": [
      { "source": "연합뉴스", "title": "주택 공급 확대 및 실수요자 금융 지원 강화안 발표", "time": "10분 전", "content": "정부는 오늘 오전 관계부처 합동 브리핑을 열고, 중장년층 주거 안정을 위한 신규 공급 및 금리 혜택 방안을 공개했습니다..." },
      { "source": "한국경제", "title": "부동산 시장 전문가 반응 '실수요 안정 효과 기대'", "time": "25분 전", "content": "전문가들은 이번 정책 발표가 실수요자들의 시장 불안을 완화하는데 긍정적인 영향을 미칠 것으로 전망하고 있습니다..." }
    ],
    "youtubeList": [
      { "title": "2026년 집값 향방, 5060이 꼭 알아야 할 3가지 현황", "channel": "경제돋보기", "views": "38만회", "videoId": "dQw4w9WgXcQ", "time": "2시간 전", "summary": "금리 변동성에 따른 부동산 시장 현황과 실거주 전략 분석" },
      { "title": "부동산 수혜 지역 실시간 분석 및 노후 준비", "channel": "자산관리TV", "views": "15만회", "videoId": "dQw4w9WgXcQ", "time": "4시간 전", "summary": "노후 자산 관리를 위한 부동산 활용 팁" }
    ],
    "communityList": [
      { "site": "네이버 카페", "title": "이번 주거 안정 정책 어떻게 보시나요?", "likes": 412, "comments": 128, "content": "실질적으로 우리 세대에 도움이 되는 부분이 많아 보이네요. 여러분 생각은 어떠신가요?" },
      { "site": "클리앙", "title": "부동산 정책 관련 핵심 변경점 정리", "likes": 295, "comments": 84, "content": "주요 대출 규제 완화 및 시니어 주택 지원 항목 정리해드립니다." }
    ]
  },
  {
    "id": 2,
    "title": "5060을 위한 파크골프 & 혈관 건강 걷기 10계명",
    "category": "건강",
    "temperature": 94,
    "mediaNews": 88,
    "mediaYoutube": 96,
    "mediaCommunity": 91,
    "summary": "가을철 환절기 심혈관 건강을 지키는 걷기 운동법과 최근 인기 급상승 중인 파크골프 건강 효능 안내.",
    "newsList": [
      { "source": "조선일보", "title": "하루 30분 파크골프, 관절과 심혈관 건강에 최고", "time": "1시간 전", "content": "전문 의학계에 따르면 적당한 야외 골프/걷기 운동은 중장년층 근력 유지와 우울증 예방에 가장 유익하다고 밝혀졌습니다..." }
    ],
    "youtubeList": [
      { "title": "의사가 알려주는 혈관 젊어지는 걷기 습관", "channel": "건강닥터", "views": "52만회", "videoId": "dQw4w9WgXcQ", "time": "5시간 전", "summary": "올바른 자세와 올바른 운동 시간 안내" }
    ],
    "communityList": [
      { "site": "보배드림", "title": "요즘 주말마다 파크골프 치는데 정말 좋습니다", "likes": 530, "comments": 92, "content": "친구들과 야외에서 웃으며 공 치니 스트레스가 싹 날아가네요." }
    ]
  },
  {
    "id": 3,
    "title": "2026년 국민연금 개편안 주요 변경 사항과 수령액 계산법",
    "category": "경제",
    "temperature": 91,
    "mediaNews": 95,
    "mediaYoutube": 90,
    "mediaCommunity": 86,
    "summary": "국민연금 개편안 확정에 따른 50대 수령 시기 및 내 연금 수령 예상액 조회를 한눈에 확인하세요.",
    "newsList": [
      { "source": "매일경제", "title": "국민연금 개편 최종안 확정... 수령 혜택과 변경점", "time": "30분 전", "content": "국민연금 개편안이 통과됨에 따라 수령 개시 연령 및 세부 조율안이 확정되었습니다..." }
    ],
    "youtubeList": [
      { "title": "연금 개편, 내가 받을 금액은 얼마일까?", "channel": "연금박사", "views": "61만회", "videoId": "dQw4w9WgXcQ", "time": "1시간 전", "summary": "내 연금 수령액 간단 계산법" }
    ],
    "communityList": [
      { "site": "뽐뿌", "title": "국민연금 조기수령 vs 정기수령 고민 정리", "likes": 388, "comments": 145, "content": "상황별 이득 조건 분석글 공유합니다." }
    ]
  }
]

# 2. 워크넷 / 알바몬 / 알바천국 수집 통합 알바 데이터
mock_albas = [
  {
    "id": 101,
    "platform": "워크넷",
    "badgeColor": "bg-blue-600",
    "title": "시니어 실버도우미 및 도서관 안심 안내원 모집",
    "company": "(주)용인시 중장년지원센터",
    "address": "경기도 용인시 수지구 풍덕천동 123",
    "lat": 37.3256,
    "lng": 127.0955,
    "distance": "520m",
    "pay": "시급 10,500원",
    "workTime": "주 5일 (09:00~13:00) / 4시간",
    "seniorFriendly": True,
    "detail": "도서관 방문객 안심 안내 및 간단한 서가 정리 업무입니다. 체력 부담이 적으며 시니어 우대 채용합니다.",
    "contact": "031-234-5678"
  },
  {
    "id": 102,
    "platform": "알바몬",
    "badgeColor": "bg-orange-500",
    "title": "대형마트 매장 진열 및 간단 재고 관리 (주간)",
    "company": "용인 이마트 풍덕천점",
    "address": "경기도 용인시 수지구 포은대로 435",
    "lat": 37.3221,
    "lng": 127.0980,
    "distance": "890m",
    "pay": "시급 10,200원",
    "workTime": "월~금 (10:00~15:00) / 점심제공",
    "seniorFriendly": True,
    "detail": "매장 내 물품 진열 및 고객 동선 안내. 주간 시간대 초보자 및 초장년층 대환영.",
    "contact": "010-9876-5432"
  },
  {
    "id": 103,
    "platform": "알바천국",
    "badgeColor": "bg-yellow-500",
    "title": "아파트 단지 내 조경 및 안전 관리원 (단기/소일거리)",
    "company": "수지 자이 아파트 관리사무소",
    "address": "경기도 용인시 수지구 성복동 789",
    "lat": 37.3180,
    "lng": 127.0850,
    "distance": "1.4km",
    "pay": "일급 95,000원",
    "workTime": "주 3일 선택 (09:00~16:00)",
    "seniorFriendly": True,
    "detail": "단지 내 꽃밭 가꾸기 및 조경 보수 작업. 친목 도모하며 일하기 좋습니다.",
    "contact": "031-890-1234"
  },
  {
    "id": 104,
    "platform": "워크넷",
    "badgeColor": "bg-blue-600",
    "title": "초등학교 등하교 안전 지도사 모집",
    "company": "수지초등학교 안전위원회",
    "address": "경기도 용인시 수지구 수풍로 12",
    "lat": 37.3290,
    "lng": 127.0920,
    "distance": "750m",
    "pay": "시급 11,000원",
    "workTime": "월~금 (08:00~10:00 / 14:00~16:00)",
    "seniorFriendly": True,
    "detail": "어린이 등하교길 횡단보도 안전 지도. 지역 어르신 우대 채용.",
    "contact": "031-777-8899"
  }
]

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Serve static files from public directory
        path = super().translate_path(path)
        relpath = os.path.relpath(path, os.getcwd())
        return os.path.join(PUBLIC_DIR, relpath)

    def do_GET(self):
        if self.path == '/api/issues':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(mock_issues, ensure_ascii=False).encode('utf-8'))
            return
        elif self.path == '/api/albas':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(mock_albas, ensure_ascii=False).encode('utf-8'))
            return
        
        return super().do_GET()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"===================================================")
        print(f"🚀 [오늘의 기준] 시니어 플랫폼 Python 웹 서버 시작!")
        print(f"🌐 접속 주소: http://localhost:{PORT}")
        print(f"===================================================")
        httpd.serve_forever()
