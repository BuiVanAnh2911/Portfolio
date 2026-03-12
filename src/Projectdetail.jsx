import { useEffect, useState } from "react";

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
//   {
//     id: 7,
//     category: "projects",
//     title: "NEXUS Dashboard",
//     desc: "A clean fintech dashboard with real-time analytics components.",
//     tags: ["UI/UX", "Dashboard"],
//     color: "#FCD34D",
//     cover: "/images/projects/project7/cover.jpg",
//     gallery: [
//       "/images/projects/project7/img1.jpg",
//       "/images/projects/project7/img2.jpg",
//       "/images/projects/project7/img3.jpg",
//       "/images/projects/project7/img4.jpg",
//     ],
//     year: "2024",
//     client: "Fintech",
//     tools: ["Figma"],
//   },
//   {
//     id: 8,
//     category: "projects",
//     title: "Creative Portfolio",
//     desc: "A modern portfolio website for a visual designer.",
//     tags: ["Web Design", "Portfolio"],
//     color: "#FB923C",
//     cover: "/images/projects/project8/cover.jpg",
//     gallery: [
//       "/images/projects/project8/img1.jpg",
//       "/images/projects/project8/img2.jpg",
//       "/images/projects/project8/img3.jpg",
//       "/images/projects/project8/img4.jpg",
//     ],
//     year: "2024",
//     client: "Personal",
//     tools: ["Figma", "Webflow"],
//   },
];

// ─── IMAGE SLIDER GALLERY ─────────────────────────────────────────────────

function GallerySlider({ images, color, isDark }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null); 
  const [animating, setAnimating] = useState(false);

  const go = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "right"
          ? (prev + 1) % images.length
          : (prev - 1 + images.length) % images.length
      );
      setAnimating(false);
    }, 320);
  };

  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const cardBg = isDark ? "#12121A" : "#FFFFFF";

  return (
    <div>
      {/* Main slide */}
      <div
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          background: cardBg,
          border: `1px solid ${border}`,
          boxShadow: isDark ? `0 16px 48px rgba(0,0,0,0.4)` : `0 8px 32px rgba(0,0,0,0.1)`,
          aspectRatio: "16 / 9",
          marginBottom: 16,
        }}
      >
        <img
          key={current}
          src={images[current]}
          alt={`Slide ${current + 1}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            background: isDark ? "#0c0c16" : "#f0eeff",
            animation: animating
              ? direction === "right"
                ? "slideOutLeft 0.32s ease forwards"
                : "slideOutRight 0.32s ease forwards"
              : "slideIn 0.32s ease forwards",
          }}
        />

        {/* Prev button */}
        <button
          onClick={() => go("left")}
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1px solid ${color}60`,
            background: isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)",
            color: color,
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = color;
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)";
            e.currentTarget.style.color = color;
          }}
        >
          ‹
        </button>

        {/* Next button */}
        <button
          onClick={() => go("right")}
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1px solid ${color}60`,
            background: isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)",
            color: color,
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = color;
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)";
            e.currentTarget.style.color = color;
          }}
        >
          ›
        </button>

        {/* Counter badge */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 16,
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 99,
            background: "rgba(0,0,0,0.55)",
            color: "white",
            backdropFilter: "blur(6px)",
            letterSpacing: "0.08em",
          }}
        >
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 4,
          scrollbarWidth: "none",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => { setDirection(i > current ? "right" : "left"); setCurrent(i); }}
            style={{
              flexShrink: 0,
              width: 72,
              height: 52,
              borderRadius: 10,
              overflow: "hidden",
              cursor: "pointer",
              border: `2px solid ${i === current ? color : "transparent"}`,
              opacity: i === current ? 1 : 0.45,
              transition: "all 0.2s",
              boxShadow: i === current ? `0 0 12px ${color}50` : "none",
            }}
          >
            <img
              src={img}
              alt={`thumb-${i}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }
      `}</style>
    </div>
  );
}

// ─── RELATED CARD ─────────────────────────────────────────────────────────

function RelatedCard({ p, isDark, cardBg, text, subText, border, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(p)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg,
        borderRadius: 20,
        cursor: "pointer",
        border: `1px solid ${hovered ? p.color : border}`,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 40px ${p.color}22` : isDark ? "none" : "0 2px 14px rgba(0,0,0,0.05)",
        transition: "all 0.35s ease",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          background: isDark ? "#0f0f18" : "#f6f6fb",
        }}
      >
        <img
          src={p.cover}
          alt={p.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.35s ease",
          }}
        />
      </div>

      <div style={{ padding: "16px 18px 20px" }}>
        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontWeight: 700,
            color: p.color,
            marginBottom: 6,
            display: "block",
          }}
        >
          {p.tags[0]}
        </span>
        <p style={{ fontSize: 14, fontWeight: 700, color: text, marginBottom: 4 }}>{p.title}</p>
        <p style={{ fontSize: 12, color: subText }}>{p.year}</p>
      </div>
    </div>
  );
}

