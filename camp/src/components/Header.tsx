import logo from "../logo01.png";

export default function Header() {
  return (
    <header className="px-10">
      <a
        className="fixed left-4 top-4 inline-block w-40 lg:top-8 "
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={logo}
          className="w-20 sm:w-24 lg:w-40"
          alt="ハレノヒキャンプのロゴ"
        />
      </a>
    </header>
  );
}
