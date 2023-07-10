import { db } from "@vercel/postgres";

export default async function fetchData(queryString: string) {
  /* console.log({
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
  }); */
  const client = await db.connect();
  const response = await client.query(queryString);
  client.release();
  return response;
}