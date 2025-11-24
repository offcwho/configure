import { Container } from "@/components/ui/container";
import Welcome from "@/components/ui/welcome/welcome-section.ui";
import { Products } from "@/entities/products";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Products />
    </Container>
  );
}
