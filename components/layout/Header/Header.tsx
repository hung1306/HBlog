"use client";
import styles from "./Header.module.css";
import Link from "next/link";
import { Group, Container } from "@mantine/core";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        <Group className={styles.group}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            Hblog
          </Link>

          {/* Hamburger icon cho mobile */}
          <div
            className={styles.hamburger}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <IconMenu2 size={20} stroke={2} color="#1976d2" />
          </div>

          {/* Menu */}
          <Group className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
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
          </Group>
        </Group>
      </Container>
    </header>
  );
}
