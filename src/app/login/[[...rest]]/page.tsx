import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { SignIn } from "@clerk/nextjs";

type LoginPageProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { reason } = await searchParams;
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (clerkEnabled) {
    return (
      <>
        <main className="mx-auto max-w-content px-lg py-section">
          <BackLink />
          {reason === "admin-only" ? (
            <p className="mb-lg text-body-sm text-error" role="alert">
              Only the administrator can sign in.
            </p>
          ) : null}
          {reason === "signup-disabled" ? (
            <p className="mb-lg text-body-sm text-error" role="alert">
              Sign-up is disabled. Sign in with the administrator Google account.
            </p>
          ) : null}
          <p className="mb-lg text-body-sm text-mute">
            Administrator sign-in only. Use the Google account configured in
            ADMIN_EMAIL.
          </p>
          <SignIn
            fallbackRedirectUrl="/admin"
            forceRedirectUrl="/admin"
            appearance={{
              elements: {
                footerAction: { display: "none" },
              },
            }}
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="mx-auto flex max-w-content flex-col px-lg py-section">
        <BackLink />
        <h1 className="font-display text-heading-xl text-ink">Login</h1>
        <p className="mt-lg text-body-md leading-relaxed text-mute">
          ログインは現在利用できません。
        </p>

        <form className="mt-xl flex flex-col gap-md" aria-label="ログインフォーム">
          <label className="flex flex-col gap-xs text-left">
            <span className="text-body-sm-strong text-ink">Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="rounded-md border border-hairline bg-canvas px-lg py-md text-body-md text-ink outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-xs text-left">
            <span className="text-body-sm-strong text-ink">Password</span>
            <input
              type="password"
              name="password"
              className="rounded-md border border-hairline bg-canvas px-lg py-md text-body-md text-ink outline-none focus:border-ink"
            />
          </label>
          <button
            type="button"
            className="mt-md rounded-md border border-ink bg-ink px-lg py-md text-button-md text-on-dark transition-opacity hover:opacity-90"
          >
            Login
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
