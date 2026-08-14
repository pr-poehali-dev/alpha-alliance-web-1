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
      {/* Название */}
      <section className="pt-32 pb-12 bg-background border-b border-white/8 relative overflow-hidden">
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

      {/* Картинки */}
      {cat.gallery.length > 0 && (
        <section className="py-12 bg-brand-dark-2 border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.gallery.map((g, i) => (
                <figure key={i} className="bg-card border border-white/8 rounded-sm overflow-hidden">
                  <img
                    src={g.img}
                    alt={g.caption ?? cat.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain bg-white"
                  />
                  {g.caption && (
                    <figcaption className="font-body text-white/50 text-xs p-3 border-t border-white/8">
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Описание */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Описание</span>
          </div>
          <h2 className="font-display text-3xl text-white tracking-wide mb-6">О направлении</h2>
          <div className="font-body text-white/65 text-sm leading-relaxed space-y-3 max-w-4xl">
            {cat.description.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Область применения */}
      {cat.applications.length > 0 && (
        <section className="py-16 bg-brand-dark-2 border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Применение</span>
            </div>
            <h2 className="font-display text-3xl text-white tracking-wide mb-8">Область применения</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.applications.map((a) => (
                <div key={a} className="bg-card border border-white/8 p-5 rounded-sm flex items-start gap-3">
                  <Icon name="Check" size={14} className="text-brand-red mt-0.5 shrink-0" />
                  <span className="font-body text-white/70 text-sm leading-relaxed">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Преимущества */}
      {cat.advantages.length > 0 && (
        <section className="py-16 bg-background border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Почему мы</span>
            </div>
            <h2 className="font-display text-3xl text-white tracking-wide mb-8">Преимущества наших решений</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.advantages.map((adv) => (
                <div key={adv.title} className="bg-card border border-white/8 p-6 rounded-sm card-hover">
                  <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-4">
                    <Icon name={adv.icon as never} size={18} className="text-brand-red" />
                  </div>
                  <h3 className="font-display text-white text-base tracking-wide mb-2">{adv.title}</h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Технические характеристики */}
      {cat.specs.length > 0 && (
        <section className="py-16 bg-brand-dark-2 border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-brand-red" />
                <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Параметры</span>
              </div>
              <h2 className="font-display text-3xl text-white tracking-wide mb-8">Технические характеристики</h2>
              <div className="border border-white/8 rounded-sm overflow-hidden">
                {cat.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 px-5 py-3 ${i % 2 ? "bg-card" : "bg-background"}`}
                  >
                    <span className="font-body text-white/45 text-sm">{s.label}</span>
                    <span className="font-body text-white text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-red/10 border border-brand-red/20 p-6 rounded-sm self-start">
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
        </section>
      )}

      {/* Другие услуги */}
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
