# Roomify - AI-Powered Architectural Visualizer

Roomify is an AI-first design environment that helps you visualize, render, and ship architectural projects faster than
ever. It converts 2D floor plans into photorealistic 3D top-down architectural renders using Gemini-powered AI models.

## 🌟 Key Features

- 🤖 **AI-Driven 3D Rendering**: Leverages Gemini 2.0 Flash to transform 2D sketches and floor plans into realistic 3D
  visualizations.
- 📁 **Cloud-Native Storage**: Seamlessly save and manage your architectural projects using Puter's high-performance KV
  storage.
- 🔄 **Side-by-Side Comparison**: Built-in visualizer with a slider to compare original floor plans against the generated
  3D renders.
- 🔐 **Secure Authentication**: Built-in authentication powered by Puter, ensuring your designs remain private and
  accessible only to you.
- ⚡ **Serverless Workers**: Logic and API handling are offloaded to Puter Workers for low-latency processing and
  scalability.
- 🎨 **Modern UI/UX**: Crafted with React Router 7 and TailwindCSS for a responsive, desktop-first design experience.

## 🛠️ Tech Stack

- **Frontend**: [React Router 7](https://reactrouter.com/) (Framework), [TailwindCSS](https://tailwindcss.com/) (
  Styling), [Lucide React](https://lucide.dev/) (Icons).
- **AI Engine**: [Puter.js](https://puter.com/) integration with Google Gemini models for image-to-image generation.
- **Backend**: [Puter Workers](https://puter.com/docs/workers) for handling project metadata, persistence, and API
  routing.
- **Storage**: Puter KV for data and Puter Hosting for static assets/images.
- **Visuals**: `react-compare-slider` for the interactive before/after visualization.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A [Puter](https://puter.com/) account for deployment and API access.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/roomify.git
   cd roomify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` or `.env.local` file in the root directory:

```env
# The URL of your deployed Puter Worker (obtained after deploying lib/puter.worker.js)
VITE_PUTER_WORKER_URL=https://your-worker-name.puter.site
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 🏗️ Architecture & Workflow

1. **Upload**: User uploads a 2D floor plan (PNG/JPG).
2. **Processing**: The image is converted to a Data URL and sent to the Gemini-2.0-Flash model via Puter's AI API.
3. **Prompting**: A specialized architectural prompt (`ROOMIFY_RENDER_PROMPT`) ensures the AI removes text labels,
   maintains geometry, and applies realistic textures.
4. **Storage**: The original and rendered images are hosted on Puter, and project metadata is saved in Puter's KV store
   via a dedicated Puter Worker.
5. **Visualization**: Users can view their history and interactively compare the render with the source plan.

## 📦 Project Structure

```text
├── app/                  # React Router 7 application source
│   ├── routes/           # Page routes (Home, Visualizer, etc.)
├── components/           # Reusable UI components (Navbar, Upload, Button)
├── lib/                  # Core logic
│   ├── ai.action.ts      # Gemini AI integration logic
│   ├── puter.action.ts   # Client-side Puter SDK wrappers
│   ├── puter.worker.js   # Serverless backend logic (to be deployed as Puter Worker)
│   └── constants.ts      # AI prompts and configuration
├── public/               # Static assets
└── tailwind.config.ts    # Styling configuration
```

## 🚢 Deployment

### 1. Deploy the Worker

- Go to [Puter.com](https://puter.com/).
- Create a new Worker and paste the content of `lib/puter.worker.js`.
- Copy the Worker's URL and update your `VITE_PUTER_WORKER_URL`.

### 2. Build the Frontend

```bash
npm run build
```

### 3. Deploy to Puter Hosting

- Upload the contents of the `build/client` directory to Puter Hosting.
- Ensure your environment variables are correctly configured in the Puter dashboard if applicable.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by the Roomify Team using [React Router](https://reactrouter.com/) and [Puter](https://puter.com/).
