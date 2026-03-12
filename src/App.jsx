import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  // Characters
  { id: 1, category: "characters", title: "Warrior Spirit", desc: "A fierce warrior character with glowing armor, crafted for a mobile RPG game.", tags: ["Character Design", "Digital Art"], color: "#FF6B6B", emoji: "⚔️" },
  { id: 2, category: "characters", title: "Mage of Twilight", desc: "A mystical mage character surrounded by cosmic magic. Concept art for indie game.", tags: ["Character Design", "Fantasy"], color: "#A78BFA", emoji: "🔮" },
  { id: 3, category: "characters", title: "Cyber Samurai", desc: "Futuristic samurai blending traditional Japanese aesthetics with cyberpunk elements.", tags: ["Character Design", "Cyberpunk"], color: "#34D399", emoji: "🗡️" },
  { id: 4, category: "characters", title: "Forest Guardian", desc: "Nature spirit protecting ancient forests — a gentle giant with glowing eyes.", tags: ["Character Design", "Nature"], color: "#6EE7B7", emoji: "🌿" },
  { id: 5, category: "characters", title: "Shadow Rogue", desc: "A stealthy rogue blending into darkness — high-contrast ink-style character art.", tags: ["Character Design", "Ink Art"], color: "#94A3B8", emoji: "🌑" },
  { id: 6, category: "characters", title: "Arctic Empress", desc: "Ice queen concept for a fantasy visual novel with intricate costume detailing.", tags: ["Character Design", "Visual Novel"], color: "#BAE6FD", emoji: "❄️" },
  { id: 7, category: "characters", title: "Demon Merchant", desc: "A cheerful demon merchant selling forbidden goods — whimsical dark comedy style.", tags: ["Character Design", "Whimsical"], color: "#FCA5A5", emoji: "👹" },
  { id: 8, category: "characters", title: "Star Pilgrim", desc: "A wandering cosmic traveler searching for the edge of the universe.", tags: ["Character Design", "Sci-Fi"], color: "#C4B5FD", emoji: "🌌" },
  { id: 9, category: "characters", title: "Iron Chef Bot", desc: "A robotic chef designed for a restaurant automation brand identity project.", tags: ["Character Design", "Branding"], color: "#FDE68A", emoji: "🤖" },
  { id: 10, category: "characters", title: "River Sprite", desc: "Delicate water spirit inspired by Southeast Asian folklore.", tags: ["Character Design", "Folklore"], color: "#67E8F9", emoji: "💧" },
  // Environments
  { id: 11, category: "environments", title: "Neon Bazaar", desc: "A bustling cyberpunk marketplace lit by neon signs and holographic ads.", tags: ["Environment", "Cyberpunk"], color: "#F472B6", emoji: "🏙️" },
  { id: 12, category: "environments", title: "Ancient Observatory", desc: "A mountaintop observatory from a lost civilization, drenched in starlight.", tags: ["Environment", "Fantasy"], color: "#818CF8", emoji: "🔭" },
  { id: 13, category: "environments", title: "Sunken Cathedral", desc: "An underwater cathedral overgrown with coral and bioluminescent plants.", tags: ["Environment", "Underwater"], color: "#22D3EE", emoji: "🐚" },
  { id: 14, category: "environments", title: "Desert Oasis", desc: "A magical oasis suspended in an otherworldly desert — rich golden tones.", tags: ["Environment", "Magical Realism"], color: "#FCD34D", emoji: "🏜️" },
  { id: 15, category: "environments", title: "Floating Archipelago", desc: "Islands drifting through clouds, connected by rope bridges and waterfalls.", tags: ["Environment", "Fantasy"], color: "#86EFAC", emoji: "🏝️" },
  { id: 16, category: "environments", title: "Ice Fortress", desc: "A forbidding fortress carved into a glacier, home to a frozen empire.", tags: ["Environment", "Fantasy"], color: "#BAE6FD", emoji: "🏔️" },
  { id: 17, category: "environments", title: "Mushroom Forest", desc: "Enchanted forest of giant glowing mushrooms inhabited by tiny folk.", tags: ["Environment", "Whimsical"], color: "#D9F99D", emoji: "🍄" },
  { id: 18, category: "environments", title: "Space Station Omega", desc: "A derelict space station drifting through the asteroid belt — eerie and vast.", tags: ["Environment", "Sci-Fi"], color: "#6B7280", emoji: "🛸" },
  { id: 19, category: "environments", title: "Bamboo Shrine", desc: "A serene Shinto shrine hidden deep in a bamboo grove, morning mist rising.", tags: ["Environment", "Japan-Inspired"], color: "#BBF7D0", emoji: "⛩️" },
  { id: 20, category: "environments", title: "Lava Forge", desc: "A dwarven smithy built into the side of an active volcano, fiery and dramatic.", tags: ["Environment", "Fantasy"], color: "#FCA5A5", emoji: "🌋" },
  // Projects
  { id: 21, category: "projects", title: "AURA — Mobile App UI", desc: "Full UI/UX design for a wellness app. User flows, wireframes, high-fidelity mockups.", tags: ["UI/UX", "Mobile App"], color: "#C4B5FD", emoji: "📱" },
  { id: 22, category: "projects", title: "Verdant — E-Commerce", desc: "Brand identity + website design for a sustainable plant shop. 40% increase in conversions.", tags: ["UI/UX", "Web Design"], color: "#86EFAC", emoji: "🛒" },
  { id: 23, category: "projects", title: "NEXUS Dashboard", desc: "A data analytics dashboard for a fintech startup. Dark theme, real-time data viz.", tags: ["UI/UX", "Dashboard"], color: "#67E8F9", emoji: "📊" },
  { id: 24, category: "projects", title: "Folklore — Game UI", desc: "Complete in-game UI system for a narrative RPG — menus, HUD, dialogue boxes.", tags: ["Game UI", "UX Design"], color: "#FDE68A", emoji: "🎮" },
  { id: 25, category: "projects", title: "Bloom — Social Platform", desc: "UX research + design for a community platform for gardening enthusiasts.", tags: ["UX Research", "Social"], color: "#FCA5A5", emoji: "🌸" },
  { id: 26, category: "projects", title: "Koi Restaurant Brand", desc: "Visual identity system — logo, menu design, signage, and digital touchpoints.", tags: ["Branding", "Print"], color: "#F97316", emoji: "🍜" },
  { id: 27, category: "projects", title: "ECHO Podcast App", desc: "Audio streaming app with unique visual waveform interactions and playlist design.", tags: ["UI/UX", "Mobile"], color: "#A78BFA", emoji: "🎧" },
  { id: 28, category: "projects", title: "Lucid — Journaling App", desc: "Calm, minimalist journaling app focused on mental wellness and reflection.", tags: ["UI/UX", "Wellness"], color: "#E0F2FE", emoji: "📓" },
  { id: 29, category: "projects", title: "TrailMap — Hiking App", desc: "Outdoor adventure app with 3D terrain maps, safety checklists, and route sharing.", tags: ["UI/UX", "Maps"], color: "#D9F99D", emoji: "🗺️" },
  { id: 30, category: "projects", title: "Nova — Agency Website", desc: "Award-winning website design for a creative agency. Scroll animations and 3D elements.", tags: ["Web Design", "Animation"], color: "#F472B6", emoji: "🏆" },
  { id: 31, category: "projects", title: "MediTrack Health", desc: "Healthcare patient portal redesign — improved task completion rate by 60%.", tags: ["UI/UX", "Healthcare"], color: "#34D399", emoji: "🏥" },
  { id: 32, category: "projects", title: "SkyDesk Productivity", desc: "B2B SaaS platform for remote teams — design system + full product redesign.", tags: ["Design System", "SaaS"], color: "#818CF8", emoji: "💼" },
];

