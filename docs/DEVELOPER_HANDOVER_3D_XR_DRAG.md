# 🛠️ 개발·개선·배포·운영자를 위한 기술 핸드오버 문서
## [Technical Handover & Maintenance Guide] 3D 입체 / XR 공간 모드 '잡고 드래그' 인터랙션 분석 및 추가 조치 항목

> **문서 대상**: Pentalyze 오픈소스 저장소를 포크(Fork)하여 추가 개발, 기능 개선, 프로덕션 배포 및 유지보수를 수행하고자 하는 엔지니어, 아키텍트, 운영자(DevOps)  
> **관련 모듈**: `src/components/Book3D.tsx`, `src/index.css`  
> **작성일**: 2026년 9월

---

## 1. 개요 및 문서 목적 (Overview & Purpose)

본 문서는 Pentalyze의 **'3D 입체(Stereo 3D)'** 및 **'XR 공간(XR Spatial)'** 뷰 모드에서, **틸트(자이로스코프 / 마우스 패럴랙스 트래킹) 기능이 비활성화(OFF)**된 상태일 때 상·하단 **'잡고 넘기기 (Grip & Drag)' 버튼**에 발생할 수 있는 미세한 조작감의 차이와 기술적 뉘앙스를 심층 분석하고, **향후 프로젝트를 이어받아 개발·개선·운영할 엔지니어를 위한 구체적인 조치 항목(Roadmap & Action Items)**을 제공하기 위해 작성되었습니다.

일반적인 뷰어 사용자에게는 체감하기 어려운 미세한 영역일 수 있으나, 브라우저 그래픽스 엔진과 3D DOM 투영의 한계에서 기인하는 본질적인 기술적 특성을 명확히 인지하고 향후 차세대 버전으로 도약할 수 있도록 가이드를 제공합니다.

---

## 2. 기술적 배경 (Technical Architecture)

### 2.1 CSS 3D 공간 구성 및 변환 파이프라인
Pentalyze의 3D 책장 렌더링은 WebGL 캔버스가 아닌 **CSS 3D Transforms** (`transform-style: preserve-3d`, `perspective: 1800px ~ 2400px`)를 채택하여, DOM 요소의 텍스트 선명도, 접근성, 다국어 폰트 렌더링 및 CSS 애니메이션의 장점을 극대화하고 있습니다.

```
[Viewport Container: .book-stage-3d] (perspective: 1800px ~ 2400px)
       │
       ▼
[Book Body: .book-body-3d] (transform: rotateX(...) rotateY(...) translateZ(...))
       │
       ├─► [Static Book Spines & Background Shadows]
       ├─► [Left/Right Page Faces: .page-face] (Backface-visibility: hidden)
       └─► [Active Dragging Leaf (Clone DOM)] (isHoldingPage === true 시 동적 마운트)
```

### 2.2 뷰 모드별 고정 각도 매트릭스 (Static Projection)
`Book3D.tsx`의 `getBookTransformStyle()`에서 산출되는 기준 회전 각도는 다음과 같습니다:
* **Flat 모드**: `rotateX(0deg) rotateY(0deg)` (순수 2D 평면 투영)
* **3D 입체 모드**: `rotateX(14deg) rotateY(-8deg)` (약간 위에서 내려다보는 입체적 원근 각도)
* **XR 공간 모드**: `rotateX(18deg) rotateY(-14deg) translateZ(30px)` (공간 상에 깊이감 있게 부유하는 양장본 각도)

---

## 3. 틸트 활성 vs 비활성 시의 미세한 동작 차이 및 근본 원인 (Root Cause Analysis)

### 🔍 왜 틸트가 켜져 있을 때는 자연스럽고, 틸트가 꺼지면 미세한 둔탁함/애매함이 느껴질 수 있는가?

#### 1) 브라우저 합성 레이어(Compositor Layer) 캐시와 동적 재평가(Re-Hit-Testing)의 차이
* **틸트 활성화 시 (`isMotionTrackingEnabled === true`)**:
  - 마우스 포인터가 1픽셀만 이동하거나 모바일 기기가 미세하게 흔들려도 `setMotionTilt`가 지속적으로 트리거됩니다.
  - 이로 인해 `book-body-3d`의 `transform` 스타일에 마이크로 델타가 계속 주입되며, 브라우저 렌더링 엔진(Blink/WebKit)의 합성 스레드(Compositor Thread)가 레이어의 기하 구조(Geometry)를 매 프레임 연속적으로 재계산(Re-raster / Continuous Hit-Testing)합니다. 따라서 포인터 다운 시점의 히트박스 판정이 매우 민첩하게 갱신됩니다.
