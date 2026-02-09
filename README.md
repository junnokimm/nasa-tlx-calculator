# NASA TLX Calculator 한국어

```md
# NASA-TLX 계산기 (Web)

NASA-TLX 작업 부하 점수를 기록하고 CSV로 내보낼 수 있는 가벼운 웹 앱입니다.  
**영어/한국어 전환 기능(i18n 토글)** 과 **15쌍 비교 기반 가중치(Weights)** 흐름을 지원합니다.

---

## 주요 기능

- **NASA-TLX 측정 흐름**
  - 15쌍 비교(pairwise)로 가중치 생성
  - 6개 척도 점수 입력(0–100, step=5)
  - 원점수/가중점수 계산
- **언어 전환**
  - UI를 **English ↔ 한국어**로 전환
  - `localStorage`에 언어 설정 저장
- **CSV 다운로드**
  - 작업 결과를 CSV로 내보내기
  - CSV 헤더도 현재 언어에 맞게 변경
- **초기화**
  - 기록된 작업 결과 전체 초기화

---

## NASA-TLX 6개 하위 척도(Subscales)

- MD: 정신적 요구(Mental Demand)
- PD: 신체적 요구(Physical Demand)
- TD: 시간적 요구(Temporal Demand)
- PF: 수행도(Performance)
- EF: 노력(Effort)
- FR: 좌절감(Frustration)

---

## 점수 계산 방식

### 1) 가중치(Weights)
15쌍 비교에서 각 쌍마다 더 큰 영향을 준 척도를 선택합니다.  
선택된 횟수(0–5회)가 해당 척도의 **가중치**가 됩니다.

### 2) 원점수(Raw score)
6개 척도의 평균:

- `rScore = (MD + PD + TD + PF + EF + FR) / 6`

### 3) 가중점수(Weighted score)
가중치 합은 15이며, 가중 평균으로 계산:

- `wScore = (MD*MD_w + PD*PD_w + TD*TD_w + PF*PF_w + EF*EF_w + FR*FR_w) / 15`

> 가중치가 설정되지 않은 경우 가중점수는 `NaN`으로 표시됩니다.

---

## 실행 방법

### 1) 설치
```bash
npm install


원본 페이지
[nasa-tlx-calculator.vercel.app](https://nasa-tlx-calculator.vercel.app/)