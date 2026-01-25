const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://asbel.dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            asbel.dev
          </a>
          . The source code is available on{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Iglesia Biblica Bet-el. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