* **틸트 비활성화 시 (`isMotionTrackingEnabled === false`)**:
  - `book-body-3d`의 3D Transform 각도(`rotateX: 14deg, rotateY: -8deg` 등)가 완전히 고정된 **정적 상태(Static Layer)**로 유지됩니다.
  - 브라우저는 최적화를 위해 해당 3D 레이어를 불필요하게 다시 계산하지 않고 정적 텍스처/서브픽셀 래스터 캐시로 유지합니다. 이 상태에서 버튼을 터치하거나 클릭할 때, **3차원 공간으로 회전된 평면 요소 위의 2D 바운딩 박스(Bounding Rect)와 브라우저의 포인터 투영 광선(Ray Projector) 간에 미세한 서브픽셀 오프셋이나 반응 딜레이가 발생**할 수 있습니다.

#### 2) 3차원 투영 공간과 2D 화면 픽셀 델타 간의 비선형 왜곡 (Vector Projection Distortion)
* 화면 상에서 사용자의 손가락이나 마우스는 2D 모니터 평면($X, Y$)을 따라 직선으로 움직입니다.
* 그러나 '3D 입체' 및 'XR 공간'에서는 책장 면이 $X$축과 $Y$축으로 이미 14°~18° 기울어져 있습니다.
* 현재 구현된 델타 판정식:
  $$\Delta Y = \text{clientY} - \text{touchStartCoord.y}$$
  이는 순수 2D 스크린 공간의 이동 거리만을 측정하므로, 3D로 기울어진 종이 표면 벡터와 1:1로 정확하게 일치하지 않고 각도 코사인($\cos \theta$) 비율만큼 기하학적 차이가 발생합니다.

#### 3) DOM 클로닝 리프(`isHoldingPage`) 생성 시점과 이벤트 캡처 타이밍
* 사용자가 넘기기 버튼을 누르고 드래그를 시작하는 찰나(`isHoldingPage = true`), 화면에는 실시간으로 종이 말림 효과를 시뮬레이션하기 위한 동적 리프(`CASE A` 또는 `CASE B`)가 마운트됩니다.
* 최신 코드에서는 `setPointerCapture`를 적용하고 클론 리프 내부 요소에 `pointer-events-none`을 지정하여 이벤트 탈취를 방지하였으나, 일부 저사양 기기나 특정 브라우저(특히 iOS Safari WebKit)에서는 마운트 순간 프레임 드랍으로 인해 첫 1~2개 포인터 무브 이벤트가 누락되는 현상이 존재할 수 있습니다.

---

## 4. 향후 개발·개선·배포·운영자를 위한 추가 조치 항목 (Action Items)

향후 Pentalyze를 유지보수하거나 기능을 확장할 엔지니어링 팀은 아래의 5가지 단계별 개선안을 검토 및 적용하는 것을 권장합니다.

```
[단기 개선안: 파라미터 튜닝]
  ├─ 1. Pointer Capture 안전 가드(Timeout & Lost Capture) 추가
  ├─ 2. 디바이스 DPI/뷰포트 반응형 드래그 임계값(Threshold) 가변화
  └─ 3. 정적 3D 모드에서의 CSS will-change 미세 최적화

[중기 개선안: 수학적 좌표 보정]
  └─ 4. DOMMatrix 3D 역투영(Screen-to-Local-Space) 좌표 계산 도입

[장기 개선안: 엔진 전환]
  └─ 5. Three.js / WebGL / WebXR 네이티브 Raycaster 기반 3D 북 엔진 마이그레이션
```

---

### [조치 항목 1] Pointer Capture 안전 가드 및 포인터 누락 방지 (단기/운영 조치)

#### 현상
사용자가 버튼을 잡고 빠르게 화면 밖으로 이탈하거나, 운영체제 제스처(예: 모바일 스와이프 백 제스처)와 충돌할 경우 포인터 캡처가 비정상 해제되어 `isHoldingPage` 상태가 풀리지 않는 극단적 케이스가 발생할 수 있습니다.

#### 권장 구현 코드 (`Book3D.tsx` 수정 예시)
```typescript
// 1. 포인터 캡처 유실 시 안전 가드 등록
const handleButtonLostPointerCapture = (e: React.PointerEvent<HTMLButtonElement>) => {
  isPointerDownRef.current = false;
  isHoldingPageRef.current = false;
  setIsHoldingPage(false);
  setDragProgress(0);
};

// 2. JSX 버튼에 onLostPointerCapture 바인딩
<button
  onPointerDown={(e) => handleButtonPointerDown('next', e)}
  onPointerMove={handleButtonPointerMove}
  onPointerUp={handleButtonPointerUp}
  onLostPointerCapture={handleButtonLostPointerCapture}
  ...
/>
```

