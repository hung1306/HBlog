"use client";
import styles from "./Header.module.css";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.group}>
          <Link href="/" className={styles.logo}>
            Hblog
          </Link>

          {/* Hamburger icon thuần CSS */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Menu */}
          <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>
              Blogs
            </Link>
            <Link href="/memories" onClick={() => setMenuOpen(false)}>
              Memories
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
