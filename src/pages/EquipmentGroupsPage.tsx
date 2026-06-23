interface Props {
  onNavigate: (page: string) => void;
}

const GROUPS = [
  {
    id: "jacks",
    title: "Домкраты и цилиндры",
    desc: "Домкраты и силовые цилиндры для подъёма, перемещения, фиксации.",
    sub: "9 подгрупп: универсальные, грузовые, алюминиевые, тянущие, низкие, телескопические, специальные, цилиндры на заказ.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
    num: 1,
  },
  {
    id: "pumps",
    title: "Насосы и станции",
    desc: "Источники давления: ручные, ножные, пневматические, электрические, бензиновые, дизельные.",
    sub: "До 140 МПа. Компактные и стационарные варианты.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/6492f583-7a93-40ca-b8fe-191ee58f7a06.jpg",
    num: 2,
  },
  {
    id: "pullers",
    title: "Съёмники",
    desc: "Гидравлические и механические съёмники для демонтажа деталей с натягом.",
    sub: "Стандартные, подкатные, с захватом-хомутом, автономные.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/1b01ebed-c631-403d-9b53-8da1eabea048.png",
    num: 3,
  },
  {
    id: "presses",
    title: "Прессы",
    desc: "Вертикальные и горизонтальные прессы, перфораторы, прессы для опрессовки кабельных наконечников и гильз.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e086c588-cb03-4683-b155-f44e77dd3965.png",
    num: 4,
  },
  {
    id: "cutting",
    title: "Режущий инструмент",
    desc: "Гайкорезы, ножницы для кабеля и уголка, резаки тросов, ножницы для труб и листа.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/533e96b4-ec15-417e-8f06-4b00d56f6927.jpg",
    num: 5,
  },
  {
    id: "threading",
    title: "Оборудование для резьбы",
    desc: "Гайковерты, тензорные домкраты, мультипликаторы, динамометрические ключи, ударные ключи, магнитные гайкодержатели.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e371336d-a708-4342-8200-f79be566f3d4.png",
    num: 6,
  },
  {
    id: "benders",
    title: "Трубогибы",
    desc: "Трубогибы с закрытой рамой: ручные, автономные, с электроприводом.",
    sub: "Трубы до 2 дюймов.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e750022d-9903-4995-b1ab-93ebc5631f42.png",
    num: 7,
  },
  {
    id: "rescue",
    title: "Спасение и ЖД",
    desc: "Комплекты КРУГ (АСР), АВСО (ЖД), рихтовщики, разгонщики, рельсогибы, путевые домкраты.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/15332f38-0f6d-4cc7-9734-d6d61beda309.jpg",
    num: 9,
  },
  {
    id: "special",
    title: "Специальное оборудование",
    desc: "Натяжители арматуры, горизонтальное бурение, перемещение тяжеловесов, стропы, выпрессовщики, разгонщики фланцев, пружинные балансиры.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/dcf990fb-7f19-46d9-9934-05bbda0b689e.png",
    num: 9,
  },
  {
    id: "riklin",
    title: "РиКлайн (эконом)",
    desc: "Экономичная линейка: домкраты, насосные станции, магнитные захваты, тележки, столы, краны, штабелёры, аккумуляторный инструмент.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
    num: 1,
  },
];

export default function EquipmentGroupsPage({ onNavigate }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background border-b border-white/8 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Каталог</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-none mb-4">
            Оборудование
          </h1>
          <p className="font-body text-white/55 text-sm max-w-xl leading-relaxed">
            Гидравлическое оборудование, инструмент и техника для промышленных предприятий. Выберите группу для подробного описания и перечня продукции.
          </p>
        </div>
      </section>

      {/* Groups grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => onNavigate(`equipment-group-${g.id}`)}
                className="group text-left bg-card border border-white/8 rounded-sm overflow-hidden hover:border-brand-red/60 transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="relative h-48 bg-white overflow-hidden">
                  <img
                    src={g.img}
                    alt={g.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-7 h-7 bg-brand-red flex items-center justify-center">
                    <span className="font-display text-white text-xs font-bold">{String(GROUPS.indexOf(g) + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-white text-lg tracking-wide mb-2 group-hover:text-brand-red-light transition-colors">
                    {g.title}
                  </h3>
                  <p className="font-body text-white/50 text-xs leading-relaxed mb-1">{g.desc}</p>
                  {g.sub && (
                    <p className="font-body text-white/30 text-xs leading-relaxed">{g.sub}</p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-brand-red text-xs font-body tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Подробнее</span>
                    <span>→</span>
                  </div>
                </div>
              </button>
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
