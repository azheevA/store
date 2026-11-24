import Link from "next/link";
import { Container } from "@/shared/ui/container";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="eyebrow">404 · Страница не найдена</p>
      <h1 className="mt-4 font-serif text-6xl text-[#28362c]">Потерялись?</h1>
      <p className="mt-4 text-sm text-[#85867e]">
        Кажется, такой страницы в нашей Лавке нет.
      </p>
      <Link href="/" className="button-primary mt-8 inline-flex">
        На главную
      </Link>
    </Container>
  );
}
