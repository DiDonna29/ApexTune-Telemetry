# ApexTune Telemetry | Racing Setup Manager

ApexTune Telemetry is a professional-grade, high-performance web application designed for sim-racing enthusiasts and teams to manage, optimize, and export vehicle telemetry configurations. Inspired by modern racing simulators like Assetto Corsa and iRacing, it provides a technical, precision-oriented interface for calibrating every aspect of a racing machine.

## 🚀 Purpose & Vision

The primary goal of ApexTune is to bridge the gap between complex telemetry data and actionable setup changes. It provides a centralized repository for "setups" (configurations) that can be easily edited, saved locally, and exported for use in external simulators.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS with a custom "Industrial Brutalist" theme.
- **Components:** ShadCN UI (Radix UI primitives).
- **Icons:** Lucide React.
- **Validation:** Zod + React Hook Form.
- **Persistence:** Browser LocalStorage (Production-ready local state).
- **Internationalization:** Multi-language support (EN/ES).

## 🏗 Logical Architecture

1.  **Component-Driven UI:** The app is divided into atomic, reusable components (SetupCard, SetupForm, Navigation) ensuring maintainability.
2.  **Controlled State Management:** Telemetry values are managed using a centralized React state, ensuring that sliders, inputs, and previews are always synchronized.
3.  **Data Containment Logic:** Every UI element is built with strict overflow management (`overflow-hidden`, `truncate`, `min-w-0`) to ensure data integrity across all screen sizes.
4.  **Local Sync Engine:** Setup data is automatically synchronized with LocalStorage, allowing for persistent usage without a backend during initial phases.

## 📦 Installation & Development

This project is compatible with all major package managers.

### 1. Clone the repository
```bash
git clone <repository-url>
cd apextune-telemetry
```

### 2. Install dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Run development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Build for production
```bash
npm run build
npm run start
```

## 📈 Scalability & Future Roadmap

ApexTune is built with a "modular-first" philosophy, making it highly scalable:

- **Sim-Link Integration:** Potential for a WebSocket-based bridge to receive real-time telemetry from active racing simulators.
- **Cloud Sync (Firebase):** Currently using LocalStorage, the architecture is ready to be migrated to Firestore for cross-device synchronization and team sharing.
- **AI-Assisted Engineering:** Integration with Genkit (already partially configured) to provide setup recommendations based on track conditions and driver feedback.
- **Telemetry Visualizer:** Adding real-time charts using Recharts to visualize tire wear and suspension travel during laps.

## ⚖️ License

MIT License - Precision Engineering for the Digital Track.
