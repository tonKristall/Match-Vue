import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

export const gameService = {
  async getImages() {
    const storage = getStorage();
    const listPrefixesRef = ref(storage);
    const { prefixes } = await listAll(listPrefixesRef);
    const listItemsRef = prefixes.map(async ({ fullPath }) => {
      const itemsRef = ref(storage, fullPath);
      const { items } = await listAll(itemsRef);
      const urls = await Promise.all(items.map((itemRef) => getDownloadURL(itemRef)));
      return { category: fullPath, urls };
    });
    return await Promise.all(listItemsRef);
  },
};
