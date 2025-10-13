import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-light dark:bg-neutral py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <Link href="/" className="text-2xl font-bold text-primary">
              Timizia
            </Link>
            <p className="mt-2 text-neutral dark:text-neutral-light">
              Empowering education through projects.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/about"
              className="text-neutral dark:text-neutral-light hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-neutral dark:text-neutral-light hover:text-primary"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-neutral dark:text-neutral-light hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-neutral dark:text-neutral-light hover:text-primary"
            >
              Terms
            </Link>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-neutral dark:text-neutral-light hover:text-primary" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6 text-neutral dark:text-neutral-light hover:text-primary" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-neutral dark:text-neutral-light hover:text-primary" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-neutral dark:text-neutral-light">
          © {new Date().getFullYear()} Timizia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
