export type GameDeal = {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  thumb: string;
  storeID: string;
  steamAppID?: string;
};

export async function fetchDealsByParams(params: string): Promise<GameDeal[]> {
  const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?${params}`);
  if (!response.ok) throw new Error('Failed to fetch deals');
  return await response.json();
}

export async function fetchStoreLogos(): Promise<Record<string, { logo: string; name: string }>> {
  const res = await fetch('https://www.cheapshark.com/api/1.0/stores');
  const stores = await res.json();
  const result: Record<string, { logo: string; name: string }> = {};
  for (const store of stores) {
    result[store.storeID] = {
      logo: `https://www.cheapshark.com${store.images.logo}`,
      name: store.storeName
    };
  }
  return result;
}
