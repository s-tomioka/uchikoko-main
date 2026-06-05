const steps = [
  {
    step: 1,
    title: "写真アップロード",
    description: (
      <>
        お気に入りのペットの写真を
        <br />
        アップロードしてください。
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "サイズを選んで注文",
    description:
      "3つのサイズから選択してください。",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <rect x="4" y="14" width="4" height="4" rx="0.5" />
        <rect x="10" y="8" width="4" height="4" rx="0.5" />
        <rect x="16" y="2" width="4" height="4" rx="0.5" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "職人が焼き上げ",
    description: (
      <>
        写真を基に瀬戸焼の窯元で
        <br />
        一点一点焼き上げます。
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "お届け",
    description: (
      <>
        完成後、丁寧にお届けします。
        <br />
        約6週間でお届けします。
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export function OrderFlow() {
  return (
    <section className="py-16 lg:py-20 bg-[#FFFFFF]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-[200px]">
        <h2 className="font-bold text-2xl md:text-3xl text-text-dark text-center mb-12 lg:mb-16">
          ご注文の流れ
        </h2>
        <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-4">
          {/* ドット線（デスクトップ）- アイコン中央に配置 */}
          <div className="hidden md:block absolute top-12 left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-text-dark/30" />
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center text-center w-full max-w-[260px] flex-1"
            >
              <div className="w-24 h-24 rounded-2xl bg-white border-2 border-text-dark/20 flex items-center justify-center text-orange mb-4 z-10 shrink-0">
                {item.icon}
              </div>
              <span className="font-bold text-sm text-text-dark mb-2">
                STEP {item.step}
              </span>
              <h3 className="font-bold text-lg text-text-dark mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-dark leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
