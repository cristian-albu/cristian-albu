import Head from "next/head";
export default function DynHead({ title, description, image }: SEO) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description ? `description` : ``} />
        <meta
          property="og:description"
          content={description ? `description` : ``}
        />
        <meta
          property="og:image"
          content={image ? image : "/assets/hero_img_1.jpg"}
        />
      </Head>
    </>
  );
}
interface SEO {
  title: string;
  description?: string;
  image?: string;
}
