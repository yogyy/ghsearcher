const Footer = () => {
  return (
    <footer className="w-full bottom-0 absolute z-20 bg-background border-t h-14 flex items-center mt-10">
      <div className="container">
        <span className="text-base text-muted-foreground font-sans">
          code available in
          <a
            className="underline underline-offset-4 hover:text-biru"
            target="_blank"
            href="https://github.com/yogyy/ghsearcher">
            github
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer