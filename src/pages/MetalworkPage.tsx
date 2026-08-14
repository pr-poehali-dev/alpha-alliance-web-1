import Icon from "@/components/ui/icon";
import { METALWORK_CATEGORIES } from "@/data/metalwork";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <section className="pt-32 pb-20 bg-background border-b border-white/8 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="absolute right-8 top-32 opacity-5">
          <Icon name="Settings" size={320} className="text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Услуги</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl xl:text-6xl text-white tracking-wide leading-tight mb-6">
            Изготовление<br />
            <span className="text-brand-red">металлоконструкций</span>
          </h1>
          <p className="font-body text-white/60 text-base leading-relaxed max-w-xl mb-10">
            Полный цикл производства металлоконструкций — от разработки проекта до монтажа на объекте. Работаем по чертежам заказчика и собственному проектированию.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate("contacts")}
              className="btn-primary px-8 py-4 text-xs rounded-sm inline-flex items-center gap-2"
            >
              <Icon name="FileText" size={14} />
              Запросить расчёт стоимости
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Направления</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide mb-4">Категории услуг</h2>
            <p className="font-body text-white/55 text-sm leading-relaxed max-w-2xl">
              Выберите направление — на странице категории собрано описание работ и примеры выполненных проектов.
            </p>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {METALWORK_CATEGORIES.map((cat) => {
                const cover = cat.img ?? cat.gallery[0]?.img;
                return (
                  <CarouselItem key={cat.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                    <button
                      onClick={() => onNavigate(`metalwork-category-${cat.id}`)}
                      className="bg-card border border-white/8 rounded-sm card-hover text-left flex flex-col overflow-hidden w-full h-full"
                    >
                      <div className="aspect-[4/3] w-full bg-brand-dark-2 overflow-hidden flex items-center justify-center">
                        {cover ? (
                          <img
                            src={cover}
                            alt={cat.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon name={cat.icon as never} size={48} className="text-white/15" />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-white text-lg tracking-wide mb-2">{cat.title}</h3>
                        <p className="font-body text-white/50 text-sm leading-relaxed mb-4">{cat.short}</p>
                        <span className="font-body text-brand-red text-xs tracking-wide inline-flex items-center gap-2 mt-auto">
                          Подробнее
                          <Icon name="ArrowRight" size={12} />
                        </span>
                      </div>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-card border-white/15 text-white hover:bg-brand-red hover:text-white" />
            <CarouselNext className="hidden md:flex -right-4 bg-card border-white/15 text-white hover:bg-brand-red hover:text-white" />
          </Carousel>
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
    </div>
  );
}
