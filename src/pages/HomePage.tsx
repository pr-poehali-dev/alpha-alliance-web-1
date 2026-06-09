import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/files/6d1e745a-50bf-4647-ae03-3b755e4ae85a.jpg";
const EQUIP_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/files/39cb964f-b88b-47b1-b891-3fd32f0d40f6.jpg";
const TECH_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/files/db76b761-b73c-4d89-b50f-7744cedf0178.jpg";

const STATS = [
  { value: "13", label: "лет на рынке", icon: "CalendarDays" },
  { value: "200+", label: "реализованных проектов", icon: "Briefcase" },
  { value: "4", label: "направления деятельности", icon: "Layers" },
  { value: "100%", label: "гарантия на технику", icon: "ShieldCheck" },
];

const DIRECTIONS = [
  {
    icon: "Droplets",
    title: "Гидравлика",
    desc: "Гидростанции, цилиндры, распределители, маслостанции, рукава РВД, фитинги",
    page: "catalog-equipment",
  },
  {
    icon: "Gauge",
    title: "Насосное оборудование",
    desc: "Центробежные, шестерённые, винтовые, вакуумные и дозировочные насосы",
    page: "catalog-equipment",
  },
  {
    icon: "Truck",
    title: "Спецтехника",
    desc: "Экскаваторы, погрузчики, самосвалы, автокраны, дорожно-строительная техника",
    page: "catalog-tech",
  },
  {
    icon: "Anchor",
    title: "Грузоподъёмное оборудование",
    desc: "Кран-балки, тали, тельферы, подъёмные столы, запасные части",
    page: "catalog-equipment",
  },
];

const CLIENTS = [
  "ПАО «ГМК Норильский никель»",
  "АО «СУЭК»",
  "ПАО «Полюс»",
  'ПАО "НК "Роснефть""',
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Red accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up opacity-0-init">
              <div className="w-10 h-px bg-brand-red" />
              <span className="font-body text-white/60 text-xs tracking-[0.25em] uppercase">
                ООО «Альфа Альянс» · с 2013 года
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl xl:text-8xl text-white leading-none tracking-wide mb-6 animate-fade-up opacity-0-init delay-100">
              Промышленное<br />
              <span className="text-brand-red">оборудование</span><br />
              и спецтехника
            </h1>
            <p className="font-body text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-xl animate-fade-up opacity-0-init delay-200">
              Поставка гидравлики, насосного оборудования, спецтехники и грузоподъёмных механизмов для промышленных предприятий России
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0-init delay-300">
              <button
                onClick={() => onNavigate("catalog-equipment")}
                className="btn-primary px-8 py-4 text-sm rounded-sm"
              >
                Каталог оборудования
              </button>
              <button
                onClick={() => onNavigate("contacts")}
                className="btn-outline-white px-8 py-4 text-sm rounded-sm"
              >
                Отправить запрос
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0-init delay-600">
          <span className="font-body text-white/30 text-xs tracking-widest uppercase">Листать</span>
          <Icon name="ChevronDown" size={16} className="text-white/30 animate-bounce" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-red py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="font-display text-white text-4xl md:text-5xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-white/70 text-xs tracking-[0.15em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Что мы поставляем</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide">
              Основные направления
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIRECTIONS.map((dir) => (
              <button
                key={dir.title}
                onClick={() => onNavigate(dir.page)}
                className="card-hover bg-card border border-white/8 p-6 text-left group rounded-sm"
              >
                <div className="w-12 h-12 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-5 group-hover:bg-brand-red/25 transition-colors">
                  <Icon name={dir.icon as never} size={22} className="text-brand-red" />
                </div>
                <h3 className="font-display text-white text-lg tracking-wide mb-3 group-hover:text-white">
                  {dir.title}
                </h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  {dir.desc}
                </p>
                <div className="flex items-center gap-2 mt-5 text-brand-red text-xs font-body tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT SECTION — TECH */}
      <section className="py-0 bg-brand-dark-2 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[320px] lg:min-h-auto">
            <img src={TECH_IMG} alt="Спецтехника" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-dark-2/80" />
          </div>
          <div className="flex items-center px-8 md:px-16 py-16">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-brand-red" />
                <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Каталог</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-6 leading-tight">
                Спецтехника<br />с гарантией
              </h2>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-8">
                Поставляем экскаваторы, погрузчики, самосвалы, автокраны и дорожно-строительную технику — как новую, так и поддержанную с гарантией.
              </p>
              <button
                onClick={() => onNavigate("catalog-tech")}
                className="btn-primary px-7 py-3 text-xs rounded-sm inline-flex items-center gap-2"
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT SECTION — EQUIPMENT */}
      <section className="py-0 bg-background overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="flex items-center px-8 md:px-16 py-16 order-2 lg:order-1">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-brand-red" />
                <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Оборудование</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-6 leading-tight">
                Гидравлика<br />и насосы
              </h2>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-8">
                Полный спектр гидравлического и насосного оборудования для предприятий добывающей, строительной и перерабатывающей промышленности.
              </p>
              <button
                onClick={() => onNavigate("catalog-equipment")}
                className="btn-primary px-7 py-3 text-xs rounded-sm inline-flex items-center gap-2"
              >
                Каталог оборудования
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-auto order-1 lg:order-2">
            <img src={EQUIP_IMG} alt="Оборудование" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/70" />
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-20 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Доверяют нам</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide">
              Наши клиенты
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLIENTS.map((client) => (
              <div
                key={client}
                className="border border-white/10 bg-card px-6 py-8 text-center card-hover rounded-sm"
              >
                <div className="w-8 h-8 bg-brand-red/20 border border-brand-red/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Building2" size={16} className="text-brand-red" />
                </div>
                <p className="font-body text-white/70 text-sm leading-snug">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black/30 blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-4">
            Нужна консультация?
          </h2>
          <p className="font-body text-white/75 text-base mb-10 max-w-lg mx-auto">
            Опишите вашу задачу — подберём оборудование, подготовим коммерческое предложение
          </p>
          <button
            onClick={() => onNavigate("contacts")}
            className="inline-flex items-center gap-2 bg-white text-brand-red font-display text-sm tracking-[0.1em] uppercase px-10 py-4 hover:bg-white/90 transition-colors rounded-sm"
          >
            <Icon name="MessageSquare" size={16} />
            Отправить запрос
          </button>
        </div>
      </section>
    </div>
  );
}
