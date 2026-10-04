/**
 * 다솜 민화 공동체 (Dasom Minhwa Atelier) 핵심 스크립트
 * 초보자도 쉽게 이해할 수 있도록 기능별로 주석을 꼼꼼하게 작성했습니다.
 */

// ==========================================
// 1. 갤러리 작품 데이터베이스
// ==========================================
const artworkData = [
  {
    id: 0,
    title: "부귀화조의 노래 (富貴花鳥)",
    category: "hwajo",
    categoryLabel: "화조도",
    artist: "송예린 연구회원",
    image: "images/flower_bird.jpg",
    material: "순지에 천연 분채, 석채, 봉즙",
    size: "65 x 90 cm",
    year: "2026년 봄",
    description: "화사하게 만개한 모란은 가문의 번영과 부귀를, 다정하게 마주 보는 한 쌍의 길조(새)는 부부간의 영원한 사랑과 신뢰를 상징합니다. 고운바탕의 한지에 은은하게 올린 바림 기법이 돋보이는 작품입니다.",
    comments: [
      { author: "한옥지기", text: "색감이 너무 포근하고 정갈하네요! 화실에서 실물 보고 감탄했습니다." },
      { author: "연꽃향기", text: "새들의 깃털 표현이 정말 섬세합니다." }
    ]
  },
  {
    id: 1,
    title: "학문과 지혜의 서재 (冊架圖)",
    category: "chaek",
    categoryLabel: "책거리",
    artist: "김정우 초대작가",
    image: "images/chaekgeori.jpg",
    material: "삼베 배접 한지에 전통 석채 및 금분",
    size: "70 x 110 cm",
    year: "2025년 겨울",
    description: "선비들의 서재 풍경을 입체적으로 구성한 책거리입니다. 높게 쌓인 서책과 벼루, 붓, 그리고 자손 번창을 뜻하는 석류를 조화롭게 배치하여 학문에 대한 정진과 집안의 번창을 소망했습니다.",
    comments: [
      { author: "청파선생", text: "책갑의 비단 끈 묘사가 살아 숨쉬는 것 같습니다." },
      { author: "민화새싹", text: "책거리 꼭 배워보고 싶은데 영감을 많이 얻고 갑니다!" }
    ]
  },
  {
    id: 2,
    title: "송하호작도 (松下虎鵲圖)",
    category: "tiger",
    categoryLabel: "호작도",
    artist: "박은지 작가",
    image: "images/tiger_magpie.jpg",
    material: "송연묵, 삼베순지, 치자/황토 안료",
    size: "60 x 85 cm",
    year: "2026년 정월",
    description: "새해를 맞아 모든 나쁜 기운(액운)을 물리쳐주는 든든한 호랑이와 좋은 소식만을 전해주는 지저귀는 까치를 담았습니다. 무섭기보다는 친근하고 해학적인 호랑이의 표정이 옛 선조들의 여유와 익살을 보여줍니다.",
    comments: [
      { author: "까치발", text: "호랑이 눈망울이 장난꾸러기 같아서 미소가 지어집니다 ㅎㅎ" }
    ]
  },
  {
    id: 3,
    title: "연지청풍 (蓮池淸風)",
    category: "lotus",
    categoryLabel: "연화도",
    artist: "이서윤 사범",
    image: "images/lotus_fish.jpg",
    material: "옥당지에 홍화/쪽 전통 바림 채색",
    size: "65 x 92 cm",
    year: "2025년 가을",
    description: "진흙탕 속에서도 청정함을 잃지 않는 연꽃의 맑은 향기와 맑은 물속을 자유롭게 노니는 잉어 두 마리를 그렸습니다. 출세(등용문)와 부부의 금슬, 맑고 고결한 인품을 지향하는 마음을 담았습니다.",
    comments: [
      { author: "수련", text: "연꽃 잎사귀의 그라데이션(바림)이 정말 예술이네요." }
    ]
  },
  {
    id: 4,
    title: "효제충신 문자도: 충(忠)",
    category: "munja",
    categoryLabel: "문자도",
    artist: "최민석 연구회원",
    image: "images/munjado.jpg",
    material: "순지에 분채, 먹, 순금박",
    size: "50 x 75 cm",
    year: "2026년 봄",
    description: "유교의 기본 덕목인 '충(忠)' 글자의 획마다 충절을 상징하는 용, 굳은 절개의 대나무, 등용을 뜻하는 잉어를 입체적으로 그려 넣어 도덕적 가치와 조형미를 동시에 완성했습니다.",
    comments: [
      { author: "도화원", text: "문자도의 매력이 잘 살아있는 멋진 수작입니다." }
    ]
  }
];

