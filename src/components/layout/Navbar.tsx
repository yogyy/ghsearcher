import { ModeToggle } from '../mode-toggle';

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 z-20 bg-background border-b h-14 flex items-center">
      <div className="flex items-end w-full container justify-between space-x-2">
        <span className="text-2xl md:text-4xl cursor-default italic logo">
          GH<span className="text-foreground">\</span>
          Searcher
        </span>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
