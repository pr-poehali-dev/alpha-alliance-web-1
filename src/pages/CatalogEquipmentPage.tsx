import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Гидравлика", "Насосное оборудование", "Грузоподъёмное"];

const ITEMS = [
  {
    category: "Гидравлика",
    title: "Гидравлические станции",
    desc: "Маслостанции для питания гидравлических систем промышленного оборудования. Объём бака от 20 до 2000 л.",
    params: "Давление до 350 бар",
    icon: "Droplets",
  },
  {
    category: "Гидравлика",
    title: "Гидравлические цилиндры",
    desc: "Одно- и двустороннего действия. Ход поршня до 6000 мм. Рабочее давление до 250 бар.",
    params: "Усилие до 3000 кН",
    icon: "Droplets",
  },
  {
    category: "Гидравлика",
    title: "Гидрораспределители",
    desc: "Моноблочные и секционные распределители для управления гидроприводами. Производители Parker, Bosch Rexroth, Vickers.",
    params: "Расход до 400 л/мин",
    icon: "Droplets",
  },
  {
    category: "Гидравлика",
    title: "Рукава высокого давления (РВД)",
    desc: "РВД в сборе с фитингами на давление до 700 бар. Диаметры от DN06 до DN51. Быстрое изготовление.",
    params: "Давление до 700 бар",
    icon: "Droplets",
  },
  {
    category: "Гидравлика",
    title: "Фитинги и трубопроводная арматура",
    desc: "Прямые, угловые, тройниковые фитинги. Резьбы BSP, NPT, Metric. Нержавеющая сталь и углеродистая сталь.",
    params: "Типоразмеры DN06–DN51",
    icon: "Settings",
  },
  {
    category: "Насосное оборудование",
    title: "Центробежные насосы",
    desc: "Горизонтальные и вертикальные центробежные насосы для воды, нефтепродуктов, химических сред.",
    params: "Подача до 5000 м³/ч",
    icon: "Gauge",
  },
  {
    category: "Насосное оборудование",
    title: "Шестерённые насосы",
    desc: "Шестерённые насосы для перекачки масел, топлива, смазочных материалов и вязких жидкостей.",
    params: "Вязкость до 100 000 сСт",
    icon: "Gauge",
  },
  {
    category: "Насосное оборудование",
    title: "Винтовые насосы",
    desc: "Одновинтовые и многовинтовые насосы для нефти, мазута, высоковязких и абразивных сред.",
    params: "Подача до 500 м³/ч",
    icon: "Gauge",
  },
  {
    category: "Насосное оборудование",
    title: "Вакуумные насосы",
    desc: "Пластинчато-роторные, жидкостно-кольцевые и спиральные вакуумные насосы для промышленных применений.",
    params: "Остаточное давление до 0,1 мбар",
    icon: "Gauge",
  },
  {
    category: "Насосное оборудование",
    title: "Дозировочные насосы",
    desc: "Мембранные и поршневые дозировочные насосы для точного дозирования химических реагентов.",
    params: "Точность дозирования ±1%",
    icon: "Gauge",
  },
  {
    category: "Грузоподъёмное",
    title: "Кран-балки",
    desc: "Однобалочные и двухбалочные кран-балки г/п от 1 до 50 тонн. Пролёт до 28 м. Управление кнопочным постом или радиопультом.",
    params: "Г/п до 50 т",
    icon: "Anchor",
  },
  {
    category: "Грузоподъёмное",
    title: "Тали и тельферы",
    desc: "Электрические и ручные цепные тали. Г/п от 0,5 до 20 тонн. Высота подъёма до 36 м.",
    params: "Г/п до 20 т",
    icon: "Anchor",
  },
  {
    category: "Грузоподъёмное",
    title: "Подъёмные столы",
    desc: "Гидравлические подъёмные столы стационарные и передвижные. Г/п от 500 кг до 10 тонн.",
    params: "Г/п до 10 т",
    icon: "Anchor",
  },
];

interface CatalogEquipmentPageProps {
  onNavigate: (page: string) => void;
}

export default function CatalogEquipmentPage({ onNavigate }: CatalogEquipmentPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory);

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-none mb-4">
                Оборудование
              </h1>
              <p className="font-body text-white/55 text-sm max-w-xl leading-relaxed">
                Гидравлическое оборудование, насосные системы и грузоподъёмная техника для промышленных предприятий. Индивидуальный подбор и поставка.
              </p>
            </div>
            <button
              onClick={() => onNavigate("contacts")}
              className="btn-primary px-6 py-3 text-xs rounded-sm inline-flex items-center gap-2 shrink-0"
            >
              <Icon name="FileText" size={14} />
              Запросить КП
            </button>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-brand-dark-2 border-b border-white/8 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-body text-xs tracking-[0.12em] uppercase px-4 py-2 border transition-all rounded-sm ${
                  activeCategory === cat
                    ? "bg-brand-red border-brand-red text-white"
                    : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.title}
                className="bg-card border border-white/8 rounded-sm overflow-hidden card-hover group"
              >
                <div className="bg-brand-dark-2 h-36 flex items-center justify-center border-b border-white/8">
                  <Icon name={item.icon as never} size={48} className="text-white/10" />
                </div>
                <div className="p-6">
                  <div className="mb-1">
                    <span className="font-body text-brand-red text-[10px] tracking-widest uppercase">{item.params}</span>
                  </div>
                  <h3 className="font-display text-white text-lg tracking-wide mb-3">{item.title}</h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <button
                    onClick={() => onNavigate("contacts")}
                    className="w-full btn-outline-white py-2.5 text-xs rounded-sm opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    Запросить цену
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-brand-dark-2 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <Icon name="Package" size={32} className="text-white/20 mx-auto mb-4" />
          <h3 className="font-display text-2xl text-white tracking-wide mb-3">Не нашли нужную позицию?</h3>
          <p className="font-body text-white/50 text-sm mb-6">Отправьте технический запрос — подберём и поставим под ваши задачи</p>
          <button
            onClick={() => onNavigate("contacts")}
            className="btn-primary px-8 py-3 text-xs rounded-sm inline-flex items-center gap-2"
          >
            Отправить запрос
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
