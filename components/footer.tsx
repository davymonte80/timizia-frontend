import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  return (
    <footer className="py-8 mt-auto text-gray-900 bg-neutral-light dark:bg-black dark:text-gray-100">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
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
            <Link
              href="/profile/logout"
              className="text-neutral dark:text-neutral-light hover:text-primary"
            >
              Profile
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4 md:space-y-0 md:items-end">
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 text-neutral dark:text-neutral-light hover:text-primary" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 text-neutral dark:text-neutral-light hover:text-primary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-neutral dark:text-neutral-light hover:text-primary" />
              </a>
            </div>
            <button
              onClick={() => router.push("/profile/logout")}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-6 text-sm text-center text-neutral dark:text-neutral-light">
          © {new Date().getFullYear()} Timizia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
