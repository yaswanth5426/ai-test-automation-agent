import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("gh_token")?.value;

    console.log("Token exists:", !!token);

    if (!token) {
      return NextResponse.json(
        { error: "Github token not found" },
        { status: 401 }
      );
    }

    // Check which user is authenticated
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const user = await userRes.json();

    console.log("GitHub User:", user);

    const allRepos: any[] = [];
    let page = 1;

    while (true) {
      const res = await fetch(
        `https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&per_page=100&page=${page}&sort=updated`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      const repos = await res.json();

      console.log(`Page ${page} Repos Count:`, repos.length);

      if (!Array.isArray(repos) || repos.length === 0) {
        break;
      }

      allRepos.push(...repos);
      page++;
    }

    console.log("Total Repos:", allRepos.length);

    return NextResponse.json(
      allRepos.map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        private_: r.private,
        html_url: r.html_url,
        description: r.description,
        updated_at: r.updated_at,
        language: r.language,
        default_branch: r.default_branch,
        owner: r.owner?.login,
      }))
    );
  } catch (error) {
    console.error("GitHub Repo Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}