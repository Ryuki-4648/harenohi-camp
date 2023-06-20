export default function Header() {
  return (
    <header className="px-10">
      <a
        className="fixed left-4 top-4 z-30 inline-block lg:top-8"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="./logo01.png"
          className="w-20 sm:w-24 lg:w-28"
          alt="ハレノヒキャンプのロゴ"
        />
      </a>
    </header>
  );
}
