import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import FloatingContact from "@/components/FloatingContact";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "catalog-tech", label: "Спецтехника" },
  { id: "catalog-equipment", label: "Оборудование" },
  { id: "metalwork", label: "Металлоконструкции" },
  { id: "engineering", label: "Инжиниринг" },
  { id: "contacts", label: "Контакты" },
];

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, activePage, onNavigate }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"
        }`}
      >
        {/* Top contact bar */}
        <div className="hidden md:flex items-center justify-end gap-6 border-b border-white/8 py-2 px-4 md:px-8">
          <a href="tel:+79131992934" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors">
            <Icon name="Phone" size={12} />
            <span className="font-body text-xs">+7 913 199 29 34</span>
          </a>
          <a href="mailto:alfaallianse-info@mail.ru" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors">
            <Icon name="Mail" size={12} />
            <span className="font-body text-xs">alfaallianse-info@mail.ru</span>
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <button onClick={() => handleNav("home")} className="flex items-center gap-3 group">
              <img
                src="https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/023b9024-08d5-45ef-bfac-f37cf776087a.png"
                alt="Альфа Альянс"
                className="w-9 h-9 object-contain"
              />
              <div className="font-display text-white leading-none font-semibold tracking-widest uppercase" style={{fontSize: "22px", lineHeight: "22px"}}>
                Альфа Альянс
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`nav-link font-body text-xs tracking-[0.1em] uppercase pb-1 transition-colors whitespace-nowrap ${
                    activePage === item.id
                      ? "text-white active"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Burger */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-white/10 animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left font-body text-sm tracking-[0.1em] uppercase py-3 px-4 border-b border-white/5 transition-colors ${
                    activePage === item.id
                      ? "text-white bg-white/5"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Floating contact button — hidden on contacts page */}
      {activePage !== "contacts" && <FloatingContact />}

      {/* Footer */}
      <footer className="bg-brand-dark-2 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div>
            <p className="font-body text-white/20 text-[11px] leading-relaxed">
              © «Альфа Альянс», 2013–2026. Настоящий сайт является объектом авторского права, исключительные права на использование которого принадлежат ООО «Альфа Альянс». Копирование, размножение, распространение, перепечатка (целиком или частично), или иное использование материала без письменного разрешения автора не допускается. Любое нарушение прав автора будет преследоваться на основе российского и международного законодательства. Свободное и безвозмездное использование произведений, входящих в состав настоящего сайта, ограничено использованием в личных целях и использованием в случаях, прямо указанных в законодательстве РФ. Использование произведений, входящих в состав настоящего сайта, на основании законодательства РФ не допускается. Нарушение вышеуказанных положений является нарушением авторских прав и влечет наступление гражданской, административной и уголовной ответственности в соответствии с действующим законодательством (статья 1299 ГК РФ).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}