// 현재 라이트박스에서 열려 있는 작품 인덱스
let currentArtworkIndex = 0;

// ==========================================
// 2. 초기화 (페이지 로드 시 실행)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initGalleryFilters();
  initCommunityBoard();
  initMobileMenu();
  initInquiryModal();
});

// ==========================================
// 3. 저작권 보호 (우클릭 & 드래그 방지 및 토스트)
// ==========================================
function handleContextMenu(e) {
  e.preventDefault(); // 기본 우클릭 메뉴 차단
  showToast("소중한 전통 작품 보호를 위해 불펌 및 우클릭이 제한되어 있습니다.");
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  if (message) {
    toast.querySelector("span").textContent = message;
  }
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// ==========================================
// 4. 갤러리 카테고리 필터링
// ==========================================
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".artwork-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // 활성화 버튼 스타일 변경
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      cards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (filterValue === "all" || filterValue === cardCat) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.4s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// 좋아요 토글
function toggleLike(btn, id) {
  btn.classList.toggle("liked");
  const countSpan = btn.querySelector(".like-count");
  let count = parseInt(countSpan.textContent, 10);
  if (btn.classList.contains("liked")) {
    countSpan.textContent = count + 1;
    showToast("작품에 따뜻한 응원(좋아요)을 남겼습니다 ❤️");
  } else {
    countSpan.textContent = Math.max(0, count - 1);
  }
}

// ==========================================
// 5. 고화질 라이트박스 뷰어 모달
// ==========================================
function openLightbox(index) {
  currentArtworkIndex = index;
  const art = artworkData[index];
  if (!art) return;

  document.getElementById("lightboxImg").src = art.image;
  document.getElementById("lbTitle").textContent = art.title;
  document.getElementById("lbCategory").textContent = art.categoryLabel;
  document.getElementById("lbArtist").textContent = art.artist;
  document.getElementById("lbMaterial").textContent = art.material;
  document.getElementById("lbSize").textContent = art.size;
  document.getElementById("lbYear").textContent = art.year;
  document.getElementById("lbDescription").textContent = art.description;

  renderLightboxComments();

  const modal = document.getElementById("lightboxModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // 배경 스크롤 방지
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// 라이트박스 내 댓글 렌더링
function renderLightboxComments() {
  const art = artworkData[currentArtworkIndex];
  const listEl = document.getElementById("lbCommentList");
  const countEl = document.getElementById("lbCommentCount");
  
  if (!listEl || !art) return;

  countEl.textContent = art.comments.length;
  listEl.innerHTML = "";

  if (art.comments.length === 0) {
    listEl.innerHTML = `<div class="comment-bubble" style="color: #999;">첫 번째 응원 댓글을 남겨보세요.</div>`;
    return;
  }

  art.comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment-bubble";
    div.innerHTML = `<strong>${escapeHtml(c.author)}</strong>: ${escapeHtml(c.text)}`;
    listEl.appendChild(div);
  });
}

// 라이트박스 응원 댓글 등록
function addLightboxComment(e) {
  e.preventDefault();
  const authorInput = document.getElementById("lbCommentAuthor");
  const textInput = document.getElementById("lbCommentText");

  const author = authorInput.value.trim();
  const text = textInput.value.trim();

  if (!author || !text) return;

  artworkData[currentArtworkIndex].comments.push({ author, text });
  renderLightboxComments();

  authorInput.value = "";
  textInput.value = "";
  showToast("작가님께 따뜻한 감상평이 전달되었습니다!");
}

// ==========================================
// 6. 커뮤니티 게시판 (로컬스토리지 연동)
// ==========================================
const DEFAULT_POSTS = [
  {
    id: 1,
    category: "notice",
    categoryLabel: "전시소식",
    title: "[공지] 2026 다솜 민화 정기 회원전 및 도록 출간 안내",
    author: "다솜공동체 운영진",
    role: "운영자",
    date: "2026.09.28",
    content: "올가을 인사동 갤러리 이즈에서 열리는 제5회 다솜 회원전에 출품하실 회원님들은 10월 15일까지 배접 완료된 원화를 화실로 제출해주시기 바랍니다. 많은 관심과 응원 부탁드립니다.",
    commentCount: 8
  },
  {
    id: 2,
    category: "feedback",
    categoryLabel: "기법질문",
    title: "모란꽃잎 바림할 때 물 얼룩이 지는데 팁이 있을까요?",
    author: "달빛화실",
    role: "수강생",
    date: "2026.10.02",
    content: "순지에 아교포수를 2회 정도 하고 분채로 잎사귀 바림을 연습 중인데 물 붓 자국이 경계선에 자꾸 남습니다. 물 붓의 수분 조절을 어떻게 해야 자연스럽게 번질까요?",
    commentCount: 5
  },
  {
    id: 3,
    category: "talk",
    categoryLabel: "가입인사",
    title: "안녕하세요, 직장 다니며 주말에 민화 배우기 시작했습니다!",
    author: "솔바람",
    role: "일반회원",
    date: "2026.10.03",
    content: "매일 컴퓨터 모니터만 보다가 화실에서 붓을 잡고 먹선 긋는 시간이 인생 최고의 힐링이네요. 선배 작가님들의 멋진 작품 많이 보고 배워가겠습니다. 잘 부탁드립니다!",
    commentCount: 3
  },
  {
    id: 4,
    category: "feedback",
    categoryLabel: "피드백요청",
    title: "첫 호작도 호랑이 수염 선치기 완성했습니다. 조언 부탁드립니다.",
    author: "솔숲호랑이",
    role: "연구작가",
    date: "2026.10.04",
    content: "세필로 털치기 하느라 손이 파르르 떨렸는데, 턱선 쪽 명암이 조금 어색한 느낌이 듭니다. 선생님들의 고견을 듣고 싶습니다.",
    commentCount: 6
  }
];

let posts = [];

function initCommunityBoard() {
  // 로컬스토리지에서 기존 글 불러오기
  const saved = localStorage.getItem("dasom_minhwa_posts");
  if (saved) {
    try {
      posts = JSON.parse(saved);
    } catch (e) {
      posts = [...DEFAULT_POSTS];
    }
  } else {
    posts = [...DEFAULT_POSTS];
    localStorage.setItem("dasom_minhwa_posts", JSON.stringify(posts));
  }

  renderPostList("all");

  // 게시판 탭 클릭 이벤트
  const tabs = document.querySelectorAll(".board-tabs .tab-btn");
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(btn => btn.classList.remove("active"));
      t.classList.add("active");
      renderPostList(t.getAttribute("data-tab"));
    });
  });

  // 새 글 쓰기 버튼
  const btnWrite = document.getElementById("btnWritePost");
  if (btnWrite) {
    btnWrite.addEventListener("click", openWriteModal);
  }
}

