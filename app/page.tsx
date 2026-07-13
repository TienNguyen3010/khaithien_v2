import Link from "next/link";
import { posts, processSteps, projects, services, serviceSignals, valuePillars } from "./content";
import { ContactBand, SectionHeading, SiteFrame } from "./components/site-shell";

export default function Home() {
  return (
    <SiteFrame>
      <section className="home-hero">
        <img className="hero-backdrop" src="/kt-landpage.png" alt="Đội ngũ và hoạt động sự kiện Khải Thiên" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Event & Integrated Communication</p>
          <h1>Kiến tạo sự kiện.<br/><em>Kết nối thương hiệu.</em><br/>Lan tỏa giá trị.</h1>
          <p>Khải Thiên đồng hành cùng doanh nghiệp từ chiến lược, ý tưởng sáng tạo đến sản xuất và vận hành để tạo nên trải nghiệm thương hiệu nhất quán, đáng nhớ.</p>
          <div className="hero-actions"><Link className="button button-light" href="/gui-brief">Gửi brief dự án ↗</Link><Link className="text-button" href="/du-an">Xem dự án tiêu biểu</Link></div>
        </div>
        <aside className="hero-proof"><span>Integrated partner</span><strong>Một đầu mối xuyên suốt</strong><p>Từ brief, concept, sản xuất đến vận hành và tổng kết.</p></aside>
      </section>

      <section className="signal-strip" aria-label="Nhóm nhu cầu phục vụ">{serviceSignals.map((item) => <p key={item}>{item}</p>)}</section>

      <section className="section container intro-grid"><div><p className="eyebrow">Khải Thiên là ai</p><h2>Tư duy chiến lược.<br/><em>Năng lực thực thi.</em></h2></div><div><p className="large-copy">Một đối tác Event & Communication tích hợp giúp thương hiệu chuyển mục tiêu thành trải nghiệm có thể triển khai, kiểm soát và đánh giá.</p><p>Chúng tôi ưu tiên câu hỏi đúng, phạm vi rõ và bằng chứng thực tế. Thông tin khách hàng, dự án và kết quả chỉ được công bố sau khi có xác nhận sử dụng.</p><Link className="text-button" href="/gioi-thieu">Tìm hiểu cách chúng tôi làm việc ↗</Link></div></section>

      <section className="section section-dark"><div className="container"><SectionHeading light eyebrow="Giải pháp tích hợp" title="Chọn đúng năng lực cho bài toán của bạn." description="Bốn nhóm dịch vụ được tổ chức theo cách khách hàng tìm kiếm và có thể kết hợp thành một phạm vi trọn gói."/><div className="service-grid">{services.map((service) => <Link className="service-card" href={`/dich-vu/${service.slug}`} key={service.slug}><span>{service.number}</span><h3>{service.name}</h3><p>{service.short}</p><b>Xem phạm vi ↗</b></Link>)}</div></div></section>

      <section className="section project-section"><div className="container"><SectionHeading eyebrow="Selected work" title="Bằng chứng đến từ cách dự án được giải quyết." description="Portfolio được trình bày theo phạm vi công bố; không sử dụng tên, logo hay số liệu chưa được phê duyệt."/><div className="project-grid">{projects.map((project, index) => <Link className={`project-card${index === 0 ? " featured" : ""}`} href={`/du-an/${project.slug}`} key={project.slug}><div className="project-image"><img src="/kt-landpage.png" alt={project.title} style={{ objectPosition: project.imagePosition }} loading={index ? "lazy" : "eager"}/><span className="project-index">0{index + 1}</span></div><span>{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p></Link>)}</div><Link className="button button-outline" href="/du-an">Khám phá hồ sơ dự án ↗</Link></div></section>

      <section className="section container"><SectionHeading eyebrow="Vì sao Khải Thiên" title="Năng lực được thể hiện qua cách làm." description="Không dùng tuyên bố tuyệt đối; mỗi lợi thế gắn với một nguyên tắc thực thi có thể kiểm chứng."/><div className="value-pillar-grid">{valuePillars.map((item) => <article key={item.no}><span>{item.no}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

      <section className="section process-section"><div className="container"><SectionHeading light eyebrow="Quy trình hợp tác" title="Rõ từ brief. Chắc ở từng mốc." description="Sáu bước giúp mục tiêu, trách nhiệm và tiêu chí đánh giá được thống nhất xuyên suốt."/><div className="process-grid six">{processSteps.map((step) => <article key={step.no}><span>{step.no}</span><i/><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

      <section className="section container proof-panel"><div><p className="eyebrow">Proof over claims</p><h2>Bằng chứng được công bố có trách nhiệm.</h2></div><div><p className="large-copy">Khải Thiên chỉ đưa lên website hình ảnh, nhận xét và kết quả đã được phê duyệt.</p><ul><li>Dự án có phạm vi và vai trò rõ ràng</li><li>Số liệu có nguồn xác nhận</li><li>Nội dung tuân thủ quyền công bố và NDA</li></ul></div></section>

      <section className="section section-ice"><div className="container"><SectionHeading eyebrow="Insights" title="Kinh nghiệm giúp dự án bắt đầu rõ hơn." description="Checklist, quy trình và góc nhìn thực thi dành cho đội ngũ Marketing, Brand và Communication."/><div className="post-grid">{posts.map((post) => <Link className="post-card" href={`/insights/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.readingTime} · Đọc tiếp ↗</small></Link>)}</div><Link className="button button-outline" href="/insights">Xem toàn bộ Insights</Link></div></section>
      <ContactBand />
    </SiteFrame>
  );
}
