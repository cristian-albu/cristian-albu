import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export const getCloudinaryImages = async (folder: string) => {
  try {
    const multiImages: Array<string> = await cloudinary.search
      .expression(`folder:${folder}`)
      .max_results(40)
      .execute()
      .then((result: any) =>
        result.resources.map(
          (asset: { [key: string]: any; url: string }) => asset.url
        )
      );

    return multiImages;
  } catch (error) {
    console.log(error);

    return [""];
  }
};
