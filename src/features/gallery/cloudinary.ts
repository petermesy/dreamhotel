export function optimizeCloudinaryUrl(url: string, opts: CloudinaryOptions = {}): string {
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) {
    return url;
  }

  const format = opts.format ?? "auto";
  const quality = opts.quality ?? "auto";
  const dpr = opts.dpr ?? "auto";
  const width = opts.width ? `w_${opts.width}` : "";
  const crop = opts.crop ? `c_${opts.crop}` : "";
  const gravity = opts.gravity ? `g_${opts.gravity}` : "";

  const transformationParts = [
    format !== "none" ? `f_${format}` : "",
    quality !== "none" ? `q_${quality}` : "",
    dpr !== "none" ? `dpr_${dpr}` : "",
    width,
    crop,
    gravity,
  ].filter(Boolean);

  const transformation = transformationParts.join(",");

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");
    
    if (uploadIndex === -1) return url;

    // Reconstruct safely by inserting transformations directly after /upload/
    const prefixParts = parts.slice(0, uploadIndex + 1);
    const remainder = parts.slice(uploadIndex + 1);

    parsed.pathname = [...prefixParts, transformation, ...remainder].filter(Boolean).join("/");
    return parsed.toString();
  } catch {
    return url;
  }
}