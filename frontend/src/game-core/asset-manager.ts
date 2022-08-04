import { assetsDescriptionList } from "config";

import { type AssetData, loadAsset } from "./asset-loader";

export class AssetManager {
  public static instance = new AssetManager();

  private assets: Map<string, AssetData> = new Map();

  public async init(): Promise<void> {
    const assetsLoaders = assetsDescriptionList.map(assetDescription => loadAsset(assetDescription));

    return Promise.all(assetsLoaders).then(loadedAssets => {
      for (const asset of loadedAssets) {
        this.setAsset(asset);
      }
    });
  }

  public getAsset(assetId: string): AssetData {
    const assetData = this.assets.get(assetId);

    if (assetData) {
      return assetData;
    } else {
      // all assets are initialized and loaded during game init
      // there is no external assets which means no chance to get 'undefined'
      // unless incorrect 'assetId' was provided during development
      throw new Error("Asset with next 'assetId' cannot be found: " + assetId);
    }
  }

  private setAsset(asset: AssetData): void {
    this.assets.set(asset.id, asset);
  }
}
