export function Footer() {
  return (
    <footer className="border-t border-hairline-soft bg-surface-card px-lg py-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-md text-center">
        <p className="font-display text-heading-md text-ink">Studio Kouta</p>
        <div className="flex gap-lg">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm-strong text-mute transition-colors hover:text-accent-coral"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@studio-kouta.example"
            className="text-body-sm-strong text-mute transition-colors hover:text-accent-mint"
          >
            Contact
          </a>
        </div>
        <p className="text-caption-sm text-ash">
          © {new Date().getFullYear()} Studio Kouta
        </p>
      </div>
    </footer>
  );
}
