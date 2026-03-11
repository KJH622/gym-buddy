import { useEffect, useMemo, useState } from 'react'
import './App.css'

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const tabs = [
  { value: 'home', label: '홈' },
  { value: 'match', label: '메이트 찾기' },
  { value: 'routine', label: '내 루틴' },
]

const workoutTypes = ['웨이트', '러닝', '필라테스', '크로스핏', '클라이밍', '요가']
const districts = ['강남', '성수', '여의도', '합정', '잠실', '분당']
const timeWindows = ['평일 아침', '평일 저녁', '토요일 오전', '일요일 오후']
const styles = ['가볍게', '꾸준하게', '초보 환영', '기록 집중', '대화 편한', '루틴 관리']

const highlights = [
  { label: '이번 주 신규 매칭', value: '128' },
  { label: '재참여율', value: '91%' },
  { label: '운영 중인 소모임', value: '34' },
]

const buddies = [
  {
    id: 1,
    name: '민서',
    title: '강남 저녁 웨이트 파트너',
    district: '강남',
    workout: '웨이트',
    times: ['평일 저녁', '토요일 오전'],
    styles: ['꾸준하게', '루틴 관리'],
    intro: '퇴근 후 60분 집중 루틴을 선호해요. 무게 욕심보다 자세와 기록 정리를 더 중요하게 봅니다.',
    note: '최근 8주 연속 출석',
  },
  {
    id: 2,
    name: '지훈',
    title: '여의도 러닝 메이트',
    district: '여의도',
    workout: '러닝',
    times: ['평일 아침', '토요일 오전'],
    styles: ['가볍게', '대화 편한'],
    intro: '한강 5km를 편한 페이스로 달리고 브런치까지 이어지는 코스를 자주 열어요.',
    note: '초보 참가 만족도 4.9',
  },
  {
    id: 3,
    name: '서연',
    title: '성수 필라테스 루틴 메이커',
    district: '성수',
    workout: '필라테스',
    times: ['평일 저녁', '일요일 오후'],
    styles: ['초보 환영', '꾸준하게'],
    intro: '호흡과 코어 감각을 천천히 잡아가는 타입이에요. 처음 시작하는 분들이 특히 편하게 느껴요.',
    note: '자세 피드백 후기 다수',
  },
  {
    id: 4,
    name: '도윤',
    title: '잠실 클라이밍 크루 리더',
    district: '잠실',
    workout: '클라이밍',
    times: ['평일 저녁', '일요일 오후'],
    styles: ['기록 집중', '루틴 관리'],
    intro: '난이도 욕심보다는 주간 목표를 세우고 완등 로그를 함께 쌓는 걸 좋아합니다.',
    note: '주간 챌린지 운영 중',
  },
]

const sessions = [
  {
    id: 101,
    title: '강남 퇴근 후 웨이트 3분할',
    district: '강남',
    workout: '웨이트',
    time: '평일 저녁',
    capacity: '3 / 5명',
    host: '민서',
    summary: '상체 루틴 위주로 70분 진행하고, 끝나면 다음 주 중량 목표를 함께 정리합니다.',
    detail:
      '헬스장 경험이 적어도 괜찮아요. 워밍업, 주요 동작, 마무리 스트레칭 순서가 정리되어 있어 처음 와도 흐름을 따라가기 쉽습니다.',
    tags: ['강남', '웨이트', '초보 환영', '루틴 관리'],
  },
  {
    id: 102,
    title: '여의도 토요 아침 러닝 & 브런치',
    district: '여의도',
    workout: '러닝',
    time: '토요일 오전',
    capacity: '10 / 16명',
    host: '지훈',
    summary: '5km 러닝 후 근처 카페에서 회복식과 주간 운동 계획을 가볍게 공유해요.',
    detail:
      '페이스 그룹을 나눠서 운영해서 처음 오신 분도 부담이 적습니다. 기록 경쟁보다 꾸준한 참여와 회복을 우선으로 둡니다.',
    tags: ['러닝', '대화 편한', '한강', '가볍게'],
  },
  {
    id: 103,
    title: '성수 일요 필라테스 리셋 세션',
    district: '성수',
    workout: '필라테스',
    time: '일요일 오후',
    capacity: '2 / 4명',
    host: '서연',
    summary: '주말 마무리용 코어 세션으로, 몸을 정리하고 다음 주 컨디션을 가볍게 끌어올립니다.',
    detail:
      '매트 동작 중심으로 진행하고, 동작별 대체 버전도 안내해 드려요. 평소 허리나 어깨 긴장이 심한 분들이 특히 만족도가 높습니다.',
    tags: ['필라테스', '회복', '초보 환영', '성수'],
  },
]

