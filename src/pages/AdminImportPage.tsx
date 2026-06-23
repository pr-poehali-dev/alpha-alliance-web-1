import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMPORT_URL = "https://functions.poehali.dev/74d51823-3430-4e7b-993d-298643f66a5f";

interface ImportStats {
  groups: number;
  categories: number;
  products: number;
  sheets: { sheet: string; categories: number; products: number }[];
}

interface AdminImportPageProps {
  onNavigate: (page: string) => void;
}

const AdminImportPage = ({ onNavigate }: AdminImportPageProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"append" | "replace">("replace");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setResult(null);
    setError(null);
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const buf = await file.arrayBuffer();
      const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const res = await fetch(IMPORT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: b64, mode }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Ошибка импорта");
      setResult(data.stats);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate("catalog-equipment")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад к каталогу
        </button>

        <h1 className="font-display text-3xl text-foreground mb-2">Импорт товаров из Excel</h1>
        <p className="text-muted-foreground mb-8">
          Загрузи файл — система автоматически создаст группы, категории и карточки товаров
        </p>

        {/* Загрузка файла */}
        <div
          className="border-2 border-dashed border-border rounded-sm p-10 text-center cursor-pointer hover:border-primary transition-colors mb-6"
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFile} />
          <Icon name="FileSpreadsheet" size={40} className="mx-auto mb-3 text-muted-foreground" />
          {file ? (
            <p className="text-foreground font-medium">{file.name}</p>
          ) : (
            <>
              <p className="text-foreground font-medium mb-1">Нажми для выбора файла</p>
              <p className="text-muted-foreground text-sm">.xlsx или .xls</p>
            </>
          )}
        </div>

        {/* Режим импорта */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">Режим импорта</p>
          <div className="flex gap-3">
            {(["replace", "append"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 px-4 rounded-sm border text-sm font-medium transition-colors ${
                  mode === m
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {m === "replace" ? "Заменить всё" : "Добавить к существующим"}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {mode === "replace"
              ? "Все товары в группах из файла будут удалены и заменены новыми"
              : "Новые товары добавятся к уже существующим в БД"}
          </p>
        </div>

        {/* Кнопка */}
        <button
          onClick={handleImport}
          disabled={!file || loading}
          className="w-full py-4 bg-primary text-primary-foreground font-display tracking-widest uppercase text-sm rounded-sm disabled:opacity-40 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icon name="Loader2" size={18} className="animate-spin" />
              Обрабатываю файл...
            </>
          ) : (
            <>
              <Icon name="Upload" size={18} />
              Импортировать
            </>
          )}
        </button>

        {/* Результат */}
        {result && (
          <div className="mt-8 p-6 bg-card border border-border rounded-sm">
            <div className="flex items-center gap-2 text-green-400 mb-4">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Импорт завершён успешно</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Групп", value: result.groups },
                { label: "Категорий", value: result.categories },
                { label: "Товаров", value: result.products },
              ].map(({ label, value }) => (
                <div key={label} className="text-center p-3 bg-background rounded-sm">
                  <div className="font-display text-2xl text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {result.sheets.map((s) => (
                <div key={s.sheet} className="flex justify-between text-sm">
                  <span className="text-foreground">{s.sheet}</span>
                  <span className="text-muted-foreground">
                    {s.categories} категорий · {s.products} товаров
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate("catalog-equipment")}
              className="mt-6 w-full py-3 border border-primary text-primary text-sm font-display tracking-widest uppercase rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Перейти в каталог
            </button>
          </div>
        )}

        {/* Ошибка */}
        {error && (
          <div className="mt-6 p-4 bg-red-950/30 border border-red-800 rounded-sm flex items-start gap-3">
            <Icon name="AlertCircle" size={18} className="text-red-400 mt-0.5 shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminImportPage;
