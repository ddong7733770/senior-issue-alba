# 🌐 [오늘의 기준] 깃허브(GitHub) 연동 및 무료 URL 웹 배포 가이드

> 본 파일은 `/Users/junseok/Desktop/사이트 개발` 디렉토리에 함께 관리됩니다.

---

## 1. 깃허브(GitHub) 저장소 연결 및 업데이트 반영 방법

### 1단계: 깃허브(GitHub) 새 저장소 생성
1. [GitHub 웹사이트](https://github.com)에 로그인 후, 우측 상단 `+` 버튼 -> **[New repository]** 클릭.
2. 저장소 이름(Repository Name) 입력 (예: `senior-issue-alba`)
3. **Public** 선택 후 `Create repository` 클릭.

### 2단계: 로컬 프로젝트와 깃허브 연결 (최초 1회만 진행)
터미널에서 `/Users/junseok/Desktop/사이트 개발` 폴더로 이동 후 아래 명령어를 입력합니다:

```bash
cd "/Users/junseok/Desktop/사이트 개발"
git branch -M main
git remote add origin https://github.com/사용자계정/senior-issue-alba.git
git push -u origin main
```
*(위 주소의 `사용자계정`과 `senior-issue-alba`는 본인의 GitHub 계정 및 저장소 이름으로 대체)*

---

### 3단계: 앞으로 사이트 내용 수정 후 깃허브에 반영하는 방법 (반복)
사이트의 내용(기사, 알바 정보, UI 등)을 수정한 뒤 터미널에서 다음 3줄 명령어만 입력하면 깃허브에 자동으로 반영됩니다:

```bash
git add .
git commit -m "사이트 내용 업데이트"
git push
```

---

## 2. 무료 URL 제공 사이트 연동 (모바일 & PC 누구나 접속)

가장 추천하는 무료 웹 호스팅 서비스는 **Vercel** 또는 **GitHub Pages**입니다. 
두 서비스 모두 **비용 0원**, **무료 SSL 보안 인증서(https)**, **평생 무료 도메인**을 제공하며 깃허브와 자동 연동되어 `git push` 할 때마다 1초 만에 최신 사이트로 자동 배포됩니다.

---

### 🌟 추천 1위: Vercel (가장 쉽고 추천!)
- **특징**: 깃허브와 연동하면 클릭 몇 번으로 즉시 `https://senior-issue-alba.vercel.app` 과 같은 예쁜 무료 주소를 제공합니다.
- **배포 순서**:
  1. [Vercel 공식 사이트](https://vercel.com) 회원가입 (GitHub 계정으로 1초 로그인).
  2. **[Add New...]** -> **[Project]** 버튼 클릭.
  3. 방금 올린 `senior-issue-alba` 깃허브 저장소를 선택하고 **[Deploy]** 클릭!
  4. 단 10초 만에 세계 어디서나 모바일과 PC로 접속 가능한 **무료 URL 주소**가 발급됩니다.

---

### 🌟 추천 2위: GitHub Pages (깃허브 자체 제공 무료 웹 호스팅)
- **특징**: 깃허브에 내장된 무료 웹 호스팅 서비스입니다.
- **배포 순서**:
  1. 깃허브 저장소 페이지의 **[Settings]** 탭 클릭.
  2. 좌측 메뉴에서 **[Pages]** 클릭.
  3. Source 항목을 `Deploy from a branch`로 설정하고 Branch를 `main`으로 선택 후 **Save** 클릭.
  4. 잠시 후 `https://본인계정.github.io/senior-issue-alba` 주소로 배포 완료!

---

## 3. 요약: 앞으로의 작업 흐름 (Workflow)

```mermaid
flowchart LR
    A[사이트 내용 수정] --> B[git commit & git push]
    B --> C[GitHub 저장소 반영]
    C --> D[Vercel / GitHub Pages 자동 감지]
    D --> E[🌐 모바일 & PC 누구나 무료 URL로 접속 가능!]
```

이 구조가 갖추어져 있으므로, 이제 사이트 소스를 업데이트하기만 하면 **자동으로 스마트폰과 컴에서 모두 확인 가능한 인터넷 웹 사이트로 최신화**됩니다!
