export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  steps?: { title: string; body: string }[];
  note?: { title: string; body: string };
  prompt?: string;
  checks?: string[];
  faqs?: { question: string; answer: string }[];
  link?: { label: string; href: string };
};

export type Guide = {
  slug: string;
  title: string;
  shortTitle: string;
  /** Who acts in this step: the user on the computer, or the user asking the assistant. */
  actor: "Bạn làm trên máy" | "Bạn yêu cầu trợ lý";
  description: string;
  sections: Section[];
};

export const cycle: Guide[] = [
  {
    slug: "tai-workflow", title: "Tải workflow", shortTitle: "Tải workflow", actor: "Bạn làm trên máy",
    description: "Tải ZIP từ GitHub và giải nén. Mỗi doanh nghiệp dùng một bản riêng.",
    sections: [{ id: "download", title: "Code → Download ZIP" }]
  },
  {
    slug: "dat-tai-lieu", title: "Đặt tài liệu vào inputs", shortTitle: "Đặt tài liệu vào inputs", actor: "Bạn làm trên máy",
    description: "Trợ lý đọc tài liệu doanh nghiệp từ hai thư mục này.",
    sections: [
      { id: "where", title: "Thư mục", steps: [
        { title: "inputs/01_company_info", body: "Hồ sơ công ty, hồ sơ năng lực, dự án, case study." },
        { title: "inputs/02_marketing_materials", body: "Brochure, mô tả sản phẩm/dịch vụ, bảng giá." }
      ], paragraphs: ["Ưu tiên PDF, Word, Excel có chữ. Ảnh scan có thể không đọc được.", "Chưa có tài liệu cũng được: để trống inputs, ở bước “Trợ lý đọc tài liệu” bạn gửi link website doanh nghiệp cho trợ lý (hoặc trợ lý hỏi bạn từng câu)."] }
    ]
  },
  {
    slug: "mo-claude-code", title: "Mở workflow bằng trợ lý AI", shortTitle: "Mở bằng trợ lý AI", actor: "Bạn làm trên máy",
    description: "Mở thư mục workflow bằng phần mềm trợ lý AI cài trên máy. Hướng dẫn lấy Claude Desktop làm ví dụ.",
    sections: [
      { id: "choose", title: "Cài phần mềm trợ lý AI", paragraphs: ["Hướng dẫn này lấy Claude Desktop (gói Pro trở lên) làm ví dụ. Bạn có thể dùng phần mềm AI khác cũng mở được thư mục trên máy, ví dụ ChatGPT desktop app; các bước tương tự và câu lệnh giống nhau."], note: { title: "Dùng bản phần mềm cài trên máy, không dùng bản web", body: "Bản web (claude.ai, chatgpt.com) không mở được thư mục và không chạy được lệnh trên máy, nên không dùng được cho workflow này." } },
      { id: "overview", title: "Vị trí các nút" },
      { id: "folder", title: "Chọn thư mục workflow", paragraphs: ["Tab Code → This computer → Choose… → Open folder… → chọn thư mục workflow (thư mục có tệp AGENTS.md)."] },
      { id: "permissions", title: "Chọn quyền Manual", steps: [
        { title: "Auto", body: "Claude tự quyết định việc nào cần hỏi. Không nên dùng khi mới bắt đầu." },
        { title: "Manual (nên chọn)", body: "Luôn hỏi bạn trước khi sửa tệp hoặc chạy lệnh." },
        { title: "Accept edits", body: "Tự sửa tệp không hỏi; chạy lệnh vẫn hỏi." },
        { title: "Plan", body: "Chỉ lập kế hoạch, chưa làm gì. Dùng khi muốn xem trước trợ lý định làm gì." },
        { title: "Bypass permissions (không dùng)", body: "Claude được sửa hoặc xóa tệp mà không hỏi." }
      ], paragraphs: ["Lần đầu trợ lý chạy lệnh, Claude hỏi quyền: bấm Always allow cho đúng các lệnh python3 scripts/… và sh scripts/… của workflow."] },
      { id: "done", title: "Đã mở đúng", paragraphs: ["Thanh dưới ô nhập hiện This computer, tên thư mục workflow và Manual, như ảnh ở trên."] }
    ]
  },
  {
    slug: "doc-tai-lieu", title: "Trợ lý đọc tài liệu", shortTitle: "Trợ lý đọc tài liệu", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý tóm tắt doanh nghiệp từ inputs (hoặc từ website nếu chưa có tài liệu) và hỏi phần còn thiếu. Bạn xác nhận và chọn sản phẩm ưu tiên.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Đọc AGENTS.md và tài liệu trong inputs. Báo tệp nào không đọc được, tóm tắt doanh nghiệp và hỏi tôi phần còn thiếu." },
      { id: "website", title: "Chưa có tài liệu? Gửi website doanh nghiệp", paragraphs: ["Nếu thư mục inputs đang trống, bạn chỉ cần gửi đường link trang web của doanh nghiệp. Trợ lý đọc website để tóm tắt doanh nghiệp, sản phẩm/dịch vụ, rồi hỏi bạn phần website chưa có (ví dụ bảng giá, khách hàng tiêu biểu). Không có website thì trợ lý sẽ hỏi bạn từng câu."], prompt: "Đọc AGENTS.md. Tôi chưa có tài liệu, đây là website doanh nghiệp của tôi: <dán link website>. Đọc website, tóm tắt doanh nghiệp và hỏi tôi phần còn thiếu." }
    ]
  },
  {
    slug: "kiem-tra-moi-truong", title: "Trợ lý kiểm tra môi trường", shortTitle: "Trợ lý kiểm tra môi trường", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý kiểm tra máy và báo phần còn thiếu. Không cần cài trình duyệt riêng.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Kiểm tra môi trường cho workflow này, báo phần còn thiếu và cài nếu cần." }
    ]
  },
  {
    slug: "ket-noi-mcp", title: "Trợ lý kết nối công cụ", shortTitle: "Trợ lý kết nối công cụ", actor: "Bạn yêu cầu trợ lý",
    description: "Kiểm tra đọc web, kết nối TinaCRM (bằng API key) và các dịch vụ sẽ dùng như Google Calendar, Apollo. Email gửi bằng Outlook trên máy, thiết lập ở bước 9.",
    sections: [
      { id: "browser", title: "Đọc web", paragraphs: ["Trợ lý dùng công cụ đọc web có sẵn, không cần cài trình duyệt riêng. Trợ lý đọc thử website của doanh nghiệp bạn ngay trong cuộc trò chuyện này. Khi được hỏi quyền đọc web hoặc chạy lệnh, bấm cho phép luôn.", "Khi tìm khách, cách nào không lấy được dữ liệu thì trợ lý tự chuyển sang cách khác."], prompt: "Đọc thử website của doanh nghiệp tôi để kiểm tra trợ lý đọc được web." },
      { id: "apikey-open", title: "TinaCRM: tạo API key", paragraphs: ["Mở app.tinacrm.com, đăng nhập và vào workspace của doanh nghiệp → Settings → MCP & APIs → tab API → Create API key."], link: { label: "Mở TinaCRM (app.tinacrm.com)", href: "https://app.tinacrm.com" } },
      { id: "apikey-form", title: "Điền thông tin khóa", paragraphs: ["Role quyết định trợ lý được làm gì trong CRM: chọn role đủ quyền với khách hàng, công ty và công việc. Nên đặt ngày hết hạn thay vì Never."] },
      { id: "apikey-copy", title: "Sao chép khóa", paragraphs: ["Khóa chỉ hiện một lần. Bấm Copy rồi gửi câu lệnh dưới đây. Không dán khóa vào khung chat."], prompt: "Kết nối TinaCRM tại https://app.tinacrm.com bằng API key. Bật hộp thoại để tôi dán API key, sau đó đọc thử dữ liệu khách hàng, chưa ghi gì." },
      { id: "apikey-paste", title: "Dán khóa vào hộp thoại", paragraphs: ["Trợ lý bật hộp thoại Kết nối TinaCRM: dán khóa vào ô, bấm Lưu. Không thấy hộp thoại thì tìm trên thanh Dock (Mac) hoặc thanh tác vụ (Windows), hoặc phía sau cửa sổ trợ lý AI."] },
      { id: "mcp-check", title: "Kiểm tra kết nối", paragraphs: ["Trợ lý kiểm tra khóa và đọc thử vài khách hàng, công ty để bạn xác nhận đúng CRM của doanh nghiệp. Không cần mở phiên mới."] },
      { id: "connectors", title: "Dịch vụ khác", paragraphs: ["Trợ lý đề xuất dịch vụ doanh nghiệp sẽ cần: Google Calendar để đặt lịch hẹn, Apollo để tìm khách. Email không cần kết nối ở đây: trợ lý gửi bằng Outlook trên máy bạn (bước 9). Trợ lý đọc thử để kiểm tra, chưa gửi gì.", "Claude hiện thẻ như ảnh trong khung chat: bấm Connect, đăng nhập nếu được hỏi là xong. Phần mềm AI khác thì làm theo hướng dẫn trợ lý đưa ra.", "Kết nối xong thì tiếp tục ngay trong cuộc trò chuyện này. Đừng mở cuộc trò chuyện mới: cuộc trò chuyện mới không có các kết nối vừa làm và không nhớ những gì bạn đã trao đổi."], prompt: "Đề xuất các dịch vụ cần kết nối cho doanh nghiệp này và hướng dẫn tôi kết nối từng cái." },
    ]
  },
  {
    slug: "khach-phu-hop", title: "Xác định khách phù hợp", shortTitle: "Xác định khách phù hợp", actor: "Bạn yêu cầu trợ lý",
    description: "Mỗi nhóm khách hoặc sản phẩm là một chiến dịch riêng. Chốt ngành, quy mô, khu vực và người ra quyết định cho chiến dịch.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Tạo chiến dịch mới. Hỏi tôi tên chiến dịch, nhóm khách và sản phẩm, rồi đề xuất tiêu chí khách hàng phù hợp (ICP). Lưu sau khi tôi duyệt." },
      { id: "more", title: "Thêm chiến dịch", paragraphs: ["Làm lại bước 7–9 cho mỗi chiến dịch mới. Tài liệu doanh nghiệp, TinaCRM và hộp thư dùng chung."] }
    ]
  },
  {
    slug: "tim-khach", title: "Tìm khách và lưu vào TinaCRM", shortTitle: "Tìm khách & lưu CRM", actor: "Bạn yêu cầu trợ lý",
    description: "Bắt đầu bằng danh sách nhỏ. Trợ lý tự chọn cách lấy dữ liệu; nguồn nào cần đăng nhập thì bạn tự đăng nhập, hoặc tự xuất danh sách (Excel/CSV) vào thư mục inputs.",
    sections: [
      { id: "source", title: "Chọn nguồn", paragraphs: ["Trợ lý đề xuất 2–3 nguồn hợp với nhóm khách của chiến dịch (ví dụ Google Maps, danh bạ doanh nghiệp, LinkedIn) kèm lý do. Bạn chọn số."], prompt: "Đề xuất nguồn tìm khách phù hợp nhất cho chiến dịch này." },
      { id: "find", title: "Tìm danh sách", prompt: "Tìm 10 khách theo ICP của chiến dịch, kèm lý do phù hợp và nguồn." },
      { id: "save", title: "Lưu TinaCRM", prompt: "Kiểm tra trùng (cả với chiến dịch khác) và lưu danh sách đã duyệt vào TinaCRM. Báo số tạo mới, cập nhật, bỏ qua và lỗi." }
    ]
  },
  {
    slug: "email", title: "Email chăm sóc", shortTitle: "Email chăm sóc", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý gửi email bằng ứng dụng Outlook bản cũ (classic) trên máy bạn: không cần kết nối, không cần mật khẩu. Bạn duyệt chuỗi email trước khi gửi thật.",
    sections: [
      { id: "mailbox", title: "Dùng Outlook trên máy", paragraphs: ["Mở ứng dụng Outlook trên máy, đăng nhập đúng hộp thư dùng để liên hệ khách. Gmail hay email công ty đều thêm được vào Outlook.", "Cần Outlook bản cũ: bản mới (New Outlook) không cho trợ lý gửi thư hộ. Mac: thanh menu Outlook → bỏ chọn New Outlook (bản mới hơn: Help → Legacy Outlook). Windows: gạt nút New Outlook ở góc trên bên phải về Off, hoặc mở Outlook (classic) từ Start.", "Máy hỏi cho phép điều khiển Microsoft Outlook thì bấm OK. Trợ lý gửi thử một thư cho chính bạn."], prompt: "Thiết lập gửi email bằng Outlook trên máy tôi và gửi thử một thư cho chính tôi." },
      { id: "sequence", title: "Chuỗi email", prompt: "Đề xuất chuỗi email chăm sóc: số email, khoảng cách gửi và email mẫu. Chưa gửi thật khi tôi chưa duyệt." },
      { id: "replies", title: "Xử lý phản hồi" }
    ]
  },
  {
    slug: "hang-ngay", title: "Chạy hằng ngày", shortTitle: "Chạy hằng ngày", actor: "Bạn yêu cầu trợ lý",
    description: "Sau lần thiết lập đầu, mỗi ngày chỉ cần bước này.",
    sections: [
      { id: "routine", title: "Câu lệnh", prompt: "Tiếp tục chiến dịch <tên chiến dịch>: kiểm tra phản hồi mới, tìm khách theo mục tiêu ngày và gửi email đến hạn." },
      { id: "parallel", title: "Làm tiếp và đổi chiến dịch", steps: [
        { title: "Mở lại đúng cuộc trò chuyện cũ", body: "Bấm vào cuộc trò chuyện đã dùng để thiết lập, trong danh sách ở thanh bên trái. Đừng bấm + New." },
        { title: "Gửi câu lệnh", body: "Gửi câu lệnh trên với tên chiến dịch muốn làm, hoặc “Tiếp tục từ lần trước”." },
        { title: "Đổi chiến dịch", body: "Làm xong chiến dịch này, nhắn ngay trong cuộc trò chuyện đó: “Làm chiến dịch <tên khác>”. Các chiến dịch làm lần lượt." }
      ], note: { title: "Vì sao không mở cuộc trò chuyện mới?", body: "Các kết nối (Gmail, Calendar…) và những gì bạn đã trao đổi với trợ lý chỉ nằm trong cuộc trò chuyện cũ. Cuộc trò chuyện mới không có kết nối và phải làm lại từ đầu." } },
      { id: "schedule", title: "Chạy tự động theo lịch", paragraphs: ["Sau khi chạy tay ổn, nhờ trợ lý đặt lịch. Trợ lý hỏi giờ chạy và có cần bạn duyệt email trước khi gửi, rồi tự tạo lịch. Bạn không cần mở trang Scheduled. Mỗi lần chạy hiện ở mục Scheduled ở thanh bên trái.", "Lịch chỉ chạy khi máy bật, không ngủ và ứng dụng đang mở. Đổi giờ hoặc tạm dừng: nhắn trợ lý.", "Lần đầu lịch chạy, nếu trợ lý hỏi quyền thì mở phiên đó trong Scheduled và bấm Always allow cho việc đúng như mô tả.", "Chỉ đặt lịch ở một phần mềm AI, tránh gửi email hai lần."], prompt: "Đặt lịch chạy tự động hằng ngày cho chiến dịch <tên chiến dịch>." },
      { id: "outputs", title: "Kết quả", paragraphs: ["Mỗi chiến dịch: campaigns/<tên chiến dịch>/outputs. Báo cáo tuần: outputs/04_weekly_reports."] },
      { id: "auto-update", title: "Tự cập nhật", paragraphs: ["Mỗi lần chạy, trợ lý kiểm tra bản mới của workflow trước. Có bản mới thì cập nhật, đọc lại hướng dẫn rồi mới làm việc. Tóm tắt cuối phiên ghi rõ đã cập nhật hay chưa."] }
    ]
  },
  {
    slug: "bao-cao", title: "Báo cáo tuần", shortTitle: "Báo cáo tuần", actor: "Bạn yêu cầu trợ lý",
    description: "Khách mới, email đã gửi, phản hồi và đề xuất điều chỉnh.",
    sections: [
      { id: "setup", title: "Câu lệnh", paragraphs: ["Sau khi bạn duyệt bản nháp, trợ lý tự đặt lịch gửi báo cáo theo ngày giờ đã chọn."], prompt: "Thiết lập báo cáo hằng tuần: hỏi tôi người nhận, ngày, giờ gửi, cho xem bản nháp rồi đặt lịch gửi tự động." }
    ]
  }
];

