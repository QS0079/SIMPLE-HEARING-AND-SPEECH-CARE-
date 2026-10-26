import Image from "next/image";
import { clinic } from "@/lib/content";

// The clinic's own logo, served from their website and resized by next/image.
// To host it locally instead, save it as /public/logo.png and set clinic.logo to "/logo.png".
export default function Logo({ light = false, priority = false }) {
  const src = light ? (clinic.logoLight || "/logo-light.png") : (clinic.logo || "/logo.png");
  return (
    <span className={`logo ${light ? "logo--light" : ""}`}>
      <Image
        src={src}
        alt="Simple Hearing & Speech Care"
        width={180}
        height={104}
        className="logo__img"
        priority={priority}
      />
    </span>
  );
}
