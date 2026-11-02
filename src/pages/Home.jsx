import { Hero } from "@/components/brand/Hero";
// import { Philosophy } from "@/components/brand/Philosophy";
import { Legacy } from "@/components/brand/Legacy";
// import { Principles } from "@/components/brand/Principles";
import { Homes } from "@/components/brand/Homes";
import { Values } from "@/components/brand/Values";
import { Voices } from "@/components/brand/Voices";
import { ThaneSoon } from "@/components/brand/ThaneSoon";
import { Enquire } from "@/components/brand/Enquire";

export default function Home({ ready }) {
  return (
    <main>
      <Hero ready={ready} />
      {/* <Philosophy /> */}
      <Legacy />
      {/* <Principles /> */}
      <Values />
      <Homes />
      <Voices />
      {/* <ThaneSoon /> */}
      <Enquire />
    </main>
  );
}
