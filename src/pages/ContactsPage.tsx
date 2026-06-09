import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ContactsPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactsPage({ onNavigate }: ContactsPageProps) {
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

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

      {/* Content */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-white/8 p-8 md:p-10 rounded-sm">
                <h2 className="font-display text-2xl text-white tracking-wide mb-6">Отправить запрос</h2>
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-brand-red/20 border border-brand-red/40 flex items-center justify-center mb-5 rounded-sm">
                      <Icon name="CheckCircle" size={28} className="text-brand-red" />
                    </div>
                    <h3 className="font-display text-white text-xl tracking-wide mb-2">Запрос отправлен!</h3>
                    <p className="font-body text-white/50 text-sm max-w-xs">
                      Мы получили вашу заявку и свяжемся с вами в течение одного рабочего дня.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-body text-white/50 text-xs tracking-[0.15em] uppercase block mb-2">
                          Ваше имя *
                        </label>
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
                        <label className="font-body text-white/50 text-xs tracking-[0.15em] uppercase block mb-2">
                          Компания
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="ООО «Название»"
                          className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-white/50 text-xs tracking-[0.15em] uppercase block mb-2">
                        Телефон *
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25"
                      />
                    </div>
                    <div>
                      <label className="font-body text-white/50 text-xs tracking-[0.15em] uppercase block mb-2">
                        Опишите задачу
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Укажите вид оборудования, количество, технические требования, сроки..."
                        className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25 resize-none"
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-primary w-full py-4 text-sm rounded-sm flex items-center justify-center gap-2"
                      >
                        <Icon name="Send" size={15} />
                        Отправить запрос
                      </button>
                    </div>
                    <p className="font-body text-white/25 text-xs text-center">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-4">
              {/* Contact details */}
              <div className="bg-card border border-white/8 p-6 rounded-sm">
                <h3 className="font-display text-white text-lg tracking-wide mb-5">Реквизиты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                      <Icon name="Building2" size={13} className="text-brand-red" />
                    </div>
                    <div>
                      <div className="font-body text-white/40 text-xs tracking-wide uppercase mb-0.5">Компания</div>
                      <div className="font-body text-white text-sm">ООО «Альфа Альянс»</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                      <Icon name="Phone" size={13} className="text-brand-red" />
                    </div>
                    <div>
                      <div className="font-body text-white/40 text-xs tracking-wide uppercase mb-0.5">Телефон</div>
                      <a href="tel:+7XXXXXXXXXX" className="font-body text-white text-sm hover:text-brand-red transition-colors">
                        +7 (XXX) XXX-XX-XX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                      <Icon name="Mail" size={13} className="text-brand-red" />
                    </div>
                    <div>
                      <div className="font-body text-white/40 text-xs tracking-wide uppercase mb-0.5">E-mail</div>
                      <a href="mailto:info@alfa-alliance.ru" className="font-body text-white text-sm hover:text-brand-red transition-colors">
                        info@alfa-alliance.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0">
                      <Icon name="Clock" size={13} className="text-brand-red" />
                    </div>
                    <div>
                      <div className="font-body text-white/40 text-xs tracking-wide uppercase mb-0.5">Режим работы</div>
                      <div className="font-body text-white text-sm">Пн–Пт: 9:00 – 18:00</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why contact */}
              <div className="bg-brand-red/10 border border-brand-red/25 p-6 rounded-sm">
                <h3 className="font-display text-white text-base tracking-wide mb-4">Что мы сделаем</h3>
                <ul className="space-y-2">
                  {[
                    "Изучим ваши требования",
                    "Подберём оптимальное оборудование",
                    "Подготовим КП в течение дня",
                    "Обеспечим сопровождение сделки",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Icon name="Check" size={12} className="text-brand-red shrink-0" />
                      <span className="font-body text-white/65 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Founded */}
              <div className="bg-card border border-white/8 p-6 rounded-sm flex items-center gap-4">
                <div className="font-display text-brand-red text-4xl font-bold">2013</div>
                <div>
                  <div className="font-body text-white text-sm font-medium">Год основания</div>
                  <div className="font-body text-white/40 text-xs mt-0.5">Более 13 лет на рынке</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
