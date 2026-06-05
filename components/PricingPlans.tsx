import Link from "next/link";

const plans = [
  {
    name: "12cm",
    price: "38,500",
    badge: null,
  },
  {
    name: "16cm",
    price: "66,000",
    badge: null,
  },
  {
    name: "40cm",
    price: "82,500",
    badge: null,
  },
];

export function PricingPlans() {
  return (
    <section className="py-16 lg:py-20 bg-[#FFFFFF]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-[200px]">
        <h2 className="font-bold text-2xl md:text-3xl text-text-dark text-center mb-12 lg:mb-16">
          販売サイズ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl border-2 border-text-dark/20 bg-white p-6 flex flex-col"
            >
              {plan.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gray-200 text-sm font-bold text-text-dark">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-bold text-xl text-text-dark mb-4">
                {plan.name}
              </h3>
              <div className="mb-8">
                <span className="font-bold text-2xl text-text-dark">
                  ¥{plan.price}
                </span>
                <span className="text-sm text-text-dark ml-1">(税込)</span>
              </div>
              <Link
                href="#order"
                className="block w-full py-3 rounded-full border-2 border-text-dark text-center font-bold text-text-dark hover:bg-text-dark hover:text-white transition-colors"
              >
                このサイズで注文する
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
