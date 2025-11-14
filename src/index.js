import { DurableObject } from "cloudflare:workers";

export class RecipeMemory extends DurableObject {
  constructor(state, env) {
    super(state, env);
    this.state = state;
    this.env = env;
  }

  async getHistory() {
    return (await this.state.storage.get("history")) || [];
  }

  async addIngredients(items) {
    let history = await this.getHistory();
    history.push(items.join(", "));
    if (history.length > 3) history = history.slice(-3);
    await this.state.storage.put("history", history);
    return history;
  }

  async fetch(req) {
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname === "/add") {
    const { items } = await req.json();
    const history = await this.addIngredients(items);
    return Response.json(history);
  }

  if (url.pathname === "/history") {
    return Response.json({ history: await this.getHistory() });
  }

  return new Response("OK");
}

}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    //handle API POST for recipe suggestions
    if (request.method === "POST" && url.pathname === "/api") {
      const { items } = await request.json();
      const id = env.SESSION.idFromName("global");
      const obj = env.SESSION.get(id);
      //use fetch() to call the Durable Object
      const response = await obj.fetch("https://dummy/add", {
        method: "POST",
        body: JSON.stringify({ items }),
      });
      const history = await response.json();


      const prompt = `You are Recipeasy, a friendly student chef assistant.
      Suggest 3 quick, healthy, budget-friendly dishes using only: ${items.join(", ")}.
      Each recipe should be under 2 sentences.`;

      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [{ role: "user", content: prompt }],
      });

      return Response.json({ reply: aiResponse.response, history });
    }

    return env.ASSETS.fetch(request);
  },
};