const routineCards = [
  {
    title: '이번 주 집중 포인트',
    value: '상체 당기기 + 수면 회복',
    description: '운동 강도보다 회복 품질을 우선으로 두는 주간 계획입니다.',
  },
  {
    title: '예정된 세션',
    value: '3회',
    description: '화요일 웨이트, 목요일 러닝, 토요일 소모임이 잡혀 있어요.',
  },
  {
    title: '누적 출석',
    value: '14주 연속',
    description: '이번 달 목표는 주 3회 유지와 스트레칭 10분 습관화예요.',
  },
]

const weeklyPlan = [
  { day: 'Tue', title: '하체 웨이트', meta: '강남 · 19:30', status: '확정' },
  { day: 'Thu', title: '회복 러닝 5km', meta: '여의도 · 07:10', status: '예정' },
  { day: 'Sat', title: '소모임 참여', meta: '여의도 · 09:00', status: '모집중' },
]

const activityFeed = [
  '어제 참여한 러닝 세션에서 새 메이트 2명과 다음 주 약속이 잡혔어요.',
  '최근 저장한 루틴 4개 중 3개가 저녁 시간대에 가장 잘 맞았습니다.',
  '이번 주 추천은 “가볍게 + 꾸준하게” 성향의 메이트에게 집중되고 있어요.',
]

const emptyRecruitForm = {
  title: '',
  host: '나',
  district: '강남',
  workout: '웨이트',
  time: '평일 저녁',
  capacity: '1 / 4명',
  summary: '',
  detail: '',
  tags: '',
}

function detectSystemTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function scoreBuddy(buddy, selectedWorkout, selectedDistrict, selectedTimes, selectedStyles) {
  let score = 0
  if (buddy.workout === selectedWorkout) score += 35
  if (buddy.district === selectedDistrict) score += 25
  score += buddy.times.filter((item) => selectedTimes.includes(item)).length * 15
  score += buddy.styles.filter((item) => selectedStyles.includes(item)).length * 12
  return score
}

function scoreSession(session, selectedWorkout, selectedDistrict, selectedTimes, selectedStyles) {
  let score = 0
  if (session.workout === selectedWorkout) score += 35
  if (session.district === selectedDistrict) score += 25
  if (selectedTimes.includes(session.time)) score += 18
  score += session.tags.filter((item) => selectedStyles.includes(item)).length * 8
  return score
}

