import type { Metadata } from "next";
import { processSteps } from "../content";
import { ContactBand, PageHero, SectionHeading, SiteFrame } from "../components/site-shell";

export const metadata: Metadata = { title: "Giới thiệu", description: "Câu chuyện, phương pháp làm việc và năng lực của Khải Thiên." };

export default function AboutPage() {
  return <SiteFrame><PageHero eyebrow="Về Khải Thiên" title="Tư duy chiến lược gặp năng lực thực thi." description="Chúng tôi xây dựng trải nghiệm thương hiệu bằng sự rõ ràng, tinh thần đồng đội và trách nhiệm trong từng hạng mục." />
    <section className="section container editorial-grid"><div><p className="eyebrow">Câu chuyện</p><h2>Hiểu đúng trước khi làm đẹp.</h2></div><div><p className="large-copy">Khải Thiên hoạt động trong lĩnh vực truyền thông và giải trí, tập trung vào PR, sự kiện, sản xuất nội dung và activation. Mỗi đề xuất đều bắt đầu từ mục tiêu thật của thương hiệu, không bắt đầu từ một hình thức có sẵn.</p><p>Chúng tôi tin rằng một trải nghiệm tốt cần vừa có ý tưởng rõ ràng, vừa có kế hoạch đủ thực tế để triển khai đúng tại hiện trường.</p></div></section>
    <section className="section section-ice"><div className="container"><SectionHeading eyebrow="Giá trị làm việc" title="Ba nguyên tắc xuyên suốt mỗi dự án." /><div className="value-grid"><article><b>01</b><h3>Rõ mục tiêu</h3><p>Mọi hạng mục đều phải trả lời được mục tiêu chung của dự án.</p></article><article><b>02</b><h3>Chủ động phối hợp</h3><p>Thông tin, trách nhiệm và mốc quyết định được làm rõ từ đầu.</p></article><article><b>03</b><h3>Chỉn chu thực thi</h3><p>Trải nghiệm cuối cùng được tạo nên từ những chi tiết được kiểm soát.</p></article></div></div></section>
    <section className="section container"><SectionHeading eyebrow="Phương pháp" title="Một hành trình được kiểm soát từ đầu đến cuối." /><div className="process-grid">{processSteps.map((step) => <article key={step.no}><span>{step.no}</span><i/><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section><ContactBand /></SiteFrame>;
}
