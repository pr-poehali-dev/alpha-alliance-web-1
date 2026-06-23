import Icon from "@/components/ui/icon";
import EquipmentSidebar from "@/components/EquipmentSidebar";
import { DIRECTIONS } from "@/data/equipment";

interface Props {
  directionId: string;
  onNavigate: (page: string) => void;
}

export default function EquipmentDirectionPage({ directionId, onNavigate }: Props) {
  const dir = DIRECTIONS.find((d) => d.id === directionId);

  if (!dir) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-white/50">Направление не найдено</p>
        <button onClick={() => onNavigate("equipment-groups")} className="mt-4 text-brand-red text-sm">
          ← К оборудованию
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <EquipmentSidebar
              activeDirectionId={directionId}
              onNavigate={onNavigate}
            />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-body text-white/30 mb-6">
              <button onClick={() => onNavigate("equipment-groups")} className="hover:text-white/60 transition-colors">
                Оборудование
              </button>
              <Icon name="ChevronRight" size={12} />
              <span className="text-white/55">{dir.title}</span>
            </div>

            {/* Header */}
            <div className="flex items-start gap-4 mb-10">
              <div className="w-12 h-12 bg-brand-red/15 border border-brand-red/30 rounded-sm flex items-center justify-center shrink-0">
                <Icon name={dir.icon} size={22} className="text-brand-red" />
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide leading-none mb-3">
                  {dir.title}
                </h1>
                <p className="font-body text-white/50 text-sm leading-relaxed max-w-2xl">{dir.desc}</p>
              </div>
            </div>

            {/* Groups grid */}
            {dir.comingSoon || dir.groups.length === 0 ? (
              <div className="border border-white/8 rounded-sm p-16 text-center bg-card">
                <Icon name="Clock" size={40} className="text-white/10 mx-auto mb-4" />
                <p className="font-display text-white/40 text-xl tracking-wide mb-2">Скоро</p>
                <p className="font-body text-white/25 text-sm">Продукция этого направления появится в ближайшее время</p>
                <button
                  onClick={() => onNavigate("contacts")}
                  className="mt-8 btn-primary px-6 py-3 text-xs rounded-sm inline-flex items-center gap-2"
                >
                  <Icon name="MessageSquare" size={14} />
                  Узнать подробнее
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-brand-red" />
                  <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">
                    Группы продукции — {dir.groups.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {dir.groups.map((g, i) => (
                    <button
                      key={g.id}
                      onClick={() => onNavigate(`equipment-group-${g.id}`)}
                      className="group text-left bg-card border border-white/8 rounded-sm overflow-hidden hover:border-brand-red/60 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center p-3">
                        <img
                          src={g.img}
                          alt={g.title}
                          className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500"
                          style={{ transform: `scale(${g.imgScale ?? 1})` }}
                          onMouseEnter={e => (e.currentTarget.style.transform = `scale(${(g.imgScale ?? 1) * 1.05})`)}
                          onMouseLeave={e => (e.currentTarget.style.transform = `scale(${g.imgScale ?? 1})`)}
                        />
                        <div className="absolute top-3 left-3 w-6 h-6 bg-brand-red flex items-center justify-center">
                          <span className="font-display text-white text-[10px] font-bold">
                            {String(i + 1).padStart(2, "0")}
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
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}