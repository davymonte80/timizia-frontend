# Timizia Frontend

Timizia is a modern web application for career onboarding, project-based learning, and portfolio building. This repository contains the frontend codebase built with Next.js, React, and TypeScript.

## Features

- User authentication (signup, login, password reset, email verification)
- Onboarding flow for career interests and goals
- Dashboard with personalized project suggestions
- Project modules and mini-projects with file upload
- Light, dark, and system theme support
- Responsive and accessible UI

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Zod](https://zod.dev/) for schema validation
- [React Hook Form](https://react-hook-form.com/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/davymonte80/timizia-frontend.git
   cd timizia-frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://XXXXXXXX/api
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Next.js app directory (pages, routes, and UI flows)
- `components/` — Reusable UI components
- `hooks/` — Custom React hooks (e.g., authentication)
- `lib/` — API clients and utility functions
- `public/` — Static assets
- `styles/` — Global styles (if any)

## API

The frontend communicates with the Timizia backend API. The base URL is set via the `NEXT_PUBLIC_API_URL` environment variable .

## Theming

- Light, dark, and system theme modes are supported.
- Use the theme toggle button (top right) to switch modes.



## License

[MIT](LICENSE)

---

For questions or support, please open an issue or contact the maintainer.
