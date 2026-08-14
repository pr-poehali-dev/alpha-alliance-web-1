import Icon from "@/components/ui/icon";
import { METALWORK_CATEGORY_MAP, METALWORK_CATEGORIES } from "@/data/metalwork";

interface MetalworkCategoryPageProps {
  categoryId: string;
  onNavigate: (page: string) => void;
}

export default function MetalworkCategoryPage({ categoryId, onNavigate }: MetalworkCategoryPageProps) {
  const cat = METALWORK_CATEGORY_MAP[categoryId];

  if (!cat) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <p className="font-body text-white/60 text-sm">Категория не найдена.</p>
        <button onClick={() => onNavigate("metalwork")} className="btn-primary px-6 py-3 text-xs rounded-sm mt-6">
          К металлоконструкциям
        </button>
      </div>
    );
  }

  const others = METALWORK_CATEGORIES.filter((c) => c.id !== cat.id).slice(0, 6);

  return (
    <div>
      <section className="pt-32 pb-14 bg-background border-b border-white/8 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <button
            onClick={() => onNavigate("metalwork")}
            className="font-body text-white/40 hover:text-brand-red text-xs tracking-wide inline-flex items-center gap-2 mb-8 transition-colors"
          >
            <Icon name="ArrowLeft" size={14} />
            Металлоконструкции
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center">
              <Icon name={cat.icon as never} size={18} className="text-brand-red" />
            </div>
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Услуга</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide leading-tight mb-5 max-w-3xl">
            {cat.title}
          </h1>
          <p className="font-body text-white/60 text-base leading-relaxed max-w-2xl">{cat.short}</p>
        </div>
      </section>

      <section className="py-16 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl text-white tracking-wide mb-5">Описание</h2>
            <div className="font-body text-white/65 text-sm leading-relaxed space-y-3">
              {cat.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {cat.gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl text-white tracking-wide mb-5">Фотографии работ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.gallery.map((g, i) => (
                    <figure key={i} className="bg-card border border-white/8 rounded-sm overflow-hidden">
                      <img src={g.img} alt={g.caption ?? cat.title} loading="lazy" decoding="async" className="w-full h-auto object-contain bg-white" />
                      {g.caption && (
                        <figcaption className="font-body text-white/50 text-xs p-3 border-t border-white/8">{g.caption}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {cat.bullets.length > 0 && (
              <div className="bg-card border border-white/8 p-6 rounded-sm">
                <h3 className="font-display text-white text-lg tracking-wide mb-4">Ключевое</h3>
                <div className="space-y-3">
                  {cat.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <Icon name="Check" size={14} className="text-brand-red mt-0.5 shrink-0" />
                      <span className="font-body text-white/65 text-sm leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-brand-red/10 border border-brand-red/20 p-6 rounded-sm">
              <Icon name="FileCheck" size={28} className="text-brand-red mb-4" />
              <h3 className="font-display text-white text-xl tracking-wide mb-3">Нужен расчёт?</h3>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-5">
                Отправьте чертежи или техническое задание — подготовим предложение в течение 1 рабочего дня.
              </p>
              <button
                onClick={() => onNavigate("contacts")}
                className="btn-primary w-full py-3 text-xs rounded-sm flex items-center justify-center gap-2"
              >
                Отправить запрос
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-display text-2xl text-white tracking-wide mb-6">Другие услуги</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((c) => (
              <button
                key={c.id}
                onClick={() => onNavigate(`metalwork-category-${c.id}`)}
                className="bg-card border border-white/8 p-5 rounded-sm card-hover text-left flex items-center gap-4"
              >
                <div className="w-9 h-9 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                  <Icon name={c.icon as never} size={16} className="text-brand-red" />
                </div>
                <span className="font-display text-white text-sm tracking-wide">{c.title}</span>
                <Icon name="ChevronRight" size={14} className="text-brand-red ml-auto shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