// ─── MAIN DETAIL PAGE ─────────────────────────────────────────────────────

export default function ProjectDetail({ project, onClose, onSelect, isDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const bg      = isDark ? "#080810" : "#F8F7FF";
  const cardBg  = isDark ? "#12121A" : "#FFFFFF";
  const text    = isDark ? "#E2E8F0" : "#1A1A2E";
  const subText = isDark ? "#9CA3AF" : "#6B7280";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const c       = project.color;

  const related = PROJECTS.filter(
    (p) => p.category === project.category && p.id !== project.id
  ).slice(0, 3);

  const SectionLabel = ({ children }) => (
    <div style={{ marginBottom: 30 }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: c, marginBottom: 10 }}>
        ✦ {children}
      </p>
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${c}, transparent)`, borderRadius: 99 }} />
    </div>
  );

  return (
    <div
      onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 60)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        overflowY: "auto",
        background: bg,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── STICKY HEADER ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 48px",
          background: scrolled ? (isDark ? "rgba(8,8,16,0.92)" : "rgba(248,247,255,0.92)") : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${border}` : "none",
          transition: "all 0.3s",
        }}
      >
        <button
          onClick={onClose}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600,
            background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${border}`, color: subText, cursor: "pointer",
          }}
        >
          ← Quay lại
        </button>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {project.tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, padding: "5px 14px", borderRadius: 99, fontWeight: 600,
              background: c + "20", color: c, border: `1px solid ${c}40`,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 48px 100px" }}>

        {/* Title + meta */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: 48,
            marginBottom: 56,
            alignItems: "start",
          }}
        >
          <div>
            <span style={{
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em",
              fontWeight: 700, color: c, marginBottom: 14, display: "block",
            }}>
              {project.category === "characters" ? "✦ Nhân Vật"
                : project.category === "environments" ? "✦ Môi Trường"
                : "✦ Dự Án"}
            </span>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 700, lineHeight: 1.15, color: text, marginBottom: 24,
            }}>
              {project.title}
            </h1>

            <p style={{ color: subText, fontSize: 16, lineHeight: 2 }}>{project.desc}</p>
          </div>

          {/* Meta card */}
          <div style={{
            background: cardBg, borderRadius: 24, border: `1px solid ${border}`,
            boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.35)" : "0 4px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${c}, ${c}44)` }} />
            <div style={{ padding: "24px 24px 20px" }}>
              {[
                { label: "Năm", value: project.year },
                { label: "Khách hàng", value: project.client },
                { label: "Phân loại", value: project.tags[0] },
              ].map((item, i, arr) => (
                <div key={item.label} style={{
                  marginBottom: i < arr.length - 1 ? 18 : 0,
                  paddingBottom: i < arr.length - 1 ? 18 : 0,
                  borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none",
                }}>
                  <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: c, marginBottom: 4 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: text }}>{item.value}</p>
                </div>
              ))}

              <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${border}` }}>
                <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: c, marginBottom: 10 }}>
                  Công cụ
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tools.map((tool) => (
                    <span key={tool} style={{
                      fontSize: 12, padding: "4px 12px", borderRadius: 99,
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                      color: subText, border: `1px solid ${border}`,
                    }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Slider — bỏ ảnh cover, chỉ dùng gallery[] */}
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>Hình Ảnh Dự Án</SectionLabel>
          <GallerySlider images={project.gallery} color={c} isDark={isDark} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <SectionLabel>Tác Phẩm Liên Quan</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {related.map((p) => (
                <RelatedCard
                  key={p.id} p={p} isDark={isDark}
                  cardBg={cardBg} text={text} subText={subText} border={border}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}