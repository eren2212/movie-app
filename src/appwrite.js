import { Client, Databases, Query, ID } from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const response = database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      Query.equal(searchTerm, searchTerm)
    );

    if ((await response.documents) > 0) {
      const doc = response.documents[0];
      const newCount = newCount + 1;

      database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: newCount,
      });
    }

    database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      searchTerm,
      count: 1,
      poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      movie_id: movie.id,
      title: movie.title,
    });
  } catch (err) {
    console.log(err);
  }
};
