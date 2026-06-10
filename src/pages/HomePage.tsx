import { useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const HERO_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/files/6d1e745a-50bf-4647-ae03-3b755e4ae85a.jpg";
const EQUIP_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/files/39cb964f-b88b-47b1-b891-3fd32f0d40f6.jpg";
const TECH_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/files/db76b761-b73c-4d89-b50f-7744cedf0178.jpg";
const METAL_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/f5c0bde0-cb00-429c-a7e8-fbe11e9850e3.png";
const ROBOT_IMG = "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/7214c4b5-398c-4ca6-970a-a48f5f4a8d58.jpg";

const STATS = [
  { value: "13", label: "лет на рынке", icon: "CalendarDays" },
  { value: "200+", label: "реализованных проектов", icon: "Briefcase" },
  { value: "10", label: "направлений деятельности", icon: "Layers" },
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
  {
    icon: "Cog",
    title: "Оборудование для металлообработки",
    desc: "Газопламенные станки, Плазменные станки, Лазерные станки для листового и профильного проката, Труборезы, Балкорезы",
    page: "catalog-equipment",
  },
  {
    icon: "Zap",
    title: "Сварочное оборудование",
    desc: "Аппараты для сварки MMA, MIG, TIG, Сварочные колонны, системы автоматизированной сварки",
    page: "catalog-equipment",
  },
  {
    icon: "Bot",
    title: "Роботы и роботизированные решения",
    desc: "Роботизация в сварочных процессах, гибочных процессах, упаковке и логистике",
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
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "+7 " });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 1) return "+7 ";
    let f = "+7";
    if (digits.length > 1) f += " " + digits.slice(1, 4);
    if (digits.length > 4) f += " " + digits.slice(4, 7);
    if (digits.length > 7) f += " " + digits.slice(7, 9);
    if (digits.length > 9) f += " " + digits.slice(9, 11);
    return f;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length < 3) { setForm({ ...form, phone: "+7 " }); return; }
    const digits = input.replace(/\D/g, "");
    if (digits.length <= 11) setForm({ ...form, phone: formatPhone(input) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length !== 11) { setStatus("error"); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch(func2url["contact-form"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", phone: "+7 " }); }
      else setStatus("error");
    } catch { setStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  const handleClose = () => {
    setModalOpen(false);
    setStatus("idle");
    setForm({ name: "", phone: "+7 " });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("alfaallianse-info@mail.ru").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative z-10 w-full max-w-md bg-card border border-white/12 rounded-sm shadow-2xl shadow-black/60 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-white text-2xl tracking-wide">Оставьте заявку</h3>
              <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-16 h-16 bg-brand-red/20 border border-brand-red/40 flex items-center justify-center mb-4 rounded-sm">
                  <Icon name="CheckCircle" size={28} className="text-brand-red" />
                </div>
                <p className="font-display text-white text-lg tracking-wide mb-1">Заявка отправлена!</p>
                <p className="font-body text-white/50 text-sm">Свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-sm text-brand-red text-xs font-body flex items-center gap-2">
                    <Icon name="AlertCircle" size={13} />
                    Введите корректный номер телефона
                  </div>
                )}
                <div>
                  <label className="font-body text-white/40 text-xs tracking-[0.15em] uppercase block mb-2">Ваше имя *</label>
                  <input
                    required type="text" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Петров"
                    className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25"
                  />
                </div>
                <div>
                  <label className="font-body text-white/40 text-xs tracking-[0.15em] uppercase block mb-2">Телефон *</label>
                  <input
                    required type="tel" value={form.phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 XXX XXX XX XX"
                    className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25"
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-sm rounded-sm flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={15} />
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </button>
                <p className="font-body text-white/20 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>

                <div className="border-t border-white/8 pt-4">
                  <p className="font-body text-white/40 text-xs text-center mb-2">либо пришлите запрос на почту</p>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-sm hover:bg-white/5 transition-colors group"
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={13} className={copied ? "text-brand-red" : "text-white/40 group-hover:text-white/70"} />
                    <span className="font-body text-white text-sm hover:text-brand-red transition-colors">
                      alfaallianse-info@mail.ru
                    </span>
                  </button>
                  <p className="font-body text-white/25 text-[10px] text-center mt-1">
                    {copied ? "Скопировано!" : "нажмите — скопируется в буфер"}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
            <h1 className="font-display text-5xl md:text-7xl xl:text-8xl text-white leading-none tracking-wide mb-6 animate-fade-up opacity-0-init delay-100">
              Промышленное<br />
              <span className="text-brand-red">оборудование</span><br />
              и спецтехника
            </h1>
            <p className="font-body text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-xl animate-fade-up opacity-0-init delay-200">
              Поставка гидравлики, насосного оборудования, спецтехники и грузоподъёмных механизмов, станков термической резки, роботизированных комплексов для промышленных предприятий России
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0-init delay-300">
              <button
                onClick={() => onNavigate("catalog-equipment")}
                className="btn-primary px-8 py-4 text-sm rounded-sm"
              >
                Каталог оборудования
              </button>
              <button
                onClick={() => setModalOpen(true)}
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

      {/* SPLIT SECTIONS */}
      {[
        {
          img: TECH_IMG,
          label: "Каталог",
          title: <><span>Спецтехника</span><br /><span>с гарантией</span></>,
          desc: "Поставляем экскаваторы, погрузчики, самосвалы, автокраны и дорожно-строительную технику — как новую, так и поддержанную с гарантией.",
          btnText: "Смотреть каталог",
          btnPage: "catalog-tech",
          imgLeft: true,
        },
        {
          img: EQUIP_IMG,
          label: "Оборудование",
          title: <><span>Гидравлика</span><br /><span>и насосы</span></>,
          desc: "Полный спектр гидравлического и насосного оборудования для предприятий добывающей, строительной и перерабатывающей промышленности.",
          btnText: "Каталог оборудования",
          btnPage: "catalog-equipment",
          imgLeft: false,
        },
        {
          img: METAL_IMG,
          label: "Оборудование",
          title: <><span>Оборудование для</span><br /><span>металлообработки</span></>,
          desc: "Газопламенные, плазменные и лазерные станки для листового и профильного проката. Труборезы и балкорезы для промышленных предприятий.",
          btnText: "Каталог оборудования",
          btnPage: "catalog-equipment",
          imgLeft: true,
        },
        {
          img: ROBOT_IMG,
          label: "Роботизация",
          title: <><span>Роботы и</span><br /><span>роботизированные</span><br /><span>решения</span></>,
          desc: "Роботизация сварочных, гибочных, упаковочных и логистических процессов. Комплексная автоматизация производства под ключ.",
          btnText: "Узнать подробнее",
          btnPage: "catalog-equipment",
          imgLeft: false,
        },
      ].map((block, idx) => (
        <section
          key={idx}
          className="py-16 relative overflow-hidden border-t border-white/10"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={`absolute inset-0 ${idx % 2 === 0 ? "bg-black/80" : "bg-black/65"}`} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            <div className={`flex flex-col md:flex-row gap-8 items-center ${!block.imgLeft ? "md:flex-row-reverse" : ""}`}>
              {/* Image card — fixed size */}
              <div className="shrink-0 w-full md:w-[480px] h-[300px] rounded-sm overflow-hidden shadow-2xl shadow-black/50">
                <img
                  src={block.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Text */}
              <div className="flex-1 max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-brand-red" />
                  <span className="font-body text-white/50 text-xs tracking-[0.25em] uppercase">{block.label}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-5 leading-tight">
                  {block.title}
                </h2>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-8">{block.desc}</p>
                <button
                  onClick={() => onNavigate(block.btnPage)}
                  className="btn-primary px-7 py-3 text-xs rounded-sm inline-flex items-center gap-2"
                >
                  {block.btnText}
                  <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

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