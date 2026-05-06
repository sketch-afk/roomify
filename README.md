# Roomify - AI-Powered Architectural Visualizer

Roomify is an AI-first design environment that helps you visualize, render, and ship architectural projects faster than
ever. It converts 2D floor plans into photorealistic 3D top-down architectural renders using AI.

## Features

- 🚀 **AI 3D Rendering**: Convert 2D floor plans into photorealistic 3D visualizations.
- ☁️ **Cloud Storage**: Save and manage your projects securely using Puter's KV storage.
- ⚡ **Real-time Visualization**: Fast processing and high-quality image generation.
- 📦 **Modern Stack**: Built with React Router 7, TailwindCSS, and Puter.js.
- 🔒 **Authentication**: Secure user authentication powered by Puter.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` or `.env.local` file in the root directory and set the following variable:

```bash
VITE_PUTER_WORKER_URL=your_puter_worker_url_here
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Architecture

- **Frontend**: React Router 7 with TailwindCSS.
- **Backend/AI**: Powered by [Puter.js](https://puter.com/) for AI image generation (Gemini models) and serverless
  worker hosting.
- **Storage**: Puter KV storage for project metadata and image hosting.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

This project is designed to be deployed on **Puter**.

1. Build the project: `npm run build`
2. Deploy the `build/client` directory to Puter Hosting.
3. Deploy the `lib/puter.worker.js` as a Puter Worker.

Alternatively, you can use the provided `Dockerfile` for containerized deployment.

---

Built with ❤️ using React Router and Puter.
