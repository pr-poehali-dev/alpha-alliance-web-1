import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

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
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => handleNav("home")} className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
                <span className="font-display text-white text-sm font-bold tracking-wider">АА</span>
              </div>
              <div className="text-left">
                <div className="font-display text-white text-lg font-semibold tracking-widest uppercase leading-none">
                  Альфа Альянс
                </div>
                <div className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-body">
                  с 2013 года
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`nav-link font-body text-xs tracking-[0.12em] uppercase pb-1 transition-colors ${
                    activePage === item.id
                      ? "text-white active"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA + Burger */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+7XXXXXXXXXX"
                className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Icon name="Phone" size={14} />
                <span className="font-body text-sm">+7 (XXX) XXX-XX-XX</span>
              </a>
              <button
                onClick={() => handleNav("contacts")}
                className="btn-primary hidden md:block px-5 py-2 text-xs rounded-sm"
              >
                Запрос
              </button>
              {/* Burger */}
              <button
                className="lg:hidden text-white p-1"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Icon name={menuOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
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

      {/* Footer */}
      <footer className="bg-brand-dark-2 border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
                  <span className="font-display text-white text-sm font-bold">АА</span>
                </div>
                <span className="font-display text-white text-lg tracking-widest uppercase">Альфа Альянс</span>
              </div>
              <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
                Поставка промышленного оборудования и спецтехники. Более 200 реализованных проектов с 2013 года.
              </p>
            </div>
            <div>
              <h4 className="font-display text-white text-sm tracking-[0.15em] uppercase mb-4">Направления</h4>
              <ul className="space-y-2">
                {["Гидравлика", "Насосное оборудование", "Спецтехника", "Грузоподъёмное оборудование"].map((item) => (
                  <li key={item}>
                    <span className="font-body text-white/50 text-sm hover:text-white/80 transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-white text-sm tracking-[0.15em] uppercase mb-4">Контакты</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/50 text-sm font-body">
                  <Icon name="Phone" size={13} />
                  +7 (XXX) XXX-XX-XX
                </li>
                <li className="flex items-center gap-2 text-white/50 text-sm font-body">
                  <Icon name="Mail" size={13} />
                  info@alfa-alliance.ru
                </li>
                <li className="flex items-start gap-2 text-white/50 text-sm font-body">
                  <Icon name="MapPin" size={13} className="mt-0.5 shrink-0" />
                  Россия
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/30 text-xs tracking-wide">
              © 2013–2026 ООО «Альфа Альянс». Все права защищены.
            </p>
            <p className="font-body text-white/20 text-xs">
              ИНН / ОГРН — по запросу
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
