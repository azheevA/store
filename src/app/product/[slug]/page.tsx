import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/views/product/ui/product-page";
import { getProductBySlug, products } from "@/entities/product/data/products";
import { absoluteUrl, siteConfig } from "@/shared/config/site";
import { formatPrice } from "@/shared/lib/format-price";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Товар не найден",
      robots: { index: false, follow: false },
    };
  }

  const title = product.name;
  const socialTitle = `${product.name} | Лавка`;
  const rawDescription = `${product.subtitle}. ${product.description} Цена: ${formatPrice(product.price)}.`;
  const description =
    rawDescription.length > 160
      ? `${rawDescription.slice(0, 157).trimEnd()}…`
      : rawDescription;
  const canonical = `/product/${product.slug}`;
  const productUrl = absoluteUrl(canonical);
  const productImage = absoluteUrl(product.image);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: productUrl,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        {
          url: productImage,
          width: 640,
          height: 640,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [productImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (product === undefined) notFound();

  const productUrl = absoluteUrl(`/product/${product.slug}`);
  const organizationId = `${siteConfig.url}/#organization`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image)),
    sku: product.id,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: siteConfig.name },
    mainEntityOfPage: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: siteConfig.currency,
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": organizationId },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: absoluteUrl("/catalog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductPage product={product} />
    </>
  );
}
