import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onNavigate: (page: string) => void;
}

const HYDRAULIC_GROUPS = [
  {
    id: "jacks",
    title: "Домкраты и цилиндры",
    desc: "Домкраты и силовые цилиндры для подъёма, перемещения, фиксации.",
    sub: "9 подгрупп: универсальные, грузовые, алюминиевые, тянущие, низкие, телескопические, специальные, цилиндры на заказ.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
  },
  {
    id: "pumps",
    title: "Насосы и станции",
    desc: "Источники давления: ручные, ножные, пневматические, электрические, бензиновые, дизельные.",
    sub: "До 140 МПа. Компактные и стационарные варианты.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/6492f583-7a93-40ca-b8fe-191ee58f7a06.jpg",
  },
  {
    id: "pullers",
    title: "Съёмники",
    desc: "Гидравлические и механические съёмники для демонтажа деталей с натягом.",
    sub: "Стандартные, подкатные, с захватом-хомутом, автономные.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/1b01ebed-c631-403d-9b53-8da1eabea048.png",
  },
  {
    id: "presses",
    title: "Прессы",
    desc: "Вертикальные и горизонтальные прессы, перфораторы, прессы для опрессовки кабельных наконечников и гильз.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e086c588-cb03-4683-b155-f44e77dd3965.png",
  },
  {
    id: "cutting",
    title: "Режущий инструмент",
    desc: "Гайкорезы, ножницы для кабеля и уголка, резаки тросов, ножницы для труб и листа.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/533e96b4-ec15-417e-8f06-4b00d56f6927.jpg",
  },
  {
    id: "threading",
    title: "Оборудование для резьбы",
    desc: "Гайковерты, тензорные домкраты, мультипликаторы, динамометрические ключи, ударные ключи, магнитные гайкодержатели.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e371336d-a708-4342-8200-f79be566f3d4.png",
  },
  {
    id: "benders",
    title: "Трубогибы",
    desc: "Трубогибы с закрытой рамой: ручные, автономные, с электроприводом.",
    sub: "Трубы до 2 дюймов.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e750022d-9903-4995-b1ab-93ebc5631f42.png",
  },
  {
    id: "rescue",
    title: "Спасение и ЖД",
    desc: "Комплекты КРУГ (АСР), АВСО (ЖД), рихтовщики, разгонщики, рельсогибы, путевые домкраты.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/15332f38-0f6d-4cc7-9734-d6d61beda309.jpg",
  },
  {
    id: "special",
    title: "Специальное оборудование",
    desc: "Натяжители арматуры, горизонтальное бурение, перемещение тяжеловесов, стропы, выпрессовщики, разгонщики фланцев, пружинные балансиры.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/dcf990fb-7f19-46d9-9934-05bbda0b689e.png",
  },
  {
    id: "riklin",
    title: "РиКлайн (эконом)",
    desc: "Экономичная линейка: домкраты, насосные станции, магнитные захваты, тележки, столы, краны, штабелёры, аккумуляторный инструмент.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
  },
];

const DIRECTIONS = [
  {
    id: "hydraulics",
    title: "Гидравлика",
    icon: "Droplets",
    desc: "Домкраты, цилиндры, съёмники, прессы, насосы, трубогибы и специальный гидравлический инструмент",
    groups: HYDRAULIC_GROUPS,
  },
  {
    id: "pump",
    title: "Насосное оборудование",
    icon: "Gauge",
    desc: "Центробежные, вихревые, шестерённые, плунжерные насосы. Насосные агрегаты и станции для промышленных систем.",
    groups: [],
  },
  {
    id: "lifting",
    title: "Грузоподъёмное оборудование",
    icon: "ArrowUpFromLine",
    desc: "Мостовые краны, кран-балки, таль, тельфер, подъёмники, лебёдки, стропы и такелажный инструмент.",
    groups: [],
  },
  {
    id: "metalwork",
    title: "Оборудование для металлообработки",
    icon: "Settings2",
    desc: "Токарные, фрезерные, шлифовальные станки. Листогибы, вальцы, гильотины, координатно-пробивные прессы.",
    groups: [],
  },
  {
    id: "welding",
    title: "Сварочное оборудование",
    icon: "Flame",
    desc: "Сварочные инверторы и полуавтоматы, плазменная резка, аргонодуговая и автоматическая сварка, сварочные столы.",
    groups: [],
  },
  {
    id: "robots",
    title: "Роботы и роботизированные решения",
    icon: "Bot",
    desc: "Промышленные роботы-манипуляторы, роботизированные сварочные ячейки, автоматизация производственных процессов.",
    groups: [],
  },
];

// Flat list of all searchable items (from hydraulics for now)
const ALL_ITEMS = HYDRAULIC_GROUPS.map((g) => ({
  ...g,
  direction: "hydraulics",
  directionTitle: "Гидравлика",
}));

