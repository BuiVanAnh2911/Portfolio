import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  { id: 1, category: "characters", title: "Warrior Spirit", desc: "A fierce warrior character with glowing armor, crafted for a mobile RPG game. The design draws inspiration from ancient East Asian mythology blended with modern fantasy aesthetics. Every detail from the battle-worn pauldrons to the glowing runes was hand-crafted over 3 weeks.", tags: ["Character Design", "Digital Art"], color: "#FF6B6B", emoji: "⚔️", year: "2024", client: "Indie Studio", tools: ["Procreate", "Photoshop"] },
  { id: 2, category: "characters", title: "Mage of Twilight", desc: "A mystical mage character surrounded by cosmic magic. Concept art for indie game. She wields the power of stars and dusk, her robes woven from the fabric of twilight itself. Created as the main protagonist for a mobile narrative RPG.", tags: ["Character Design", "Fantasy"], color: "#A78BFA", emoji: "🔮", year: "2024", client: "Personal Project", tools: ["Procreate", "Clip Studio"] },
  { id: 3, category: "characters", title: "Cyber Samurai", desc: "Futuristic samurai blending traditional Japanese aesthetics with cyberpunk elements. Neon katana, carbon-fiber hakama, and a ceramic mask digitally etched with clan sigils — this piece explores identity in a post-human world.", tags: ["Character Design", "Cyberpunk"], color: "#34D399", emoji: "🗡️", year: "2023", client: "Game Jam", tools: ["Procreate", "Photoshop"] },
  { id: 4, category: "characters", title: "Forest Guardian", desc: "Nature spirit protecting ancient forests — a gentle giant with glowing eyes. Inspired by Vietnamese forest folklore, this character represents the spirit of the Truong Son mountain range. The bioluminescent moss details took 40+ hours alone.", tags: ["Character Design", "Nature"], color: "#6EE7B7", emoji: "🌿", year: "2024", client: "Personal Project", tools: ["Procreate"] },
  { id: 5, category: "characters", title: "Shadow Rogue", desc: "A stealthy rogue blending into darkness — high-contrast ink-style character art. Monochrome linework with selective spot color, printed as a limited edition art print.", tags: ["Character Design", "Ink Art"], color: "#94A3B8", emoji: "🌑", year: "2023", client: "Print Series", tools: ["Clip Studio", "Illustrator"] },
  { id: 6, category: "characters", title: "Arctic Empress", desc: "Ice queen concept for a fantasy visual novel with intricate costume detailing. Each gemstone, frost pattern, and embroidery element was designed as a separate layer system to allow game engine flexibility.", tags: ["Character Design", "Visual Novel"], color: "#BAE6FD", emoji: "❄️", year: "2024", client: "Visual Novel Studio", tools: ["Procreate", "Photoshop"] },
  { id: 7, category: "characters", title: "Demon Merchant", desc: "A cheerful demon merchant selling forbidden goods — whimsical dark comedy style. Designed as mascot for a tabletop RPG expansion pack. His smile hides 300 years of cunning trade deals.", tags: ["Character Design", "Whimsical"], color: "#FCA5A5", emoji: "👹", year: "2023", client: "Tabletop Publisher", tools: ["Procreate"] },
  { id: 8, category: "characters", title: "Star Pilgrim", desc: "A wandering cosmic traveler searching for the edge of the universe. Designed for a sci-fi anthology comic. The layered translucent robes were a technical challenge — achieved using 12 separate multiply layers.", tags: ["Character Design", "Sci-Fi"], color: "#C4B5FD", emoji: "🌌", year: "2024", client: "Comic Publisher", tools: ["Procreate", "Clip Studio"] },
  { id: 9, category: "characters", title: "Iron Chef Bot", desc: "A robotic chef designed for a restaurant automation brand identity project. Friendly, warm, and trustworthy — three words that guided every design decision. The rounded chassis and warm amber lighting soften its mechanical nature.", tags: ["Character Design", "Branding"], color: "#FDE68A", emoji: "🤖", year: "2024", client: "Tech Startup", tools: ["Illustrator", "Photoshop"] },
  { id: 10, category: "characters", title: "River Sprite", desc: "Delicate water spirit inspired by Southeast Asian folklore. She is the guardian of the Red River, depicted in the Dong Ho woodblock painting style modernized for digital media.", tags: ["Character Design", "Folklore"], color: "#67E8F9", emoji: "💧", year: "2023", client: "Cultural Project", tools: ["Procreate"] },
  { id: 11, category: "environments", title: "Neon Bazaar", desc: "A bustling cyberpunk marketplace lit by neon signs and holographic ads. Every shop sign is written in a fictional script I developed for this world. The scene is designed to be read in a Z-pattern, guiding the viewer's eye through 40+ characters.", tags: ["Environment", "Cyberpunk"], color: "#F472B6", emoji: "🏙️", year: "2024", client: "Game Studio", tools: ["Photoshop", "Blender"] },
  { id: 12, category: "environments", title: "Ancient Observatory", desc: "A mountaintop observatory from a lost civilization, drenched in starlight. Atmospheric perspective was the core challenge — 7 depth layers of hand-painted haze create the illusion of a 50km view.", tags: ["Environment", "Fantasy"], color: "#818CF8", emoji: "🔭", year: "2023", client: "Book Cover", tools: ["Photoshop"] },
  { id: 13, category: "environments", title: "Sunken Cathedral", desc: "An underwater cathedral overgrown with coral and bioluminescent plants. Light caustics, particle systems, and volumetric rays were all painted by hand — no 3D assist. The piece took 6 weeks.", tags: ["Environment", "Underwater"], color: "#22D3EE", emoji: "🐚", year: "2024", client: "Personal Project", tools: ["Photoshop", "Procreate"] },
  { id: 14, category: "environments", title: "Desert Oasis", desc: "A magical oasis suspended in an otherworldly desert — rich golden tones. Inspired by mirages and the visual quality of heat shimmer, the environment floats between reality and illusion.", tags: ["Environment", "Magical Realism"], color: "#FCD34D", emoji: "🏜️", year: "2023", client: "Album Art", tools: ["Photoshop"] },
  { id: 15, category: "environments", title: "Floating Archipelago", desc: "Islands drifting through clouds, connected by rope bridges and waterfalls. The water physics were studied obsessively — each waterfall falls at a different rate based on the island's simulated gravity field.", tags: ["Environment", "Fantasy"], color: "#86EFAC", emoji: "🏝️", year: "2024", client: "Game Studio", tools: ["Photoshop", "Blender"] },
  { id: 16, category: "environments", title: "Ice Fortress", desc: "A forbidding fortress carved into a glacier, home to a frozen empire. The internal lighting — warm amber from deep within, cold blue from the ice walls — creates the tension of a living civilization inside a dead world.", tags: ["Environment", "Fantasy"], color: "#BAE6FD", emoji: "🏔️", year: "2023", client: "Visual Novel", tools: ["Photoshop"] },
  { id: 17, category: "environments", title: "Mushroom Forest", desc: "Enchanted forest of giant glowing mushrooms inhabited by tiny folk. Color theory drove this piece — analogous warm-cool cycles across 5 light sources create depth without contrast confusion.", tags: ["Environment", "Whimsical"], color: "#D9F99D", emoji: "🍄", year: "2024", client: "Children's Book", tools: ["Procreate"] },
  { id: 18, category: "environments", title: "Space Station Omega", desc: "A derelict space station drifting through the asteroid belt — eerie and vast. Hard-surface design was referenced from real ISS module schematics, then deconstructed into ruin.", tags: ["Environment", "Sci-Fi"], color: "#6B7280", emoji: "🛸", year: "2024", client: "Sci-Fi Novel", tools: ["Blender", "Photoshop"] },
  { id: 19, category: "environments", title: "Bamboo Shrine", desc: "A serene Shinto shrine hidden deep in a bamboo grove, morning mist rising. Every element references real architectural measurements from Fushimi Inari. The dappled light effect uses 30 individual overlay layers.", tags: ["Environment", "Japan-Inspired"], color: "#BBF7D0", emoji: "⛩️", year: "2023", client: "Personal Project", tools: ["Photoshop"] },
  { id: 20, category: "environments", title: "Lava Forge", desc: "A dwarven smithy built into the side of an active volcano, fiery and dramatic. The challenge was making the scene readable despite 4 competing warm light sources. Cool ambient bounce from above was the solution.", tags: ["Environment", "Fantasy"], color: "#FCA5A5", emoji: "🌋", year: "2024", client: "Game Studio", tools: ["Photoshop", "Blender"] },
  { id: 21, category: "projects", title: "AURA — Mobile App UI", desc: "Full UI/UX design for a wellness app. User flows, wireframes, high-fidelity mockups. 12 weeks from discovery to handoff. The design system includes 200+ components across 40 screens. Post-launch retention rate increased by 34%.", tags: ["UI/UX", "Mobile App"], color: "#C4B5FD", emoji: "📱", year: "2024", client: "Wellness Startup", tools: ["Figma", "Principle"] },
  { id: 22, category: "projects", title: "Verdant — E-Commerce", desc: "Brand identity + website design for a sustainable plant shop. 40% increase in conversions. The visual system uses hand-drawn botanical illustrations integrated with clean Swiss-grid typography. Every touchpoint — packaging, receipt, notification — was redesigned.", tags: ["UI/UX", "Web Design"], color: "#86EFAC", emoji: "🛒", year: "2023", client: "Verdant Shop", tools: ["Figma", "Webflow"] },
  { id: 23, category: "projects", title: "NEXUS Dashboard", desc: "A data analytics dashboard for a fintech startup. Dark theme, real-time data viz. 8-week engagement: 0 to full design system. The information architecture was rebuilt from scratch after usability testing revealed critical navigation failures.", tags: ["UI/UX", "Dashboard"], color: "#67E8F9", emoji: "📊", year: "2024", client: "Fintech Startup", tools: ["Figma", "Framer"] },
  { id: 24, category: "projects", title: "Folklore — Game UI", desc: "Complete in-game UI system for a narrative RPG — menus, HUD, dialogue boxes. The UI theme is hand-carved woodblock meets digital ink. All icons were hand-drawn, scanned, then refined digitally.", tags: ["Game UI", "UX Design"], color: "#FDE68A", emoji: "🎮", year: "2024", client: "Indie RPG Studio", tools: ["Figma", "Photoshop"] },
  { id: 25, category: "projects", title: "Bloom — Social Platform", desc: "UX research + design for a community platform for gardening enthusiasts. 60 user interviews, 3 rounds of usability testing, and a complete information architecture overhaul. Community engagement metrics doubled in the first month post-launch.", tags: ["UX Research", "Social"], color: "#FCA5A5", emoji: "🌸", year: "2023", client: "Bloom Labs", tools: ["Figma", "Maze"] },
  { id: 26, category: "projects", title: "Koi Restaurant Brand", desc: "Visual identity system — logo, menu design, signage, and digital touchpoints. The mark is an abstract koi constructed entirely from the letterform K. Every color in the palette is pulled directly from real koi specimens.", tags: ["Branding", "Print"], color: "#F97316", emoji: "🍜", year: "2024", client: "Koi Restaurant", tools: ["Illustrator", "InDesign"] },
  { id: 27, category: "projects", title: "ECHO Podcast App", desc: "Audio streaming app with unique visual waveform interactions and playlist design. The signature feature: album art dynamically recolors the entire UI through a canvas-based color extraction algorithm I designed.", tags: ["UI/UX", "Mobile"], color: "#A78BFA", emoji: "🎧", year: "2024", client: "Media Startup", tools: ["Figma", "Principle"] },
  { id: 28, category: "projects", title: "Lucid — Journaling App", desc: "Calm, minimalist journaling app focused on mental wellness and reflection. No streaks, no gamification — just a quiet space. The type system uses a single variable font manipulated by the time of day and mood input.", tags: ["UI/UX", "Wellness"], color: "#E0F2FE", emoji: "📓", year: "2023", client: "Wellness App", tools: ["Figma"] },
  { id: 29, category: "projects", title: "TrailMap — Hiking App", desc: "Outdoor adventure app with 3D terrain maps, safety checklists, and route sharing. Designed for use in gloves, in rain, in low light — every interaction was stress-tested for outdoor conditions.", tags: ["UI/UX", "Maps"], color: "#D9F99D", emoji: "🗺️", year: "2024", client: "Outdoor Brand", tools: ["Figma", "Mapbox"] },
  { id: 30, category: "projects", title: "Nova — Agency Website", desc: "Award-winning website design for a creative agency. Scroll animations and 3D elements. Nominated for Awwwards Site of the Year 2024. The scroll-driven narrative structure was storyboarded like a film before a single pixel was designed.", tags: ["Web Design", "Animation"], color: "#F472B6", emoji: "🏆", year: "2024", client: "Nova Agency", tools: ["Figma", "Webflow", "GSAP"] },
  { id: 31, category: "projects", title: "MediTrack Health", desc: "Healthcare patient portal redesign — improved task completion rate by 60%. This was the most research-intensive project I've undertaken: 200 hours of stakeholder interviews, clinical workflow shadowing, and accessibility audits.", tags: ["UI/UX", "Healthcare"], color: "#34D399", emoji: "🏥", year: "2024", client: "MediTrack Corp", tools: ["Figma", "UserTesting"] },
  { id: 32, category: "projects", title: "SkyDesk Productivity", desc: "B2B SaaS platform for remote teams — design system + full product redesign. The design system ships with 500+ components, 12 semantic color tokens, and full dark/light mode support. Reduced designer-dev handoff time by 70%.", tags: ["Design System", "SaaS"], color: "#818CF8", emoji: "💼", year: "2024", client: "SkyDesk Inc", tools: ["Figma", "Storybook"] },
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

