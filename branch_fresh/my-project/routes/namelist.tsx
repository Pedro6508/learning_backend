import { Handlers, PageProps } from "$fresh/server.ts";

interface Profile {
  user: string;
  avatar_url: string;
}

export const handler: Handlers<Profile | null> = {
  async GET(_req, ctx) {
    const url = new URL(_req.url);
    const user_to_fetch = url.searchParams.get("u") || "Pedro6508";

    const result = await fetch(`https://api.github.com/users/${user_to_fetch}`);

    if (result.status == 404) {
      return ctx.render(null);
    } else {
      const content = await result.json();
      const [user, avatar_url] = [content.login, content.avatar_url];

      const profile: Profile = {
        user: user,
        avatar_url: avatar_url,
      };
      return ctx.render(profile);
    }
  },
};

const user_list: Array<Profile> = [];

export default function Page({ data }: PageProps<Profile>) {
  if (data == null) {
    return <h1>PageProps.data = null</h1>;
  }

  const { user, avatar_url } = data;
  user_list.push({
    user: user,
    avatar_url: avatar_url,
  });

  console.log("Array: ", user_list);
  console.log("Last: ", data);

  return (
    <div>
      <form>
        <input type="text" name="u" value={user} />
        <button type="submit">Pesquisar</button>
      </form>
      <ul>
        {user_list.map((profile) => (
          <li>
            <h1>{profile.user}</h1>
            <img src={profile.avatar_url} />
          </li>
        ))}
      </ul>
    </div>
  );
}
