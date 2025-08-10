import ThemeToggler from './theme-toggler';

export default function Header() {
  return (
    <header className="dark:shadow-input/30 sticky top-0 z-50 w-full shadow">
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-5 px-5">
        <div>Terrapedia</div>
        <ThemeToggler />
      </div>
    </header>
  );
}
