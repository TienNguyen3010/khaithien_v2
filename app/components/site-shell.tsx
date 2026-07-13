import Link from "next/link";
import { company, navigation } from "../content";

export function SiteHeader() {
  return (
    <>
      <div className="topline">
        <span>Communication & Entertainment</span>
        <span>{company.location} · {company.phone}</span>
      </div>
      <header className="header">
        <Link className="brand" href="/" aria-label="Khải Thiên - Trang chủ">
          <img src="/kt-logo.jpg" alt="Logo Khải Thiên" />
          <span><b>KHẢI THIÊN</b><small>Communication & Entertainment</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link className="nav-button" href="/gui-brief">Gửi brief</Link>
        </nav>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <div>
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/gui-brief">Gửi brief dự án</Link>
          </div>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/kt-logo.jpg" alt="Logo Khải Thiên" />
        <div><strong>{company.fullName}</strong><p>{company.tagline}</p></div>
      </div>
      <div><h3>Khám phá</h3>{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
      <div><h3>Liên hệ</h3><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.location}</span></div>
      <div><h3>Kết nối</h3><a href={company.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link><Link href="/dieu-khoan-su-dung">Điều khoản sử dụng</Link></div>
      <small>© 2026 Khải Thiên. Nội dung dự án chỉ được công bố khi có xác nhận sử dụng.</small>
    </footer>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></div></section>;
}

export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return <div className={`section-heading${light ? " light" : ""}`}><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{description && <p>{description}</p>}</div>;
}

export function ContactBand() {
  return <section className="contact-band"><div><p className="eyebrow">Bắt đầu một dự án</p><h2>Chia sẻ brief. Cùng xác định bước tiếp theo.</h2></div><div><p>Gửi mục tiêu, thời gian và phạm vi dự kiến. Khải Thiên sẽ tiếp nhận để làm rõ nhu cầu trước khi đề xuất giải pháp.</p><Link className="button button-light" href="/gui-brief">Gửi brief dự án ↗</Link><Link className="contact-link" href="/lien-he">Hoặc liên hệ trực tiếp</Link></div></section>;
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main-content">Bỏ qua điều hướng</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><Link className="mobile-brief" href="/gui-brief">Gửi brief ↗</Link></>;
}
