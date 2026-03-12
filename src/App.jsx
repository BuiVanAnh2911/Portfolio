import { useEffect, useState } from "react";
import ProjectDetail from "./Projectdetail";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    category: "characters",
    title: "Thánh Gióng",
    desc: "Concept character design for a fantasy RPG project.",
    tags: ["Character Design", ""],
    color: "#FF6B6B",
    cover: "/images/projects/project1/pr1.jpg",
    gallery: [
      "/images/projects/project1/pr1-1.jpg",
      "/images/projects/project1/pr1-2.jpg",
      "/images/projects/project1/pr1-3.jpg",
      "/images/projects/project1/pr1-4.jpg",
      "/images/projects/project1/pr1-5.jpg",
      "/images/projects/project1/pr1-6.jpg",
    ],
    year: "2024",
    client: "Indie Studio",
    tools: ["Procreate", "Photoshop"],
  },
  {
    id: 2,
    category: "characters",
    title: "Freelance Commissions",
    desc: "A futuristic samurai concept with neon and cyberpunk aesthetics.",
    tags: ["Character Design", "Cyberpunk"],
    color: "#A78BFA",
    cover: "/images/projects/project2/pr2.png",
    gallery: [
      "/images/projects/project2/pr2.png",
      "/images/projects/project2/pr2-1.jpg",
      "/images/projects/project2/pr2-2.jpg",
      "/images/projects/project2/pr2-3.jpg",
      "/images/projects/project2/pr2-4.jpg",
      "/images/projects/project2/pr2-5.jpg",
    ],
    year: "2024",
    client: "Game Jam",
    tools: ["Procreate"],
  },
  {
    id: 3,
    category: "characters",
    title: "Chibi Couple",
    desc: "A mystical forest spirit inspired by folklore and nature.",
    tags: ["Character Design", "Nature"],
    color: "#34D399",
    cover: "/images/projects/project3/pr3.jpg",
    gallery: [
      "/images/projects/project3/pr3.jpg",
      "/images/projects/project3/pr3-1.jpg",
      "/images/projects/project3/pr3-2.jpg",
      "/images/projects/project3/pr3-3.jpg",
      "/images/projects/project3/pr3-4.jpg",
    ],
    year: "2023",
    client: "Personal Project",
    tools: ["Procreate", "Photoshop"],
  },
  {
    id: 4,
    category: "characters",
    title: "Character design",
    desc: "A bustling sci-fi marketplace with layered neon lighting.",
    tags: ["Character Design", "Nature"],
    color: "#F472B6",
    cover: "/images/projects/project4/nhanvat.jpg",
    gallery: [
      "/images/projects/project4/nhanvat.jpg",
    ],
    year: "2024",
    client: "Game Studio",
    tools: ["Photoshop", "Blender"],
  },
  {
    id: 5,
    category: "environments",
    title: "Thành phố sụp đổ",
    desc: "A fantasy environment set on a lost mountain observatory.",
    tags: ["Environment", "Fantasy"],
    color: "#818CF8",
    cover: "/images/projects/pr2.jpg",
    gallery: [
     "/images/projects/pr2.jpg",
    ],
    year: "2023",
    client: "Book Cover",
    tools: ["Photoshop"],
  },
  {
    id: 6,
    category: "projects",
    title: "1 số sản phẩm khác",
    desc: "UI/UX design for a wellness mobile application.",
    tags: ["UI/UX", "Mobile App"],
    color: "#67E8F9",
    cover: "/images/projects/project5/pr5.jpg",
    gallery: [
        "/images/projects/project5/pr5.jpg",
        "/images/projects/project5/pr5-1.jpg",
        "/images/projects/project5/pr5-2.jpg",
        "/images/projects/project5/pr5-3.jpg",
        "/images/projects/project5/pr5-4.jpg",
        "/images/projects/project5/pr5-5.jpg",
        "/images/projects/project5/pr5-6.png",
    ],
    year: "2024",
    client: "Startup",
    tools: ["Figma"],
  },
  // {
  //   id: 7,
  //   category: "projects",
  //   title: "NEXUS Dashboard",
  //   desc: "A clean fintech dashboard with real-time analytics components.",
  //   tags: ["UI/UX", "Dashboard"],
  //   color: "#FCD34D",
  //   cover: "/images/projects/project7/cover.jpg",
  //   gallery: [
  //     "/images/projects/project7/img1.jpg",
  //     "/images/projects/project7/img2.jpg",
  //     "/images/projects/project7/img3.jpg",
  //     "/images/projects/project7/img4.jpg",
  //   ],
  //   year: "2024",
  //   client: "Fintech",
  //   tools: ["Figma"],
  // },
  // {
  //   id: 8,
  //   category: "projects",
  //   title: "Creative Portfolio",
  //   desc: "A modern portfolio website for a visual designer.",
  //   tags: ["Web Design", "Portfolio"],
  //   color: "#FB923C",
  //   cover: "/images/projects/project8/cover.jpg",
  //   gallery: [
  //     "/images/projects/project8/img1.jpg",
  //     "/images/projects/project8/img2.jpg",
  //     "/images/projects/project8/img3.jpg",
  //     "/images/projects/project8/img4.jpg",
  //   ],
  //   year: "2024",
  //   client: "Personal",
  //   tools: ["Figma", "Webflow"],
  // },
];

