const services = [
  { no: "01", title: "Event", text: "Từ lễ ra mắt, hội nghị đến activation — một trải nghiệm đồng nhất từ ý tưởng đến vận hành." },
  { no: "02", title: "Team Building", text: "Chương trình được thiết kế theo văn hoá doanh nghiệp, cân bằng gắn kết, an toàn và cảm xúc." },
  { no: "03", title: "Media Production", text: "TVC, phim doanh nghiệp, social video và livestream với quy trình sản xuất rõ ràng, kiểm soát chất lượng." },
  { no: "04", title: "KOL / KOC", text: "Lựa chọn talent, phát triển nội dung và quản lý chiến dịch dựa trên mục tiêu truyền thông thực tế." },
  { no: "05", title: "Communication", text: "Chiến lược, big idea, creative content, social và PR cùng vận hành trong một hệ sinh thái." },
];

const process = [
  ["01", "Lắng nghe", "Hiểu mục tiêu, đối tượng, bối cảnh và giới hạn của dự án."],
  ["02", "Kiến tạo", "Chuyển brief thành chiến lược, ý tưởng và kế hoạch khả thi."],
  ["03", "Thực thi", "Điều phối sản xuất, vận hành và kiểm soát chất lượng xuyên suốt."],
  ["04", "Lan toả", "Bàn giao, tổng kết và đo lường theo tiêu chí đã thống nhất."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Khải Thiên - Trang chủ"><span>KT</span><b>KHẢI THIÊN</b></a>
        <a className="menu-button" href="#contact">Liên hệ</a>
        <nav className="nav" aria-label="Điều hướng chính">
          <a href="#about">Giới thiệu</a>
          <a href="#services">Dịch vụ</a>
          <a href="#work">Dự án</a>
          <a href="#process">Quy trình</a>
          <a className="nav-cta" href="#contact">Gửi yêu cầu ↗</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <p className="eyebrow">COMMUNICATION <i>×</i> ENTERTAINMENT</p>
        <h1>Biến ý tưởng thành<br/><em>trải nghiệm đáng nhớ.</em></h1>
        <div className="hero-bottom">
          <p>Đối tác tích hợp từ chiến lược, sáng tạo đến sản xuất và vận hành — giúp thương hiệu tạo kết nối thật, ở đúng thời điểm.</p>
          <a className="round-link" href="#services" aria-label="Khám phá dịch vụ">Khám phá<br/>dịch vụ <span>↓</span></a>
        </div>
        <div className="marquee" aria-label="Lĩnh vực dịch vụ"><span>EVENT</span><i>✦</i><span>MEDIA</span><i>✦</i><span>TEAM BUILDING</span><i>✦</i><span>KOL / KOC</span></div>
      </section>

      <section id="about" className="statement section-pad">
        <p className="section-kicker">/ CHÚNG TÔI LÀ AI</p>
        <div>
          <h2>Một đội ngũ.<br/>Một hành trình.<br/><em>Một chuẩn mực.</em></h2>
          <p>Khải Thiên kết nối tư duy chiến lược với năng lực thực thi. Mỗi dự án bắt đầu bằng việc hiểu đúng bài toán và kết thúc bằng một trải nghiệm được chăm chút đến từng điểm chạm.</p>
          <a className="text-link" href="#contact">Trò chuyện cùng chúng tôi <span>↗</span></a>
        </div>
      </section>

      <section id="services" className="services section-pad">
        <div className="section-head"><div><p className="section-kicker">/ NĂNG LỰC</p><h2>Mọi điều bạn cần.<br/><em>Trong một hệ sinh thái.</em></h2></div><p>Giải pháp linh hoạt theo mục tiêu, quy mô và đặc thù của từng thương hiệu.</p></div>
        <div className="service-list">
          {services.map((item) => <article key={item.no}><span>{item.no}</span><h3>{item.title}</h3><p>{item.text}</p><b aria-hidden="true">↗</b></article>)}
        </div>
      </section>

      <section id="work" className="work section-pad">
        <p className="section-kicker">/ DỰ ÁN TIÊU BIỂU</p>
        <div className="project-grid">
          <article className="project project-large"><div className="visual visual-a"><span>STAGE / LIGHT / MOMENT</span></div><p>Không gian thương hiệu</p><h3>Trải nghiệm được thiết kế để chạm cảm xúc</h3><small>Hình ảnh định hướng — dự án thực tế sẽ được cập nhật sau xác nhận</small></article>
          <article className="project"><div className="visual visual-b"><span>MOVEMENT / TOGETHER</span></div><p>Team experience</p><h3>Kết nối tập thể qua một hành trình chung</h3><small>Nội dung minh hoạ, không đại diện cho khách hàng cụ thể</small></article>
        </div>
      </section>

      <section id="process" className="process section-pad">
        <div className="section-head"><div><p className="section-kicker">/ CÁCH CHÚNG TÔI LÀM VIỆC</p><h2>Rõ ràng từ brief.<br/><em>Chỉn chu đến kết quả.</em></h2></div></div>
        <div className="process-grid">{process.map(([no,title,text]) => <article key={no}><span>{no}</span><div className="process-mark" aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact-copy"><p className="section-kicker">/ BẮT ĐẦU MỘT DỰ ÁN</p><h2>Có một ý tưởng<br/>đang chờ <em>cất cánh?</em></h2><p>Hãy chia sẻ bài toán của bạn. Khải Thiên sẽ liên hệ để cùng làm rõ nhu cầu và đề xuất bước tiếp theo phù hợp.</p></div>
        <form>
          <label>Họ và tên *<input required name="name" autoComplete="name" placeholder="Nguyễn Văn A" /></label>
          <label>Công ty / tổ chức<input name="company" autoComplete="organization" placeholder="Tên công ty" /></label>
          <div className="form-row"><label>Email hoặc số điện thoại *<input required name="contact" placeholder="email@company.com" /></label><label>Dịch vụ quan tâm *<select required name="service" defaultValue=""><option value="" disabled>Chọn dịch vụ</option>{services.map(s => <option key={s.no}>{s.title}</option>)}</select></label></div>
          <label>Nội dung yêu cầu *<textarea required name="message" rows={4} placeholder="Mục tiêu, thời gian dự kiến và thông tin bạn muốn chia sẻ..." /></label>
          <label className="consent"><input type="checkbox" required /> Tôi đồng ý để Khải Thiên sử dụng thông tin này nhằm liên hệ tư vấn.</label>
          <button type="button" aria-disabled="true">Kênh tiếp nhận đang được cập nhật <span>↗</span></button>
        </form>
      </section>

      <footer><a className="brand" href="#top"><span>KT</span><b>KHẢI THIÊN</b></a><p>Kiến tạo trải nghiệm.<br/>Lan toả giá trị.</p><div><a href="#services">Dịch vụ</a><a href="#work">Dự án</a><a href="#contact">Liên hệ</a></div><small>© 2026 Khải Thiên. Thông tin pháp lý đang chờ xác nhận.</small></footer>
    </main>
  );
}
