import { Header } from "@/components/Header";
import { Firstview } from "@/components/Firstview";
import { Secondview } from "@/components/Secondview";
import { Thirdview } from "@/components/Thirdview";
import { OrderFlow } from "@/components/OrderFlow";
import { PricingPlans } from "@/components/PricingPlans";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <Firstview />
      <Secondview />
      <Thirdview />
      <OrderFlow />
      <PricingPlans />
      <FAQ />
      <Footer />
    </main>
  );
}
