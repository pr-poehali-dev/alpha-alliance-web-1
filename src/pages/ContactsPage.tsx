import { useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

interface ContactsPageProps {
  onNavigate?: (page: string) => void;
}

export default function ContactsPage(_: ContactsPageProps) {
  const [form, setForm] = useState({ name: "", phone: "+7 " });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
    if (digits.length !== 11) { setSubmitStatus("error"); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch(func2url["contact-form"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setForm({ name: "", phone: "+7 " });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, e: React.MouseEvent) => {
    navigator.clipboard.writeText(text).then(() => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
      setCopiedContact(text);
      setTimeout(() => setCopiedContact(null), 3000);
    });
  };

  const contactCards = [
    {
      icon: "Mail",
      title: "Email",
      details: ["alfaallianse-info@mail.ru"],
      type: "email" as const,
    },
    {
      icon: "Phone",
      title: "Телефон",
      details: ["+7 913 199 29 34", "+7 902 961 99 18"],
      type: "phone" as const,
    },
    {
      icon: "MessageCircle",
      title: "Мессенджеры",
      links: [
        { name: "Telegram", url: "https://t.me/" },
        { name: "MAX", url: "https://max.ru/" },
      ],
      type: null,
    },
  ];

  const companyInfo = [
    { label: "Полное наименование", value: "Общество с ограниченной ответственностью «Альфа Альянс»" },
    { label: "Сокращённое наименование", value: "ООО «Альфа Альянс»" },
    { label: "ИНН / КПП", value: "2465302921 / 246501001" },
    { label: "ОГРН", value: "1132468063331" },
  ];

  const bankInfo = [
    { label: "Наименование банка", value: "ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО)" },
    { label: "БИК", value: "044 525 411" },
    { label: "Расчётный счёт", value: "407 028 108 254 600 019 85" },
    { label: "Корреспондентский счёт", value: "301 018 101 452 500 004 11" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background border-b border-white/8 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Связь</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-none mb-4">
            Контакты
          </h1>
          <p className="font-body text-white/55 text-sm max-w-lg">
            Отправьте запрос или свяжитесь с нами удобным способом — ответим в течение одного рабочего дня.
          </p>
        </div>
      </section>

      {/* Tooltip */}
      {copiedContact && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y - 60, transform: "translateX(-50%)" }}
        >
          <div className="bg-brand-red text-white px-4 py-2 rounded-sm shadow-lg flex items-center gap-2 whitespace-nowrap text-xs font-body">
            <Icon name="Check" size={13} />
            Скопировано: {copiedContact}
          </div>
        </div>
      )}

      {/* Contact cards */}
      <section className="py-16 bg-brand-dark-2 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactCards.map((card, idx) => (
              <div key={idx} className="bg-card border border-white/8 p-8 rounded-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center mb-4">
                  <Icon name={card.icon as never} size={24} className="text-brand-red" />
                </div>
                <h3 className="font-display text-white text-lg tracking-wide mb-3">{card.title}</h3>
                <div className="space-y-1">
                  {card.details?.map((detail, i) => (
                    <p
                      key={i}
                      className={card.type ? "font-body text-white/60 text-sm cursor-pointer hover:text-brand-red transition-colors" : "font-body text-white/60 text-sm"}
                      onClick={(e) => card.type && handleCopy(detail, e)}
                      title={card.type ? "Нажмите, чтобы скопировать" : undefined}
                    >
                      {detail}
                    </p>
                  ))}
                  {card.links?.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-body text-white/60 text-sm hover:text-brand-red transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Address */}
      <section className="py-16 bg-background border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

            {/* Form */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h2 className="font-display text-3xl text-white tracking-wide mb-2">Оставьте заявку</h2>
                <p className="font-body text-white/50 text-sm">Наш специалист свяжется с вами в ближайшее время</p>
              </div>
              <div className="bg-card border border-white/8 p-8 rounded-sm">
                {submitStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-brand-red/20 border border-brand-red/40 flex items-center justify-center mb-5 rounded-sm">
                      <Icon name="CheckCircle" size={28} className="text-brand-red" />
                    </div>
                    <h3 className="font-display text-white text-xl tracking-wide mb-2">Заявка отправлена!</h3>
                    <p className="font-body text-white/50 text-sm">Свяжемся с вами в течение одного рабочего дня.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {submitStatus === "error" && (
                      <div className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-sm text-brand-red text-xs font-body flex items-center gap-2">
                        <Icon name="AlertCircle" size={13} />
                        Введите корректный номер телефона
                      </div>
                    )}
                    <div>
                      <label className="font-body text-white/50 text-xs tracking-[0.15em] uppercase block mb-2">Ваше имя *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Иван Петров"
                        className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25"
                      />
                    </div>
                    <div>
                      <label className="font-body text-white/50 text-xs tracking-[0.15em] uppercase block mb-2">Телефон *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 XXX XXX XX XX"
                        className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-4 text-sm rounded-sm flex items-center justify-center gap-2"
                    >
                      <Icon name="Send" size={15} />
                      {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    </button>
                    <p className="font-body text-white/25 text-xs text-center">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Address + Hours combined */}
            <div className="flex flex-col">
            <div className="mb-6 opacity-0 pointer-events-none select-none">
              <h2 className="font-display text-3xl text-white tracking-wide mb-2">Оставьте заявку</h2>
              <p className="font-body text-white/50 text-sm">Наш специалист свяжется с вами в ближайшее время</p>
            </div>
            <div className="bg-card border border-white/8 p-8 rounded-sm flex-1 flex flex-col justify-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={16} className="text-brand-red" />
                </div>
                <div>
                  <div className="font-body text-white/40 text-xs tracking-wide uppercase mb-1">Адрес</div>
                  <div className="font-body text-white text-base">660020, Красноярский край,<br />г. Красноярск, ул. Дудинская, д. 5</div>
                </div>
              </div>

              <div className="w-full h-px bg-white/8" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="Clock" size={16} className="text-brand-red" />
                </div>
                <div className="w-full">
                  <div className="font-body text-white/40 text-xs tracking-wide uppercase mb-3">Режим работы</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-white/70 text-base">Понедельник – Пятница</span>
                      <span className="font-display text-white text-lg tracking-wide">9:00 – 18:00</span>
                    </div>
                    <div className="w-full h-px bg-white/8" />
                    <div className="flex justify-between items-center">
                      <span className="font-body text-white/70 text-base">Суббота – Воскресенье</span>
                      <span className="font-body text-white/40 text-base">Выходной</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requisites */}
      <section className="py-16 bg-brand-dark-2 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-brand-red" />
                <h3 className="font-display text-2xl text-white tracking-wide">Реквизиты компании</h3>
              </div>
              <div className="bg-card border border-white/8 rounded-sm overflow-hidden">
                {companyInfo.map((item, idx) => (
                  <div key={idx} className={`grid grid-cols-2 gap-4 px-6 py-4 ${idx !== companyInfo.length - 1 ? "border-b border-white/6" : ""}`}>
                    <span className="font-body text-white/40 text-xs">{item.label}</span>
                    <span className="font-body text-white text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-brand-red" />
                <h3 className="font-display text-2xl text-white tracking-wide">Банковские реквизиты</h3>
              </div>
              <div className="bg-card border border-white/8 rounded-sm overflow-hidden">
                {bankInfo.map((item, idx) => (
                  <div key={idx} className={`grid grid-cols-2 gap-4 px-6 py-4 ${idx !== bankInfo.length - 1 ? "border-b border-white/6" : ""}`}>
                    <span className="font-body text-white/40 text-xs">{item.label}</span>
                    <span className="font-body text-white text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-brand-red" />
            <h2 className="font-display text-2xl text-white tracking-wide">Как нас найти</h2>
          </div>
          <div className="rounded-sm overflow-hidden border border-white/8">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=92.895538%2C56.025895&z=17&pt=92.895538,56.025895,pm2rdm"
              width="100%"
              height="500"
              frameBorder="0"
              allowFullScreen
              title="Карта офиса Альфа Альянс"
            />
          </div>
        </div>
      </section>
    </div>
  );
}