import logo from "../logo01.png";

export default function Header() {
  return (
    <header className="px-10">
      <a
        className="fixed top-8 inline-block w-40"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} className="w-40" alt="ハレノヒキャンプのロゴ" />
      </a>
    </header>
  );
}
