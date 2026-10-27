import { useState, useEffect, useRef, useCallback } from "react";
import { apartments, heroImage, type Apartment } from "./data/apartments";

/* ───────── ICONS (inline SVG components) ───────── */
const IconWifi = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconBuilding = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const IconChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
);
const IconChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const IconHeart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);
const IconArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
);

/* ───────── useInView hook ───────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ───────── HEADER ───────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(45,139,158,0.1)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <a
          href="#hero"
          className={`font-serif text-xl md:text-2xl font-semibold tracking-wide transition-colors duration-300 ${
            scrolled ? "text-teal-700" : "text-white"
          }`}
        >
          Гродно<span className="text-teal-400">.</span>Апарт
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            ["#about", "О нас"],
            ["#apartments", "Апартаменты"],
            ["#contact", "Контакты"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-teal-500 ${
                scrolled ? "text-slate-warm" : "text-white/90"
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#apartments"
            className={`px-5 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-white/20 text-white backdrop-blur-sm border border-white/30 hover:bg-white/30"
            }`}
          >
            Забронировать
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 transition-colors ${
            scrolled ? "text-teal-700" : "text-white"
          }`}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-cream/95 backdrop-blur-xl ${
          menuOpen ? "max-h-64 border-b border-teal-100" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {[
            ["#about", "О нас"],
            ["#apartments", "Апартаменты"],
            ["#contact", "Контакты"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-warm text-base font-medium py-2 border-b border-teal-50 hover:text-teal-600 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#apartments"
            onClick={() => setMenuOpen(false)}
            className="mt-2 py-2.5 text-center bg-teal-600 text-white rounded-full text-sm font-medium"
          >
            Забронировать
          </a>
        </div>
      </div>
    </header>
  );
}

/* ───────── HERO ───────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Стильный интерьер апартаментов"
          className={`w-full h-full object-cover transition-transform duration-[2s] ${
            loaded ? "scale-100" : "scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div
          className={`transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-teal-300 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium">
            Гродно · Беларусь
          </p>
        </div>
        <h1
          className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[1.1] mb-6 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Город, который
          <br />
          <span className="italic text-teal-200">влюбляет</span> в себя
        </h1>
        <p
          className={`text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Уютные дизайнерские апартаменты в самых красивых уголках Гродно.
          Ваш идеальный дом на время путешествия.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#apartments"
            className="group px-8 py-3.5 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm font-medium tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            Смотреть апартаменты
            <span className="group-hover:translate-y-0.5 transition-transform">
              <IconArrowDown />
            </span>
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-full text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-sm"
          >
            Связаться
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
      </div>
    </section>
  );
}

/* ───────── ABOUT ───────── */
function About() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left */}
          <div>
            <p className="text-teal-500 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              Добро пожаловать
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-charcoal leading-tight mb-6">
              Больше, чем
              <br />
              <span className="italic text-teal-700">просто жильё</span>
            </h2>
            <div className="w-12 h-[1px] bg-teal-400 mb-6" />
            <p className="text-slate-warm/80 text-base leading-relaxed mb-4">
              Гродно — город с невероятной энергетикой, который влюбляет в себя
              каждого. Если вы планируете поездку на пару дней, я буду рада
              помочь вам с жильём.
            </p>
            <p className="text-slate-warm/80 text-base leading-relaxed mb-6">
              Несколько уютных квартир с дизайнерским ремонтом в центре города и не
              только. Для нас это не просто сдача в аренду, а возможность стать
              частью вашей приятной поездки.
            </p>
            <div className="flex items-center gap-2 text-teal-600">
              <IconHeart />
              <span className="text-sm font-medium">С любовью к каждой детали</span>
            </div>
          </div>

          {/* Right — features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "5", label: "апартаментов" },
              { num: "24/7", label: "заселение" },
              { num: "♥", label: "дизайнерский ремонт" },
              { num: "✓", label: "центр города" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-[0_2px_20px_rgba(45,139,158,0.06)] hover:shadow-[0_8px_30px_rgba(45,139,158,0.12)] transition-shadow duration-500"
              >
                <div className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">
                  {item.num}
                </div>
                <div className="text-xs text-slate-warm/60 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── APARTMENT CARD ───────── */
function ApartmentCard({
  apt,
  index,
  onOpen,
}: {
  apt: Apartment;
  index: number;
  onOpen: () => void;
}) {
  const { ref, isVisible } = useInView(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`group grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_50px_rgba(45,139,158,0.1)] transition-all duration-700 ${
          isEven ? "" : "md:[direction:rtl]"
        }`}
      >
        {/* Image */}
        <div
          className="relative h-72 md:h-[480px] overflow-hidden cursor-pointer"
          style={{ direction: "ltr" }}
          onClick={onOpen}
        >
          <img
            src={apt.images[0]}
            alt={apt.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-teal-700 tracking-wide">
            {apt.rooms}
          </div>
          {apt.images.length > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-warm/70 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
              {apt.images.length} фото
            </div>
          )}
        </div>

        {/* Info */}
        <div
          className="p-8 md:p-10 lg:p-12 flex flex-col justify-center"
          style={{ direction: "ltr" }}
        >
          <div className="flex items-center gap-2 text-teal-500 text-xs tracking-[0.2em] uppercase mb-3 font-medium">
            <IconMapPin />
            <span>{apt.address}</span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            {apt.name}
          </h3>
          <div className="w-8 h-[1px] mb-5" style={{ backgroundColor: apt.accent }} />
          <p className="text-slate-warm/70 text-sm leading-relaxed mb-4">
            <span ref={(el) => {
              if (el) {
                requestAnimationFrame(() => {
                  if (el.dataset.measured !== 'true') {
                    el.dataset.measured = 'true';
                    const needsMore = el.scrollHeight > el.offsetHeight;
                    el.dataset.needsMore = needsMore ? 'true' : 'false';
                    el.nextElementSibling?.setAttribute('data-visible', needsMore ? 'true' : 'false');
                  }
                });
              }
            }} className="line-clamp-4">{apt.description}</span>
            <button
              onClick={onOpen}
              data-visible="true"
              className="text-teal-500 hover:text-teal-600 transition-colors"
            >
              читать далее
            </button>
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
            {apt.features.slice(0, 4).map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-warm/60">
                <span className="text-teal-400">
                  <IconCheck />
                </span>
                {f}
              </div>
            ))}
          </div>

          {/* Meta + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-warm/50">
              <span className="flex items-center gap-1">
                <IconUsers /> до {apt.guests} гостей
              </span>
              <span className="flex items-center gap-1">
                <IconWifi />
              </span>
            </div>
            <button
              onClick={onOpen}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-teal-600/20"
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── APARTMENT MODAL ───────── */
function ApartmentModal({
  apt,
  onClose,
}: {
  apt: Apartment;
  onClose: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const nextImage = useCallback(
    () => setCurrentImage((p) => (p + 1) % apt.images.length),
    [apt.images.length]
  );
  const prevImage = useCallback(
    () => setCurrentImage((p) => (p - 1 + apt.images.length) % apt.images.length),
    [apt.images.length]
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-5xl mx-4 max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
        <div className="grid md:grid-cols-2 h-full">
          {/* Image carousel */}
          <div className="relative h-64 md:h-auto md:min-h-[500px] bg-teal-50">
            <img
              src={apt.images[currentImage]}
              alt={`${apt.name} — фото ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />

            {apt.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center transition-all shadow-lg"
                >
                  <IconChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center transition-all shadow-lg"
                >
                  <IconChevronRight />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {apt.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentImage
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="p-8 md:p-10 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all text-slate-warm/60 hover:text-charcoal shadow-md z-20"
            >
              <IconX />
            </button>

            <p className="text-teal-500 text-xs tracking-[0.2em] uppercase mb-2 font-medium flex items-center gap-1.5">
              <IconMapPin />
              Гродно, {apt.address}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-2">
              {apt.name}
            </h2>
            <div className="flex items-center gap-3 text-sm text-slate-warm/50 mb-6">
              <span className="flex items-center gap-1">
                <IconBuilding /> {apt.rooms}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <IconUsers /> до {apt.guests} гостей
              </span>
            </div>

            <div className="w-10 h-[1px] bg-teal-300 mb-6" />

            <p className="text-slate-warm/70 text-base leading-relaxed mb-8">
              {apt.description}
            </p>

            <h4 className="text-xs uppercase tracking-[0.2em] text-teal-600 font-medium mb-4">
              Удобства
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {apt.features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2.5 text-sm text-slate-warm/70"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 shrink-0">
                    <IconCheck />
                  </span>
                  {f}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white text-center rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-600/20"
              >
                Забронировать
              </a>
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 py-3 border border-teal-200 text-teal-700 text-center rounded-full text-sm font-medium hover:bg-teal-50 transition-all duration-300"
              >
                Проверить даты
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── APARTMENTS SECTION ───────── */
function Apartments() {
  const [selectedApt, setSelectedApt] = useState<Apartment | null>(null);
  const { ref, isVisible } = useInView();

  return (
    <section id="apartments" className="py-24 md:py-32 bg-warm">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-teal-500 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Коллекция
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-charcoal mb-4">
            Наши <span className="italic text-teal-700">апартаменты</span>
          </h2>
          <p className="text-slate-warm/60 text-base max-w-lg mx-auto">
            Каждая квартира — это отдельная история с уникальным характером
            и продуманным до мелочей дизайном
          </p>
        </div>

        {/* Apartment cards */}
        <div className="flex flex-col gap-12 md:gap-16">
          {apartments.map((apt, i) => (
            <ApartmentCard
              key={apt.id}
              apt={apt}
              index={i}
              onOpen={() => setSelectedApt(apt)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedApt && (
        <ApartmentModal apt={selectedApt} onClose={() => setSelectedApt(null)} />
      )}
    </section>
  );
}

/* ───────── CONTACT ───────── */
function Contact() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-teal-500 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              Свяжитесь с нами
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-charcoal mb-4">
              Готовы <span className="italic text-teal-700">забронировать</span>?
            </h2>
            <p className="text-slate-warm/60 text-base max-w-md mx-auto">
              Напишите или позвоните — мы с радостью поможем подобрать
              идеальную квартиру для вашей поездки
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <a
              href="tel:+375297852271"
              className="group bg-white rounded-2xl p-8 text-center shadow-[0_2px_20px_rgba(45,139,158,0.06)] hover:shadow-[0_8px_30px_rgba(45,139,158,0.12)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                <IconPhone />
              </div>
              <div className="text-xs text-slate-warm/50 uppercase tracking-wider mb-2">
                Телефон
              </div>
              <div className="text-charcoal font-medium">
                +375 29 785 2271
              </div>
            </a>

            {/* Telegram / WhatsApp */}
            <a
              href="https://t.me/tanyia_br"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 text-center shadow-[0_2px_20px_rgba(45,139,158,0.06)] hover:shadow-[0_8px_30px_rgba(45,139,158,0.12)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
              </div>
              <div className="text-xs text-slate-warm/50 uppercase tracking-wider mb-2">
                Telegram
              </div>
              <div className="text-charcoal font-medium">Написать</div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/grodno_apartamenty"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 text-center shadow-[0_2px_20px_rgba(45,139,158,0.06)] hover:shadow-[0_8px_30px_rgba(45,139,158,0.12)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </div>
              <div className="text-xs text-slate-warm/50 uppercase tracking-wider mb-2">
                Instagram
              </div>
              <div className="text-charcoal font-medium">
                @grodno_apartamenty
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer className="bg-charcoal text-white/40 py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a href="#hero" className="font-serif text-xl text-white/80 font-semibold tracking-wide">
              Гродно<span className="text-teal-400">.</span>Апарт
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-teal-400 transition-colors">
              О нас
            </a>
            <a href="#apartments" className="hover:text-teal-400 transition-colors">
              Апартаменты
            </a>
            <a href="#contact" className="hover:text-teal-400 transition-colors">
              Контакты
            </a>
          </div>
          <div className="text-xs text-white/25">
            © {new Date().getFullYear()} · Гродно
          </div>
        </div>

        {/* Apartment addresses */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
            {apartments.map((apt) => (
              <div key={apt.id} className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5 shrink-0">
                  <IconMapPin />
                </span>
                <span>
                  {apt.address}
                  <br />
                  <span className="text-white/20">{apt.rooms}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────── MAIN APP ───────── */
export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Apartments />
      <Contact />
      <Footer />
    </div>
  );
}
