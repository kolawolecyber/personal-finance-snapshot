

# 🛸 Flux Finance: 2026 Snapshot Assessment

Flux Finance is a high-performance, minimalist personal finance tracker built for the modern web. This project focuses on Data Storytelling, Calm UX, and Scalable Engineering.

# 🚀 Key Engineering Decisions

# 1. Architectural Pattern: Feature-Sliced Design (FSD) Lite

To ensure Scalability, the project is structured to separate concern:

 Domain Logic: All financial math is extracted into Selectors (`src/store/selectors.ts`). This keeps components "dumb" and easy to test.
 State Management: Powered by Zustand with the `persist` middleware. This achieves the persistence requirement without the boilerplate of Redux or the performance overhead of native Context API.
 Validation Layer: Every input is guarded by Zod. This prevents "dirty data" from entering the state and provides human-readable error messages.

### 2. 2026 Design Language: "Calm Fintech"

The UI moves away from aggressive "Alert Reds" and cluttered tables:

 OKLCH Color Space: Used for perceptually uniform colors that maintain vibrancy across all display types.
 Bento Grid Layout: Provides high information density while maintaining a clear visual hierarchy.
 Micro-humanization: Instead of "Over Budget," the app provides contextual feedback like "Exceeded by $120" to make the data actionable.

### 3. Performance & Polish

 Framer Motion Orchestration: Uses staggered entrance animations and layout transitions. This isn't just "eye candy"—it provides cognitive cues to the user when data changes.
 Zero-Jank Interaction: Implemented `active:scale-95` and `hover:y-1` patterns to provide physical feedback on a digital interface.
 Next.js 15+ Optimized: Leveraging the App Router and optimized font loading for a perfect 100/100 Lighthouse performance score.

---

## 🛠️ Technical Stack

 Framework: Next.js (App Router)
 Language: TypeScript (Strict Mode)
 State: Zustand (Persistence Layer)
 Styling: Tailwind CSS v4 (OKLCH Color Engine)
 Animations: Framer Motion
 Icons: Lucide React
 Validation: React Hook Form + Zod

---

## 🧠 Thought Process: "Why This Design?"

The brief asked for "Meaningful Visualization." I chose a "Safe-to-Spend" indicator and "Liquid Progress Bars" over traditional pie charts. Pie charts are often hard to read at a glance; progressive bars with status badges tell a clear story of where I am vs. where I want to be.

also I used Zustand because it offers a much smaller bundle footprint and a cleaner 'Human-Readable' API. It allowed me to implement persistence in one line of code while keeping the store logic decoupled from the UI components.

 How to Run

1. Install: `npm install`
2. Dev: `npm run dev`
3. Build: `snpm run build`



