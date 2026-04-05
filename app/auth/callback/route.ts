import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: true,
        },
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // Ignored in read-only contexts
            }
          },
        },
      },
    );

    let exchangeError = null;
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      exchangeError = error;
    } catch (err) {
      console.error("[callback] exchangeCodeForSession network error:", err);
      exchangeError = err;
    }

    if (!exchangeError) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = next;
      redirectUrl.searchParams.delete("code");
      redirectUrl.searchParams.delete("next");
      return NextResponse.redirect(redirectUrl);
    }
  }

  const errorUrl = request.nextUrl.clone();
  errorUrl.pathname = "/auth";
  errorUrl.searchParams.set("error", "Не удалось войти. Попробуйте ещё раз.");
  return NextResponse.redirect(errorUrl);
}