const CATEGORIES = [
  { key: "all", label: "Tất Cả" },
  { key: "characters", label: "Nhân Vật" },
  { key: "environments", label: "Môi Trường" },
  { key: "projects", label: "Dự Án" },
];

const SERVICES = [
  { icon: "✦", title: "UI/UX Design", desc: "Thiết kế giao diện đẹp, trải nghiệm người dùng mượt mà từ wireframe đến prototype." },
  { icon: "◈", title: "Character Design", desc: "Tạo nhân vật độc đáo cho game, ứng dụng, thương hiệu với phong cách đa dạng." },
  { icon: "▣", title: "Environment Art", desc: "Vẽ cảnh quan, bối cảnh thế giới sáng tạo cho game và dự án sáng tạo." },
  { icon: "◉", title: "Brand Identity", desc: "Xây dựng nhận diện thương hiệu nhất quán, ấn tượng và phù hợp với định vị." },
];

// ─── MODAL ──────────────────────────────────────────────────────────────────

function Modal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ background: "#0E0E14", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: 280,
            background: `radial-gradient(ellipse at 50% 60%, ${project.color}30 0%, #0E0E14 70%)`,
            borderBottom: "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <span style={{ fontSize: 110, filter: "drop-shadow(0 0 40px " + project.color + "80)" }}>
            {project.emoji}
          </span>
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: `linear-gradient(135deg, ${project.color}40 0%, transparent 60%)` }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(t => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: project.color + "20", color: project.color, border: `1px solid ${project.color}40` }}
              >
                {t}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h2>
          <p style={{ color: "#9CA3AF", lineHeight: 1.8 }}>{project.desc}</p>
          <p className="mt-4 text-sm" style={{ color: "#6B7280" }}>
            Ảnh minh hoạ — tải lên ảnh thật của bạn để thay thế placeholder này.
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.08)", color: "#9CA3AF" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.16)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#9CA3AF"; }}
        >✕</button>
      </div>
    </div>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        background: "#12121A",
        border: `1px solid ${hovered ? project.color : "rgba(255,255,255,0.05)"}`,
        transform: hovered ? "translateY(-10px)" : "none",
        boxShadow: hovered ? `0 20px 40px ${project.color}15` : "none",
      }}
    >
      {/* Phần hiển thị Emoji/Ảnh với Gradient nền */}
      <div
        className="relative flex items-center justify-center transition-all duration-500"
        style={{
          height: 200,
          background: hovered
            ? `radial-gradient(circle at 50% 50%, ${project.color}40, transparent)`
            : `radial-gradient(circle at 50% 50%, ${project.color}10, transparent)`,
        }}
      >
        <span className="text-7xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
          style={{ filter: hovered ? `drop-shadow(0 0 20px ${project.color})` : "none" }}>
          {project.emoji}
        </span>

        {/* Overlay khi hover */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 ${hovered ? 'opacity-100' : ''}`}>
          <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs tracking-widest">XEM CHI TIẾT</span>
        </div>
      </div>

      {/* Nội dung text bên dưới */}
      <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block" style={{ color: project.color }}>
          {project.tags[0]}
        </span>
        <h3 className="text-lg font-bold text-white mb-2 leading-tight">{project.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{project.desc}</p>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const filtered = activeCategory === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ background: "#080810", minHeight: "100vh", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", maxWidth: "100vw" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; max-width: 100%; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: #7C3AED50; border-radius: 10px; }
        .glow-text { background: linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #FB923C 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .noise::before { content: ''; position: fixed; inset: 0; opacity: 0.025; pointer-events: none; z-index: 1000;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px #A78BFA30; } 50% { box-shadow: 0 0 40px #A78BFA60; } }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .section-pad { padding-left: clamp(1.5rem, 6vw, 5rem); padding-right: clamp(1.5rem, 6vw, 5rem); }
        .fade-up { animation: fadeUp 0.8s ease both; }
        .btn-primary { background: linear-gradient(135deg, #7C3AED, #DB2777); border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 15px; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px #7C3AED50; }
        .btn-outline { background: transparent; border: 1px solid rgba(167,139,250,0.4); color: #A78BFA; padding: 14px 32px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 15px; }
        .btn-outline:hover { border-color: #A78BFA; background: rgba(167,139,250,0.08); }
        input, textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #E2E8F0; padding: 14px 18px; border-radius: 12px; width: 100%; font-family: inherit; font-size: 15px; outline: none; transition: border 0.2s; }
        input:focus, textarea:focus { border-color: rgba(167,139,250,0.5); }
        input::placeholder, textarea::placeholder { color: #4B5563; }
      `}</style>

      <div className="noise" />


      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between py-4"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "1.5rem", // Menu bám sát lề phải
          background: scrolled ? "rgba(8,8,16,0.9)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => scrollTo("home")}
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em" }}
        >
          <span style={{ color: "#4B5563" }} className="mr-2">Bùi</span>
          <span className="glow-text"> </span>
          <span className="glow-text">Vân Anh</span>

        </div>


        <nav className="hidden md:flex items-center gap-8">
          {["home", "about", "services", "contact"].map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-2 py-2 rounded-full text-sm font-medium capitalize transition-all"
              style={{
                color: activeNav === id ? "#A78BFA" : "#6B7280",
                // Xóa background khi không active để nhìn thanh thoát hơn
                background: activeNav === id ? "rgba(167,139,250,0.1)" : "transparent",
              }}
              onMouseEnter={e => { if (activeNav !== id) e.currentTarget.style.color = "#E2E8F0"; }}
              onMouseLeave={e => { if (activeNav !== id) e.currentTarget.style.color = "#6B7280"; }}
            >
              {id === "home" ? "Home" : id === "about" ? "About" : id === "services" ? "Services" : "Contact"}
            </button>
          ))}

          {/* Tăng lề trái cho nút Hire Me để nó tách biệt hẳn với dàn menu */}
          {/* <button className="btn-primary ml-6" style={{ padding: "10px 22px", fontSize: 14 }}>
            Hire Me ✦
          </button> */}
        </nav>

        {/* Mobile menu btn (giữ nguyên) */}
        <button className="md:hidden text-white text-xl" onClick={() => setMenuOpen(m => !m)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* ── BANNER ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 section-pad"
        style={{ overflow: "hidden", maxWidth: "100%" }}
      >
        {/* BG orbs */}
        <div className="absolute" style={{ top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED18, transparent 70%)", pointerEvents: "none" }} />
        <div className="absolute" style={{ bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #DB277718, transparent 70%)", pointerEvents: "none" }} />
        <div className="absolute" style={{ top: "40%", left: "40%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #1E1B2E, transparent 70%)", pointerEvents: "none" }} />
        <div className="relative max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          {/* Left 30% — Avatar */}
          <div className="w-full md:w-[30%] flex justify-center">
            <div className="float-anim relative" style={{ animationDelay: "0s" }}>
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  width: 260, height: 320,
                  borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                  background: "linear-gradient(135deg, #1E1B2E 0%, #2D1B69 100%)",
                  border: "2px solid rgba(167,139,250,0.2)",
                  boxShadow: "0 0 80px #7C3AED30",
                  animation: "pulse-glow 4s ease-in-out infinite",
                }}
              >
                {/* MẸO: Sau này bạn thay emoji bằng thẻ <img> này để dùng ảnh thật nhé */}
                {/* <img src="duong-dan-anh-cua-ban.jpg" className="w-full h-full object-cover" alt="Avatar" /> */}
                <span style={{ fontSize: 100 }}>👩‍🎨</span>

                {/* Các hạt trang trí nhỏ */}
                <div className="absolute" style={{ top: -10, right: -10, width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA, #F472B6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
                <div className="absolute" style={{ bottom: 10, left: -14, width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #34D399, #22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>◈</div>
              </div>
            </div>
          </div>

          {/* Right 70% — Text */}
          <div className="w-full md:w-[70%] fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #A78BFA)" }} />
              <span style={{ color: "#A78BFA", fontSize: 13, letterSpacing: "0.15em", fontWeight: 500 }}>UI/UX & VISUAL DESIGNER</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.1, fontWeight: 700, marginBottom: 24 }}>
              Xin chào, tôi là<br />

              <span className="glow-text">Vân Anh</span>
            </h1>

            <p style={{ color: "#9CA3AF", fontSize: 18, lineHeight: 1.8, maxWidth: 540, marginBottom: 40 }}>
              Tôi tạo ra những trải nghiệm số đẹp và có hồn — từ giao diện ứng dụng sắc nét đến những nhân vật và thế giới sáng tạo đầy cảm xúc.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button className="btn-primary" onClick={() => scrollTo("services")}>Xem Tác Phẩm ✦</button>
              <button className="btn-outline" onClick={() => scrollTo("contact")}>Liên Hệ</button>
            </div>
            <br />
            <div className="flex flex-wrap gap-8">
              {[["30+", "Tác phẩm"], ["5+", "Năm kinh nghiệm"], ["20+", "Dự án"], ["100%", "Tận tâm"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold glow-text">{n}</div>
                  <div style={{ color: "#4B5563", fontSize: 13, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "#374151" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.12em" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, #374151, transparent)" }} />
        </div> */}
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 section-pad" style={{ background: "linear-gradient(180deg, #080810 0%, #0E0E18 50%, #080810 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <br />
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ ABOUT ME</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
              Về <span className="glow-text">Tôi</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
                Tôi là một UI/UX designer và visual artist với hơn 5 năm kinh nghiệm, chuyên tạo ra các sản phẩm kỹ thuật số đẹp mắt và trải nghiệm người dùng sâu sắc.
              </p>
              <p style={{ color: "#9CA3AF", lineHeight: 1.9, fontSize: 16, marginBottom: 32 }}>
                Bên cạnh thiết kế ứng dụng, tôi còn đam mê vẽ nhân vật và thế giới tưởng tượng — nơi mà nghệ thuật và storytelling gặp nhau để tạo ra những câu chuyện hình ảnh đáng nhớ.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Figma", "Adobe XD", "Procreate", "Photoshop", "Illustrator", "Blender"].map(skill => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ color: "#A78BFA" }}>✦</span>
                    <span style={{ color: "#D1D5DB", fontSize: 14 }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "30+", l: "Tác phẩm nghệ thuật", c: "#A78BFA" },
                { n: "20+", l: "Dự án thiết kế", c: "#F472B6" },
                { n: "5+", l: "Năm kinh nghiệm", c: "#34D399" },
                { n: "15+", l: "Khách hàng hài lòng", c: "#FB923C" },
              ].map(({ n, l, c }) => (
                <div
                  key={l}
                  className="p-6 rounded-2xl text-center"
                  style={{ background: `linear-gradient(145deg, ${c}10, rgba(255,255,255,0.02))`, border: `1px solid ${c}25` }}
                >
                  <div style={{ fontSize: 36, fontWeight: 700, color: c, fontFamily: "'Playfair Display', serif" }}>{n}</div>
                  <div style={{ color: "#6B7280", fontSize: 13, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES / PORTFOLIO ── */}
      <section id="services" className="py-28 section-pad">
        <div className="max-w-6xl mx-auto">
          {/* Services */}
          <div className="text-center mb-16">
            <br />
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ WHAT I DO</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
              Dịch <span className="glow-text">Vụ</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {SERVICES.map((s, index) => (
              <div
                key={s.title}
                className="p-8 rounded-[2rem] transition-all duration-500 group border"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#A78BFA";
                  e.currentTarget.style.background = "rgba(167,139,250,0.05)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white"
                  style={{ background: "rgba(167,139,250,0.1)", color: "#A78BFA" }}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          {/* Portfolio */}
          <div className="text-center mb-10">
            <br />
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ PORTFOLIO</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
              Tác <span className="glow-text">Phẩm</span>
            </h2>
          </div>

          {/* Filter */}

          <div className="flex flex-wrap justify-center gap-4 mb-12 items-center">
            {CATEGORIES.map(c => {
              const isActive = activeCategory === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`
          relative rounded-full text-sm transition-all duration-300 ease-out
          px-8 py-3 

          ${isActive
                      ? "scale-110 text-white font-bold"
                      : "text-gray-500 hover:text-gray-300 scale-100"}
        `}
                >

                  <div className={`
          absolute inset-0 rounded-full transition-all duration-500
          ${isActive
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_20px_rgba(139,92,246,0.5)] opacity-100"
                      : "bg-white/5 border border-white/10 opacity-100 hover:bg-white/10"}
        `} />

                  <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                    {isActive && <span className="mr-2"></span>}
                    {c.label}
                    {isActive && <span className="mr-2"></span>}
                  </span>

                  {/* Vùng đệm ẩn để giữ kích thước nút không đổi khi font-bold làm chữ to ra */}
                  <span className="invisible block h-0 font-bold overflow-hidden uppercase tracking-widest">
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
          <br />
          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
<section id="contact" className="py-32 section-pad relative" style={{ background: "#080810" }}>
  {/* Background orbs */}
  <div className="absolute" style={{ top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED15, transparent 70%)", pointerEvents: "none" }} />
  <div className="absolute" style={{ bottom: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #DB277715, transparent 70%)", pointerEvents: "none" }} />

  <div className="max-w-6xl mx-auto relative z-10">
    {/* Header */}
    <div className="text-center mb-20">
      <br />
      <p style={{ color: "#7C3AED", fontSize: 12, letterSpacing: "0.25em", marginBottom: 16, fontWeight: 600 }}>✦ GET IN TOUCH</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, marginBottom: 16 }}>
        Liên <span className="glow-text">Hệ</span>
      </h2>
      <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #7C3AED, #DB2777)", margin: "0 auto 20px", borderRadius: 99 }} />
      <p style={{ color: "#6B7280", maxWidth: 420, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
        Mình luôn sẵn sàng lắng nghe các ý tưởng mới. Hãy để lại lời nhắn, mình sẽ phản hồi sớm nhất nhé!
      </p>
    </div>

    {/* 2-column layout */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "start" }}
      className="flex-col md:grid">
      
      {/* LEFT: Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Contact items */}
        {[
          { icon: "✉️", label: "Email", value: "anhbuivan@gmail.com", color: "#A78BFA" },
          { icon: "📞", label: "Phone", value: "+84 123 456 789", color: "#F472B6" },
          { icon: "📍", label: "Location", value: "Hà Nội, Việt Nam", color: "#FB923C" },
        ].map((item) => (
          <div key={item.label}
            style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 24px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "40"; e.currentTarget.style.background = item.color + "08"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 16, background: item.color + "15", border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <p style={{ color: "#4B5563", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{item.label}</p>
              <p style={{ color: "#E2E8F0", fontSize: 15, fontWeight: 500 }}>{item.value}</p>
            </div>
          </div>
        ))}

        {/* Social */}
        <div style={{ paddingTop: 8 }}>
          <p style={{ color: "#4B5563", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Mạng xã hội</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { name: "Behance", color: "#0057FF" },
              { name: "Instagram", color: "#E1306C" },
              { name: "LinkedIn", color: "#0A66C2" },
            ].map(s => (
              <button key={s.name}
                style={{ padding: "10px 20px", borderRadius: 12, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "60"; e.currentTarget.style.color = s.color; e.currentTarget.style.background = s.color + "12"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >{s.name}</button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 32, padding: 40, backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Tên", placeholder: "Bùi Vân Anh", type: "text" },
              { label: "Email", placeholder: "email@gmail.com", type: "email" },
            ].map(f => (
              <div key={f.label}>
                <label style={{ color: "#6B7280", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 8 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "13px 18px", color: "#E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Điện thoại", placeholder: "+84 123 456 789", type: "tel" },
              { label: "Tiêu đề", placeholder: "Bạn muốn thiết kế gì?", type: "text" },
            ].map(f => (
              <div key={f.label}>
                <label style={{ color: "#6B7280", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 8 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "13px 18px", color: "#E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            ))}
          </div>

          <div>
            <label style={{ color: "#6B7280", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 8 }}>Lời nhắn</label>
            <textarea placeholder="Viết nội dung tại đây..." rows={5}
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "13px 18px", color: "#E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "none", transition: "border 0.2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          </div>

          <button
            style={{ position: "relative", width: "100%", padding: "16px 32px", borderRadius: 16, border: "none", background: "linear-gradient(135deg, #7C3AED, #DB2777)", color: "white", fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", cursor: "pointer", transition: "all 0.3s", marginTop: 4 }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(124,58,237,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            GỬI TIN NHẮN ✦
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* ── FOOTER ── */}
      <footer className="py-10 section-pad" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}>
            <span className="glow-text">Vân </span>
            <span style={{ color: "#374151" }}> Anh</span>
          </div>
          <p style={{ color: "#374151", fontSize: 13 }}>
            © 2026 Vanh Anh · UI/UX & Visual Designer · Made with ✦
          </p>
          <div className="flex gap-6">
            {["Home", "About", "Services", "Contact"].map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                style={{ color: "#374151", fontSize: 13, transition: "color 0.2s", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = "#A78BFA"}
                onMouseLeave={e => e.currentTarget.style.color = "#374151"}
              >{item}</button>
            ))}
          </div>
        </div>
      </footer>
      {/* Modal */}
      {selectedProject && <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}