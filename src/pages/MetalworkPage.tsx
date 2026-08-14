import Icon from "@/components/ui/icon";
import { METALWORK_CATEGORIES } from "@/data/metalwork";
import MetalworkCategoryCard from "@/components/MetalworkCategoryCard";

const STEPS = [
  { step: "01", title: "Получение задания", desc: "Принимаем чертежи, ТУ или техническое задание." },
  { step: "02", title: "Проектирование и расчёт", desc: "Рабочая документация, расчёты прочности, смета." },
  { step: "03", title: "Производство", desc: "Изготовление на собственном оборудовании с контролем качества." },
  { step: "04", title: "Контроль качества", desc: "Испытания, замеры, дефектоскопия сварных швов." },
  { step: "05", title: "Отгрузка и монтаж", desc: "Доставка и монтаж на объекте заказчика." },
];

interface MetalworkPageProps {
  onNavigate: (page: string) => void;
}

export default function MetalworkPage({ onNavigate }: MetalworkPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-14 bg-background border-b border-white/8 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="absolute right-8 top-32 opacity-5">
          <Icon name="Settings" size={320} className="text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Услуги</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white tracking-wide leading-tight mb-5 md:whitespace-nowrap">
            Изготовление <span className="text-brand-red">металлоконструкций</span>
          </h1>
          <p className="font-body text-white/60 text-base leading-relaxed max-w-2xl">
            Полный цикл производства металлоконструкций — от разработки проекта до монтажа на объекте. Работаем по чертежам заказчика и собственному проектированию.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Направления</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide mb-4">Категории услуг</h2>
            <p className="font-body text-white/55 text-sm leading-relaxed max-w-2xl">
              Выберите направление — на странице категории собрано описание работ и примеры выполненных проектов.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {METALWORK_CATEGORIES.map((cat) => (
              <MetalworkCategoryCard key={cat.id} cat={cat} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Как мы работаем</span>
            </div>
            <h2 className="font-display text-3xl text-white tracking-wide">Этапы производства</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {STEPS.map((item) => (
              <div key={item.step} className="bg-card border border-white/8 p-4 rounded-sm">
                <div className="w-7 h-7 bg-brand-red flex items-center justify-center mb-3">
                  <span className="font-display text-white text-[11px] font-bold">{item.step}</span>
                </div>
                <h3 className="font-display text-white text-sm tracking-wide mb-1 leading-snug">{item.title}</h3>
                <p className="font-body text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
