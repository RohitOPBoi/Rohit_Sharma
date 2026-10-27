export interface ExpertiseRow {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  techTags: string[];
  floatingTokens: {
    label: string;
    symbol: string;
    color: string;
    bg: string;
  }[];
}

export const expertiseData: ExpertiseRow[] = [
  {
    id: "ai-ml-research",
    index: "01",
    category: "FOUNDATIONS & ARCHITECTURE",
    title: "AI & Machine Learning Research",
    description:
      "Formulating deep learning architectures in PyTorch with custom loss surfaces, probabilistic noise schedules, mathematical optimization, and rigorous statistical evaluation pipelines.",
    techTags: ["PyTorch", "Python", "Deep Learning", "Probabilistic Modeling", "Optimization"],
    floatingTokens: [
      { label: "PyTorch", symbol: "🔥", color: "#EE4C2C", bg: "rgba(238, 76, 44, 0.15)" },
      { label: "Python", symbol: "🐍", color: "#3776AB", bg: "rgba(55, 118, 171, 0.15)" },
      { label: "Math", symbol: "∑", color: "#6FA8FF", bg: "rgba(111, 168, 255, 0.15)" },
    ],
  },
  {
    id: "diffusion-medical",
    index: "02",
    category: "GENERATIVE VISION & SYNTHESIS",
    title: "Generative Models & Medical Imaging",
    description:
      "Denoising Diffusion Probabilistic Models (DDPMs) and time-conditioned U-Nets with Group Normalization and SiLU activations. Benchmarked against GAN baselines (StyleGAN2, CycleGAN) on Kermany OCT.",
    techTags: ["DDPM", "U-Net", "Medical Imaging", "SSIM / PSNR", "FID Evaluation"],
    floatingTokens: [
      { label: "DDPM", symbol: "🌊", color: "#6FA8FF", bg: "rgba(111, 168, 255, 0.15)" },
      { label: "Vision", symbol: "👁️", color: "#F5B84B", bg: "rgba(245, 184, 75, 0.15)" },
      { label: "U-Net", symbol: "∪", color: "#2F5BFF", bg: "rgba(47, 91, 255, 0.15)" },
    ],
  },
  {
    id: "fintech-fraud",
    index: "03",
    category: "ADVERSARIAL RISK DEFENSE",
    title: "Fintech & Fraud / Risk AI",
    description:
      "Adversarial intelligence systems designed to counter next-gen synthetic identity fraud and prompt-injected transaction anomalies in high-throughput payment rails.",
    techTags: ["Adversarial AI", "Fraud Detection", "Risk Intelligence", "GFF Mumbai", "EY Hackathon"],
    floatingTokens: [
      { label: "Fintech", symbol: "⚡", color: "#F5B84B", bg: "rgba(245, 184, 75, 0.15)" },
      { label: "Defense", symbol: "🛡️", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)" },
      { label: "Audit", symbol: "📊", color: "#6FA8FF", bg: "rgba(111, 168, 255, 0.15)" },
    ],
  },
  {
    id: "agentic-systems",
    index: "04",
    category: "AUTONOMOUS ORCHESTRATION",
    title: "Agentic AI & Multi-Agent Systems",
    description:
      "Building hierarchical multi-agent frameworks with dynamic task graph decomposition, vector RAG memory, self-correction reflection loops, and streaming evidence-graph visualization.",
    techTags: ["Multi-Agent Graphs", "LLMs", "RAG Pipeline", "Self-Correction", "Vector DB"],
    floatingTokens: [
      { label: "Agents", symbol: "🤖", color: "#2F5BFF", bg: "rgba(47, 91, 255, 0.15)" },
      { label: "Graph", symbol: "🕸️", color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.15)" },
      { label: "Memory", symbol: "🧠", color: "#EC4899", bg: "rgba(236, 72, 153, 0.15)" },
    ],
  },
  {
    id: "technical-systems",
    index: "05",
    category: "INFRASTRUCTURE & REPRODUCIBILITY",
    title: "Technical Systems & Research Presentation",
    description:
      "Reproducible research pipelines packaged with Docker, Linux systems automation, low-level algorithms in C/C++, and publication-grade academic documentation.",
    techTags: ["Docker", "Linux", "C++ / DSA", "Signal Processing", "Git Pipelines"],
    floatingTokens: [
      { label: "Docker", symbol: "🐳", color: "#2496ED", bg: "rgba(36, 150, 237, 0.15)" },
      { label: "Linux", symbol: "🐧", color: "#FCC624", bg: "rgba(252, 198, 36, 0.15)" },
      { label: "C++", symbol: "⚙️", color: "#00599C", bg: "rgba(0, 89, 156, 0.15)" },
    ],
  },
];
