import type { Metadata } from "next";
import { ContactBand, PageHero, SectionHeading, SiteFrame } from "../components/site-shell";

export const metadata: Metadata = { title: "Khách hàng", description: "Nguyên tắc hợp tác và công bố thông tin khách hàng của Khải Thiên." };

export default function ClientsPage() {
  return <SiteFrame><PageHero eyebrow="Khách hàng & đối tác" title="Một mối quan hệ tốt bắt đầu từ sự rõ ràng." description="Logo, nhận xét và thông tin hợp tác chỉ xuất hiện khi Khải Thiên nhận được xác nhận quyền công bố." />
    <section className="section container"><SectionHeading eyebrow="Cam kết hợp tác" title="Cùng một mục tiêu. Cùng một tiêu chuẩn." /><div className="value-grid"><article><b>01</b><h3>Bảo mật thông tin</h3><p>Thông tin dự án được sử dụng đúng phạm vi đã thống nhất.</p></article><article><b>02</b><h3>Minh bạch tiến độ</h3><p>Các mốc công việc, trách nhiệm và thay đổi đều được cập nhật rõ ràng.</p></article><article><b>03</b><h3>Tôn trọng thương hiệu</h3><p>Mỗi giải pháp được phát triển theo bối cảnh và bản sắc riêng của khách hàng.</p></article></div></section>
    <section className="section section-ice"><div className="container"><SectionHeading eyebrow="Danh sách đối tác" title="Nội dung đang được xác nhận quyền sử dụng." description="Khu vực này sẽ hiển thị logo và nhận xét sau khi có chấp thuận từ từng khách hàng hoặc đối tác." /><div className="permission-panel"><div><span>LOGO</span><span>CASE STUDY</span><span>TESTIMONIAL</span></div><p>Không sử dụng tên thương hiệu, số liệu hay lời nhận xét chưa được xác nhận.</p></div></div></section><ContactBand /></SiteFrame>;
}
