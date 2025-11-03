import Navigation from "@/components/Navigation";
import ResearchSection from "@/components/ResearchSection";
import Footer from "@/components/Footer";

export default function Research() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <ResearchSection />
      </main>
      <Footer />
    </div>
  );
}