const CATEGORIES = [
  { key: "all", label: "Tất Cả" },
  { key: "characters", label: "Nhân Vật" },
  { key: "environments", label: "Bối Cảnh" },
  { key: "projects", label: "Một Số Sản Phẩm Khác" },
];

const SERVICES = [
  { icon: "✦", title: "UI/UX Design", desc: "Thiết kế giao diện đẹp, hiện đại và tối ưu trải nghiệm người dùng." },
  { icon: "◈", title: "Character Design", desc: "Thiết kế nhân vật sáng tạo cho game, truyện tranh và thương hiệu." },
  { icon: "▣", title: "Environment Art", desc: "Xây dựng bối cảnh, thế giới và không gian thị giác giàu cảm xúc." },
  { icon: "◉", title: "Brand Identity", desc: "Thiết kế nhận diện thương hiệu đồng bộ, chuyên nghiệp và có cá tính." },
];

// ─── UI HELPERS ─────────────────────────────────────────────────────────────

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
        color: isDark ? "#E2E8F0" : "#1A1A2E",
        cursor: "pointer", fontSize: 13, fontWeight: 500,
        borderRadius: 999, padding: "10px 16px", transition: "all 0.3s",
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

function ServiceCard({ s, c, isDark, text, subText }) {
  const [hovered, setHovered] = useState(false);
  const bg = isDark ? "#12121A" : "#FFFFFF";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        border: `1px solid ${hovered ? c : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
        borderRadius: 24,
        transform: hovered ? "translateY(-8px)" : "none",
        boxShadow: hovered ? `0 24px 48px ${c}25` : isDark ? "none" : "0 2px 14px rgba(0,0,0,0.07)",
        display: "flex", flexDirection: "column",
        transition: "all 0.4s ease", overflow: "hidden",
      }}
    >
      <div style={{
        height: 160, display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered
          ? `radial-gradient(circle at 50% 60%, ${c}35, transparent 70%)`
          : `radial-gradient(circle at 50% 60%, ${c}12, transparent 70%)`,
        transition: "background 0.4s ease",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
          background: hovered ? c : isDark ? `${c}20` : `${c}15`,
          color: hovered ? "white" : c,
          boxShadow: hovered ? `0 12px 32px ${c}50` : "none",
          transform: hovered ? "scale(1.12) rotate(-6deg)" : "scale(1)",
          transition: "all 0.4s ease",
        }}>
          {s.icon}
        </div>
      </div>

      <div style={{ padding: "20px 24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: c, marginBottom: 8, display: "block" }}>
          Service
        </span>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: text, marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
        <p style={{ fontSize: 13, color: subText, lineHeight: 1.75, flex: 1 }}>{s.desc}</p>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c }}>Tìm hiểu thêm →</span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick, isDark }) {
  const [hovered, setHovered] = useState(false);
  const bg = isDark ? "#12121A" : "#FFFFFF";
  const text = isDark ? "#FFFFFF" : "#1A1A2E";
  const subText = isDark ? "#6B7280" : "#9CA3AF";

  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        border: `1px solid ${hovered ? project.color : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
        borderRadius: 24,
        transform: hovered ? "translateY(-8px)" : "none",
        boxShadow: hovered ? `0 24px 48px ${project.color}25` : isDark ? "none" : "0 2px 14px rgba(0,0,0,0.07)",
        display: "flex", flexDirection: "column", overflow: "hidden", cursor: "pointer",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{
        position: "relative", width: "100%", aspectRatio: "4 / 3",
        overflow: "hidden", background: isDark ? "#0f0f18" : "#f6f6fb",
      }}>
        <img
          src={project.cover}
          alt={project.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.45)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
        }}>
          <span style={{
            background: "white", color: "black", padding: "8px 20px",
            borderRadius: 99, fontWeight: 700, fontSize: 11, letterSpacing: "0.15em",
          }}>
            XEM CHI TIẾT
          </span>
        </div>
      </div>

      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: project.color, marginBottom: 8, display: "block" }}>
          {project.tags[0]}
        </span>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: text, lineHeight: 1.4, marginBottom: 8 }}>{project.title}</h3>
        <p style={{
          fontSize: 12, color: subText, lineHeight: 1.7, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {project.desc}
        </p>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 14, paddingTop: 12,
          borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
        }}>
          <span style={{ fontSize: 11, color: isDark ? "#4B5563" : "#C0BDD8" }}>{project.year}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: project.color }}>→ Chi tiết</span>
        </div>
      </div>
    </div>
  );
}

