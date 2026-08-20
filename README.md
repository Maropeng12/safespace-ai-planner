# safe-SPACE AI

A calm, modern task-management and AI productivity companion built with **TanStack Start**, **React 19**, **TypeScript**, and **Tailwind CSS**. safe-SPACE AI helps you organize tasks, prioritize work, and get gentle, supportive guidance from specialized AI tools — all wrapped in a soothing baby-pink interface.

![safe-SPACE AI](public/og-image.png)

## Features

- **Task Management** – Add, complete, categorize, and delete tasks. Progress tracked with a visual summary.
- **Category Organization** – Sort tasks into Wellness, Work, Home, and Personal categories with filtering.
- **Responsive Dashboard** – Collapsible sidebar with a clean, mobile-friendly layout.
- **Smart Email Generator** – Generate professional or friendly emails from your notes.
- **Meeting Notes Summarizer** – Extract summaries, decisions, action items, and open questions.
- **AI Task Planner** – Break goals into milestones, tasks, and timeframes.
- **AI Research Assistant** – Get balanced, structured overviews of any topic.
- **AI Chatbot** – Have a multi-turn conversation for planning, writing, and thinking things through.
- **Responsible AI Disclaimer** – Transparent information about how AI is used and its limitations.

## Tech Stack

- **Framework:** TanStack Start v1
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS v4, shadcn/ui
- **Routing:** TanStack Router (file-based)
- **AI:** Lovable AI Gateway (Gemini 2.5 Flash)
- **Storage:** LocalStorage (tasks persisted in the browser)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [Bun](https://bun.sh/) (recommended by this template) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd safe-space-ai

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build

```bash
bun run build
# or
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppSidebar.tsx
│   ├── DashboardShell.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   ├── AiToolPanel.tsx
│   ├── Markdown.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── use-tasks.ts
│   └── use-mobile.tsx
├── lib/                 # Server functions and utilities
│   ├── ai.functions.ts
│   ├── utils.ts
│   └── error-capture.ts
├── routes/              # TanStack Router file-based routes
│   ├── __root.tsx
│   ├── index.tsx
│   ├── assistant.tsx
│   ├── chat.tsx
│   ├── email.tsx
│   ├── notes.tsx
│   ├── planner.tsx
│   ├── research.tsx
│   └── responsible-ai.tsx
├── styles.css           # Tailwind v4 theme tokens
└── router.tsx           # Router configuration
```

## AI Tools

All AI features are powered by a secure server function (`src/lib/ai.functions.ts`) that calls the Lovable AI Gateway. Each tool uses a tailored system prompt to keep responses calm, practical, and supportive.

## Responsible AI

safe-SPACE AI is designed as a productivity assistant, not a therapist, medical, legal, or financial adviser. AI-generated responses are for informational and organizational purposes only. Always review important decisions with qualified professionals. See the in-app **Responsible AI** page for full details.

## License

MIT © Tshiamo Makgopya