// ─── PROJECT DETAIL PAGE ─────────────────────────────────────────────────────

function ProjectDetail({ project, onClose, isDark }) {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const bg      = isDark ? "#080810" : "#F8F7FF";
  const cardBg  = isDark ? "#12121A" : "#FFFFFF";
  const text     = isDark ? "#E2E8F0" : "#1A1A2E";
  const subText  = isDark ? "#9CA3AF" : "#6B7280";
  const border   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const c        = project.color;

  const related = PROJECTS.filter(p => p.category === project.category && p.id !== project.id).slice(0, 3);

  // shared section-header style
  const SectionLabel = ({ children }) => (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: c, marginBottom: 10 }}>✦ {children}</p>
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${c}, transparent)`, borderRadius: 99 }} />
    </div>
  );

  const processSteps = [
    { step: "01", title: "Research & Discovery", desc: "Nghiên cứu sâu về yêu cầu, đối tượng người dùng, và tham khảo các tác phẩm liên quan." },
    { step: "02", title: "Concept & Sketch",     desc: "Phác thảo nhiều hướng ý tưởng, chọn lọc và phát triển concept tiềm năng nhất." },
    { step: "03", title: "Refine & Deliver",     desc: "Hoàn thiện từng chi tiết, lấy phản hồi, và bàn giao file hoàn chỉnh cho khách hàng." },
  ];

  return (
    <div
      ref={containerRef}
      onScroll={e => setScrolled(e.currentTarget.scrollTop > 60)}
      style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto", background: bg, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .det-btn { border: none; color: white; padding: 14px 36px; border-radius: 50px; font-weight: 700; cursor: pointer; font-size: 14px; letter-spacing: 0.08em; transition: all 0.3s; }
        .det-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,0,0,0.25); }
        @media (max-width: 720px) { .det-hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── Sticky top bar ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 48px",
        background: scrolled ? (isDark ? "rgba(8,8,16,0.92)" : "rgba(248,247,255,0.92)") : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "none",
        transition: "all 0.3s",
      }}>
        <button
          onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", border: `1px solid ${border}`, color: subText, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = c + "20"; e.currentTarget.style.color = c; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.color = subText; }}
        >← Quay lại</button>
        <div style={{ display: "flex", gap: 8 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 99, fontWeight: 600, background: c + "20", color: c, border: `1px solid ${c}40` }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div style={{
        height: "52vh", minHeight: 320,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse at 50% 70%, ${c}22 0%, ${bg} 68%)`,
      }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${c}0d 0%, transparent 55%)` }} />
        <span style={{ fontSize: 150, filter: `drop-shadow(0 0 70px ${c}70)`, position: "relative", zIndex: 1, userSelect: "none", lineHeight: 1 }}>
          {project.emoji}
        </span>
        <div style={{ position: "absolute", top: "15%", left: "12%", width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${c}12, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "8%",  width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, ${c}09, transparent 70%)`, pointerEvents: "none" }} />
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 48px 100px" }}>

        {/* Hero info grid: title-desc LEFT, meta RIGHT */}
        <div
          className="det-hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 48, marginBottom: 72, alignItems: "start" }}
        >
          {/* Title + desc */}
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: c, marginBottom: 14, display: "block" }}>
              {project.category === "characters" ? "✦ Nhân Vật" : project.category === "environments" ? "✦ Môi Trường" : "✦ Dự Án"}
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.15, color: text, marginBottom: 24, wordBreak: "break-word" }}>
              {project.title}
            </h1>
            <p style={{ color: subText, fontSize: 16, lineHeight: 2 }}>{project.desc}</p>
          </div>

          {/* Meta card — same card style as product */}
          <div style={{
            background: cardBg, borderRadius: 24,
            border: `1px solid ${border}`,
            boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.35)" : "0 4px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}>
            {/* Color top stripe */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${c}, ${c}44)` }} />
            <div style={{ padding: "24px 24px 20px" }}>
              {[
                { label: "Năm",       value: project.year },
                { label: "Khách hàng", value: project.client },
                { label: "Phân loại", value: project.tags[0] },
              ].map((item, i, arr) => (
                <div key={item.label} style={{ marginBottom: i < arr.length - 1 ? 18 : 0, paddingBottom: i < arr.length - 1 ? 18 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none" }}>
                  <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: c, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: text }}>{item.value}</p>
                </div>
              ))}
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${border}` }}>
                <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: c, marginBottom: 10 }}>Công cụ</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tools.map(tool => (
                    <span key={tool} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: subText, border: `1px solid ${border}` }}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Upload ảnh (chỉ upload từ máy) ── */}
        <ProjectImageUpload project={project} isDark={isDark} text={text} subText={subText} border={border} cardBg={cardBg} />

        {/* ── Quy trình ── */}
        <div style={{ marginTop: 72 }}>
          <SectionLabel>Quy Trình Thực Hiện</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {processSteps.map((item, i) => (
              <ProcessCard key={item.step} item={item} c={c} isDark={isDark} cardBg={cardBg} text={text} subText={subText} border={border} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* ── Tác phẩm liên quan ── */}
        {related.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <SectionLabel>Tác Phẩm Liên Quan</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {related.map(p => (
                <RelatedCard key={p.id} p={p} isDark={isDark} cardBg={cardBg} text={text} subText={subText} border={border} onClose={onClose} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{
          marginTop: 72, padding: "56px 48px", borderRadius: 28, textAlign: "center",
          background: `linear-gradient(135deg, ${c}18, ${cardBg})`,
          border: `1px solid ${c}30`,
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, marginBottom: 12, color: text }}>
            Muốn có tác phẩm tương tự?
          </h3>
          <p style={{ color: subText, marginBottom: 28, fontSize: 15 }}>Hãy liên hệ để thảo luận về dự án của bạn.</p>
          <button className="det-btn" style={{ background: `linear-gradient(135deg, ${c}, ${c}bb)` }} onClick={onClose}>
            Liên Hệ Ngay ✦
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Process card ──────────────────────────────────────────────────────────────
function ProcessCard({ item, c, isDark, cardBg, text, subText, border }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg, borderRadius: 20,
        border: `1px solid ${hovered ? c : border}`,
        padding: "28px 24px 24px",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 40px ${c}20` : (isDark ? "none" : "0 2px 14px rgba(0,0,0,0.05)"),
        transition: "all 0.35s ease",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 48, fontWeight: 700, color: hovered ? c : c + "35", fontFamily: "'Playfair Display', serif", lineHeight: 1, marginBottom: 16, transition: "color 0.3s" }}>
        {item.step}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: text, marginBottom: 10 }}>{item.title}</h3>
      <p style={{ fontSize: 13, color: subText, lineHeight: 1.75, flex: 1 }}>{item.desc}</p>
    </div>
  );
}

// ── Related card ──────────────────────────────────────────────────────────────
function RelatedCard({ p, isDark, cardBg, text, subText, border, onClose }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg, borderRadius: 20, cursor: "pointer",
        border: `1px solid ${hovered ? p.color : border}`,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 40px ${p.color}22` : (isDark ? "none" : "0 2px 14px rgba(0,0,0,0.05)"),
        transition: "all 0.35s ease",
        overflow: "hidden",
      }}
    >
      {/* Icon area */}
      <div style={{
        height: 140, display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered
          ? `radial-gradient(circle at 50% 60%, ${p.color}35, transparent 70%)`
          : `radial-gradient(circle at 50% 60%, ${p.color}15, transparent 70%)`,
        transition: "background 0.35s",
      }}>
        <span style={{ fontSize: 56, transform: hovered ? "scale(1.15)" : "scale(1)", transition: "transform 0.35s", filter: hovered ? `drop-shadow(0 0 16px ${p.color}80)` : "none" }}>{p.emoji}</span>
      </div>
      {/* Text */}
      <div style={{ padding: "16px 18px 20px" }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: p.color, marginBottom: 6, display: "block" }}>{p.tags[0]}</span>
        <p style={{ fontSize: 14, fontWeight: 700, color: text, marginBottom: 4 }}>{p.title}</p>
        <p style={{ fontSize: 12, color: subText }}>{p.year}</p>
      </div>
    </div>
  );
}

// ── Image upload (click only, no drag) ───────────────────────────────────────


// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
      style={{
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
        color: isDark ? "#E2E8F0" : "#1A1A2E",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 500,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = isDark ? "rgba(167,139,250,0.15)" : "rgba(124,58,237,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"; }}
    >
      <span style={{ fontSize: 16 }}>{isDark ? "☀️" : "🌙"}</span>
     
    </button>
  );
}

