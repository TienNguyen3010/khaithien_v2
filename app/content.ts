export const company = {
  name: "Khải Thiên",
  fullName: "Khải Thiên Communication & Entertainment",
  tagline: "Kiến tạo sự kiện. Kết nối thương hiệu. Lan tỏa giá trị.",
  phone: "076 489 8969",
  phoneHref: "tel:+84764898969",
  email: "khaithienmande@gmail.com",
  location: "Thủ Đức, TP. Hồ Chí Minh",
  facebook: "https://www.facebook.com/profile.php?id=100082810012676",
};

export const navigation = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/khach-hang", label: "Khách hàng" },
];

export type Service = {
  slug: string;
  number: string;
  name: string;
  short: string;
  description: string;
  deliverables: string[];
  process: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "pr-communication",
    number: "01",
    name: "PR & Communication",
    short: "Chiến lược, nội dung và PR cùng vận hành trong một hệ thống truyền thông thống nhất.",
    description: "Khải Thiên bắt đầu từ mục tiêu kinh doanh và chân dung công chúng để xây dựng thông điệp, kế hoạch nội dung và lộ trình truyền thông có thể triển khai thực tế.",
    deliverables: ["Tư vấn chiến lược truyền thông", "Thông điệp và định hướng nội dung", "Quan hệ báo chí và PR", "Kế hoạch social content", "Quản lý chiến dịch tích hợp"],
    process: ["Phân tích bối cảnh", "Xác lập thông điệp", "Thiết kế kế hoạch", "Triển khai và đo lường"],
    faq: [
      { question: "Có nhận thực hiện từng hạng mục riêng lẻ không?", answer: "Có. Phạm vi được thiết kế theo mục tiêu, nguồn lực và giai đoạn của thương hiệu." },
      { question: "Khi nào nên bắt đầu lập kế hoạch?", answer: "Nên bắt đầu trước thời điểm truyền thông chính để có đủ thời gian chuẩn bị nội dung, kênh và phương án xử lý." },
    ],
  },
  {
    slug: "event",
    number: "02",
    name: "Event",
    short: "Thiết kế và vận hành sự kiện trọn gói từ ý tưởng đến trải nghiệm tại hiện trường.",
    description: "Mỗi sự kiện được phát triển như một hành trình thương hiệu, nơi nội dung, không gian, kỹ thuật và vận hành cùng phục vụ một mục tiêu chung.",
    deliverables: ["Concept và kịch bản", "Thiết kế không gian", "Sản xuất sân khấu", "Âm thanh, ánh sáng và trình chiếu", "Điều phối và vận hành"],
    process: ["Tiếp nhận brief", "Phát triển concept", "Tiền kỳ và sản xuất", "Vận hành và nghiệm thu"],
    faq: [
      { question: "Khải Thiên có phụ trách trọn gói không?", answer: "Có. Phạm vi có thể bao gồm ý tưởng, thiết kế, sản xuất, kỹ thuật và điều phối hiện trường." },
      { question: "Có nhận sự kiện ngoài TP. Hồ Chí Minh không?", answer: "Phạm vi địa điểm sẽ được xác nhận theo quy mô, thời gian và yêu cầu vận hành của dự án." },
    ],
  },
  {
    slug: "production-house",
    number: "03",
    name: "Production House",
    short: "Sản xuất nội dung hình ảnh và video có định hướng, nhất quán và phù hợp từng nền tảng.",
    description: "Từ tiền kỳ đến hậu kỳ, đội ngũ kiểm soát mạch kể chuyện, hình ảnh và chất lượng bàn giao để nội dung thực sự hỗ trợ mục tiêu truyền thông.",
    deliverables: ["TVC và phim doanh nghiệp", "Social video", "Chụp ảnh thương hiệu", "Livestream", "Hậu kỳ và phiên bản đa nền tảng"],
    process: ["Xây dựng treatment", "Tiền kỳ", "Sản xuất", "Hậu kỳ và bàn giao"],
    faq: [
      { question: "Có hỗ trợ phát triển ý tưởng nội dung không?", answer: "Có. Khải Thiên có thể tham gia từ định hướng, kịch bản đến sản xuất và hậu kỳ." },
      { question: "Sản phẩm có phiên bản cho nhiều nền tảng không?", answer: "Có thể quy hoạch tỷ lệ, thời lượng và cấu trúc nội dung theo từng kênh ngay từ tiền kỳ." },
    ],
  },
  {
    slug: "activation",
    number: "04",
    name: "Activation",
    short: "Tạo điểm chạm trực tiếp giúp thương hiệu thu hút, tương tác và được ghi nhớ.",
    description: "Hoạt động kích hoạt được thiết kế quanh hành vi người tham dự, bảo đảm ý tưởng vừa nổi bật vừa có khả năng vận hành tại địa điểm thực tế.",
    deliverables: ["Roadshow và sampling", "Booth trải nghiệm", "Brand activation", "Game tương tác", "Nhân sự và vận hành điểm chạm"],
    process: ["Xác định hành vi", "Thiết kế trải nghiệm", "Sản xuất vật phẩm", "Vận hành và tổng kết"],
    faq: [
      { question: "Có thể triển khai nhiều địa điểm không?", answer: "Có thể xây dựng bộ tiêu chuẩn và kế hoạch vận hành đồng nhất cho chuỗi địa điểm." },
      { question: "Có hỗ trợ nhân sự hiện trường không?", answer: "Phạm vi dự án có thể bao gồm tuyển chọn, đào tạo, điều phối và giám sát nhân sự." },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  imagePosition: string;
};

export const projects: Project[] = [
  {
    slug: "su-kien-doanh-nghiep",
    title: "Hồ sơ năng lực sự kiện doanh nghiệp",
    category: "Event",
    year: "Đang cập nhật",
    location: "TP. Hồ Chí Minh",
    summary: "Cấu trúc trải nghiệm dành cho hội nghị, lễ ra mắt và chương trình nội bộ doanh nghiệp.",
    challenge: "Chuyển thông điệp doanh nghiệp thành một hành trình dễ theo dõi, nhất quán và phù hợp không gian thực tế.",
    solution: "Kết nối kịch bản, sân khấu, nội dung trình chiếu, kỹ thuật và vận hành trong một kế hoạch chung.",
    result: "Hình ảnh và số liệu dự án cụ thể sẽ được cập nhật sau khi có xác nhận quyền công bố.",
    imagePosition: "88% 30%",
  },
  {
    slug: "san-xuat-noi-dung-thuong-hieu",
    title: "Hồ sơ sản xuất nội dung thương hiệu",
    category: "Production House",
    year: "Đang cập nhật",
    location: "Việt Nam",
    summary: "Định hướng sản xuất hình ảnh, video và nội dung đa định dạng cho truyền thông thương hiệu.",
    challenge: "Duy trì một câu chuyện nhất quán trong khi nội dung cần thích ứng với nhiều kênh và thời lượng.",
    solution: "Quy hoạch treatment, kịch bản, shot list và phiên bản bàn giao ngay từ giai đoạn tiền kỳ.",
    result: "Chỉ sử dụng sản phẩm được khách hàng và đối tác cho phép công bố.",
    imagePosition: "63% 72%",
  },
  {
    slug: "activation-trai-nghiem",
    title: "Hồ sơ activation và trải nghiệm",
    category: "Activation",
    year: "Đang cập nhật",
    location: "TP. Hồ Chí Minh",
    summary: "Điểm chạm thương hiệu được xây dựng để thu hút, tương tác và tạo ghi nhớ.",
    challenge: "Cân bằng giữa ý tưởng nổi bật, trải nghiệm người dùng và khả năng vận hành tại hiện trường.",
    solution: "Thiết kế luồng trải nghiệm, vật phẩm, nhân sự và tiêu chuẩn vận hành theo từng điểm chạm.",
    result: "Case study thực tế sẽ được bổ sung theo hồ sơ được phép sử dụng.",
    imagePosition: "35% 28%",
  },
];

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "checklist-brief-su-kien-doanh-nghiep",
    title: "Checklist để một brief sự kiện rõ ràng ngay từ đầu",
    category: "Event planning",
    excerpt: "Những thông tin giúp đội ngũ sáng tạo và vận hành hiểu đúng mục tiêu trước khi phát triển concept.",
    readingTime: "5 phút đọc",
    content: ["Một brief hiệu quả nên bắt đầu bằng mục tiêu thay vì chỉ mô tả hình thức sự kiện. Hãy xác định điều người tham dự cần biết, cảm nhận và thực hiện sau chương trình.", "Các dữ kiện quan trọng gồm đối tượng, số lượng, thời gian, địa điểm, ngân sách dự kiến, yêu cầu kỹ thuật và các giới hạn cần tuân thủ.", "Khi tiêu chí đánh giá được thống nhất từ đầu, các phương án sáng tạo sẽ thực tế hơn và quá trình phê duyệt cũng rõ ràng hơn."],
  },
  {
    slug: "tu-concept-den-van-hanh",
    title: "Từ concept đến vận hành: điều gì giữ trải nghiệm nhất quán?",
    category: "Behind the work",
    excerpt: "Một ý tưởng chỉ thực sự có giá trị khi từng điểm chạm đều có thể triển khai đồng bộ.",
    readingTime: "6 phút đọc",
    content: ["Concept là nguyên tắc định hướng cho nội dung, không gian và cách người tham dự tương tác với chương trình.", "Trong giai đoạn sản xuất, mỗi hạng mục cần được đối chiếu với mục tiêu ban đầu: sân khấu có hỗ trợ thông điệp không, nội dung có đúng nhịp không và luồng vận hành có thuận tiện không.", "Run sheet, checklist và đầu mối quyết định rõ ràng là ba công cụ quan trọng giúp trải nghiệm giữ được tính nhất quán đến phút cuối."],
  },
  {
    slug: "noi-dung-da-nen-tang",
    title: "Quy hoạch nội dung đa nền tảng từ giai đoạn tiền kỳ",
    category: "Production",
    excerpt: "Chuẩn bị tỷ lệ, thời lượng và thông điệp từ đầu giúp tối ưu chi phí sản xuất nội dung.",
    readingTime: "4 phút đọc",
    content: ["Thay vì cắt lại một video dài cho mọi kênh, hãy xác định vai trò của từng nền tảng ngay khi xây dựng treatment.", "Shot list nên bao gồm khung hình ngang, dọc và các chi tiết có thể sử dụng độc lập. Kịch bản cũng cần xác định đoạn mở đầu phù hợp với hành vi xem nhanh.", "Cách làm này giúp bộ nội dung cuối cùng nhất quán về hình ảnh nhưng vẫn tự nhiên trên từng điểm chạm."],
  },
];

export const processSteps = [
  { no: "01", title: "Lắng nghe", text: "Hiểu mục tiêu, đối tượng, bối cảnh và giới hạn của dự án." },
  { no: "02", title: "Kiến tạo", text: "Chuyển brief thành chiến lược, ý tưởng và kế hoạch khả thi." },
  { no: "03", title: "Thực thi", text: "Sản xuất, vận hành và kiểm soát chất lượng xuyên suốt." },
  { no: "04", title: "Lan tỏa", text: "Bàn giao, tổng kết và đo lường theo tiêu chí đã thống nhất." },
];
