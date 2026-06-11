/** 郵便番号（7桁）から都道府県・市区町村を取得（zipcloud 公開API） */
export type JPostalLookupResult = {
  prefecture: string;
  cityTown: string;
};

export async function lookupJapanesePostalCode(
  zipRaw: string,
): Promise<JPostalLookupResult | null> {
  const zip = zipRaw.replace(/\D/g, "");
  if (zip.length !== 7) return null;
  try {
    const res = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      status: number;
      message?: string;
      results?: { address1: string; address2: string; address3: string }[];
    };
    if (data.status !== 200 || !data.results?.[0]) return null;
    const r = data.results[0];
    return {
      prefecture: r.address1,
      cityTown: `${r.address2}${r.address3}`,
    };
  } catch {
    return null;
  }
}
