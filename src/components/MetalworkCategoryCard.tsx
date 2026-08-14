import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import type { MetalworkCategory } from "@/data/metalwork";

interface MetalworkCategoryCardProps {
  cat: MetalworkCategory;
  onNavigate: (page: string) => void;
}

export default function MetalworkCategoryCard({ cat, onNavigate }: MetalworkCategoryCardProps) {
  const images = cat.gallery.map((g) => g.img);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length, paused]);

  const go = (e: React.MouseEvent, dir: number) => {
    e.stopPropagation();
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div
      onClick={() => onNavigate(`metalwork-category-${cat.id}`)}
      className="bg-card border border-white/8 rounded-sm card-hover cursor-pointer flex flex-col overflow-hidden group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full bg-brand-dark-2 overflow-hidden">
        {images.length > 0 ? (
          <>
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={cat.title}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Предыдущее фото"
                  onClick={(e) => go(e, -1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red"
                >
                  <Icon name="ChevronLeft" size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Следующее фото"
                  onClick={(e) => go(e, 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red"
                >
                  <Icon name="ChevronRight" size={14} />
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
                  {images.map((src, i) => (
                    <span
                      key={src}
                      className={`h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-brand-red" : "w-1.5 bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name={cat.icon as never} size={44} className="text-white/15" />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-white text-lg tracking-wide mb-2">{cat.title}</h3>
        <p className="font-body text-white/50 text-sm leading-relaxed mb-4">{cat.short}</p>
        <span className="font-body text-brand-red text-xs tracking-wide inline-flex items-center gap-2 mt-auto">
          Подробнее
          <Icon name="ArrowRight" size={12} />
        </span>
      </div>
    </div>
  );
}
