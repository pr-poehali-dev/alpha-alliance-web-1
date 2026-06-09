import Icon from "@/components/ui/icon";

const CAPABILITIES = [
  {
    icon: "Scissors",
    title: "Лазерная и плазменная резка",
    desc: "Резка листового металла толщиной от 1 до 100 мм. Высокая точность реза, минимальный тепловой деформации.",
  },
  {
    icon: "Wrench",
    title: "Сварочные работы",
    desc: "Ручная дуговая, полуавтоматическая, аргонодуговая и автоматическая сварка. Все марки стали и нержавейка.",
  },
  {
    icon: "Layers",
    title: "Гибка и штамповка",
    desc: "Гибка листа на листогибочных прессах. Штамповка деталей из листового металла любой сложности.",
  },
  {
    icon: "Settings",
    title: "Механическая обработка",
    desc: "Токарные, фрезерные, сверлильные работы. Изготовление деталей по чертежам заказчика.",
  },
  {
    icon: "Shield",
    title: "Антикоррозийная защита",
    desc: "Грунтовка, окраска, горячее цинкование, нанесение защитных покрытий по ГОСТ и ТУ заказчика.",
  },
  {
    icon: "Package",
    title: "Сборка и монтаж",
    desc: "Полный цикл от изготовления до монтажа металлоконструкций непосредственно на объекте.",
  },
];

const PRODUCTS = [
  "Опорные металлоконструкции и рамы",
  "Резервуары и ёмкости",
  "Трубопроводные системы",
  "Металлические лестницы и площадки",
  "Ограждения и перила",
  "Балочные перекрытия",
  "Нестандартное оборудование",
  "Детали и узлы по чертежам",
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
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white tracking-wide leading-none mb-6">
            Изготовление<br />
            <span className="text-brand-red">металло-</span><br />
            конструкций
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

      {/* Process */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Как мы работаем</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide">Этапы производства</h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/8 hidden md:block" />
            <div className="space-y-4">
              {[
                { step: "01", title: "Получение задания", desc: "Принимаем чертежи, ТУ или техническое задание. Консультируем по выбору материалов и технологий." },
                { step: "02", title: "Проектирование и расчёт", desc: "Разрабатываем рабочую документацию, проводим расчёты прочности и готовим смету." },
                { step: "03", title: "Производство", desc: "Изготавливаем металлоконструкции на собственном оборудовании с контролем качества на каждом этапе." },
                { step: "04", title: "Контроль качества", desc: "Проводим испытания, замеры, дефектоскопию сварных швов в соответствии с нормами." },
                { step: "05", title: "Отгрузка и монтаж", desc: "Доставляем продукцию и при необходимости выполняем монтаж на объекте заказчика." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-6 bg-card border border-white/8 p-6 rounded-sm ml-0 md:ml-10">
                  <div className="w-10 h-10 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-display text-white text-sm font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-white text-lg tracking-wide mb-1">{item.title}</h3>
                    <p className="font-body text-white/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Производство</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide">Производственные возможности</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="bg-card border border-white/8 p-6 rounded-sm card-hover">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-4">
                  <Icon name={cap.icon as never} size={18} className="text-brand-red" />
                </div>
                <h3 className="font-display text-white text-lg tracking-wide mb-2">{cap.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-brand-red" />
                <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Что изготавливаем</span>
              </div>
              <h2 className="font-display text-4xl text-white tracking-wide mb-8">Виды продукции</h2>
              <div className="space-y-3">
                {PRODUCTS.map((product, i) => (
                  <div key={product} className="flex items-center gap-4 border-b border-white/8 pb-3">
                    <span className="font-body text-white/25 text-xs w-6">0{i + 1}</span>
                    <span className="font-body text-white/75 text-sm">{product}</span>
                    <Icon name="ChevronRight" size={12} className="text-brand-red ml-auto" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-red/10 border border-brand-red/20 p-8 rounded-sm">
              <Icon name="FileCheck" size={32} className="text-brand-red mb-5" />
              <h3 className="font-display text-white text-2xl tracking-wide mb-4">Получить расчёт стоимости</h3>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-6">
                Отправьте чертежи или техническое задание — подготовим коммерческое предложение в течение 1 рабочего дня.
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
    </div>
  );
}