export default function EquipmentGroupsPage({ onNavigate }: Props) {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return ALL_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q)
    );
  }, [search]);

  const activeDir = DIRECTIONS.find((d) => d.id === activeDirection);

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-none mb-4">
                Оборудование
              </h1>
              <p className="font-body text-white/55 text-sm max-w-xl leading-relaxed">
                Промышленное оборудование и инструмент для производственных предприятий. Выберите направление или воспользуйтесь поиском.
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

          {/* Search */}
          <div className="relative max-w-lg">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по каталогу..."
              className="w-full bg-brand-dark-2 border border-white/15 rounded-sm pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-red/60 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search results */}
      {search.trim() && (
        <section className="py-10 bg-background border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">
                Результаты поиска — {searchResults.length} позиций
              </span>
            </div>
            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="SearchX" size={40} className="text-white/10 mx-auto mb-3" />
                <p className="text-white/40 text-sm">Ничего не найдено по запросу «{search}»</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.map((g) => (
                  <GroupCard key={g.id} g={g} index={0} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Directions */}
      {!search.trim() && (
        <>
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-brand-red" />
                <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Направления</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DIRECTIONS.map((dir) => (
                  <button
                    key={dir.id}
                    onClick={() =>
                      setActiveDirection(activeDirection === dir.id ? null : dir.id)
                    }
                    className={`group text-left border rounded-sm p-6 transition-all duration-300 ${
                      activeDirection === dir.id
                        ? "bg-brand-red/10 border-brand-red/60"
                        : "bg-card border-white/8 hover:border-white/25 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                          activeDirection === dir.id
                            ? "bg-brand-red"
                            : "bg-brand-dark-2 group-hover:bg-brand-red/20"
                        }`}
                      >
                        <Icon name={dir.icon} size={18} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3
                            className={`font-display text-lg tracking-wide transition-colors ${
                              activeDirection === dir.id ? "text-white" : "text-white group-hover:text-white"
                            }`}
                          >
                            {dir.title}
                          </h3>
                          {dir.groups.length > 0 && (
                            <span className="text-[10px] font-body text-white/30 border border-white/15 px-2 py-0.5 rounded-sm shrink-0">
                              {dir.groups.length} групп
                            </span>
                          )}
                          {dir.groups.length === 0 && (
                            <span className="text-[10px] font-body text-white/20 border border-white/8 px-2 py-0.5 rounded-sm shrink-0">
                              скоро
                            </span>
                          )}
                        </div>
                        <p className="font-body text-white/45 text-xs leading-relaxed">{dir.desc}</p>
                      </div>
                    </div>
                    {dir.groups.length > 0 && (
                      <div
                        className={`mt-4 flex items-center gap-2 text-xs font-body tracking-widest uppercase transition-all ${
                          activeDirection === dir.id
                            ? "text-brand-red opacity-100"
                            : "text-brand-red opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <span>{activeDirection === dir.id ? "Скрыть" : "Смотреть группы"}</span>
                        <Icon name={activeDirection === dir.id ? "ChevronUp" : "ChevronDown"} size={12} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Expanded direction groups */}
          {activeDir && activeDir.groups.length > 0 && (
            <section className="pb-16 bg-background">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-brand-red" />
                  <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">
                    {activeDir.title} — группы продукции
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {activeDir.groups.map((g, i) => (
                    <GroupCard key={g.id} g={g} index={i} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section className="py-16 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display text-3xl text-white tracking-wide mb-4">Нужна консультация?</h2>
          <p className="font-body text-white/50 text-sm mb-8">Поможем подобрать оборудование под вашу задачу</p>
          <button
            onClick={() => onNavigate("contacts")}
            className="btn-primary px-8 py-4 text-sm rounded-sm inline-flex items-center gap-2"
          >
            Связаться с нами
          </button>
        </div>
      </section>
    </div>
  );
}

interface GroupCardProps {
  g: { id: string; title: string; desc: string; sub: string; img: string };
  index: number;
  onNavigate: (page: string) => void;
}

function GroupCard({ g, index, onNavigate }: GroupCardProps) {
  return (
    <button
      onClick={() => onNavigate(`equipment-group-${g.id}`)}
      className="group text-left bg-card border border-white/8 rounded-sm overflow-hidden hover:border-brand-red/60 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative h-44 bg-white overflow-hidden">
        <img
          src={g.img}
          alt={g.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 w-6 h-6 bg-brand-red flex items-center justify-center">
          <span className="font-display text-white text-[10px] font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-white text-base tracking-wide mb-1.5 group-hover:text-brand-red-light transition-colors">
          {g.title}
        </h3>
        <p className="font-body text-white/45 text-xs leading-relaxed mb-1 line-clamp-2">{g.desc}</p>
        {g.sub && (
          <p className="font-body text-white/25 text-xs leading-relaxed line-clamp-1">{g.sub}</p>
        )}
        <div className="mt-3 flex items-center gap-1.5 text-brand-red text-[10px] font-body tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Подробнее</span>
          <span>→</span>
        </div>
      </div>
    </button>
  );
}
