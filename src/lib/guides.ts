export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  steps?: { title: string; body: string }[];
  note?: { title: string; body: string };
  prompt?: string;
  checks?: string[];
  faqs?: { question: string; answer: string }[];
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
      ], paragraphs: ["Ưu tiên PDF, Word, Excel có chữ. Ảnh scan có thể không đọc được."] }
    ]
  },
  {
    slug: "mo-claude-code", title: "Mở workflow bằng trợ lý AI", shortTitle: "Mở bằng trợ lý AI", actor: "Bạn làm trên máy",
    description: "Mở thư mục workflow bằng trợ lý AI trên máy: Claude (Claude Desktop → tab Code) hoặc ChatGPT (Codex trong ChatGPT desktop app). Hai cách dùng như nhau.",
    sections: [
      { id: "choose", title: "Chọn trợ lý bạn đang dùng", paragraphs: ["Workflow chạy như nhau trên cả hai. Chỉ làm theo các mục của công cụ bạn chọn ở dưới; từ bước 4 trở đi mọi câu lệnh giống nhau. Nên chọn một công cụ và dùng nó cho cả doanh nghiệp này."], steps: [
        { title: "Claude", body: "Cài Claude Desktop, gói Pro, Max, Team hoặc Enterprise. Làm các mục “Claude” bên dưới." },
        { title: "ChatGPT (Codex)", body: "Cài ChatGPT desktop app (Mac hoặc Windows). Mọi gói ChatGPT đều có Codex; gói Plus trở lên dùng được nhiều hơn. Làm các mục “ChatGPT” bên dưới." }
      ] },
      { id: "overview", title: "Claude: vị trí các nút" },
      { id: "folder", title: "Claude: chọn thư mục workflow", paragraphs: ["Tab Code → This computer → Choose… → Open folder… → chọn thư mục workflow (thư mục có tệp AGENTS.md)."] },
      { id: "permissions", title: "Claude: chọn quyền Manual", steps: [
        { title: "Auto", body: "Claude tự quyết định việc nào cần hỏi. Không nên dùng khi mới bắt đầu." },
        { title: "Manual (nên chọn)", body: "Luôn hỏi bạn trước khi sửa tệp hoặc chạy lệnh." },
        { title: "Accept edits", body: "Tự sửa tệp không hỏi; chạy lệnh vẫn hỏi." },
        { title: "Plan", body: "Chỉ lập kế hoạch, chưa làm gì. Dùng khi muốn xem trước trợ lý định làm gì." },
        { title: "Bypass permissions (không dùng)", body: "Claude được sửa hoặc xóa tệp mà không hỏi." }
      ], paragraphs: ["Lần đầu trợ lý chạy lệnh, Claude hỏi quyền: bấm Always allow cho đúng các lệnh python3 scripts/… và sh scripts/… của workflow."] },
      { id: "codex-open", title: "ChatGPT: mở Codex và chọn thư mục", steps: [
        { title: "Mở Codex", body: "Mở ChatGPT desktop app, chọn Codex ở menu ChatGPT phía trên, rồi bấm New chat." },
        { title: "Chạy trên máy này", body: "Ở ô nhập, mục Work in chọn This computer (Local). Không chọn Cloud, không bật Worktree: khóa TinaCRM, hồ sơ trình duyệt và chiến dịch chỉ nằm trong thư mục gốc trên máy này." },
        { title: "Chọn thư mục", body: "Chọn thư mục workflow (thư mục có tệp AGENTS.md). Codex tự đọc tệp này." }
      ] },
      { id: "codex-trust", title: "ChatGPT: tin cậy thư mục", paragraphs: ["Lần đầu mở thư mục, Codex hỏi bạn có tin cậy thư mục này không: chọn tin cậy (Trust). Nhờ vậy Codex nạp quy tắc có sẵn của workflow (cho phép đúng các lệnh ghi TinaCRM, bật hộp thoại nhập khóa, cập nhật workflow chạy mà không hỏi lại) và cấu hình trình duyệt CloakBrowser ở bước 6. Không tin cậy thì lịch chạy tự động sẽ bị chặn."] },
      { id: "codex-permissions", title: "ChatGPT: chọn quyền", steps: [
        { title: "Ask for approval (nên chọn khi mới dùng)", body: "Codex làm trong thư mục workflow, hỏi bạn trước khi làm việc ra ngoài phạm vi đó." },
        { title: "Approve for me", body: "Giống trên, nhưng để ChatGPT tự xét các yêu cầu đó. Dùng được khi đã quen." },
        { title: "Full access (không dùng)", body: "Codex được làm mọi việc trên máy mà không hỏi. Workflow không cần quyền này." }
      ], paragraphs: ["Nút chọn quyền nằm ngay dưới ô nhập. Nếu Codex hỏi quyền cho một lệnh scripts/… của workflow, chọn cho phép luôn với lệnh đó (không phải chỉ một lần), để lần chạy theo lịch không bị dừng.", "Đã từng dùng Claude Code? Codex có mục Settings → Import from Claude Code. Không bắt buộc: workflow đã có sẵn mọi thứ Codex cần."] },
      { id: "done", title: "Đã mở đúng", paragraphs: ["Claude: thanh dưới ô nhập hiện This computer, tên thư mục workflow và Manual, như ảnh ở mục Claude.", "ChatGPT: cuộc trò chuyện Codex chạy trên máy này, đúng thư mục workflow, đã tin cậy thư mục, quyền Ask for approval hoặc Approve for me."] }
    ]
  },
  {
    slug: "doc-tai-lieu", title: "Trợ lý đọc tài liệu", shortTitle: "Trợ lý đọc tài liệu", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý tóm tắt doanh nghiệp từ inputs và hỏi phần còn thiếu. Bạn xác nhận và chọn sản phẩm ưu tiên.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Đọc AGENTS.md và tài liệu trong inputs. Báo tệp nào không đọc được, tóm tắt doanh nghiệp và hỏi tôi phần còn thiếu." }
    ]
  },
  {
    slug: "kiem-tra-moi-truong", title: "Trợ lý kiểm tra môi trường", shortTitle: "Trợ lý kiểm tra môi trường", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý kiểm tra máy và cài phần còn thiếu, gồm trình duyệt CloakBrowser.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Kiểm tra môi trường cho workflow này, báo phần còn thiếu và cài CloakBrowser theo workflows/CLOAKBROWSER.md." }
    ]
  },
  {
    slug: "ket-noi-mcp", title: "Trợ lý kết nối công cụ", shortTitle: "Trợ lý kết nối công cụ", actor: "Bạn yêu cầu trợ lý",
    description: "Kết nối CloakBrowser (trình duyệt), TinaCRM (bằng API key) và các dịch vụ sẽ dùng như Gmail, Google Calendar, Apollo.",
    sections: [
      { id: "browser", title: "CloakBrowser", paragraphs: ["Trợ lý tự thêm cấu hình trình duyệt cho đúng công cụ bạn dùng (Claude: tệp .mcp.json; ChatGPT: tệp .codex/config.toml), rồi nhờ bạn mở phiên mới cùng thư mục và gửi “Tiếp tục từ lần trước”.", "Claude: phiên mới hỏi có dùng máy chủ trong .mcp.json không, bấm cho phép. ChatGPT: cần đã tin cậy thư mục ở bước 3; nếu vẫn chưa thấy trình duyệt, trợ lý hướng dẫn thêm ở Settings → MCP servers."], prompt: "Kết nối CloakBrowser và mở thử một trang web công khai." },
      { id: "apikey-open", title: "TinaCRM: tạo API key", paragraphs: ["Đăng nhập TinaCRM của doanh nghiệp → Settings → MCP & APIs → tab API → Create API key."] },
      { id: "apikey-form", title: "Điền thông tin khóa", paragraphs: ["Role quyết định trợ lý được làm gì trong CRM: chọn role đủ quyền với khách hàng, công ty và công việc. Nên đặt ngày hết hạn thay vì Never."] },
      { id: "apikey-copy", title: "Sao chép khóa", paragraphs: ["Khóa chỉ hiện một lần. Bấm Copy rồi gửi câu lệnh dưới đây. Không dán khóa vào khung chat."], prompt: "Kết nối TinaCRM bằng API key. Hỏi tôi địa chỉ TinaCRM, bật hộp thoại để tôi dán API key, sau đó đọc thử dữ liệu khách hàng, chưa ghi gì." },
      { id: "apikey-paste", title: "Dán khóa vào hộp thoại", paragraphs: ["Trợ lý bật hộp thoại Kết nối TinaCRM: dán khóa vào ô, bấm Lưu. Không thấy hộp thoại thì tìm trên thanh Dock (Mac) hoặc thanh tác vụ (Windows), hoặc phía sau cửa sổ Claude/ChatGPT."] },
      { id: "mcp-check", title: "Kiểm tra kết nối", paragraphs: ["Trợ lý kiểm tra khóa và đọc thử vài khách hàng, công ty để bạn xác nhận đúng CRM của doanh nghiệp. Không cần mở phiên mới."] },
      { id: "connectors", title: "Dịch vụ khác", paragraphs: ["Trợ lý đề xuất dịch vụ doanh nghiệp sẽ cần: Gmail hoặc Outlook để gửi email, Google Calendar để đặt lịch hẹn, Apollo để tìm khách. Trợ lý đọc thử để kiểm tra, chưa gửi gì."], steps: [
        { title: "Claude", body: "Claude hiện thẻ như ảnh trong khung chat: bấm Connect, đăng nhập nếu được hỏi là xong." },
        { title: "ChatGPT (Codex)", body: "Mở tab Plugins ở thanh bên trái ChatGPT desktop app → tìm tên dịch vụ → bấm cài/kết nối → đăng nhập và cho phép. Xong thì mở cuộc trò chuyện Codex mới cùng thư mục và gửi “Tiếp tục từ lần trước”." }
      ], prompt: "Đề xuất các dịch vụ cần kết nối cho doanh nghiệp này và hướng dẫn tôi kết nối từng cái." },
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
    description: "Bắt đầu bằng danh sách nhỏ. Nếu nguồn cần đăng nhập, bạn tự đăng nhập trong cửa sổ CloakBrowser.",
    sections: [
      { id: "source", title: "Chọn nguồn", paragraphs: ["Trợ lý đề xuất 2–3 nguồn hợp với nhóm khách của chiến dịch (ví dụ Google Maps, danh bạ doanh nghiệp, LinkedIn) kèm lý do. Bạn chọn số."], prompt: "Đề xuất nguồn tìm khách phù hợp nhất cho chiến dịch này." },
      { id: "find", title: "Tìm danh sách", prompt: "Tìm 10 khách theo ICP của chiến dịch, kèm lý do phù hợp và nguồn." },
      { id: "save", title: "Lưu TinaCRM", prompt: "Kiểm tra trùng (cả với chiến dịch khác) và lưu danh sách đã duyệt vào TinaCRM. Báo số tạo mới, cập nhật, bỏ qua và lỗi." }
    ]
  },
  {
    slug: "email", title: "Email chăm sóc", shortTitle: "Email chăm sóc", actor: "Bạn yêu cầu trợ lý",
    description: "Kết nối hộp thư (cần quyền gửi và đọc), duyệt chuỗi email trước khi gửi thật.",
    sections: [
      { id: "mailbox", title: "Kết nối hộp thư", prompt: "Kết nối hộp thư để gửi email và đọc phản hồi của khách." },
      { id: "sequence", title: "Chuỗi email", prompt: "Đề xuất chuỗi email chăm sóc: số email, khoảng cách gửi và email mẫu. Chưa gửi thật khi tôi chưa duyệt." },
      { id: "replies", title: "Xử lý phản hồi" }
    ]
  },
  {
    slug: "hang-ngay", title: "Chạy hằng ngày", shortTitle: "Chạy hằng ngày", actor: "Bạn yêu cầu trợ lý",
    description: "Sau lần thiết lập đầu, mỗi ngày chỉ cần bước này.",
    sections: [
      { id: "routine", title: "Câu lệnh", prompt: "Tiếp tục chiến dịch <tên chiến dịch>: kiểm tra phản hồi mới, tìm khách theo mục tiêu ngày và gửi email đến hạn." },
      { id: "parallel", title: "Chạy song song", steps: [
        { title: "Mở phiên mới", body: "Claude: bấm + New. ChatGPT: bấm New chat trong Codex, chạy trên máy này. Mỗi phiên làm một chiến dịch hoặc một doanh nghiệp." },
        { title: "Chọn thư mục", body: "Cùng doanh nghiệp: chọn cùng thư mục. Doanh nghiệp khác: chọn thư mục của doanh nghiệp đó." },
        { title: "Gửi câu lệnh", body: "Gửi câu lệnh trên với tên chiến dịch của phiên đó." }
      ], note: { title: "Lưu ý", body: "Không đăng nhập cùng một tài khoản mạng xã hội ở hai chiến dịch chạy cùng lúc. Mỗi phiên tốn lượt dùng riêng của tài khoản Claude hoặc ChatGPT." } },
      { id: "schedule", title: "Chạy tự động theo lịch", paragraphs: ["Sau khi chạy tay ổn, nhờ trợ lý đặt lịch. Trợ lý hỏi giờ chạy và có cần bạn duyệt email trước khi gửi, rồi tự tạo lịch. Bạn không cần mở trang Scheduled. Mỗi lần chạy hiện ở mục Scheduled ở thanh bên trái.", "Lịch chỉ chạy khi máy bật, không ngủ và ứng dụng đang mở. Đổi giờ hoặc tạm dừng: nhắn trợ lý.", "Chỉ đặt lịch ở một công cụ: đã đặt ở Claude thì không đặt thêm ở ChatGPT và ngược lại, tránh gửi email hai lần."], steps: [
        { title: "Claude", body: "Lần đầu lịch chạy, nếu Claude hỏi quyền thì mở phiên đó trong Scheduled và bấm Always allow cho việc đúng như mô tả. Claude Desktop phải đang mở." },
        { title: "ChatGPT (Codex)", body: "Trước khi đặt lịch, trợ lý nhờ bạn chạy tay “Tiếp tục chiến dịch <tên>” một lần để chắc không còn câu hỏi quyền nào (thư mục đã tin cậy ở bước 3). Lịch chạy trong thư mục workflow trên máy, không dùng worktree. ChatGPT desktop app phải đang mở." }
      ], prompt: "Đặt lịch chạy tự động hằng ngày cho chiến dịch <tên chiến dịch>." },
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
      { question: "Làm tiếp ở phiên sau?", answer: "Mở lại thư mục workflow (Claude: tab Code; ChatGPT: Codex, chạy trên máy này) và gửi “Tiếp tục chiến dịch <tên>” hoặc “Tiếp tục từ lần trước”." },
      { question: "Trợ lý báo đã lưu nhưng TinaCRM không có?", answer: "Yêu cầu trợ lý kiểm tra lại bằng công cụ và báo ID bản ghi." },
      { question: "CloakBrowser không mở?", answer: "Làm lại bước 6." },
      { question: "Lịch chạy không hoạt động?", answer: "Lịch chỉ chạy khi máy bật, không ngủ và ứng dụng đặt lịch (Claude Desktop hoặc ChatGPT desktop app) đang mở. Máy ngủ qua giờ chạy thì lần chạy bị bỏ lỡ được chạy bù khi mở lại. Mở mục Scheduled ở thanh bên trái xem lần chạy gần nhất: nếu đang chờ hỏi quyền, mở ra và cho phép luôn đúng việc như mô tả. Trên ChatGPT, kiểm tra thư mục workflow đã được tin cậy (bước 3)." },
      { question: "Đổi giờ, tạm dừng hoặc xem lịch?", answer: "Nhắn trợ lý, ví dụ “Xem các lịch đang chạy”, “Tạm dừng lịch chiến dịch <tên>”, “Đổi giờ chạy chiến dịch <tên> sang 9:00”." },
      { question: "Dùng cho doanh nghiệp khác?", answer: "Tải một bản workflow riêng và làm lại từ bước 1. Chạy song song: xem bước 10." },
      { question: "Khách xuất hiện ở hai chiến dịch?", answer: "Trợ lý giữ khách ở chiến dịch đầu tiên và báo “đã thuộc chiến dịch X”." },
      { question: "Nên dùng Claude hay ChatGPT?", answer: "Workflow chạy như nhau trên cả hai, câu lệnh giống nhau. Chọn công cụ doanh nghiệp đã có tài khoản. Claude cần gói Pro trở lên; ChatGPT gói nào cũng có Codex, gói Plus trở lên dùng được nhiều hơn." },
      { question: "Đổi từ Claude sang ChatGPT (hoặc ngược lại)?", answer: "Mở cùng thư mục workflow bằng công cụ mới theo bước 3, rồi nhắn “Tôi chuyển sang dùng công cụ này, tiếp tục từ lần trước”. Tài liệu, chiến dịch, khóa TinaCRM vẫn giữ nguyên; trợ lý kết nối lại trình duyệt và các dịch vụ (Gmail…) cho công cụ mới. Nếu đã đặt lịch, nhờ trợ lý ở công cụ cũ tạm dừng lịch trước, rồi đặt lại ở công cụ mới. Không chạy cùng lúc ở hai công cụ." },
      { question: "ChatGPT báo lỗi mạng hoặc hỏi quyền mỗi lần chạy?", answer: "Thường do thư mục chưa được tin cậy. Mở cuộc trò chuyện Codex mới cùng thư mục, chọn tin cậy khi được hỏi, và chọn cho phép luôn khi Codex hỏi quyền chạy lệnh scripts/… của workflow. Lỗi mạng kiểu này không có nghĩa là khóa TinaCRM bị sai." }
    ] },
    { id: "update", title: "Cập nhật workflow", paragraphs: ["Không cần tải lại ZIP. Mở thư mục workflow bằng trợ lý và gửi câu dưới. Tài liệu, chiến dịch, cấu hình và khóa được giữ nguyên. Lần chạy hằng ngày trợ lý tự cập nhật trước khi làm việc."], prompt: "Cập nhật workflow lên bản mới nhất." },
    { id: "usage", title: "Xem mức sử dụng", paragraphs: ["Claude: bấm tên tài khoản ở góc dưới bên trái → Usage.", "ChatGPT (Codex): mở chatgpt.com/codex/settings/usage để xem hạn mức còn lại và lúc được làm mới."] }
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
