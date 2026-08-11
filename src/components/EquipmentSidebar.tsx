import { useState } from "react";
import Icon from "@/components/ui/icon";
import { DIRECTIONS } from "@/data/equipment";

interface Props {
  activeDirectionId: string;
  activeGroupId?: string;
  onNavigate: (page: string) => void;
}

export default function EquipmentSidebar({ activeDirectionId, activeGroupId, onNavigate }: Props) {
  const [openDir, setOpenDir] = useState<string>(activeDirectionId);

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-24">
        {/* Back to all directions */}
        <button
          onClick={() => onNavigate("equipment-groups")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-[11px] tracking-[0.15em] uppercase mb-5 transition-colors"
        >
          <Icon name="ChevronLeft" size={13} />
          Все направления
        </button>

        <nav className="space-y-0.5">
          {DIRECTIONS.map((dir) => {
            const isActiveDir = dir.id === activeDirectionId;
            const isOpen = openDir === dir.id;

            return (
              <div key={dir.id}>
                {/* Direction row */}
                <button
                  onClick={() => {
                    if (dir.comingSoon) return;
                    onNavigate(`equipment-direction-${dir.id}`);
                    if (dir.groups.length > 0) setOpenDir(dir.id);
                  }}
                  disabled={dir.comingSoon}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-all group ${
                    isActiveDir
                      ? "bg-brand-red/15 text-white"
                      : dir.comingSoon
                      ? "text-white/25 cursor-not-allowed"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    name={dir.icon}
                    size={15}
                    className={isActiveDir ? "text-brand-red" : "text-current"}
                  />
                  <span className="font-body text-xs tracking-wide flex-1 truncate">{dir.title}</span>
                  {dir.comingSoon && (
                    <span className="text-[9px] border border-white/15 px-1.5 py-0.5 rounded-sm text-white/25 shrink-0">
                      скоро
                    </span>
                  )}
                  {!dir.comingSoon && dir.groups.length > 0 && (
                    <Icon
                      name={isOpen ? "ChevronDown" : "ChevronRight"}
                      size={12}
                      className="shrink-0 text-white/30"
                    />
                  )}
                </button>

                {/* Groups submenu */}
                {isOpen && dir.groups.length > 0 && (
                  <div className="ml-6 mt-0.5 space-y-0.5 border-l border-white/8 pl-3 pb-1">
                    {dir.groups.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => onNavigate(`equipment-group-${g.id}`)}
                        className={`w-full text-left px-2 py-2 rounded-sm text-xs font-body leading-snug transition-all ${
                          activeGroupId === g.id
                            ? "text-brand-red bg-brand-red/8"
                            : "text-white/40 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {g.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="mt-6 p-4 bg-brand-dark-2 border border-white/8 rounded-sm">
          <p className="font-body text-white/50 text-xs leading-relaxed mb-3">
            Нужна помощь с выбором оборудования?
          </p>
          <button
            onClick={() => onNavigate("contacts")}
            className="w-full btn-primary py-2 text-xs rounded-sm"
          >
            Связаться с нами
          </button>
        </div>
      </div>
    </aside>
  );
}
