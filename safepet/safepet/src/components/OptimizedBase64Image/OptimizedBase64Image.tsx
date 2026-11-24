import { useEffect, useRef, useState } from "react";

type Props = {
  base64: string;
  alt: string;
  mimeType?: string;
  className?: string;
  fit?: "cover" | "contain";
};

export default function OptimizedBase64Image({
  base64,
  alt,
  mimeType = "image/jpeg",
  className,
  fit = "cover",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [resizedSrc, setResizedSrc] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !base64) return;

    const targetW = Math.round(el.clientWidth);
    const targetH = Math.round(el.clientHeight);
    if (targetW === 0 || targetH === 0) return;

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;

      const scale =
        fit === "contain"
          ? Math.min(targetW / img.naturalWidth, targetH / img.naturalHeight)
          : Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);

      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const offsetX = (targetW - drawW) / 2;
      const offsetY = (targetH - drawH) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      setDimensions({ w: targetW, h: targetH });
      setResizedSrc(canvas.toDataURL("image/webp", 0.85));
    };

    img.src = base64.startsWith("data:") ? base64 : `data:${mimeType};base64,${base64}`;

    return () => {
      cancelled = true;
    };
  }, [base64, mimeType, fit]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      {resizedSrc && dimensions && (
        <img
          src={resizedSrc}
          alt={alt}
          className={className}
          width={dimensions.w}
          height={dimensions.h}
          decoding="async"
        />
      )}
    </div>
  );
}