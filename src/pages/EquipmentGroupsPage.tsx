import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { DIRECTIONS, ALL_GROUPS } from "@/data/equipment";

interface Props {
  onNavigate: (page: string) => void;
}

export default function EquipmentGroupsPage({ onNavigate }: Props) {
  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return ALL_GROUPS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q)
    );
  }, [search]);

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
              className="w-full bg-brand-dark-2 border border-white/15 rounded-sm pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-red/60 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search results */}
      {search.trim() ? (
        <section className="py-10 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">
                Результаты поиска — {searchResults.length} позиций
              </span>
            </div>
            {searchResults.length === 0 ? (
              <div className="text-center py-16">
                <Icon name="SearchX" size={40} className="text-white/10 mx-auto mb-3" />
                <p className="text-white/40 text-sm">Ничего не найдено по запросу «{search}»</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.map((g, i) => (
                  <GroupCard key={g.id} g={g} index={i} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Directions grid */
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Направления</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DIRECTIONS.map((dir) => (
                <button
                  key={dir.id}
                  onClick={() => !dir.comingSoon && onNavigate(`equipment-direction-${dir.id}`)}
                  disabled={dir.comingSoon}
                  className={`group text-left border rounded-sm p-6 transition-all duration-300 ${
                    dir.comingSoon
                      ? "bg-card border-white/6 cursor-not-allowed opacity-60"
                      : "bg-card border-white/8 hover:border-brand-red/50 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                      dir.comingSoon ? "bg-brand-dark-2" : "bg-brand-dark-2 group-hover:bg-brand-red/20"
                    }`}>
                      <Icon
                        name={dir.icon}
                        size={20}
                        className={dir.comingSoon ? "text-white/20" : "text-white/60 group-hover:text-brand-red transition-colors"}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg tracking-wide text-white leading-snug">{dir.title}</h3>
                        {dir.comingSoon ? (
                          <span className="text-[9px] font-body text-white/25 border border-white/10 px-2 py-0.5 rounded-sm shrink-0">
                            скоро
                          </span>
                        ) : (
                          <span className="text-[9px] font-body text-white/30 border border-white/15 px-2 py-0.5 rounded-sm shrink-0">
                            {dir.groups.length} групп
                          </span>
                        )}
                      </div>
                      <p className="font-body text-white/40 text-xs leading-relaxed">{dir.desc}</p>
                    </div>
                  </div>
                  {!dir.comingSoon && (
                    <div className="mt-4 flex items-center gap-2 text-brand-red text-[10px] font-body tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Смотреть продукцию</span>
                      <span>→</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
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
  g: { id: string; title: string; desc: string; sub: string; img: string; imgFit?: "contain" | "cover" };
  index: number;
  onNavigate: (page: string) => void;
}

function GroupCard({ g, index, onNavigate }: GroupCardProps) {
  return (
    <button
      onClick={() => onNavigate(`equipment-group-${g.id}`)}
      className="group text-left bg-card border border-white/8 rounded-sm overflow-hidden hover:border-brand-red/60 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center p-3">
        <img
          src={g.img}
          alt={g.title}
          className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
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
        <p className="font-body text-white/45 text-xs leading-relaxed line-clamp-2 mb-1">{g.desc}</p>
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