function renderPostList(filter) {
  const container = document.getElementById("postList");
  if (!container) return;

  container.innerHTML = "";

  const filtered = posts.filter(p => filter === "all" || p.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding: 40px; text-align: center; color: #888;">등록된 게시글이 없습니다. 첫 이야기를 남겨보세요!</div>`;
    return;
  }

  filtered.forEach(p => {
    const item = document.createElement("div");
    item.className = "post-item";
    item.onclick = () => showPostDetail(p);

    let catClass = "cat-talk";
    if (p.category === "feedback") catClass = "cat-feedback";
    if (p.category === "notice") catClass = "cat-notice";

    item.innerHTML = `
      <div class="post-main">
        <div class="post-meta-top">
          <span class="post-category-badge ${catClass}">${escapeHtml(p.categoryLabel || '자유')}</span>
          <span class="post-author-role">${escapeHtml(p.author)} (${escapeHtml(p.role || '회원')})</span>
        </div>
        <h4 class="post-title-text">${escapeHtml(p.title)}</h4>
        <p class="post-snippet">${escapeHtml(p.content)}</p>
      </div>
      <div class="post-side">
        <span class="post-date"><i class="fa-regular fa-clock"></i> ${p.date}</span>
        <span class="comment-badge"><i class="fa-regular fa-comment-dots"></i> ${p.commentCount || 0}</span>
      </div>
    `;

    container.appendChild(item);
  });
}

