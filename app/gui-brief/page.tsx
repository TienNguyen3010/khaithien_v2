import type { Metadata } from "next";
import { ContactForm } from "../components/contact-form";
import { PageHero, SiteFrame } from "../components/site-shell";

export const metadata: Metadata = { title: "Gửi brief dự án", description: "Chia sẻ mục tiêu, phạm vi và thời gian dự kiến với Khải Thiên." };

export default function BriefPage() { return <SiteFrame><PageHero eyebrow="Project brief" title="Một brief rõ mở đầu cho một đề xuất tốt." description="Bạn chưa cần có mọi câu trả lời. Hãy chia sẻ những gì đã biết để Khải Thiên cùng xác định bước tiếp theo."/><section className="section container brief-layout"><div className="brief-guide"><p className="eyebrow">Thông tin hữu ích</p><h2>Giúp chúng tôi hiểu đúng bài toán.</h2><ol><li><b>Mục tiêu</b><span>Điều doanh nghiệp muốn đạt được.</span></li><li><b>Đối tượng</b><span>Người tham dự hoặc công chúng chính.</span></li><li><b>Thời gian & địa điểm</b><span>Mốc dự kiến và phạm vi triển khai.</span></li><li><b>Ngân sách</b><span>Khoảng đầu tư để đề xuất phù hợp.</span></li></ol><p className="privacy-note">Thông tin chỉ được sử dụng để tiếp nhận và tư vấn yêu cầu dự án.</p></div><ContactForm/></section></SiteFrame>; }
