import { useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "+7 ", email: "", message: "" });
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
      if (res.ok) { setStatus("success"); setForm({ name: "", phone: "+7 ", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  const handleClose = () => {
    setOpen(false);
    setStatus("idle");
    setForm({ name: "", phone: "+7 ", email: "", message: "" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("alfaallianse-info@mail.ru").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      {/* Modal */}
      {open && (
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
                <div>
                  <label className="font-body text-white/40 text-xs tracking-[0.15em] uppercase block mb-2">Почта</label>
                  <input
                    type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="mail@company.ru"
                    className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25"
                  />
                </div>
                <div>
                  <label className="font-body text-white/40 text-xs tracking-[0.15em] uppercase block mb-2">Описание</label>
                  <textarea
                    value={form.message} rows={3}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Кратко опишите задачу"
                    className="w-full bg-background border border-white/15 text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-white/25 resize-none"
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
                    {copied ? "Скопировано!" : "при нажатии копируется"}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-red hover:bg-brand-red/85 transition-all duration-200 rounded-full shadow-xl shadow-brand-red/30 flex items-center justify-center"
      >
        <Icon name={open ? "X" : "Phone"} size={22} className="text-white" />
      </button>
    </>
  );
}
