import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req) {
    const content = JSON.stringify({
      nome: "Pedro",
      lucky_num: Math.floor(100 * Math.random()),
    });

    return new Response(
      content,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>
    </main>
  );
}
