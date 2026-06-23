import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const CATALOG_URL = "https://functions.poehali.dev/f4ad2a1e-e623-48dd-8d81-c418d8b625c3";

interface Product {
  id: number;
  title: string;
  specs: Record<string, string>;
  category: string | null;
}

interface Group {
  id: number;
  name: string;
  slug: string;
}

interface CatalogEquipmentPageProps {
  onNavigate: (page: string) => void;
}

export default function CatalogEquipmentPage({ onNavigate }: CatalogEquipmentPageProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [loading, setLoading] = useState(true);
  const [groupLoading, setGroupLoading] = useState(false);

  useEffect(() => {
    fetch(CATALOG_URL)
      .then((r) => r.json())
      .then((data) => {
        setGroups(data.groups || []);
        if (data.groups?.length > 0) {
          loadGroup(data.groups[0]);
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  const loadGroup = (group: Group) => {
    setActiveGroup(group);
    setActiveCategory("Все");
    setGroupLoading(true);
    fetch(`${CATALOG_URL}?group=${group.slug}`)
      .then((r) => r.json())
      .then((data) => {
        const cats: string[] = ["Все", ...((data.categories as { name: string }[]) || []).map((c) => c.name)];
        setCategories(cats);
        setProducts(data.products || []);
      })
      .finally(() => {
        setGroupLoading(false);
        setLoading(false);
      });
  };

  const filtered =
    activeCategory === "Все" ? products : products.filter((p) => p.category === activeCategory);

  const specEntries = (specs: Record<string, string>) => Object.entries(specs).slice(0, 3);

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
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate("admin-import")}
                className="px-4 py-3 text-xs border border-white/20 text-white/40 hover:text-white/70 hover:border-white/40 rounded-sm inline-flex items-center gap-2 transition-colors"
              >
                <Icon name="Upload" size={14} />
                Импорт
              </button>
              <button
                onClick={() => onNavigate("contacts")}
                className="btn-primary px-6 py-3 text-xs rounded-sm inline-flex items-center gap-2 shrink-0"
              >
                <Icon name="FileText" size={14} />
                Запросить КП
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Group tabs */}
      {groups.length > 0 && (
        <section className="bg-background border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
              {groups.map((g) => (
                <button
                  key={g.slug}
                  onClick={() => loadGroup(g)}
                  className={`shrink-0 font-body text-xs tracking-[0.1em] uppercase px-5 py-2.5 border transition-all rounded-sm ${
                    activeGroup?.slug === g.slug
                      ? "bg-brand-red border-brand-red text-white"
                      : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category filter */}
      {categories.length > 1 && (
        <section className="bg-brand-dark-2 border-b border-white/8 sticky top-16 md:top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
              {categories.map((cat) => (
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
      )}

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading || groupLoading ? (
            <div className="flex items-center justify-center py-24 gap-3 text-white/30">
              <Icon name="Loader2" size={24} className="animate-spin" />
              <span className="text-sm">Загружаю каталог...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Icon name="PackageOpen" size={48} className="text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-sm">Товары не найдены</p>
              <p className="text-white/25 text-xs mt-2">Загрузи Excel-файл через кнопку «Импорт»</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-white/8 rounded-sm overflow-hidden card-hover group"
                >
                  <div className="bg-brand-dark-2 h-28 flex items-center justify-center border-b border-white/8">
                    <Icon name="Package" size={40} className="text-white/10" />
                  </div>
                  <div className="p-6">
                    {item.category && (
                      <span className="font-body text-brand-red text-[10px] tracking-widest uppercase block mb-1">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-display text-white text-lg tracking-wide mb-3">{item.title}</h3>
                    {specEntries(item.specs).length > 0 && (
                      <div className="space-y-1.5 mb-5">
                        {specEntries(item.specs).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-xs gap-2">
                            <span className="text-white/35 truncate">{key}</span>
                            <span className="text-white/70 shrink-0">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}
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
          )}
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
