import Image from "next/image";
import EnquiryProvider from "@/components/EnquiryProvider";
import EnquiryButton from "@/components/EnquiryButton";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import MobileBar from "@/components/MobileBar";
import {
  clinic,
  hero,
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
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            Top Hearing &amp; Speech Care Clinic in <span className="hero__city">Pune</span>
          </h1>
          <p className="hero__intro">{hero.intro}</p>
          <p className="hero__body">{hero.body}</p>
          <div className="hero__ctas">
            <EnquiryButton>{hero.cta}</EnquiryButton>
            <a href={clinic.phoneHref} className="btn btn--outline">
              <Icon name="phone" size={17} />
              <span>{clinic.phoneDisplay}</span>
            </a>
          </div>
          <div className="hero__note">
            <span className="hero__note-pulse" aria-hidden="true" />
            <span>{hero.note}</span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-aura" aria-hidden="true" />
          <div className="hero__photo-card">
            <Image
              src={hero.images.main.src}
              alt={hero.images.main.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 560px"
              className="hero__photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ title, center = false }) {
  return (
    <div className={`shead ${center ? "shead--center" : ""}`} data-reveal>
      <h2>{title}</h2>
    </div>
  );
}

function Adults() {
  const [aids, vertigo] = adults.items;
  return (
    <section className="section adults" id="adults">
      <div className="wrap">
        <SectionHead title={adults.heading} center />
        <div className="adults__grid">
          <article className="acard" data-reveal>
            <div className="acard__media">
              <Image src={aids.image.src} alt={aids.image.alt} fill sizes="(max-width: 900px) 100vw, 640px" />
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
        <SectionHead title={pediatrics.heading} center />
        <div className="kids__grid">
          {pediatrics.items.map((item, i) => (
            <article key={item.id} className={`kcard kcard--${item.tone}`} data-reveal style={{ "--d": `${i * 90}ms` }}>
              <div className="kcard__media">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 900px) 100vw, 400px" />
              </div>
              <div className="kcard__body">
                <h3>{item.title}</h3>
                <p className="lead">{item.lead}</p>
                {item.body ? <p>{item.body}</p> : null}
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
        </div>

        <div className="neuro__copy">
          <p className="pill pill--yellow" data-reveal>
            {neuro.eyebrow}
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
                <span>{p}</span>
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
            {cogniva.title} - <span className="cogniva__sub">{cogniva.subtitle}</span>
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
          <SectionHead title={why.heading} />
          <ul className="why__list">
            {why.items.map((text, i) => (
              <li key={text} data-reveal style={{ "--d": `${i * 70}ms` }}>
                <span className="why__icon">
                  <Icon name="check" size={20} />
                </span>
                <p className="why__item-text">{text}</p>
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
              <EnquiryButton variant="dark">{finalCta.primaryCta || "Book an Appointment"}</EnquiryButton>
              <a
                className="btn btn--white"
                href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
                <span>{finalCta.secondaryCta || "Contact Our Team"}</span>
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
          Top Hearing &amp; Speech Care Clinic in Wakad, Pune • Personalised Audiology, Hearing Aids, Vertigo Management &amp; Child Therapies
        </p>
        <div className="footer__links">
          <a href={clinic.phoneHref} className="footer__badge footer__badge--phone" aria-label={`Call ${clinic.phoneDisplay}`}>
            <Icon name="phone" size={16} />
            <span>{clinic.phoneDisplay}</span>
          </a>
          <a
            href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about your services.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__badge footer__badge--whatsapp"
            aria-label="Chat with Simple Hearing on WhatsApp"
          >
            <Icon name="whatsapp" size={18} />
            <span>WhatsApp Enquiry</span>
          </a>
          <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer__badge footer__badge--maps" aria-label="Open clinic location on Google Maps">
            <Icon name="pin" size={16} />
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