function inputStyle(isDark, border, text) {
  return {
    width: "100%",
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${border}`,
    borderRadius: 14, padding: "13px 18px",
    color: text, fontSize: 14, outline: "none",
  };
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [activeNav, setActiveNav] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [detailProject, setDetailProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const bg = isDark ? "#080810" : "#F8F7FF";
  const navBg = isDark ? "rgba(8,8,16,0.9)" : "rgba(248,247,255,0.9)";
  const text = isDark ? "#E2E8F0" : "#1A1A2E";
  const subText = isDark ? "#9CA3AF" : "#6B7280";
  const border = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
  const sectionBg = isDark
    ? "linear-gradient(180deg, #080810 0%, #0E0E18 50%, #080810 100%)"
    : "linear-gradient(180deg, #F8F7FF 0%, #F0EEFF 50%, #F8F7FF 100%)";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = activeCategory === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  // ── Render detail page (separate component) ──
  if (detailProject) {
    return (
      <ProjectDetail
        project={detailProject}
        onClose={() => setDetailProject(null)}
        onSelect={setDetailProject}
        isDark={isDark}
      />
    );
  }

  return (
    <div style={{
      background: bg, minHeight: "100vh", color: text,
      fontFamily: "'DM Sans', sans-serif", overflowX: "hidden",
      maxWidth: "100vw", transition: "background 0.4s, color 0.4s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; max-width: 100%; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #7C3AED50; border-radius: 10px; }
        .glow-text {
          background: linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #FB923C 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .section-pad { padding-left: clamp(1.5rem, 6vw, 5rem); padding-right: clamp(1.5rem, 6vw, 5rem); }
        .btn-primary {
          background: linear-gradient(135deg, #7C3AED, #DB2777); border: none; color: white;
          padding: 14px 32px; border-radius: 50px; font-weight: 600; cursor: pointer;
          transition: all 0.3s; font-size: 15px;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px #7C3AED50; }
        .btn-outline {
          background: transparent; border: 1px solid rgba(167,139,250,0.4); color: #A78BFA;
          padding: 14px 32px; border-radius: 50px; font-weight: 600; cursor: pointer;
          transition: all 0.3s; font-size: 15px;
        }
        .btn-outline:hover { border-color: #A78BFA; background: rgba(167,139,250,0.08); }
        @media (max-width: 900px) {
          .hero-grid, .about-grid, .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .portfolio-grid, .service-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px clamp(1.5rem, 6vw, 5rem)",
        background: scrolled ? navBg : "transparent",
        borderBottom: scrolled ? `1px solid ${border}` : "none",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div onClick={() => scrollTo("home")} style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, cursor: "pointer" }}>
          <span className="glow-text">Bùi Vân Anh</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: window.innerWidth <= 768 ? "none" : "flex", gap: 12 }}>
            {["home", "about", "services", "contact"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                padding: "10px 16px", borderRadius: 999, fontSize: 14, fontWeight: 500,
                border: "none", cursor: "pointer",
                background: activeNav === id ? "rgba(167,139,250,0.1)" : "transparent",
                color: activeNav === id ? "#A78BFA" : subText,
              }}>
                {id === "home" ? "Home" : id === "about" ? "About" : id === "services" ? "Services" : "Contact"}
              </button>
            ))}
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
          <button onClick={() => setMenuOpen((m) => !m)} style={{ display: "block", background: "none", border: "none", color: text, fontSize: 24, cursor: "pointer" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 30,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
          background: isDark ? "rgba(8,8,16,0.97)" : "rgba(248,247,255,0.97)", backdropFilter: "blur(20px)",
        }}>
          {["home", "about", "services", "contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              fontSize: 28, fontWeight: 700, border: "none", background: "none", cursor: "pointer",
              color: activeNav === id ? "#A78BFA" : subText, fontFamily: "'Playfair Display', serif",
            }}>
              {id === "home" ? "Home" : id === "about" ? "About" : id === "services" ? "Services" : "Contact"}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="section-pad" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED18, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #DB277718, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "320px 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 260, height: 320, borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%", overflow: "hidden", border: "2px solid rgba(167,139,250,0.2)", boxShadow: "0 0 80px #7C3AED30" }}>
              <img src="/images/projects/avatar.jpg" alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #A78BFA)" }} />
              <span style={{ color: "#A78BFA", fontSize: 13, letterSpacing: "0.15em", fontWeight: 500 }}>UI/UX & VISUAL DESIGNER</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.8rem)", lineHeight: 1.1, fontWeight: 700, marginBottom: 24, color: text }}>
              Xin chào, tôi là<br />
              <span className="glow-text">Vân Anh</span>
            </h1>

            <p style={{ color: subText, fontSize: 18, lineHeight: 1.8, maxWidth: 600, marginBottom: 40 }}>
              Tôi tạo ra những trải nghiệm số đẹp và có hồn — từ giao diện ứng dụng sắc nét đến những nhân vật và thế giới sáng tạo đầy cảm xúc.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 48 }}>
              <button className="btn-primary" onClick={() => scrollTo("services")}>Xem Tác Phẩm ✦</button>
              <button className="btn-outline" onClick={() => scrollTo("contact")}>Liên Hệ</button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 30 }}>
              {[["8", "Dự án nổi bật"], ["5+", "Năm kinh nghiệm"], ["20+", "Thiết kế"], ["100%", "Tận tâm"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 28, fontWeight: 700 }} className="glow-text">{n}</div>
                  <div style={{ color: isDark ? "#4B5563" : "#9CA3AF", fontSize: 13, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ paddingTop: 100, paddingBottom: 100, background: sectionBg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ ABOUT ME</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text }}>
              Về <span className="glow-text">Tôi</span>
            </h2>
          </div>

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
            <div>
              <p style={{ color: subText, lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
                Tôi là một UI/UX designer và visual artist với hơn 5 năm kinh nghiệm, chuyên tạo ra các sản phẩm kỹ thuật số đẹp mắt và trải nghiệm người dùng sâu sắc.
              </p>
              <p style={{ color: subText, lineHeight: 1.9, fontSize: 16, marginBottom: 32 }}>
                Bên cạnh thiết kế ứng dụng, tôi còn đam mê vẽ nhân vật và thế giới tưởng tượng — nơi mà nghệ thuật và storytelling gặp nhau để tạo ra những câu chuyện hình ảnh đáng nhớ.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                {["Figma", "Adobe XD", "Procreate", "Photoshop", "Illustrator", "Blender"].map((skill) => (
                  <div key={skill} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 16, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${border}` }}>
                    <span style={{ color: "#A78BFA" }}>✦</span>
                    <span style={{ color: text, fontSize: 14 }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {[{ n: "8", l: "Project nổi bật", c: "#A78BFA" }, { n: "20+", l: "Thiết kế hoàn thành", c: "#F472B6" }, { n: "5+", l: "Năm kinh nghiệm", c: "#34D399" }, { n: "15+", l: "Khách hàng hài lòng", c: "#FB923C" }].map(({ n, l, c }) => (
                <div key={l} style={{ padding: 28, borderRadius: 24, textAlign: "center", background: `linear-gradient(145deg, ${c}10, ${isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)"})`, border: `1px solid ${c}25` }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: c, fontFamily: "'Playfair Display', serif" }}>{n}</div>
                  <div style={{ color: subText, fontSize: 13, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES + PORTFOLIO ── */}
      <section id="services" className="section-pad" style={{ paddingTop: 100, paddingBottom: 100, background: bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ WHAT I DO</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text }}>
              Dịch <span className="glow-text">Vụ</span>
            </h2>
          </div>

          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 90 }}>
            {SERVICES.map((s, i) => {
              const colors = ["#A78BFA", "#F472B6", "#34D399", "#FB923C"];
              return <ServiceCard key={s.title} s={s} c={colors[i]} isDark={isDark} text={text} subText={subText} />;
            })}
          </div>

          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ PORTFOLIO</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text }}>
              Tác <span className="glow-text">Phẩm</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 36 }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)} style={{
                  transform: isActive ? "scale(1.08)" : "scale(1)", fontWeight: isActive ? 700 : 500,
                  border: "none", cursor: "pointer",
                  color: isActive ? "white" : subText,
                  background: isActive ? "linear-gradient(135deg, #7C3AED, #DB2777)" : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  boxShadow: isActive ? "0 0 20px rgba(139,92,246,0.5)" : "none",
                  padding: "12px 22px", borderRadius: 999, fontSize: 14, transition: "all 0.3s",
                }}>
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={setDetailProject} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ paddingTop: 110, paddingBottom: 110, background: sectionBg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <p style={{ color: "#7C3AED", fontSize: 12, letterSpacing: "0.25em", marginBottom: 16, fontWeight: 600 }}>✦ GET IN TOUCH</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, marginBottom: 16, color: text }}>
              Liên <span className="glow-text">Hệ</span>
            </h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #7C3AED, #DB2777)", margin: "0 auto 20px", borderRadius: 99 }} />
            <p style={{ color: subText, maxWidth: 460, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Mình luôn sẵn sàng lắng nghe các ý tưởng mới. Hãy để lại lời nhắn, mình sẽ phản hồi sớm nhất nhé.
            </p>
          </div>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "✉️", label: "Email", value: "anhbuivan@gmail.com", color: "#A78BFA" },
                { icon: "📞", label: "Phone", value: "+84 123 456 789", color: "#F472B6" },
                { icon: "📍", label: "Location", value: "Hà Nội, Việt Nam", color: "#FB923C" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 22px", borderRadius: 20, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)", border: `1px solid ${border}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: item.color + "15", border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: "#4B5563", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{item.label}</p>
                    <p style={{ color: text, fontSize: 15, fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.9)", border: `1px solid ${border}`, borderRadius: 32, padding: 36, backdropFilter: "blur(20px)", boxShadow: isDark ? "none" : "0 8px 40px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <input placeholder="Tên của bạn" style={inputStyle(isDark, border, text)} />
                <input placeholder="Email" style={inputStyle(isDark, border, text)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <input placeholder="Điện thoại" style={inputStyle(isDark, border, text)} />
                <input placeholder="Tiêu đề" style={inputStyle(isDark, border, text)} />
              </div>
              <textarea placeholder="Viết nội dung tại đây..." rows={6} style={{ ...inputStyle(isDark, border, text), resize: "none", width: "100%", marginBottom: 18 }} />
              <button style={{ width: "100%", padding: "16px 32px", borderRadius: 16, border: "none", background: "linear-gradient(135deg, #7C3AED, #DB2777)", color: "white", fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", cursor: "pointer" }}>
                GỬI TIN NHẮN ✦
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="section-pad" style={{ paddingTop: 24, paddingBottom: 24, borderTop: `1px solid ${border}`, background: bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}>
            <span className="glow-text">Vân</span> <span style={{ color: subText }}>Anh</span>
          </div>
          <p style={{ color: isDark ? "#374151" : "#D1D5DB", fontSize: 13 }}>© 2026 Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}