---

### [조치 항목 2] 반응형 드래그 임계값(Threshold) 및 델타 감도 상수화 (단기 조치)

#### 현상
현재 `handlePointerMove`와 `handlePointerUp`에는 다음과 같은 고정 픽셀 상수가 사용되고 있습니다:
* 이동 감지 시작 역치: `Math.abs(delta) > 4`
* 페이지 전환 확정 거리: `Math.abs(delta) > 8`
* 100% 진행 거리: 수직 50px, 수평 60px

#### 권장 개선안
고해상도 디스플레이(Retina, 3x DPI 모바일 등)에서는 4px~8px가 육안상 극히 미세한 거리이므로, `window.devicePixelRatio`와 현재 뷰 모드('3D 입체', 'XR 공간')의 기울기 각도에 따라 동적으로 가감되는 **보정 계수(Multiplier)**를 도입합니다.

```typescript
// 제안: 뷰 모드별 드래그 감도 계수
const getDragSensitivity = (mode: ViewMode, axis: 'vertical' | 'horizontal') => {
  if (mode === 'xr') return axis === 'vertical' ? 42 : 50; // XR 모드는 원근감에 맞춰 약간 더 민감하게
  if (mode === 'stereo') return axis === 'vertical' ? 46 : 55;
  return axis === 'vertical' ? 50 : 60; // Flat 모드
};
```

---

### [조치 항목 3] DOMMatrix 3D 역투영(Screen-to-Local-Space) 좌표 계산 (중기 개선안)

#### 기술 원리
CSS 3D로 회전된 요소의 실제 로컬 평면 좌표계로 마우스 스크린 좌표($X_s, Y_s$)를 투영하기 위해 Web 표준 `DOMMatrix` API의 역행렬(`inverse()`)을 연산합니다.

```typescript
/**
 * 스크린 2D 좌표를 3D 회전된 DOM 요소의 2D 평면 로컬 좌표로 역투영 변환
 */
function screenToLocal3D(element: HTMLElement, screenX: number, screenY: number) {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  const matrixString = style.transform;
  
  if (!matrixString || matrixString === 'none') {
    return { localX: screenX - rect.left, localY: screenY - rect.top };
  }
  
  try {
    const domMatrix = new DOMMatrix(matrixString);
    const inverseMatrix = domMatrix.inverse();
    const point = new DOMPoint(screenX - rect.left, screenY - rect.top);
    const transformedPoint = point.matrixTransform(inverseMatrix);
    return { localX: transformedPoint.x, localY: transformedPoint.y };
  } catch (err) {
    return { localX: screenX - rect.left, localY: screenY - rect.top };
  }
}
```
이를 통해 틸트 비활성화 상태의 고정 3D 각도에서도 종이 면의 실제 물리적 드래그 거리를 오차 없이 산출할 수 있습니다.

---

### [조치 항목 4] Three.js / WebGL / WebXR 기반 완전 3D 엔진으로의 아키텍처 전환 (장기 로드맵)

#### 전환 배경
CSS 3D는 가볍고 DOM 접근성이 우수하지만, 복잡한 3차원 물리 연산(종이의 부드러운 벱힘 곡면 메시 시뮬레이션, 광원 셰이더, 정밀 광선 추적 히트테스팅)에는 근본적인 한계가 존재합니다.

#### 아키텍처 전환 권장 방향
1. **Three.js + React Three Fiber (R3F)**:
   - `Canvas` 컴포넌트 내에 `PlaneGeometry`를 다면(Subdivided) 분할하여 정밀한 페이지 벤딩 버텍스 셰이더(`gl_Position` 변형) 적용.
   - 드래그 인터랙션은 `Raycaster`를 통해 3D 메시 표면의 UV 좌표($(u, v) \in [0, 1]$)를 실시간으로 직접 읽어오도록 구성.
2. **2D HTML 오프스크린 텍스처링**:
   - `html2canvas` 또는 브라우저의 SVG ForeignObject 텍스처를 WebGL 텍스처로 매핑하여 기존 React 컴포넌트의 풍부한 UI를 그대로 3D 메시 위에 투영.
