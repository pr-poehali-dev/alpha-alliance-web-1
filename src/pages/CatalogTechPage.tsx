import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Экскаваторы", "Погрузчики", "Самосвалы", "Автокраны", "Дорожная техника"];

const ITEMS = [
  {
    category: "Экскаваторы",
    title: "Гусеничный экскаватор",
    weight: "20–35 т",
    desc: "Гусеничные экскаваторы для землеройных работ, добычи полезных ископаемых и строительства",
    tags: ["Новая", "Под заказ"],
    icon: "Shovel",
  },
  {
    category: "Экскаваторы",
    title: "Колёсный экскаватор",
    weight: "12–22 т",
    desc: "Мобильные колёсные экскаваторы для работ в городских условиях и на благоустроенных площадках",
    tags: ["Новая", "Поддержанная"],
    icon: "Shovel",
  },
  {
    category: "Погрузчики",
    title: "Фронтальный погрузчик",
    weight: "5–25 т",
    desc: "Фронтальные колёсные погрузчики для перемещения сыпучих грузов, работы в карьерах и на складах",
    tags: ["Новая", "Поддержанная"],
    icon: "Truck",
  },
  {
    category: "Погрузчики",
    title: "Вилочный погрузчик",
    weight: "1,5–10 т",
    desc: "Дизельные и электрические вилочные погрузчики для складской и производственной логистики",
    tags: ["Новая"],
    icon: "Truck",
  },
  {
    category: "Самосвалы",
    title: "Карьерный самосвал",
    weight: "30–130 т",
    desc: "Большегрузные карьерные самосвалы для добывающих предприятий и крупного строительства",
    tags: ["Новая", "Под заказ"],
    icon: "Truck",
  },
  {
    category: "Самосвалы",
    title: "Строительный самосвал",
    weight: "10–40 т",
    desc: "Шасси КамАЗ, МАЗ, Volvo, Scania с самосвальными кузовами для строительной отрасли",
    tags: ["Новая", "Поддержанная"],
    icon: "Truck",
  },
  {
    category: "Автокраны",
    title: "Автокран",
    weight: "25–250 т",
    desc: "Автомобильные краны на шасси различной грузоподъёмности для монтажных и строительных работ",
    tags: ["Новая", "Поддержанная"],
    icon: "Construction",
  },
  {
    category: "Дорожная техника",
    title: "Асфальтоукладчик",
    weight: "до 14 м ширина",
    desc: "Гусеничные и колёсные асфальтоукладчики для строительства и ремонта дорожных покрытий",
    tags: ["Новая", "Под заказ"],
    icon: "Construction",
  },
  {
    category: "Дорожная техника",
    title: "Грейдер",
    weight: "до 18 т",
    desc: "Автогрейдеры для планировки поверхностей, строительства дорог и аэродромов",
    tags: ["Новая", "Поддержанная"],
    icon: "Construction",
  },
];

interface CatalogTechPageProps {
  onNavigate: (page: string) => void;
}

export default function CatalogTechPage({ onNavigate }: CatalogTechPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background border-b border-white/8 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Каталог</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-none mb-4">
                Спецтехника
              </h1>
              <p className="font-body text-white/55 text-sm max-w-xl leading-relaxed">
                Экскаваторы, погрузчики, самосвалы, автокраны и дорожно-строительная техника — новая и поддержанная с гарантией. Поставка под заказ.
              </p>
            </div>
            <button
              onClick={() => onNavigate("contacts")}
              className="btn-primary px-6 py-3 text-xs rounded-sm inline-flex items-center gap-2 shrink-0"
            >
              <Icon name="FileText" size={14} />
              Запросить КП
            </button>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-brand-dark-2 border-b border-white/8 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-body text-xs tracking-[0.12em] uppercase px-4 py-2 border transition-all rounded-sm ${
                  activeCategory === cat
                    ? "bg-brand-red border-brand-red text-white"
                    : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.title}
                className="bg-card border border-white/8 rounded-sm overflow-hidden card-hover group"
              >
                <div className="bg-brand-dark-2 h-44 flex items-center justify-center border-b border-white/8 relative">
                  <Icon name={item.icon as never} size={56} className="text-white/10" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`font-body text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm ${
                          tag === "Новая"
                            ? "bg-brand-red/20 text-brand-red border border-brand-red/30"
                            : tag === "Поддержанная"
                            ? "bg-white/10 text-white/60 border border-white/15"
                            : "bg-white/5 text-white/40 border border-white/10"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display text-white text-xl tracking-wide">{item.title}</h3>
                    <span className="font-body text-white/35 text-xs shrink-0 mt-1">{item.weight}</span>
                  </div>
                  <p className="font-body text-white/50 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <button
                    onClick={() => onNavigate("contacts")}
                    className="w-full btn-outline-white py-2.5 text-xs rounded-sm opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    Запросить цену
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Icon name="PackageSearch" size={48} className="text-white/20 mx-auto mb-4" />
              <p className="font-body text-white/40 text-sm">Нет позиций в данной категории</p>
            </div>
          )}
        </div>
      </section>

      {/* Info block */}
      <section className="py-16 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Shield", title: "Гарантия", desc: "На всю поставляемую технику — новую и поддержанную" },
              { icon: "Package", title: "Доставка", desc: "Организуем логистику до вашего предприятия по всей России" },
              { icon: "HeadphonesIcon", title: "Поддержка", desc: "Техническое сопровождение на весь период эксплуатации" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                  <Icon name={item.icon as never} size={16} className="text-brand-red" />
                </div>
                <div>
                  <h4 className="font-display text-white text-base tracking-wide mb-1">{item.title}</h4>
                  <p className="font-body text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