function openWriteModal() {
  document.getElementById("writePostModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeWriteModal() {
  document.getElementById("writePostModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

function handlePostSubmit(e) {
  e.preventDefault();
  const category = document.getElementById("postCategory").value;
  const author = document.getElementById("postAuthor").value.trim();
  const role = document.getElementById("postRole").value;
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();

  let categoryLabel = "자유";
  if (category === "feedback") categoryLabel = "피드백/질문";
  if (category === "notice") categoryLabel = "전시/모임";

  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  const newPost = {
    id: Date.now(),
    category,
    categoryLabel,
    title,
    author,
    role,
    date: dateStr,
    content,
    commentCount: 0
  };

  posts.unshift(newPost);
  localStorage.setItem("dasom_minhwa_posts", JSON.stringify(posts));

  closeWriteModal();
  document.getElementById("writePostForm").reset();

  // 현재 활성화된 탭 기준 재렌더링
  const activeTab = document.querySelector(".board-tabs .tab-btn.active");
  renderPostList(activeTab ? activeTab.getAttribute("data-tab") : "all");

  showToast("새로운 이야기가 게시판에 성공적으로 등록되었습니다!");
}

function showPostDetail(p) {
  // 초보자 친화적 알림창으로 게시글 내용 전문 확인
  alert(`[${p.categoryLabel}] ${p.title}\n\n작성자: ${p.author} (${p.role})\n작성일: ${p.date}\n\n${p.content}`);
}

// ==========================================
// 7. 클래스 및 수강 가입 문의 모달
// ==========================================
function initInquiryModal() {
  const btn = document.getElementById("btnOpenInquiry");
  if (btn) {
    btn.addEventListener("click", () => {
      document.getElementById("inquiryModal").classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
}

function closeInquiryModal() {
  document.getElementById("inquiryModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

function handleInquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById("inqName").value.trim();
  closeInquiryModal();
  document.getElementById("inquiryForm").reset();
  showToast(`${name} 님의 방문 상담 및 가입 문의가 접수되었습니다. 화실에서 곧 연락드리겠습니다!`);
}

// ==========================================
// 8. 모바일 네비게이션 토글 및 부드러운 스크롤
// ==========================================
function initMobileMenu() {
  const toggle = document.getElementById("mobileToggle");
  const nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    // 메뉴 링크 클릭 시 모바일 메뉴 자동 닫기
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // 모달 바깥 배경 클릭 시 닫기
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // ESC 키 누르면 모달 닫기
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach(m => {
        m.classList.remove("active");
      });
      document.body.style.overflow = "auto";
    }
  });
}

// XSS 보안 보조 함수
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