// ─── MODAL ──────────────────────────────────────────────────────────────────

function Modal({ project, onClose, isDark }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const overlay = isDark ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)";
  const bg = isDark ? "#0E0E14" : "#FFFFFF";
  const text = isDark ? "#E2E8F0" : "#1A1A2E";
  const subText = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: overlay, backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ background: bg, border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: "0 40px 80px rgba(0,0,0,0.3)" }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ height: 260, background: `radial-gradient(ellipse at 50% 60%, ${project.color}30 0%, ${bg} 70%)`, borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}
        >
          <span style={{ fontSize: 100, filter: `drop-shadow(0 0 40px ${project.color}80)` }}>{project.emoji}</span>
        </div>
        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: project.color + "20", color: project.color, border: `1px solid ${project.color}40` }}>
                {t}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: text }}>{project.title}</h2>
          <p style={{ color: subText, lineHeight: 1.8 }}>{project.desc.slice(0, 120)}...</p>
          <p className="mt-3 text-xs" style={{ color: isDark ? "#6B7280" : "#9CA3AF" }}>
            {project.year} · {project.client}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: subText, border: "none", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.16)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.color = subText; }}
        >✕</button>
      </div>
    </div>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────

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
      className="group relative cursor-pointer transition-all duration-500"
      style={{
        background: bg,
        border: `1px solid ${hovered ? project.color : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)")}`,
        borderRadius: 24,
        transform: hovered ? "translateY(-8px)" : "none",
        boxShadow: hovered ? `0 24px 48px ${project.color}25` : (isDark ? "none" : "0 2px 14px rgba(0,0,0,0.07)"),
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image area — overflow hidden only here */}
      <div
        className="relative flex items-center justify-center transition-all duration-500 flex-shrink-0"
        style={{
          height: 190,
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          background: hovered
            ? `radial-gradient(circle at 50% 50%, ${project.color}40, transparent 70%)`
            : `radial-gradient(circle at 50% 50%, ${project.color}15, transparent 70%)`,
        }}
      >
        <span
          className="text-7xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
          style={{ filter: hovered ? `drop-shadow(0 0 20px ${project.color})` : "none", lineHeight: 1 }}
        >
          {project.emoji}
        </span>
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.45)", opacity: hovered ? 1 : 0 }}
        >
          <span style={{ background: "white", color: "black", padding: "8px 20px", borderRadius: 99, fontWeight: 700, fontSize: 11, letterSpacing: "0.15em" }}>
            XEM CHI TIẾT
          </span>
        </div>
      </div>

      {/* Text area — never clipped */}
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: project.color, marginBottom: 8, display: "block" }}>
          {project.tags[0]}
        </span>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: text, lineHeight: 1.4, marginBottom: 8 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 12, color: subText, lineHeight: 1.7, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.desc}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}` }}>
          <span style={{ fontSize: 11, color: isDark ? "#4B5563" : "#C0BDD8" }}>{project.year}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: project.color }}>→ Chi tiết</span>
        </div>
      </div>
    </div>
  );
}

// ─── AVATAR UPLOAD ────────────────────────────────────────────────────────────

function AvatarUpload({ avatarUrl, onUpload, isDark }) {
  const inputRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <div
      className="relative float-anim cursor-pointer"
      onClick={() => inputRef.current?.click()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden transition-all duration-300"
        style={{
          width: 260, height: 320,
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          background: avatarUrl ? "transparent" : "linear-gradient(135deg, #1E1B2E 0%, #2D1B69 100%)",
          border: `2px solid ${hovered ? "rgba(167,139,250,0.6)" : "rgba(167,139,250,0.2)"}`,
          boxShadow: hovered ? "0 0 80px #7C3AED50" : "0 0 80px #7C3AED30",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: 100 }}>👩‍🎨</span>
        )}
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.6)", opacity: hovered ? 1 : 0, borderRadius: "inherit" }}
        >
          <span style={{ fontSize: 32, marginBottom: 8 }}>📷</span>
          <span className="text-white text-xs font-bold tracking-widest">ĐỔI ẢNH</span>
        </div>
      </div>
      <div className="absolute" style={{ top: -10, right: -10, width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA, #F472B6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
      <div className="absolute" style={{ bottom: 10, left: -14, width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #34D399, #22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>◈</div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
    </div>
  );
}

// ── Image upload (click only, no drag) ───────────────────────────────────────
function ProjectImageUpload({ project, isDark, text, subText, border, cardBg }) {
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);
  const c = project.color;

  const handleFiles = (e) => {
    const newImgs = Array.from(e.target.files)
      .filter(f => f.type.startsWith("image/"))
      .map(f => ({ url: URL.createObjectURL(f), name: f.name }));
    setImages(prev => [...prev, ...newImgs].slice(0, 6));
  };

  return (
    <div>
      {/* Section header */}
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: c, marginBottom: 10 }}>✦ Hình Ảnh Tác Phẩm</p>
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${c}, transparent)`, borderRadius: 99, marginBottom: 32 }} />

      {/* Upload button */}
      <button
        onClick={() => inputRef.current?.click()}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 28px", borderRadius: 16, border: `2px dashed ${border}`,
          background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          color: subText, cursor: "pointer", fontSize: 14, fontWeight: 500,
          marginBottom: images.length ? 24 : 0, transition: "all 0.2s",
          width: "100%", justifyContent: "center",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.color = c; e.currentTarget.style.background = c + "08"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = subText; e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"; }}
      >
        <span style={{ fontSize: 22 }}>📁</span>
        Chọn ảnh từ máy của bạn · PNG, JPG, WebP · Tối đa 6 ảnh
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} />

      {/* Grid */}
      {images.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", background: cardBg, border: `1px solid ${border}` }}
              onMouseEnter={e => e.currentTarget.querySelector(".del-btn").style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.querySelector(".del-btn").style.opacity = "0"}
            >
              <img src={img.url} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                className="del-btn"
                onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.7)", color: "white", fontSize: 12, cursor: "pointer", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceCard({ s, c, isDark, text, subText, border }) {
  const [hovered, setHovered] = useState(false);
  const bg = isDark ? "#12121A" : "#FFFFFF";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        border: `1px solid ${hovered ? c : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)")}`,
        borderRadius: 24,
        transform: hovered ? "translateY(-8px)" : "none",
        boxShadow: hovered ? `0 24px 48px ${c}25` : (isDark ? "none" : "0 2px 14px rgba(0,0,0,0.07)"),
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s ease",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Icon area */}
      <div
        style={{
          height: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hovered
            ? `radial-gradient(circle at 50% 60%, ${c}35, transparent 70%)`
            : `radial-gradient(circle at 50% 60%, ${c}12, transparent 70%)`,
          transition: "background 0.4s ease",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            background: hovered ? c : (isDark ? `${c}20` : `${c}15`),
            color: hovered ? "white" : c,
            boxShadow: hovered ? `0 12px 32px ${c}50` : "none",
            transform: hovered ? "scale(1.12) rotate(-6deg)" : "scale(1) rotate(0deg)",
            transition: "all 0.4s ease",
          }}
        >
          {s.icon}
        </div>
      </div>

      {/* Text area */}
      <div style={{ padding: "20px 24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: c, marginBottom: 8, display: "block" }}>
          Service
        </span>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: text, marginBottom: 10, lineHeight: 1.3 }}>
          {s.title}
        </h3>
        <p style={{ fontSize: 13, color: subText, lineHeight: 1.75, flex: 1 }}>
          {s.desc}
        </p>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c }}>Tìm hiểu thêm →</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [activeNav, setActiveNav] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailProject, setDetailProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Theme values
  const bg = isDark ? "#080810" : "#F8F7FF";
  const navBg = isDark ? "rgba(8,8,16,0.9)" : "rgba(248,247,255,0.9)";
  const text = isDark ? "#E2E8F0" : "#1A1A2E";
  const subText = isDark ? "#9CA3AF" : "#6B7280";
  const border = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
  const cardBg = isDark ? "#12121A" : "#FFFFFF";
  const sectionBg = isDark ? "linear-gradient(180deg, #080810 0%, #0E0E18 50%, #080810 100%)" : "linear-gradient(180deg, #F8F7FF 0%, #F0EEFF 50%, #F8F7FF 100%)";

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

  const handleProjectClick = (project) => {
    setDetailProject(project);
  };

  if (detailProject) {
    return <ProjectDetail project={detailProject} onClose={() => setDetailProject(null)} isDark={isDark} />;
  }

  return (
    <div style={{ background: bg, minHeight: "100vh", color: text, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", maxWidth: "100vw", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; max-width: 100%; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #7C3AED50; border-radius: 10px; }
        .glow-text { background: linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #FB923C 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .noise::before { content: ''; position: fixed; inset: 0; opacity: 0.02; pointer-events: none; z-index: 1000;
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
        input, textarea { font-family: inherit; outline: none; transition: border 0.2s; }
        input::placeholder, textarea::placeholder { color: #4B5563; }
        @media (max-width: 640px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="noise" />

      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between py-4"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          background: scrolled ? navBg : "transparent",
          borderBottom: scrolled ? `1px solid ${border}` : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => scrollTo("home")}
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em" }}
        >
        
          <span className="glow-text">Bùi Vân Anh</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {["home", "about", "services", "contact"].map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-2 rounded-full text-sm font-medium capitalize transition-all"
                style={{
                  color: activeNav === id ? "#A78BFA" : subText,
                  background: activeNav === id ? "rgba(167,139,250,0.1)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={e => { if (activeNav !== id) e.currentTarget.style.color = text; }}
                onMouseLeave={e => { if (activeNav !== id) e.currentTarget.style.color = subText; }}
              >
                {id === "home" ? "Home" : id === "about" ? "About" : id === "services" ? "Services" : "Contact"}
              </button>
            ))}
          </nav>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(d => !d)} />
        </div>

        <button className="md:hidden text-2xl" style={{ color: text, background: "none", border: "none", cursor: "pointer" }} onClick={() => setMenuOpen(m => !m)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6"
          style={{ background: isDark ? "rgba(8,8,16,0.97)" : "rgba(248,247,255,0.97)", backdropFilter: "blur(20px)" }}
        >
          {["home", "about", "services", "contact"].map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-2xl font-bold capitalize transition-all"
              style={{ color: activeNav === id ? "#A78BFA" : subText, background: "none", border: "none", cursor: "pointer", fontFamily: "'Playfair Display', serif" }}
            >
              {id === "home" ? "Home" : id === "about" ? "About" : id === "services" ? "Services" : "Contact"}
            </button>
          ))}
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(d => !d)} />
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 section-pad" style={{ overflow: "hidden" }}>
        <div className="absolute" style={{ top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED18, transparent 70%)", pointerEvents: "none" }} />
        <div className="absolute" style={{ bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #DB277718, transparent 70%)", pointerEvents: "none" }} />

        <div className="relative max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          {/* Avatar with upload */}
          <div className="w-full md:w-[30%] flex flex-col items-center gap-3">
            <AvatarUpload avatarUrl={avatarUrl} onUpload={setAvatarUrl} isDark={isDark} />
            <p className="text-xs text-center" style={{ color: isDark ? "#374151" : "#D1D5DB" }}>
              {avatarUrl ? "Click để đổi ảnh" : "Click để tải ảnh của bạn"}
            </p>
          </div>

          {/* Text */}
          <div className="w-full md:w-[70%] fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #A78BFA)" }} />
              <span style={{ color: "#A78BFA", fontSize: 13, letterSpacing: "0.15em", fontWeight: 500 }}>UI/UX & VISUAL DESIGNER</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.1, fontWeight: 700, marginBottom: 24, color: text }}>
              Xin chào, tôi là<br />
              <span className="glow-text">Vân Anh</span>
            </h1>
            <p style={{ color: subText, fontSize: 18, lineHeight: 1.8, maxWidth: 540, marginBottom: 40 }}>
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
                  <div style={{ color: isDark ? "#4B5563" : "#9CA3AF", fontSize: 13, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 section-pad" style={{ background: sectionBg }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <br />
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ ABOUT ME</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text }}>
              Về <span className="glow-text">Tôi</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: subText, lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
                Tôi là một UI/UX designer và visual artist với hơn 5 năm kinh nghiệm, chuyên tạo ra các sản phẩm kỹ thuật số đẹp mắt và trải nghiệm người dùng sâu sắc.
              </p>
              <p style={{ color: subText, lineHeight: 1.9, fontSize: 16, marginBottom: 32 }}>
                Bên cạnh thiết kế ứng dụng, tôi còn đam mê vẽ nhân vật và thế giới tưởng tượng — nơi mà nghệ thuật và storytelling gặp nhau để tạo ra những câu chuyện hình ảnh đáng nhớ.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Figma", "Adobe XD", "Procreate", "Photoshop", "Illustrator", "Blender"].map(skill => (
                  <div key={skill} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${border}` }}>
                    <span style={{ color: "#A78BFA" }}>✦</span>
                    <span style={{ color: text, fontSize: 14 }}>{skill}</span>
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
                <div key={l} className="p-6 rounded-2xl text-center"
                  style={{ background: `linear-gradient(145deg, ${c}10, ${isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)"})`, border: `1px solid ${c}25` }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: c, fontFamily: "'Playfair Display', serif" }}>{n}</div>
                  <div style={{ color: subText, fontSize: 13, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES / PORTFOLIO ── */}
      <section id="services" className="py-28 section-pad" style={{ background: bg }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <br />
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ WHAT I DO</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text }}>
              Dịch <span className="glow-text">Vụ</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {SERVICES.map((s, i) => {
              const colors = ["#A78BFA", "#F472B6", "#34D399", "#FB923C"];
              const c = colors[i % colors.length];
              return (
                <ServiceCard key={s.title} s={s} c={c} isDark={isDark} text={text} subText={subText} border={border} />
              );
            })}
          </div>

          {/* Portfolio */}
          <div className="text-center mb-10">
            <br />
            <p style={{ color: "#7C3AED", fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>✦ PORTFOLIO</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text }}>
              Tác <span className="glow-text">Phẩm</span>
            </h2>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 items-center">
            {CATEGORIES.map(c => {
              const isActive = activeCategory === c.key;
              return (
                <button key={c.key} onClick={() => setActiveCategory(c.key)}
                  className="relative rounded-full text-sm transition-all duration-300 ease-out px-8 py-3"
                  style={{ transform: isActive ? "scale(1.1)" : "scale(1)", fontWeight: isActive ? 700 : 400, border: "none", cursor: "pointer", color: isActive ? "white" : subText, background: isActive ? "linear-gradient(135deg, #7C3AED, #DB2777)" : (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"), boxShadow: isActive ? "0 0 20px rgba(139,92,246,0.5)" : "none" }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <br />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onClick={handleProjectClick} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 section-pad relative" style={{ background: sectionBg }}>
        <div className="absolute" style={{ top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED15, transparent 70%)", pointerEvents: "none" }} />
        <div className="absolute" style={{ bottom: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #DB277715, transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <br />
            <p style={{ color: "#7C3AED", fontSize: 12, letterSpacing: "0.25em", marginBottom: 16, fontWeight: 600 }}>✦ GET IN TOUCH</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, marginBottom: 16, color: text }}>
              Liên <span className="glow-text">Hệ</span>
            </h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #7C3AED, #DB2777)", margin: "0 auto 20px", borderRadius: 99 }} />
            <p style={{ color: subText, maxWidth: 420, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Mình luôn sẵn sàng lắng nghe các ý tưởng mới. Hãy để lại lời nhắn, mình sẽ phản hồi sớm nhất nhé!
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { icon: "✉️", label: "Email", value: "anhbuivan@gmail.com", color: "#A78BFA" },
                { icon: "📞", label: "Phone", value: "+84 123 456 789", color: "#F472B6" },
                { icon: "📍", label: "Location", value: "Hà Nội, Việt Nam", color: "#FB923C" },
              ].map(item => (
                <div key={item.label}
                  style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 24px", borderRadius: 20, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)", border: `1px solid ${border}`, transition: "all 0.3s", boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.04)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "40"; e.currentTarget.style.background = item.color + "08"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)"; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: item.color + "15", border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: "#4B5563", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{item.label}</p>
                    <p style={{ color: text, fontSize: 15, fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}

              <div style={{ paddingTop: 8 }}>
                <p style={{ color: subText, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Mạng xã hội</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[{ name: "Behance", color: "#0057FF" }, { name: "Instagram", color: "#E1306C" }, { name: "LinkedIn", color: "#0A66C2" }].map(s => (
                    <button key={s.name}
                      style={{ padding: "10px 20px", borderRadius: 12, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${border}`, color: subText, cursor: "pointer", transition: "all 0.3s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "60"; e.currentTarget.style.color = s.color; e.currentTarget.style.background = s.color + "12"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = subText; e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"; }}
                    >{s.name}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.9)", border: `1px solid ${border}`, borderRadius: 32, padding: 40, backdropFilter: "blur(20px)", boxShadow: isDark ? "none" : "0 8px 40px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[{ label: "Tên", placeholder: "Bùi Vân Anh", type: "text" }, { label: "Email", placeholder: "email@gmail.com", type: "email" }].map(f => (
                    <div key={f.label}>
                      <label style={{ color: subText, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 8 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        style={{ width: "100%", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${border}`, borderRadius: 14, padding: "13px 18px", color: text, fontSize: 14 }}
                        onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = border}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[{ label: "Điện thoại", placeholder: "+84 123 456 789", type: "tel" }, { label: "Tiêu đề", placeholder: "Bạn muốn thiết kế gì?", type: "text" }].map(f => (
                    <div key={f.label}>
                      <label style={{ color: subText, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 8 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        style={{ width: "100%", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${border}`, borderRadius: 14, padding: "13px 18px", color: text, fontSize: 14 }}
                        onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                        onBlur={e => e.target.style.borderColor = border}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ color: subText, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 8 }}>Lời nhắn</label>
                  <textarea placeholder="Viết nội dung tại đây..." rows={5}
                    style={{ width: "100%", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${border}`, borderRadius: 14, padding: "13px 18px", color: text, fontSize: 14, resize: "none" }}
                    onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                    onBlur={e => e.target.style.borderColor = border}
                  />
                </div>
                <button
                  style={{ width: "100%", padding: "16px 32px", borderRadius: 16, border: "none", background: "linear-gradient(135deg, #7C3AED, #DB2777)", color: "white", fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", cursor: "pointer", transition: "all 0.3s" }}
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
      <footer className="py-10 section-pad" style={{ borderTop: `1px solid ${border}`, background: bg }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}>
            <span className="glow-text">Vân </span>
            <span style={{ color: subText }}> Anh</span>
          </div>
          <p style={{ color: isDark ? "#374151" : "#D1D5DB", fontSize: 13 }}>
         
          </p>
          <div className="flex gap-6">
            {["Home", "About", "Services", "Contact"].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                style={{ color: isDark ? "#374151" : "#D1D5DB", fontSize: 13, transition: "color 0.2s", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = "#A78BFA"}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? "#374151" : "#D1D5DB"}
              >{item}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}