function App() {
  const [themePreference, setThemePreference] = useState('system')
  const [systemTheme, setSystemTheme] = useState(detectSystemTheme)
  const [activeTab, setActiveTab] = useState('home')
  const [selectedWorkout, setSelectedWorkout] = useState('웨이트')
  const [selectedDistrict, setSelectedDistrict] = useState('강남')
  const [selectedTimes, setSelectedTimes] = useState(['평일 저녁', '토요일 오전'])
  const [selectedStyles, setSelectedStyles] = useState(['꾸준하게', '초보 환영'])
  const [communitySessions, setCommunitySessions] = useState(sessions)
  const [selectedSession, setSelectedSession] = useState(null)
  const [joinedSessionIds, setJoinedSessionIds] = useState([])
  const [isRecruitOpen, setIsRecruitOpen] = useState(false)
  const [recruitForm, setRecruitForm] = useState(emptyRecruitForm)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const syncTheme = (event) => setSystemTheme(event.matches ? 'dark' : 'light')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', syncTheme)
    return () => mediaQuery.removeEventListener('change', syncTheme)
  }, [])

  useEffect(() => {
    if (!selectedSession && !isRecruitOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedSession(null)
        setIsRecruitOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedSession, isRecruitOpen])

  const resolvedTheme = themePreference === 'system' ? systemTheme : themePreference

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const matchedBuddies = useMemo(
    () =>
      buddies
        .map((buddy) => ({
          ...buddy,
          score: scoreBuddy(
            buddy,
            selectedWorkout,
            selectedDistrict,
            selectedTimes,
            selectedStyles,
          ),
        }))
        .filter((buddy) => buddy.score > 0)
        .sort((a, b) => b.score - a.score),
    [selectedDistrict, selectedStyles, selectedTimes, selectedWorkout],
  )

  const matchedSessions = useMemo(
    () =>
      communitySessions
        .map((session) => ({
          ...session,
          score: scoreSession(
            session,
            selectedWorkout,
            selectedDistrict,
            selectedTimes,
            selectedStyles,
          ),
        }))
        .filter((session) => session.score > 0)
        .sort((a, b) => b.score - a.score),
    [communitySessions, selectedDistrict, selectedStyles, selectedTimes, selectedWorkout],
  )

  const toggleSelection = (value, current, setter) => {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  const openRecruit = () => {
    setRecruitForm({
      ...emptyRecruitForm,
      district: selectedDistrict,
      workout: selectedWorkout,
      time: selectedTimes[0] ?? '평일 저녁',
      tags: [selectedWorkout, selectedDistrict, ...selectedStyles].slice(0, 4).join(', '),
    })
    setIsRecruitOpen(true)
  }

  const submitRecruit = (event) => {
    event.preventDefault()

    const tags = recruitForm.tags
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    const newSession = {
      id: Date.now(),
      title: recruitForm.title,
      district: recruitForm.district,
      workout: recruitForm.workout,
      time: recruitForm.time,
      capacity: recruitForm.capacity,
      host: recruitForm.host,
      summary: recruitForm.summary,
      detail: recruitForm.detail,
      tags: tags.length ? tags : [recruitForm.workout],
    }

    setCommunitySessions((current) => [newSession, ...current])
    setIsRecruitOpen(false)
    setSelectedSession(newSession)
    setActiveTab('match')
  }

  const requestJoin = (sessionId) => {
    if (joinedSessionIds.includes(sessionId)) return
    setJoinedSessionIds((current) => [...current, sessionId])
  }

  return (
    <>
      <main className="app-shell">
        <header className="topbar">
          <div>
            <p className="brand-kicker">GYMBUDDY</p>
            <h1 className="brand-title">혼자 하던 운동을, 오래 가는 루틴으로 연결하는 커뮤니티</h1>
          </div>

          <div className="topbar-actions">
            <nav className="segmented-control" aria-label="페이지 전환">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  className={activeTab === tab.value ? 'segmented-pill active' : 'segmented-pill'}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="segmented-control" aria-label="테마 설정">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={themePreference === option.value ? 'segmented-pill active' : 'segmented-pill'}
                  onClick={() => setThemePreference(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {activeTab === 'home' ? (
          <>
            <section className="hero">
              <div className="hero-copy">
                <span className="eyebrow-chip">서울 주요 운동권 중심으로 운영 중</span>
                <h2>운동 성향, 시간대, 지역이 맞는 사람과 자연스럽게 연결됩니다.</h2>
                <p>
                  GymBuddy는 "운동을 같이할 사람을 찾기 어렵다"는 문제를 해결하기 위해 만들어진
                  서비스입니다. 억지스러운 소개 문구 대신, 실제 참여 흐름과 루틴 관리에 맞춘 화면으로
                  구성했습니다.
                </p>

                <div className="hero-tags">
                  <span>메이트 추천</span>
                  <span>소모임 탐색</span>
                  <span>주간 루틴 관리</span>
                  <span>초보 친화적 온보딩</span>
                </div>

                <div className="hero-actions">
                  <button type="button" className="primary-button" onClick={() => setActiveTab('match')}>
                    바로 탐색 시작하기
                  </button>
                  <button type="button" className="secondary-button" onClick={() => setActiveTab('routine')}>
                    내 루틴 보기
                  </button>
                </div>
              </div>

              <div className="hero-panel">
                <div className="stats-grid">
                  {highlights.map((item) => (
                    <article key={item.label} className="stat-card">
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </article>
                  ))}
                </div>

                <article className="focus-card">
                  <p>이번 주 가장 반응이 좋은 조합</p>
                  <strong>강남 · 평일 저녁 · 웨이트</strong>
                  <span>퇴근 후 1시간 루틴형 모임의 참여 전환율이 가장 높아요.</span>
                </article>
              </div>
            </section>

            <section className="section-card">
              <div className="section-heading">
                <div>
                  <p className="section-label">Why it works</p>
                  <h3>보여주기용 화면이 아니라, 실제로 쓰는 흐름에 맞췄습니다.</h3>
                </div>
              </div>

              <div className="feature-grid">
                <article className="feature-card">
                  <strong>운동 조건을 먼저 정리</strong>
                  <p>종목, 지역, 시간대, 분위기를 선택하면 추천 결과가 즉시 바뀝니다.</p>
                </article>
                <article className="feature-card">
                  <strong>참여 전 상세 확인</strong>
                  <p>모집 인원, 진행 방식, 소개 문구를 카드와 상세 모달에서 자연스럽게 확인할 수 있어요.</p>
                </article>
                <article className="feature-card">
                  <strong>내 루틴까지 연결</strong>
                  <p>매칭에서 끝나지 않고, 주간 루틴과 출석 흐름까지 한 화면에서 이어집니다.</p>
                </article>
              </div>
            </section>

            <section className="story-grid">
              <article className="story-card accent">
                <p className="section-label">Member Story</p>
                <strong>"혼자 가면 미루게 되던 운동이, 약속 있는 루틴으로 바뀌었어요."</strong>
                <span>강남 직장인 사용자 후기 기반 톤으로 재구성한 예시 콘텐츠입니다.</span>
              </article>

              <article className="story-card">
                <p className="section-label">Team Pick</p>
                <strong>이번 주 추천 루틴</strong>
                <span>화/목 저녁 웨이트 + 토요 아침 가벼운 러닝 조합이 가장 안정적으로 이어집니다.</span>
              </article>
            </section>
          </>
        ) : null}

        {activeTab === 'match' ? (
          <>
            <section className="hero compact">
              <div className="hero-copy">
                <span className="eyebrow-chip">Personal Match</span>
                <h2>지금 내 일정과 맞는 운동 메이트, 소모임만 골라서 보세요.</h2>
                <p>
                  조건은 간단하게, 결과는 구체적으로 보이도록 구성했습니다. 선택한 취향에 따라 메이트와
                  커뮤니티 세션이 함께 정렬됩니다.
                </p>
              </div>

              <div className="hero-panel mini">
                <article className="focus-card">
                  <p>현재 선택</p>
                  <strong>{selectedWorkout}</strong>
                  <span>
                    {selectedDistrict} · {selectedTimes.join(', ')}
                  </span>
                </article>
              </div>
            </section>

            <section className="section-card">
              <div className="section-heading">
                <div>
                  <p className="section-label">Filters</p>
                  <h3>운동 스타일을 먼저 정해볼까요?</h3>
                </div>
              </div>

              <div className="filter-grid">
                <div className="filter-card">
                  <label>운동 종목</label>
                  <div className="chip-wrap">
                    {workoutTypes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={selectedWorkout === item ? 'choice-chip active' : 'choice-chip'}
                        onClick={() => setSelectedWorkout(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-card">
                  <label>지역</label>
                  <div className="chip-wrap">
                    {districts.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={selectedDistrict === item ? 'choice-chip active' : 'choice-chip'}
                        onClick={() => setSelectedDistrict(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-card">
                  <label>가능 시간</label>
                  <div className="chip-wrap">
                    {timeWindows.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={selectedTimes.includes(item) ? 'choice-chip active' : 'choice-chip'}
                        onClick={() => toggleSelection(item, selectedTimes, setSelectedTimes)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-card">
                  <label>운동 분위기</label>
                  <div className="chip-wrap">
                    {styles.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={selectedStyles.includes(item) ? 'choice-chip active' : 'choice-chip'}
                        onClick={() => toggleSelection(item, selectedStyles, setSelectedStyles)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card">
              <div className="section-heading split">
                <div>
                  <p className="section-label">Buddy Match</p>
                  <h3>추천 메이트</h3>
                </div>
                <span className="section-badge">{matchedBuddies.length}명 추천</span>
              </div>

              <div className="buddy-grid">
                {matchedBuddies.map((buddy) => (
                  <article key={buddy.id} className="buddy-card">
                    <div className="card-head">
                      <div>
                        <strong>{buddy.name}</strong>
                        <p>{buddy.title}</p>
                      </div>
                      <span className="score-pill">{buddy.score}</span>
                    </div>
                    <p className="body-copy">{buddy.intro}</p>
                    <div className="meta-tags">
                      <span>{buddy.district}</span>
                      <span>{buddy.workout}</span>
                      <span>{buddy.note}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-card">
              <div className="section-heading split">
                <div>
                  <p className="section-label">Community Sessions</p>
                  <h3>바로 참여할 수 있는 소모임</h3>
                </div>
                <span className="section-badge">상세 보기 가능</span>
              </div>

              <div className="session-grid">
                {matchedSessions.map((session) => (
                  <button
                    key={session.id}
                    type="button"
                    className="session-card"
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className="card-head">
                      <div>
                        <strong>{session.title}</strong>
                        <p>
                          {session.host} · {session.capacity}
                        </p>
                      </div>
                      <span className="time-pill">{session.time}</span>
                    </div>
                    <p className="body-copy">{session.summary}</p>
                    <div className="meta-tags">
                      {session.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {activeTab === 'routine' ? (
          <>
            <section className="hero compact">
              <div className="hero-copy">
                <span className="eyebrow-chip">Routine Dashboard</span>
                <h2>이번 주 운동을 놓치지 않도록, 계획과 참여 흐름을 한 번에 봅니다.</h2>
                <p>
                  메이트 탐색 뒤에 남는 질문은 늘 같습니다. "그래서 이번 주에 언제, 무엇을 하지?" 이
                  화면은 그 답을 정리해 주는 개인 대시보드예요.
                </p>
              </div>
            </section>

            <section className="routine-grid">
              {routineCards.map((card) => (
                <article key={card.title} className="routine-card">
                  <p className="section-label">{card.title}</p>
                  <strong>{card.value}</strong>
                  <span>{card.description}</span>
                </article>
              ))}
            </section>

            <section className="section-card">
              <div className="section-heading">
                <div>
                  <p className="section-label">Weekly Plan</p>
                  <h3>예정된 스케줄</h3>
                </div>
              </div>

              <div className="plan-list">
                {weeklyPlan.map((item) => (
                  <article key={`${item.day}-${item.title}`} className="plan-item">
                    <span className="day-pill">{item.day}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.meta}</p>
                    </div>
                    <em>{item.status}</em>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-card">
              <div className="section-heading">
                <div>
                  <p className="section-label">Insight Feed</p>
                  <h3>최근 활동 요약</h3>
                </div>
              </div>

              <div className="feed-list">
                {activityFeed.map((item) => (
                  <article key={item} className="feed-item">
                    <span className="feed-dot" />
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : null}

        <div className="floating-cta">
          <div>
            <small>새 소모임을 직접 열어볼 수 있어요</small>
            <strong>지금 조건으로 모집 글 만들기</strong>
          </div>
          <button type="button" className="primary-button" onClick={openRecruit}>
            모집 열기
          </button>
        </div>
      </main>

      {selectedSession ? (
        <div className="modal-backdrop" onClick={() => setSelectedSession(null)} role="presentation">
          <section className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <p className="section-label">Session Detail</p>
                <h3>{selectedSession.title}</h3>
              </div>
              <button type="button" className="icon-button" onClick={() => setSelectedSession(null)}>
                x
              </button>
            </div>

            <div className="modal-tags">
              <span>{selectedSession.workout}</span>
              <span>{selectedSession.district}</span>
              <span>{selectedSession.time}</span>
              <span>{selectedSession.capacity}</span>
            </div>

            <p className="modal-copy lead">{selectedSession.summary}</p>
            <p className="modal-copy">{selectedSession.detail}</p>

            <div className="modal-footer">
              <div>
                <small>호스트</small>
                <strong>{selectedSession.host}</strong>
              </div>
              <button
                type="button"
                className={
                  joinedSessionIds.includes(selectedSession.id)
                    ? 'primary-button success'
                    : 'primary-button'
                }
                onClick={() => requestJoin(selectedSession.id)}
              >
                {joinedSessionIds.includes(selectedSession.id) ? '참여 요청 완료' : '참여 요청 보내기'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {isRecruitOpen ? (
        <div className="modal-backdrop" onClick={() => setIsRecruitOpen(false)} role="presentation">
          <section className="modal-card wide" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <p className="section-label">Create Session</p>
                <h3>새 모집 글 만들기</h3>
              </div>
              <button type="button" className="icon-button" onClick={() => setIsRecruitOpen(false)}>
                x
              </button>
            </div>

            <form className="recruit-form" onSubmit={submitRecruit}>
              <label className="field">
                <span>제목</span>
                <input
                  value={recruitForm.title}
                  onChange={(event) => setRecruitForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="예: 강남 평일 저녁 웨이트 루틴 메이트 모집"
                  required
                />
              </label>

              <div className="field-row">
                <label className="field">
                  <span>운동 종목</span>
                  <select
                    value={recruitForm.workout}
                    onChange={(event) =>
                      setRecruitForm((current) => ({ ...current, workout: event.target.value }))
                    }
                  >
                    {workoutTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>지역</span>
                  <select
                    value={recruitForm.district}
                    onChange={(event) =>
                      setRecruitForm((current) => ({ ...current, district: event.target.value }))
                    }
                  >
                    {districts.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="field-row">
                <label className="field">
                  <span>시간대</span>
                  <select
                    value={recruitForm.time}
                    onChange={(event) => setRecruitForm((current) => ({ ...current, time: event.target.value }))}
                  >
                    {timeWindows.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>모집 인원</span>
                  <input
                    value={recruitForm.capacity}
                    onChange={(event) =>
                      setRecruitForm((current) => ({ ...current, capacity: event.target.value }))
                    }
                  />
                </label>
              </div>

              <label className="field">
                <span>한 줄 소개</span>
                <input
                  value={recruitForm.summary}
                  onChange={(event) =>
                    setRecruitForm((current) => ({ ...current, summary: event.target.value }))
                  }
                  placeholder="모임 분위기와 진행 방식을 짧게 적어주세요."
                  required
                />
              </label>

              <label className="field">
                <span>상세 설명</span>
                <textarea
                  value={recruitForm.detail}
                  onChange={(event) =>
                    setRecruitForm((current) => ({ ...current, detail: event.target.value }))
                  }
                  placeholder="진행 순서, 준비물, 초보 참여 가능 여부 등을 적어주세요."
                  required
                />
              </label>

              <label className="field">
                <span>태그</span>
                <input
                  value={recruitForm.tags}
                  onChange={(event) => setRecruitForm((current) => ({ ...current, tags: event.target.value }))}
                  placeholder="예: 웨이트, 강남, 초보 환영, 루틴 관리"
                />
              </label>

              <div className="modal-footer">
                <div>
                  <small>작성자</small>
                  <strong>{recruitForm.host}</strong>
                </div>
                <button type="submit" className="primary-button">
                  모집 글 등록하기
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  )
}

export default App
