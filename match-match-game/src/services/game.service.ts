import { child, get, getDatabase, push, ref, ref as refDatabase, update } from 'firebase/database';
import { getStorage, ref as refStorage, listAll, getDownloadURL } from 'firebase/storage';

export const gameService = {
  async getImages() {
    const storage = getStorage();
    const listPrefixesRef = refStorage(storage);
    const { prefixes } = await listAll(listPrefixesRef);
    const listItemsRef = prefixes.map(async ({ fullPath }) => {
      const itemsRef = refStorage(storage, fullPath);
      const { items } = await listAll(itemsRef);
      const urls = await Promise.all(items.map((itemRef) => getDownloadURL(itemRef)));
      return { category: fullPath, urls };
    });
    return await Promise.all(listItemsRef);
  },

  async saveScore(userId: string, score: number) {
    const database = getDatabase();
    // await push(refDatabase(database, '/score'), {
    //   [userId]: score,
    // });
    // const postData = {
    //   author: username,
    //   uid: uid,
    //   body: body,
    //   title: title,
    //   starCount: 0,
    //   authorPic: picture
    // };

    // // Get a key for a new Post.
    // const newPostKey = push(child(ref(db), 'posts')).key;

    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // const updates = {};
    // updates['/posts/' + newPostKey] = postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    await update(ref(database), { ['score/' + userId]: score });
  },

  async getScoreByUserId(userId: string) {
    const database = getDatabase();
    return await get(child(ref(database), `score/${userId}`));
  },
};
