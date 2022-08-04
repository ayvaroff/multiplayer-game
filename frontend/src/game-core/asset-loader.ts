import type { Asset } from "config";

export interface AssetData {
  id: string;
  asset: HTMLImageElement;
}

export const loadAsset = async (asset: Asset): Promise<AssetData> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () =>
      resolve({
        id: asset.id,
        asset: image,
      }),
    );
    image.addEventListener("error", () => reject("Could not load asset: " + asset.url));
    image.src = location.origin + asset.url;
  });
};
