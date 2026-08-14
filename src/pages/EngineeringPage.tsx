import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "Cpu",
    title: "Проектирование гидросистем",
    desc: "Разработка гидравлических схем, подбор компонентов, расчёт параметров систем для любого оборудования.",
    tags: ["Гидравлика", "Проект"],
  },
  {
    icon: "Activity",
    title: "Диагностика и аудит",
    desc: "Техническая диагностика существующего оборудования, выявление узких мест, рекомендации по модернизации.",
    tags: ["Аудит", "Диагностика"],
  },
  {
    icon: "RefreshCw",
    title: "Модернизация оборудования",
    desc: "Замена устаревших гидравлических и насосных систем на современные энергоэффективные решения.",
    tags: ["Модернизация"],
  },
  {
    icon: "Settings",
    title: "Шеф-монтаж и пуско-наладка",
    desc: "Техническое сопровождение монтажа, настройка, тестирование и сдача систем в эксплуатацию.",
    tags: ["Монтаж", "Наладка"],
  },
  {
    icon: "BookOpen",
    title: "Техническая документация",
    desc: "Разработка регламентов обслуживания, инструкций, технических паспортов оборудования.",
    tags: ["Документация"],
  },
  {
    icon: "GraduationCap",
    title: "Обучение персонала",
    desc: "Инструктаж технического персонала по эксплуатации, техническому обслуживанию и ремонту оборудования.",
    tags: ["Обучение"],
  },
];

const INDUSTRIES = [
  { icon: "Mountain", name: "Горнодобывающая промышленность" },
  { icon: "Flame", name: "Нефтяная и газовая отрасль" },
  { icon: "Zap", name: "Электроэнергетика" },
  { icon: "Factory", name: "Металлургия" },
  { icon: "TreePine", name: "Лесная промышленность" },
  { icon: "Construction", name: "Строительство" },
];

interface EngineeringPageProps {
  onNavigate: (page: string) => void;
}

export default function EngineeringPage({ onNavigate }: EngineeringPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background border-b border-white/8 relative overflow-hidden">
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
          <p className="font-body text-white/60 text-base leading-relaxed max-w-2xl mb-10">
            Комплексные инжиниринговые услуги, от технического аудита до полного сопровождения проекта.
          </p>
          <button
            onClick={() => onNavigate("contacts")}
            className="btn-primary px-8 py-4 text-xs rounded-sm inline-flex items-center gap-2"
          >
            <Icon name="MessageSquare" size={14} />
            Обсудить проект
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Компетенции</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide">Инжиниринговые услуги</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-card border border-white/8 p-6 rounded-sm card-hover group">
                <div className="w-12 h-12 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-5 group-hover:bg-brand-red/25 transition-colors">
                  <Icon name={service.icon as never} size={20} className="text-brand-red" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {service.tags.map((tag) => (
                    <span key={tag} className="font-body text-[10px] tracking-wider uppercase text-white/35 bg-white/5 px-2 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-white text-xl tracking-wide mb-3">{service.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-background border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Опыт работы</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide">Отрасли, в которых мы работаем</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="bg-card border border-white/8 p-5 text-center card-hover rounded-sm">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mx-auto mb-3">
                  <Icon name={ind.icon as never} size={16} className="text-brand-red" />
                </div>
                <p className="font-body text-white/65 text-xs leading-snug">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto">
            <div className="bg-brand-red/10 border border-brand-red/25 p-8 rounded-sm">
              <h3 className="font-display text-white text-2xl tracking-wide mb-4">Обсудить проект?</h3>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-6">
                Расскажите о задаче — наш инженер свяжется с вами, изучит техническое задание и предложит оптимальное решение.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate("contacts")}
                  className="btn-primary w-full py-3 text-xs rounded-sm flex items-center justify-center gap-2"
                >
                  Оставить заявку
                  <Icon name="ArrowRight" size={14} />
                </button>
                <a
                  href="tel:+79293132080"
                  className="btn-outline-white w-full py-3 text-xs rounded-sm flex items-center justify-center gap-2"
                >
                  <Icon name="Phone" size={14} />
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}