export const help: Guide = {
  slug: "tro-giup", title: "Câu hỏi thường gặp", shortTitle: "Câu hỏi thường gặp", actor: "Bạn yêu cầu trợ lý",
  description: "Các vướng mắc hay gặp.",
  sections: [
    { id: "faq", title: "Câu hỏi", faqs: [
      { question: "Hôm sau làm tiếp thế nào?", answer: "Mở Claude Desktop (tab Code), bấm vào đúng cuộc trò chuyện cũ trong danh sách ở thanh bên trái, rồi gửi “Tiếp tục chiến dịch <tên>” hoặc “Tiếp tục từ lần trước”. Đừng bấm + New: cuộc trò chuyện mới không có các kết nối đã làm và không nhớ ngữ cảnh." },
      { question: "Lỡ mở cuộc trò chuyện mới rồi?", answer: "Quay lại cuộc trò chuyện cũ ở thanh bên trái và làm tiếp ở đó. Nếu không tìm thấy, gửi “Tiếp tục từ lần trước” trong cuộc trò chuyện mới: trợ lý đọc lại tiến trình đã lưu trong thư mục, nhưng sẽ phải nhờ bạn kết nối lại các dịch vụ (Gmail, Calendar…)." },
      { question: "Trợ lý báo đã lưu nhưng TinaCRM không có?", answer: "Yêu cầu trợ lý kiểm tra lại bằng công cụ và báo ID bản ghi." },
      { question: "Trợ lý báo Outlook đang ở bản mới?", answer: "Chuyển về Outlook bản cũ một lần. Mac: mở Outlook → thanh menu Outlook → bỏ chọn New Outlook (bản mới hơn: Help → Legacy Outlook). Windows: gạt nút New Outlook ở góc trên bên phải về Off hoặc mở Outlook (classic) từ Start; không có bản classic thì nhờ IT cài. Không chuyển được thì trợ lý mở sẵn thư đã soạn, bạn chỉ bấm Gửi." },
      { question: "Lỡ bấm Không khi máy hỏi điều khiển Outlook?", answer: "Mac: System Settings → Privacy & Security → Automation → bật Microsoft Outlook cho Claude, rồi nhắn trợ lý thử lại." },
      { question: "Trợ lý không lấy được dữ liệu từ một trang web?", answer: "Bình thường: nhiều trang chặn đọc tự động hoặc cần đăng nhập. Trợ lý tự chuyển sang cách khác (nguồn dữ liệu doanh nghiệp, Apollo…). Nếu vẫn không được, bạn tự xuất danh sách ra Excel/CSV, bỏ vào thư mục inputs rồi nhắn trợ lý đọc tệp đó." },
      { question: "Bản cũ có CloakBrowser?", answer: "Workflow đã bỏ CloakBrowser. Nhắn “Cập nhật workflow”, trợ lý tự gỡ cấu hình cũ và hỏi bạn trước khi xóa thư mục trình duyệt cũ." },
      { question: "Lịch chạy không hoạt động?", answer: "Lịch chỉ chạy khi máy bật, không ngủ và phần mềm trợ lý AI đang mở. Máy ngủ qua giờ chạy thì lần chạy bị bỏ lỡ được chạy bù khi mở lại. Mở mục Scheduled ở thanh bên trái xem lần chạy gần nhất: nếu đang chờ hỏi quyền, mở ra và cho phép luôn đúng việc như mô tả." },
      { question: "Đổi giờ, tạm dừng hoặc xem lịch?", answer: "Nhắn trợ lý, ví dụ “Xem các lịch đang chạy”, “Tạm dừng lịch chiến dịch <tên>”, “Đổi giờ chạy chiến dịch <tên> sang 9:00”." },
      { question: "Dùng cho doanh nghiệp khác?", answer: "Tải một bản workflow riêng và làm lại từ bước 1, trong một cuộc trò chuyện riêng cho thư mục đó. Sau này làm việc cho doanh nghiệp nào thì mở lại đúng cuộc trò chuyện của doanh nghiệp đó ở thanh bên trái." },
      { question: "Khách xuất hiện ở hai chiến dịch?", answer: "Trợ lý giữ khách ở chiến dịch đầu tiên và báo “đã thuộc chiến dịch X”." },
      { question: "Dùng bản web của Claude hoặc ChatGPT được không?", answer: "Không. Bản web không mở được thư mục và không chạy được lệnh trên máy. Cần phần mềm cài trên máy, ví dụ Claude Desktop (tab Code) hoặc ChatGPT desktop app." },
      { question: "Đổi sang phần mềm AI khác?", answer: "Mở cùng thư mục workflow bằng công cụ mới theo bước 3, rồi nhắn “Tôi chuyển sang dùng công cụ này, tiếp tục từ lần trước”. Tài liệu, chiến dịch, khóa TinaCRM vẫn giữ nguyên; trợ lý kết nối lại các dịch vụ (Gmail…) cho công cụ mới, rồi từ đó làm mọi việc trong cuộc trò chuyện này. Nếu đã đặt lịch, nhờ trợ lý ở công cụ cũ tạm dừng lịch trước, rồi đặt lại ở công cụ mới. Không chạy cùng lúc ở hai công cụ." },
      { question: "Trợ lý báo lỗi mạng hoặc hỏi quyền mỗi lần chạy?", answer: "Khi trợ lý hỏi quyền chạy lệnh scripts/… của workflow, chọn cho phép luôn (không phải chỉ một lần). Lỗi mạng kiểu này không có nghĩa là khóa TinaCRM bị sai." }
    ] },
    { id: "update", title: "Cập nhật workflow", paragraphs: ["Không cần tải lại ZIP. Mở thư mục workflow bằng trợ lý và gửi câu dưới. Tài liệu, chiến dịch, cấu hình và khóa được giữ nguyên. Lần chạy hằng ngày trợ lý tự cập nhật trước khi làm việc."], prompt: "Cập nhật workflow lên bản mới nhất." },
    { id: "usage", title: "Xem mức sử dụng", paragraphs: ["Claude Desktop: bấm tên tài khoản ở góc dưới bên trái → Usage."] }
  ]
};

export type Phase = { id: string; title: string; when: string; from: number; to: number };

/** Groups of cycle steps (1-based, inclusive) so users can tell one-time setup from daily use. */
export const phases: Phase[] = [
  { id: "thiet-lap", title: "Thiết lập lần đầu", when: "Làm một lần cho mỗi doanh nghiệp.", from: 1, to: 6 },
  { id: "chien-dich", title: "Tạo chiến dịch", when: "Làm khi tạo chiến dịch đầu tiên và mỗi khi thêm chiến dịch mới.", from: 7, to: 9 },
  { id: "hang-ngay", title: "Dùng hằng ngày", when: "Thiết lập xong thì chỉ cần phần này. Trợ lý có thể tự chạy theo lịch.", from: 10, to: 11 }
];
export const phaseOf = (step: number) => phases.find((p) => step >= p.from && step <= p.to);

export const guides: Guide[] = [...cycle, help];
export const stepNumber = (slug: string) => cycle.findIndex((g) => g.slug === slug) + 1;
export const guideHref = (slug: string) => `/huong-dan/${slug}`;
