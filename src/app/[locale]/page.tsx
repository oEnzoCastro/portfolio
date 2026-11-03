import { Hero } from "./_components/Hero/Hero";
import { Offer } from "./_components/Offer/Offer";
import { SelectedWork } from "./_components/SelectedWork/SelectedWork";

/** Home (HOME-01 to HOME-04). Each section loads its own text. */
export default function Home() {
  return (
    <>
      <Hero />
      <Offer />
      <SelectedWork />
    </>
  );
}
