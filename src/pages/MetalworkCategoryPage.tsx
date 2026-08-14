import Icon from "@/components/ui/icon";
import { METALWORK_CATEGORY_MAP } from "@/data/metalwork";

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
                <figure
                  key={i}
                  className="bg-card border border-white/8 rounded-sm overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] w-full bg-white overflow-hidden">
                    <img
                      src={g.img}
                      alt={g.caption ?? cat.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full ${g.fit === "contain" ? "object-contain p-2" : "object-cover"}`}
                    />
                  </div>
                  {g.caption && (
                    <figcaption className="font-body text-white/50 text-xs leading-relaxed p-3 border-t border-white/8 flex-1">
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

      {/* Ключевые направления */}
      {cat.directions && cat.directions.length > 0 && (
        <section className="py-16 bg-brand-dark-2 border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Что мы делаем</span>
            </div>
            <h2 className="font-display text-3xl text-white tracking-wide mb-8">Наши ключевые направления</h2>
            <div className="space-y-6">
              {cat.directions.map((d, i) => (
                <div
                  key={d.title}
                  className="bg-card border border-white/8 rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                >
                  <div className={`aspect-[4/3] lg:aspect-auto lg:min-h-[300px] bg-brand-dark-2 ${i % 2 ? "lg:order-2" : ""}`}>
                    <img
                      src={d.img}
                      alt={d.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                        <Icon name={d.icon as never} size={18} className="text-brand-red" />
                      </div>
                      <h3 className="font-display text-white text-xl tracking-wide leading-snug">{d.title}</h3>
                    </div>
                    <p className="font-body text-white/55 text-sm leading-relaxed mb-5">{d.text}</p>
                    {d.params && (
                      <div className="space-y-3">
                        {d.params.map((prm) => (
                          <div key={prm.label} className="border-l-2 border-brand-red pl-3">
                            <p className="font-body text-brand-red text-xs tracking-wide mb-0.5">{prm.label}</p>
                            <p className="font-body text-white/60 text-sm leading-relaxed">{prm.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Технические характеристики */}
      {cat.specs.length > 0 && (
        <section className="py-16 bg-brand-dark-2 border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Параметры</span>
            </div>
            <h2 className="font-display text-3xl text-white tracking-wide mb-8">Технические характеристики</h2>
            <div className="border border-white/8 rounded-sm overflow-hidden max-w-4xl">
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
        </section>
      )}

      {/* Область применения */}
      {cat.applications.length > 0 && (
        <section className="py-16 bg-background border-t border-white/8">
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
        <section className="py-16 bg-brand-dark-2 border-t border-white/8">
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

      {/* CTA */}
      <section className="py-16 bg-background border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display text-3xl text-white tracking-wide mb-4">Нужна консультация?</h2>
          <p className="font-body text-white/50 text-sm mb-8">
            Отправьте чертежи или техническое задание — подготовим расчёт стоимости
          </p>
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
