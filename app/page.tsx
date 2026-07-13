import Link from "next/link";
import { posts, processSteps, projects, services } from "./content";
import { ContactBand, SectionHeading, SiteFrame } from "./components/site-shell";

export default function Home() {
  return (
    <SiteFrame>
      <section className="home-hero">
        <div className="hero-copy"><p className="eyebrow">Communication × Entertainment</p><h1>Kiến tạo sự kiện.<br/><em>Kết nối thương hiệu.</em></h1><p>Khải Thiên kết nối chiến lược, sáng tạo, sản xuất và vận hành để biến ý tưởng thành trải nghiệm đáng nhớ.</p><div className="hero-actions"><Link className="button" href="/lien-he">Bắt đầu dự án ↗</Link><Link className="text-button" href="/du-an">Khám phá năng lực</Link></div></div>
        <div className="hero-image"><img src="/kt-landpage.png" alt="Hình ảnh hoạt động sự kiện của Khải Thiên" /><span>PR · EVENT · PRODUCTION · ACTIVATION</span></div>
      </section>

      <section className="trust-strip"><p>Một đầu mối xuyên suốt</p><p>Bốn nhóm năng lực</p><p>Từ brief đến bàn giao</p><p>Ưu tiên trải nghiệm thực tế</p></section>

      <section className="section container about-split"><div><p className="eyebrow">Chúng tôi là ai</p><h2>Một đội ngũ.<br/>Một hành trình.<br/><em>Một chuẩn mực.</em></h2></div><div><p className="large-copy">Khải Thiên kết nối tư duy chiến lược với năng lực thực thi. Mỗi dự án bắt đầu bằng việc hiểu đúng bài toán và kết thúc bằng một trải nghiệm được chăm chút đến từng điểm chạm.</p><Link className="text-button" href="/gioi-thieu">Tìm hiểu về Khải Thiên ↗</Link></div></section>

      <section className="section section-dark"><div className="container"><SectionHeading light eyebrow="Năng lực" title="Mọi điều thương hiệu cần trong một hệ sinh thái." description="Giải pháp linh hoạt theo mục tiêu, quy mô và đặc thù của từng dự án." /><div className="service-grid">{services.map((service) => <Link className="service-card" href={`/dich-vu/${service.slug}`} key={service.slug}><span>{service.number}</span><h3>{service.name}</h3><p>{service.short}</p><b>Khám phá ↗</b></Link>)}</div></div></section>

      <section className="section project-section"><div className="container"><SectionHeading eyebrow="Hồ sơ năng lực" title="Trải nghiệm được thiết kế để tạo kết nối thật." description="Thông tin khách hàng và số liệu chỉ được công bố sau khi có xác nhận sử dụng." /><div className="project-grid">{projects.slice(0, 2).map((project, index) => <Link className={`project-card${index === 0 ? " featured" : ""}`} href={`/du-an/${project.slug}`} key={project.slug}><div className="project-image"><img src="/kt-landpage.png" alt={project.title} style={{ objectPosition: project.imagePosition }} /></div><span>{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p></Link>)}</div><Link className="button button-outline" href="/du-an">Xem toàn bộ dự án</Link></div></section>

      <section className="section container"><SectionHeading eyebrow="Cách chúng tôi làm việc" title="Rõ ràng từ brief. Chỉn chu đến kết quả." /><div className="process-grid">{processSteps.map((step) => <article key={step.no}><span>{step.no}</span><i /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

      <section className="section gallery-section"><div className="container"><SectionHeading light eyebrow="Khoảnh khắc" title="Không gian, con người và cảm xúc cùng kể một câu chuyện." /><div className="gallery-grid"><div><img src="/kt-landpage.png" alt="Không gian sự kiện" /></div><div><img src="/kt-landpage.png" alt="Đội ngũ sự kiện" /></div><div><img src="/kt-landpage.png" alt="Hoạt động thương hiệu" /></div></div></div></section>

      <section className="section container"><SectionHeading eyebrow="Góc chia sẻ" title="Kinh nghiệm để dự án bắt đầu rõ ràng hơn." /><div className="post-grid">{posts.map((post) => <Link className="post-card" href={`/tin-tuc/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.readingTime} · Đọc tiếp ↗</small></Link>)}</div></section>
      <ContactBand />
    </SiteFrame>
  );
}
