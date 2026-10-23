import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

const navItems = [
  { label: "Servicios", href: "/servicios" },
  { label: "Tecnología", href: "/tecnologia" },
  { label: "Showcase 3D", href: "/showcase" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Icon name="cube" size={25} />
          </span>
          <span className="brand-copy">
            <strong>VECTOR</strong>
            <span>SCAN / BIM</span>
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className={menuOpen ? "nav is-open" : "nav"}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 text-sm font-semibold text-[#aab3bd] hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="/contacto">
            <Button variant="primary" className="quote-button">
              Cotizar proyecto
              <Icon name="arrow" size={17} />
            </Button>
          </a>
          <Button
            variant="menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={22} />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>
      </div>
    </header>
  );
}