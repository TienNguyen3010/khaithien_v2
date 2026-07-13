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
          <Link className="nav-button" href="/lien-he">Gửi yêu cầu</Link>
        </nav>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <div>
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/lien-he">Gửi yêu cầu</Link>
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
      <div><h3>Kết nối</h3><a href={company.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></div>
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
  return <section className="contact-band"><div><p className="eyebrow">Bắt đầu một dự án</p><h2>Có một ý tưởng đang chờ cất cánh?</h2></div><div><p>Chia sẻ mục tiêu của bạn. Khải Thiên sẽ liên hệ để cùng làm rõ nhu cầu và đề xuất bước tiếp theo phù hợp.</p><Link className="button button-light" href="/lien-he">Gửi yêu cầu ↗</Link></div></section>;
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>;
}
