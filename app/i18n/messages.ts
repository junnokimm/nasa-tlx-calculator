export const messages = {
  en: {
    title: "NASA-TLX Calculator",
    intro:
      "NASA-TLX is a subjective assessment tool for measuring perceived workload. This website is built to facilitate the recording of NASA-TLX scores.",
    bullets: {
      reweightTitle: "Reweight button generates new weights.",
      reweightNote: "Please note that this will not apply to tasks that have already been measured.",
      resetTitle: "Reset button clears all existing task results.",
      resetNote: "It is recommended to Download CSV before resetting."
    },
    ui: {
      task: "Task",
      taskName: "Task Name",
      studySetting: "Study Setting",
      studyName: "Study Name",
      participantName: "Participant Name",
      setWeight: "Set Weight",
      currentWeight: "Current Weight",
      taskResult: "Task Result",
      reweight: "Reweight",
      reset: "Reset",
      downloadCsv: "Download CSV",
      submit: "Submit",
      nan: "NaN",
      lang: "English",
      langToggle: "한국어"
    },
    weight: {
      instruction:
        "Select the subscale from each of the 15 pairs that contributed the most to the workload of the task."
    },
    subscale: {
      MD: "Mental Demand",
      PD: "Physical Demand",
      TD: "Temporal Demand",
      PF: "Performance",
      EF: "Effort",
      FR: "Frustration"
    },
    slider: {
      MD: { title: "1. Mental Demand", q: "How mentally demanding was the task?", head: "Very Low", tail: "Very High" },
      PD: { title: "2. Physical Demand", q: "How physically demanding was the task?", head: "Very Low", tail: "Very High" },
      TD: { title: "3. Temporal Demand", q: "How hurried or rushed was the pace of the task?", head: "Very Low", tail: "Very High" },
      PF: { title: "4. Performance", q: "How successful were you in accomplishing what you were asked to do?", head: "Perfect", tail: "Failure" },
      EF: { title: "5. Effort", q: "How hard did you have to work to accomplish your level of performance?", head: "Very Low", tail: "Very High" },
      FR: { title: "6. Frustration", q: "How insecure, discouraged, irritated, stressed, and annoyed were you?", head: "Very Low", tail: "Very High" }
    },
    csv: {
      header: [
        "Participant","Task Id","Task Name",
        "Mental Demand","Physical Demand","Temporal Demand",
        "Performance","Effort","Frustration",
        "Raw Score",
        "MD Weight","PD Weight","TD Weight","PF Weight","EF Weight","FR Weight",
        "Weighted Score"
      ]
    }
  },

  ko: {
    title: "NASA-TLX 계산기",
    intro:
      "NASA-TLX는 사용자가 인지한 작업 부하를 측정하기 위한 주관적 평가 도구입니다. 이 웹사이트는 NASA-TLX 점수를 쉽게 기록할 수 있도록 제작되었습니다.",
    bullets: {
      reweightTitle: "Reweight 버튼은 새로운 가중치를 생성합니다.",
      reweightNote: "이미 측정된 작업에는 새로운 가중치가 적용되지 않습니다.",
      resetTitle: "Reset 버튼은 모든 기존 작업 결과를 초기화합니다.",
      resetNote: "초기화하기 전에 CSV 다운로드를 권장합니다."
    },
    ui: {
      task: "작업",
      taskName: "작업 이름",
      studySetting: "연구 설정",
      studyName: "연구명",
      participantName: "참여자명",
      setWeight: "가중치 설정",
      currentWeight: "현재 가중치",
      taskResult: "작업 결과",
      reweight: "가중치 재설정",
      reset: "초기화",
      downloadCsv: "CSV 다운로드",
      submit: "제출",
      nan: "NaN",
      lang: "한국어",
      langToggle: "English"
    },
    weight: {
      instruction:
        "15개의 쌍 중에서, 해당 작업의 부하에 더 크게 기여한 하위 척도를 각 쌍마다 하나씩 선택하세요."
    },
    subscale: {
      MD: "정신적 요구",
      PD: "신체적 요구",
      TD: "시간적 요구",
      PF: "수행도",
      EF: "노력",
      FR: "좌절감"
    },
    slider: {
      MD: { title: "1. 정신적 요구", q: "작업이 정신적으로 얼마나 부담스러웠나요?", head: "매우 낮음", tail: "매우 높음" },
      PD: { title: "2. 신체적 요구", q: "작업이 신체적으로 얼마나 부담스러웠나요?", head: "매우 낮음", tail: "매우 높음" },
      TD: { title: "3. 시간적 요구", q: "작업 속도가 얼마나 촉박하거나 서두르게 느껴졌나요?", head: "매우 낮음", tail: "매우 높음" },
      PF: { title: "4. 수행도", q: "요구된 작업을 얼마나 성공적으로 수행했나요?", head: "완벽", tail: "실패" },
      EF: { title: "5. 노력", q: "현재 수행 수준을 내기 위해 얼마나 노력해야 했나요?", head: "매우 낮음", tail: "매우 높음" },
      FR: { title: "6. 좌절감", q: "불안/낙담/짜증/스트레스/불쾌함을 얼마나 느꼈나요?", head: "매우 낮음", tail: "매우 높음" }
    },
    csv: {
      header: [
        "참여자","작업 ID","작업 이름",
        "정신적 요구","신체적 요구","시간적 요구",
        "수행도","노력","좌절감",
        "원점수",
        "MD 가중치","PD 가중치","TD 가중치","PF 가중치","EF 가중치","FR 가중치",
        "가중 점수"
      ]
    }
  }
} as const;

export type Lang = keyof typeof messages;
