import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/icons/github';

function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex w-full max-w-[85rem] flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} VRTN · Built with Vite + React + Tailwind
        </p>
        <Button variant="ghost" size="icon" asChild aria-label="GitHub">
          <a
            href="https://github.com/0plan/vrtn"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
        </Button>
      </div>
    </footer>
  );
}
export default Footer;
