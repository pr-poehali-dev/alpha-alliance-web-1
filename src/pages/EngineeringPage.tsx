import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "Settings",
    title: "Подбор технологического оборудования",
    desc: "Комплексный анализ производственных задач и подбор оптимального оборудования для вашего предприятия",
    features: [
      "Анализ технологических процессов",
      "Подбор оборудования под задачи",
      "Расчет производительности",
      "Оптимизация бюджета",
    ],
  },
  {
    icon: "Lightbulb",
    title: "Разработка технических решений",
    desc: "Проектирование и разработка индивидуальных технических решений для сложных производственных задач",
    features: [
      "Инженерные расчеты",
      "Техническая документация",
      "Моделирование процессов",
      "Внедрение решений",
    ],
  },
  {
    icon: "Wrench",
    title: "Модернизация производства",
    desc: "Анализ текущих производственных процессов и разработка решений по их оптимизации и модернизации",
    features: [
      "Аудит производства",
      "Выявление узких мест",
      "План модернизации",
      "Сопровождение внедрения",
    ],
  },
  {
    icon: "Database",
    title: "Автоматизация процессов",
    desc: "Разработка систем автоматизации для повышения эффективности производства и снижения затрат",
    features: [
      "Системы управления",
      "Интеграция оборудования",
      "Диспетчеризация",
      "Обучение персонала",
    ],
  },
];

const INDUSTRIES = [
  { icon: "Mountain", name: "Горнодобывающая промышленность" },
  { icon: "Flame", name: "Нефтяная и газовая отрасль" },
  { icon: "Zap", name: "Электроэнергетика" },
  { icon: "Factory", name: "Металлургия" },
  { icon: "Construction", name: "Строительство" },
];

interface EngineeringPageProps {
  onNavigate: (page: string) => void;
}

export default function EngineeringPage({ onNavigate }: EngineeringPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-10 bg-background border-b border-white/8 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="absolute right-8 top-32 opacity-5">
          <Icon name="Cpu" size={320} className="text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Направление</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white tracking-wide leading-none mb-6">
            Инжиниринг
          </h1>
          <p className="font-body text-white/60 text-base leading-relaxed max-w-2xl">
            Комплексные инжиниринговые услуги, от технического аудита до полного сопровождения проекта.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="pt-12 pb-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-display text-4xl text-white tracking-wide">Отрасли, в которых мы работаем</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="bg-card border border-white/8 p-5 text-center card-hover rounded-sm">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mx-auto mb-3">
                  <Icon name={ind.icon as never} size={16} className="text-brand-red" />
                </div>
                <p className="font-body text-white/65 text-base leading-snug">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-display text-4xl text-white tracking-wide">Инжиниринговые услуги</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-card border border-white/8 p-8 rounded-sm card-hover group">
                <div className="w-14 h-14 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-6 rounded-sm group-hover:bg-brand-red/25 transition-colors">
                  <Icon name={service.icon as never} size={24} className="text-brand-red" />
                </div>
                <h3 className="font-display text-white text-2xl tracking-wide mb-3">{service.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Icon name="Check" size={16} className="text-brand-red shrink-0 mt-0.5" />
                      <span className="font-body text-white/70 text-sm leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

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