3. **WebXR Device API 공식 지원**:
   - Meta Quest, Apple Vision Pro 등 공간 컴퓨팅 기기에서 컨트롤러 레이캐스팅으로 책장을 직접 잡고 넘기는 완전한 공간 인터랙션 구현 가능.

---

### [조치 항목 5] 브라우저 엔진별 테스트 매트릭스 및 QA 체크리스트 (배포·운영 가이드)

배포 전 아래의 3가지 플랫폼 엔진별로 '틸트 OFF 상태에서의 3D/XR 드래그' 동작을 검증하십시오.

| 대상 브라우저 / 엔진 | 주요 검증 항목 | 권장 조치 및 주의점 |
| :--- | :--- | :--- |
| **Google Chrome / Microsoft Edge (Blink)** | `setPointerCapture` 호출 시 3D 회전 레이어에서의 좌표 추적 연속성 | 하드웨어 가속 강제 활성화 (`translate3d(0,0,0)`) 유지 확인 |
| **Apple Safari (WebKit - iOS / macOS)** | `touch-action: none`과 Safari 고유의 스와이프 제스처 충돌 여부 | 버튼 요소 및 컨테이너에 `-webkit-touch-callout: none`, `user-select: none` 필수 적용 |
| **Mozilla Firefox (Gecko)** | `preserve-3d` 중첩 시 Z-Buffer 서브픽셀 정렬 | Z축 값 간 최소 1px 이상 격차 확보 (`translateZ(1px)`)로 Z-파이팅(Z-Fighting) 방지 |

---

### [조치 항목 6] 모바일/태블릿 실기기 검증을 위한 구글 코랩(Google Colab) 클라우드 테스트베드 활용

> **상세 가이드**: 📄 [docs/GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

'3D 입체' 및 'XR 공간' 모드의 터치 제스처와 자이로스코프 틸트 연동은 데스크톱 브라우저의 에뮬레이터(DevTools Mobile Emulation)만으로는 실제 센서 하드웨어 및 WebKit 터치 파이프라인의 미묘한 지연을 100% 재현하기 어렵습니다.

* **테스트베드 구성 방안**:
  1. 구글 코랩 가상 머신에 Node.js 20 환경 구축 후 본 저장소를 클론 및 실행합니다.
  2. Cloudflare 터널(`cloudflared tunnel --url http://localhost:3000`)을 통해 실시간 공인 HTTPS 링크(`https://*.trycloudflare.com`)를 생성합니다.
  3. 실제 테스트 대상 스마트폰/태블릿(iPhone Safari, iPad, Android Chrome 등)에서 해당 링크에 직접 접속하여 틸트 활성/비활성 상태에서의 넘기기 제스처를 즉시 QA하고 디버깅할 수 있습니다.
  4. 테스트 종료 후 `!pkill -f node` 및 `%cd /content && !rm -rf pentalyze` 명령으로 로컬 머신에 아무 흔적 없이 테스트 환경을 즉시 정리할 수 있습니다.

---

## 5. 코드베이스 참조 맵 (Source Code Reference)

| 파일 경로 | 함수 / 식별자 | 설명 |
| :--- | :--- | :--- |
| `src/components/Book3D.tsx` | `handleButtonPointerDown` | 넘기기 버튼 포인터 캡처 등록 및 드래그 시작 세션 초기화 |
| `src/components/Book3D.tsx` | `handleButtonPointerMove` | 포인터 캡처 기반 마우스/터치 이동 델타 전달 |
| `src/components/Book3D.tsx` | `handleButtonPointerUp` | 포인터 캡처 정상 해제 및 페이지 전환 판정 실행 |
| `src/components/Book3D.tsx` | `handleButtonGripClick` | 단순 탭(드래그 미발생)과 물리 드래그 구분 및 토스트 힌트 제어 |
| `src/components/Book3D.tsx` | `getBookTransformStyle` | Flat, 3D 입체, XR 공간 모드별 3D Transform 매트릭스 산출 |
| `src/index.css` | `.book-stage-3d` | Perspective (1800px) 및 Preserve-3D 기본 뷰포트 선언 |
| `src/index.css` | `.book-body-3d` | 3차원 양장본 바디 스타일 및 Transform-Style 설정 |

---

### 맺음말
Pentalyze는 웹 표준 기술의 한계를 시험하며 뛰어난 3D 인터랙션을 선사하는 오픈소스 프로젝트입니다. 본 문서에 기술된 분석과 제안 사항을 토대로 후속 개발자 및 운영자분들이 더욱 매끄럽고 환상적인 디지털 독서 경험을 지속적으로 발전시켜 나가기를 기대합니다.
