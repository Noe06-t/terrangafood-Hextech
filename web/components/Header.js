import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="header-logo">
          🍛 Terranga<span>Food</span>
        </Link>
        <h4>Hextech</h4>
        <nav className="header-nav">
          <Link href="/">Restaurants</Link>
        </nav>
      </div>
    </header>
  );
}
