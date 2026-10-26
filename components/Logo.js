import Image from "next/image";
import { clinic } from "@/lib/content";

export default function Logo({ light = false, priority = false, className = "" }) {
  const src = light ? (clinic.logoLight || "/logo-light.png") : (clinic.logo || "/logo.png");
  return (
    <span className={`logo ${light ? "logo--light" : ""} ${className}`}>
      <Image
        src={src}
        alt="Simple Hearing & Speech Care"
        width={220}
        height={128}
        className="logo__img"
        priority={priority}
      />
    </span>
  );
}
