import { useState } from "react";
import Icon from "@/components/ui/icon";
import { DIRECTIONS } from "@/data/equipment";

interface Props {
  activeDirectionId: string;
  activeGroupId?: string;
  onNavigate: (page: string) => void;
}

function SidebarContent({
  activeDirectionId,
  activeGroupId,
  onNavigate,
  onClose,
}: Props & { onClose?: () => void }) {
  const [openDir, setOpenDir] = useState<string>(activeDirectionId);

  const handleNav = (page: string) => {
    onNavigate(page);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Back + close */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => handleNav("equipment-groups")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-[11px] tracking-[0.15em] uppercase transition-colors"
        >
          <Icon name="ChevronLeft" size={13} />
          Все направления
        </button>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors lg:hidden">
            <Icon name="X" size={18} />
          </button>
        )}
      </div>

      <nav className="space-y-0.5 flex-1 overflow-y-auto">
        {DIRECTIONS.map((dir) => {
          const isActiveDir = dir.id === activeDirectionId;
          const isOpen = openDir === dir.id;

          return (
            <div key={dir.id}>
              <button
                onClick={() => {
                  if (dir.comingSoon) return;
                  handleNav(`equipment-direction-${dir.id}`);
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

              {isOpen && dir.groups.length > 0 && (
                <div className="ml-6 mt-0.5 space-y-0.5 border-l border-white/8 pl-3 pb-1">
                  {dir.groups.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleNav(`equipment-group-${g.id}`)}
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

      <div className="mt-6 p-4 bg-brand-dark-2 border border-white/8 rounded-sm shrink-0">
        <p className="font-body text-white/50 text-xs leading-relaxed mb-3">
          Нужна помощь с выбором оборудования?
        </p>
        <button
          onClick={() => handleNav("contacts")}
          className="w-full btn-primary py-2 text-xs rounded-sm"
        >
          Связаться с нами
        </button>
      </div>
    </div>
  );
}

export default function EquipmentSidebar({ activeDirectionId, activeGroupId, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeDir = DIRECTIONS.find((d) => d.id === activeDirectionId);
  const activeGroup = activeDir?.groups.find((g) => g.id === activeGroupId);
  const label = activeGroup?.title ?? activeDir?.title ?? "Каталог";

  return (
    <>
      {/* Mobile trigger button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-3 w-full bg-brand-dark-2 border border-white/15 rounded-sm px-4 py-3 text-left group hover:border-white/30 transition-colors"
        >
          <Icon name="LayoutList" size={16} className="text-brand-red shrink-0" />
          <span className="font-body text-sm text-white/70 flex-1 truncate">{label}</span>
          <Icon name="ChevronDown" size={14} className="text-white/30 shrink-0" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative ml-auto w-80 max-w-[90vw] h-full bg-background border-l border-white/10 p-5 flex flex-col animate-slide-in-right overflow-y-auto">
            <SidebarContent
              activeDirectionId={activeDirectionId}
              activeGroupId={activeGroupId}
              onNavigate={onNavigate}
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <SidebarContent
            activeDirectionId={activeDirectionId}
            activeGroupId={activeGroupId}
            onNavigate={onNavigate}
          />
        </div>
      </aside>
    </>
  );
}
