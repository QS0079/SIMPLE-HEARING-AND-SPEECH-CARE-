import Image from "next/image";
import EnquiryProvider from "@/components/EnquiryProvider";
import EnquiryButton from "@/components/EnquiryButton";
import Header from "@/components/Header";
import Waveform from "@/components/Waveform";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import Seal from "@/components/Seal";
import Logo from "@/components/Logo";
import MobileBar from "@/components/MobileBar";
import {
  clinic,
  hero,
  services,
  adults,
  pediatrics,
  neuro,
  cogniva,
  why,
  finalCta,
} from "@/lib/content";

function Points({ items, className = "" }) {
  if (!items?.length) return null;
  return (
    <ul className={`points ${className}`}>
      {items.map((p) => (
        <li key={p}>
          <span className="points__tick">
            <Icon name="check" size={14} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

function Hero() {
  const [t1, t2, t3, t4] = hero.title;
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="pill pill--yellow" data-reveal>
            <span className="pill__dot" /> Wakad, Pune • Certified Hearing & Speech Care Clinic
          </p>
          <h1 className="hero__title" data-reveal>
            {t1} <span className="hero__highlight">{t2}</span> {t3} <em>{t4}</em>
          </h1>
          <p className="hero__intro" data-reveal>{hero.intro}</p>
          <p className="hero__body" data-reveal>{hero.body}</p>
          <div className="hero__ctas" data-reveal>
            <EnquiryButton>{hero.cta}</EnquiryButton>
            <a href={clinic.phoneHref} className="btn btn--ghost-light">
              <Icon name="phone" size={17} />
              <span>{clinic.phoneDisplay}</span>
            </a>
          </div>
          <div className="hero__metrics" data-reveal>
            <div className="hmetric">
              <strong>7+</strong>
              <span>Specialised Programs</span>
            </div>
            <div className="hmetric__div" />
            <div className="hmetric">
              <strong>All Ages</strong>
              <span>Pediatric & Adult Care</span>
            </div>
            <div className="hmetric__div" />
            <div className="hmetric">
              <strong>Wakad</strong>
              <span>Pune Clinic Centre</span>
            </div>
          </div>
          <p className="hero__note" data-reveal>{hero.note}</p>
        </div>

        <div className="hero__visual" data-reveal>
          <div className="hero__card">
            <div className="hero__image-wrap">
              <Image
                src={hero.images.main.src}
                alt={hero.images.main.alt}
                fill
                priority
                sizes="(max-width: 900px) 90vw, 560px"
              />
            </div>
            <div className="hero__badge-card">
              <div className="hero__badge-icon">
                <Icon name="check" size={16} />
              </div>
              <div>
                <strong className="hero__badge-title">Comprehensive Clinic</strong>
                <span className="hero__badge-sub">Hearing · Speech · Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__wave">
        <Waveform />
      </div>
    </section>
  );
}

function Ticker() {
  const row = [...services, ...services];
  return (
    <div className="ticker" aria-label="Our services">
      <div className="ticker__track">
        {row.map((s, i) => (
          <span key={i} className="ticker__item" aria-hidden={i >= services.length}>
            {s}
            <svg viewBox="0 0 40 16" width="40" height="16" aria-hidden="true">
              <path d="M1 8h7l2-5 4 10 3-7 2 4 2-2h18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ label, title, light = false, center = false }) {
  return (
    <div className={`shead ${light ? "shead--light" : ""} ${center ? "shead--center" : ""}`} data-reveal>
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function Adults() {
  const [aids, vertigo] = adults.items;
  return (
    <section className="section adults" id="adults">
      <div className="wrap">
        <SectionHead label="For Adults" title={adults.heading} center />
        <div className="adults__grid">
          <article className="acard" data-reveal>
            <div className="acard__media">
              <Image src={aids.image.src} alt={aids.image.alt} fill sizes="(max-width: 900px) 100vw, 640px" />
              <span className="acard__num">01</span>
            </div>
            <div className="acard__body">
              <h3>{aids.title}</h3>
              <p className="lead">{aids.lead}</p>
              <p>{aids.body}</p>
              <Points items={aids.points} />
              <EnquiryButton service={aids.service}>{aids.cta}</EnquiryButton>
            </div>
          </article>

          <article className="vcard" data-reveal>
            <Image src={vertigo.image.src} alt={vertigo.image.alt} fill sizes="(max-width: 900px) 100vw, 560px" className="vcard__img" />
            <div className="vcard__shade" />
            <span className="acard__num acard__num--light">02</span>
            <div className="vcard__body">
              <h3>{vertigo.title}</h3>
              <p className="lead">{vertigo.lead}</p>
              <p>{vertigo.body}</p>
              <EnquiryButton service={vertigo.service} variant="light">{vertigo.cta}</EnquiryButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Pediatrics() {
  return (
    <section className="section kids" id="pediatrics">
      <div className="wrap">
        <SectionHead label="For Kids" title={pediatrics.heading} center />
        <div className="kids__grid">
          {pediatrics.items.map((item, i) => (
            <article key={item.id} className={`kcard kcard--${item.tone}`} data-reveal style={{ "--d": `${i * 90}ms` }}>
              <div className="kcard__media">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 900px) 100vw, 400px" />
                <span className="kcard__num">0{i + 1}</span>
              </div>
              <div className="kcard__body">
                <h3>{item.title}</h3>
                <p className="lead">{item.lead}</p>
                <p>{item.body}</p>
                <Points items={item.points} />
                <div className="kcard__cta">
                  <EnquiryButton service={item.service} variant="outline">{item.cta}</EnquiryButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Neuro() {
  return (
    <section className="section neuro" id="neuro">
      <div className="neuro__mesh" aria-hidden="true" />
      <div className="wrap neuro__grid">
        <div className="neuro__visual" data-reveal>
          <div className="neuro__frame">
            <Image src={neuro.image.src} alt={neuro.image.alt} fill sizes="(max-width: 900px) 90vw, 520px" />
          </div>
          <div className="neuro__inset">
            <Image src={neuro.image2.src} alt={neuro.image2.alt} fill sizes="220px" />
          </div>
          <Seal className="neuro__seal" />
        </div>

        <div className="neuro__copy">
          <p className="pill pill--yellow" data-reveal>
            <Icon name="spark" size={15} /> {neuro.eyebrow}
          </p>
          <h2 data-reveal>{neuro.title}</h2>
          <p className="neuro__tagline" data-reveal>{neuro.tagline}</p>
          {neuro.body.map((b) => (
            <p key={b} className="neuro__p" data-reveal>{b}</p>
          ))}
          <ul className="neuro__tiles" data-reveal>
            {neuro.points.map((p, i) => (
              <li key={p}>
                <span className="neuro__idx">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
          </ul>
          <div data-reveal>
            <EnquiryButton service={neuro.service}>{neuro.cta}</EnquiryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cogniva() {
  return (
    <section className="section cogniva" id="cogniva">
      <div className="wrap cogniva__grid">
        <div className="cogniva__copy">
          <p className="pill pill--gold" data-reveal>{cogniva.eyebrow}</p>
          <h2 data-reveal>
            {cogniva.title}
            <span className="cogniva__sub">{cogniva.subtitle}</span>
          </h2>
          <p className="lead" data-reveal>{cogniva.lead}</p>
          {cogniva.body.map((b) => (
            <p key={b} data-reveal>{b}</p>
          ))}
          <div className="cogniva__chips" data-reveal>
            {cogniva.points.map((p) => (
              <span key={p} className="cchip">
                <Icon name="check" size={14} />
                {p}
              </span>
            ))}
          </div>
          <p className="cogniva__closing" data-reveal>{cogniva.closing}</p>
          <div data-reveal>
            <EnquiryButton service={cogniva.service}>{cogniva.cta}</EnquiryButton>
          </div>
        </div>
        <div className="cogniva__visual" data-reveal>
          <div className="cogniva__frame">
            <Image src={cogniva.image.src} alt={cogniva.image.alt} fill sizes="(max-width: 900px) 90vw, 500px" />
            <div className="cogniva__feature-card">
              <div className="cogniva__feature-icon">
                <Icon name="spark" size={18} />
              </div>
              <div>
                <strong>Cogniva Coaching</strong>
                <span>Structured Brain Skill Coaching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section why" id="why">
      <div className="wrap why__grid">
        <div>
          <SectionHead label="Why Simple" title={why.heading} />
          <ul className="why__list">
            {why.items.map((it, i) => (
              <li key={it.title} data-reveal style={{ "--d": `${i * 70}ms` }}>
                <span className="why__icon">
                  <Icon name={it.icon} size={22} />
                </span>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="why__mosaic" data-reveal>
          {why.images.map((img, i) => (
            <div key={img.src} className={`why__tile why__tile--${i + 1}`}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 900px) 50vw, 300px" />
            </div>
          ))}
          <div className="why__badge">
            <Icon name="ear" size={26} />
            <span>Hearing · Speech · Therapy · Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final" id="contact">
      <div className="wrap">
        <div className="final__card" data-reveal>
          <div className="final__copy">
            <h2>{finalCta.heading}</h2>
            <p className="final__body">{finalCta.body}</p>
            <p className="final__note">{finalCta.note}</p>
            <div className="final__ctas">
              <EnquiryButton variant="dark">Book an Appointment</EnquiryButton>
              <a
                className="btn btn--white"
                href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
            <ul className="final__contact">
              <li>
                <Icon name="phone" size={18} />
                <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
              </li>
              <li>
                <Icon name="pin" size={18} />
                <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">{clinic.address}</a>
              </li>
            </ul>
          </div>
          <div className="final__media">
            <Image src={finalCta.image.src} alt={finalCta.image.alt} fill sizes="(max-width: 900px) 100vw, 520px" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" data-reveal>
      <div className="wrap footer__inner">
        <div className="footer__logo-wrap">
          <Logo light />
        </div>
        <p className="footer__desc">
          Top Hearing & Speech Care Clinic in Wakad, Pune • Personalised Audiology, Hearing Aids, Vertigo Management & Child Therapies
        </p>
        <div className="footer__links">
          <a href={clinic.phoneHref} className="footer__badge" aria-label={`Call ${clinic.phoneDisplay}`}>
            <Icon name="phone" size={15} />
            <span>{clinic.phoneDisplay}</span>
          </a>
          <a
            href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about your services.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__badge"
          >
            <span>WhatsApp Enquiry</span>
          </a>
          <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer__badge">
            <Icon name="pin" size={15} />
            <span>Wakad, Pune (Opp. Mont Vert Tropez)</span>
          </a>
        </div>
        <p className="footer__address">{clinic.address}</p>
        <div className="footer__divider" />
        <p className="footer__small">© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <EnquiryProvider>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Adults />
        <Pediatrics />
        <Neuro />
        <Cogniva />
        <Why />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <Reveal />
    </EnquiryProvider>
  );
}
