import Icon from "@/components/ui/icon";

const VALUES = [
  { icon: "ShieldCheck", title: "Надёжность", desc: "Работаем только с проверенными производителями и поставщиками" },
  { icon: "Clock", title: "Опыт с 2013 года", desc: "Более 10 лет успешной работы на рынке промышленного оборудования" },
  { icon: "Wrench", title: "Техническая экспертиза", desc: "Компетентные специалисты помогут подобрать оптимальное решение" },
  { icon: "Handshake", title: "Партнёрство", desc: "Долгосрочные отношения с клиентами — основа нашей философии" },
];

const DIRECTIONS = [
  {
    title: "Гидравлика",
    desc: "Гидравлические станции, цилиндры, распределители, маслостанции, рукава высокого давления (РВД), фитинги.",
    icon: "Droplets",
    page: "catalog-equipment",
  },
  {
    title: "Насосное оборудование",
    desc: "Центробежные, шестерённые, винтовые, вакуумные, дозировочные насосы; насосные станции для воды, масла, агрессивных сред.",
    icon: "Gauge",
    page: "catalog-equipment",
  },
  {
    title: "Спецтехника",
    desc: "Поставка экскаваторов, погрузчиков, самосвалов, автокранов, дорожно-строительной техники (новая и поддержанная с гарантией).",
    icon: "Truck",
    page: "catalog-tech",
  },
  {
    title: "Грузоподъёмное оборудование",
    desc: "Кран-балки, тали, тельферы, подъёмные столы, крановые тележки, запасные части к кранам и грузоподъёмным механизмам.",
    icon: "Anchor",
    page: "catalog-equipment",
  },
  {
    title: "Оборудование для металлообработки",
    desc: "Газопламенные станки, Плазменные станки, Лазерные станки для листового и профильного проката, Труборезы, Балкорезы.",
    icon: "Cog",
    page: "catalog-equipment",
  },
  {
    title: "Сварочное оборудование",
    desc: "Аппараты для сварки MMA, MIG, TIG, Сварочные колонны, системы автоматизированной сварки.",
    icon: "Zap",
    page: "catalog-equipment",
  },
  {
    title: "Роботы и роботизированные решения",
    desc: "Роботизация в сварочных процессах, гибочных процессах, упаковке и логистике.",
    icon: "Bot",
    page: "catalog-equipment",
  },
];

const CLIENTS = [
  { name: "ПАО «ГМК Норильский никель»", industry: "Горно-металлургическая отрасль" },
  { name: "АО «Сибирская угольная энергетическая компания»", industry: "Угледобыча" },
  { name: "ПАО «Полюс»", industry: "Золотодобывающая отрасль" },
  { name: 'ПАО "НК "Роснефть""', industry: "Нефтяная промышленность" },
];

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background border-b border-white/8 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="absolute right-0 top-0 w-px h-full bg-white/5" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">О компании</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex items-center">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-none mb-0 whitespace-nowrap">
                ООО «Альфа Альянс»
              </h1>
            </div>
            <div>
              <p className="font-body text-white/65 text-base leading-relaxed mb-6">
                Компания работает на рынке промышленного оборудования с 2013 года. За это время мы реализовали более 200 проектов по оснащению предприятий разных отраслей.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-display text-brand-red text-4xl font-bold">200+</div>
                  <div className="font-body text-white/40 text-xs tracking-widest uppercase mt-1">проектов</div>
                </div>
                <div className="w-px h-12 bg-white/15" />
                <div>
                  <div className="font-display text-brand-red text-4xl font-bold">13</div>
                  <div className="font-body text-white/40 text-xs tracking-widest uppercase mt-1">лет опыта</div>
                </div>
                <div className="w-px h-12 bg-white/15" />
                <div>
                  <div className="font-display text-brand-red text-4xl font-bold">4</div>
                  <div className="font-body text-white/40 text-xs tracking-widest uppercase mt-1">направления</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Принципы работы</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide">Наши ценности</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-card border border-white/8 p-6 rounded-sm">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-4">
                  <Icon name={v.icon as never} size={18} className="text-brand-red" />
                </div>
                <h3 className="font-display text-white text-lg tracking-wide mb-2">{v.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Что мы делаем</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide">Основные направления деятельности</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIRECTIONS.map((dir) => (
              <button
                key={dir.title}
                onClick={() => onNavigate(dir.page)}
                className="card-hover bg-card border border-white/8 p-6 text-left group rounded-sm"
              >
                <div className="w-12 h-12 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-5 group-hover:bg-brand-red/25 transition-colors">
                  <Icon name={dir.icon as never} size={22} className="text-brand-red" />
                </div>
                <h3 className="font-display text-white text-lg tracking-wide mb-3">{dir.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{dir.desc}</p>
                <div className="flex items-center gap-2 mt-5 text-brand-red text-xs font-body tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Клиентская база</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide mb-4">Клиенты, которые уже с нами</h2>
            <p className="font-body text-white/50 text-sm max-w-xl">
              С 2013 года наши решения внедрены на предприятиях различных отраслей.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLIENTS.map((client) => (
              <div key={client.name} className="bg-card border border-white/8 px-8 py-6 flex items-center gap-4 rounded-sm card-hover">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                  <Icon name="Building2" size={16} className="text-brand-red" />
                </div>
                <div>
                  <div className="font-body text-white text-sm font-medium">{client.name}</div>
                  <div className="font-body text-white/40 text-xs mt-0.5">{client.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-red">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-white tracking-wide mb-2">Готовы к сотрудничеству?</h2>
            <p className="font-body text-white/70 text-sm">Свяжитесь с нами для получения коммерческого предложения</p>
          </div>
          <button
            onClick={() => onNavigate("contacts")}
            className="inline-flex items-center gap-2 bg-white text-brand-red font-display text-sm tracking-[0.1em] uppercase px-8 py-4 hover:bg-white/90 transition-colors rounded-sm shrink-0"
          >
            Связаться с нами
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}