"use client";

import { FormEvent, useState } from "react";
import { services } from "../content";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("request_failed");
      event.currentTarget.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Họ và tên *<input name="name" required autoComplete="name" /></label>
        <label>Công ty<input name="company" autoComplete="organization" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" /></label>
        <label>Số điện thoại *<input name="phone" required autoComplete="tel" /></label>
        <label>Dịch vụ quan tâm *<select name="serviceInterest" required defaultValue=""><option value="" disabled>Chọn dịch vụ</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>
        <label>Thời gian dự kiến<input name="plannedStart" placeholder="Ví dụ: Tháng 10/2026" /></label>
        <label>Ngân sách dự kiến<select name="budgetRange" defaultValue=""><option value="">Chưa xác định</option><option>Dưới 100 triệu</option><option>100–300 triệu</option><option>300–500 triệu</option><option>Trên 500 triệu</option></select></label>
        <label className="full">Nội dung yêu cầu *<textarea name="message" required rows={5} placeholder="Mục tiêu, quy mô, địa điểm và thông tin bạn muốn chia sẻ..." /></label>
      </div>
      <label className="check"><input name="consent" type="checkbox" value="true" required /> Tôi đồng ý để Khải Thiên sử dụng thông tin này nhằm liên hệ tư vấn.</label>
      <button className="button" disabled={state === "sending"}>{state === "sending" ? "Đang gửi..." : "Gửi yêu cầu ↗"}</button>
      <p className="form-status" aria-live="polite">{state === "success" && "Cảm ơn bạn. Yêu cầu đã được ghi nhận."}{state === "error" && "Chưa thể gửi yêu cầu. Vui lòng gọi hoặc gửi email trực tiếp cho Khải Thiên."}</p>
    </form>
  );
}
