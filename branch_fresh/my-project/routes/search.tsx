import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  query: string;
  length: number;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const url_len = url.searchParams.get("l");

    let length: number;

    if (url_len != null) {
      length = Number(url_len);
    } else {
      length = NAMES[0].length;

      for (const el of NAMES) {
        if (length < el.length) {
          length = el.length;
        }
      }

      length += 1;
    }

    const results = NAMES.filter((
      name,
    ) => (name.includes(query) && (name.length < length)));
    console.log({ query, results });

    return ctx.render({ results, query, length });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query, length } = data;
  return (
    <div>
      <form>
        <input type="text" name="q" value={query} />
        <input type="number" name="l" value={length} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}
