import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Platforms } from "@/components/Platforms";
import { Studio } from "@/components/Studio";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Opt this route into static rendering for the current locale.
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Studio />
        <Platforms />
        <Stats />
        <Work />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
