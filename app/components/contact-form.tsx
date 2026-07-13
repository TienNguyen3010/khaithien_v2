"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { services } from "../content";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [reference, setReference] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const payload = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    payload.set("idempotencyKey", crypto.randomUUID());
    payload.set("utmSource", params.get("utm_source") || "");
    payload.set("utmMedium", params.get("utm_medium") || "");
    payload.set("utmCampaign", params.get("utm_campaign") || "");
    payload.set("landingPage", `${window.location.pathname}${window.location.search}`.slice(0, 500));
    payload.set("referrer", document.referrer.slice(0, 500));
    try {
      const response = await fetch("/api/contact", { method: "POST", body: payload });
      const result = await response.json() as { reference?: string };
      if (!response.ok) throw new Error("request_failed");
      setReference(result.reference || "");
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form brief-form" onSubmit={submit} encType="multipart/form-data">
      <input className="form-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <fieldset>
        <legend><span>01</span> Thông tin liên hệ</legend>
        <div className="form-grid">
          <label>Họ và tên *<input name="name" required autoComplete="name" maxLength={120} /></label>
          <label>Công ty<input name="company" autoComplete="organization" maxLength={160} /></label>
          <label>Chức danh<input name="jobTitle" autoComplete="organization-title" maxLength={120} /></label>
          <label>Email *<input name="email" type="email" required autoComplete="email" maxLength={160} /></label>
          <label>Số điện thoại *<input name="phone" required autoComplete="tel" maxLength={40} /></label>
          <label>Hình thức liên hệ<select name="preferredChannel" defaultValue="phone"><option value="phone">Điện thoại</option><option value="email">Email</option><option value="zalo">Zalo</option></select></label>
        </div>
      </fieldset>

      <fieldset>
        <legend><span>02</span> Bối cảnh dự án</legend>
        <div className="form-grid">
          <label>Dịch vụ quan tâm *<select name="serviceInterest" required defaultValue=""><option value="" disabled>Chọn nhóm dịch vụ</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>
          <label>Loại sự kiện/chiến dịch<input name="projectType" placeholder="Ví dụ: Hội nghị khách hàng" maxLength={120} /></label>
          <label className="full">Mục tiêu dự án *<textarea name="objective" required rows={4} maxLength={1500} placeholder="Kết quả thương hiệu hoặc kinh doanh bạn muốn đạt được..." /></label>
          <label>Thời gian dự kiến<input name="plannedStart" placeholder="Ví dụ: Tháng 10/2026" maxLength={80} /></label>
          <label>Địa điểm<input name="location" placeholder="Thành phố hoặc địa điểm dự kiến" maxLength={250} /></label>
          <label>Số người tham dự<input name="attendeeCount" type="number" min="1" inputMode="numeric" /></label>
          <label>Ngân sách dự kiến<select name="budgetRange" defaultValue=""><option value="">Chưa xác định</option><option value="under-100m">Dưới 100 triệu</option><option value="100m-300m">100–300 triệu</option><option value="300m-500m">300–500 triệu</option><option value="over-500m">Trên 500 triệu</option><option value="confidential">Trao đổi riêng</option></select></label>
        </div>
      </fieldset>

      <fieldset>
        <legend><span>03</span> Yêu cầu & tài liệu</legend>
        <div className="form-grid">
          <label className="full">Nội dung yêu cầu *<textarea name="message" required rows={6} maxLength={4000} placeholder="Phạm vi, đối tượng, hạng mục và thông tin khác bạn muốn chia sẻ..." /></label>
          <label>Thời gian liên hệ phù hợp<input name="preferredContactTime" maxLength={120} placeholder="Ví dụ: 9:00–11:00 ngày làm việc" /></label>
          <label>File brief (không bắt buộc)<input name="briefFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx" /><small>PDF, Word, PowerPoint hoặc Excel · tối đa 10 MB</small></label>
        </div>
      </fieldset>

      <label className="check"><input name="privacyConsent" type="checkbox" value="true" required /> <span>Tôi đồng ý để Khải Thiên xử lý thông tin nhằm tiếp nhận và tư vấn yêu cầu, theo <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link>. *</span></label>
      <label className="check optional"><input name="marketingConsent" type="checkbox" value="true" /> <span>Tôi muốn nhận thêm nội dung chuyên môn và thông tin dịch vụ từ Khải Thiên.</span></label>
      <button className="button" disabled={state === "sending"}>{state === "sending" ? "Đang gửi an toàn..." : "Gửi brief dự án ↗"}</button>
      <p className={`form-status ${state}`} aria-live="polite">
        {state === "success" && <>Brief đã được ghi nhận{reference ? <> với mã <strong>{reference}</strong></> : ""}. Khải Thiên sẽ liên hệ để xác nhận bước tiếp theo.</>}
        {state === "error" && "Chưa thể gửi brief. Vui lòng kiểm tra file hoặc liên hệ trực tiếp qua điện thoại/email."}
      </p>
    </form>
  );
}
