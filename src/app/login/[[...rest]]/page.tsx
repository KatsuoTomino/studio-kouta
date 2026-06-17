import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (clerkEnabled) {
    return (
      <>
        <main className="mx-auto max-w-content px-lg py-section">
          <BackLink />
          <p className="mb-lg text-body-sm text-mute">
            初めての方は「Sign up」から Google で登録してください。
          </p>
          <SignIn
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/admin"
            forceRedirectUrl="/admin"
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
          ログイン機能はテスト版では未実装です。
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
