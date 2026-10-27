export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  shortSummary: string;
  fullDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  liveUrl: string;
  repoUrl: string;
  coverImage: string;
  year: string;
  accentColor: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "project-prometheus",
    index: "01",
    title: "Project Prometheus",
    eyebrow: "FINTECH • ADVERSARIAL DEFENSE",
    shortSummary:
      "Closed-loop adversarial AI framework countering generative-AI identity synthesis & automated payment fraud.",
    fullDescription:
      "Presented at the Mastercard Innovation Challenge 2026 (Global Fintech Fest, Mumbai). Simulates dynamic synthetic fraud vectors in real time to train adaptive neural discriminators against emergent prompt injection and transaction laundering.",
    tags: ["Adversarial AI", "Fraud Detection", "Fintech Rails", "PyTorch", "GFF 2026"],
    metrics: [
      { label: "VENUE", value: "Global Fintech Fest 2026" },
      { label: "CHALLENGE", value: "Mastercard Innovation" },
      { label: "PARADIGM", value: "Closed-Loop Defense" },
    ],
    liveUrl: "https://[PLACEHOLDER]-prometheus.dev",
    repoUrl: "https://github.com/[PLACEHOLDER]/project-prometheus",
    coverImage: "/media/projects/prometheus.svg",
    year: "2026",
    accentColor: "#F5B84B",
  },
  {
    id: "retinal-oct-diffusion",
    index: "02",
    title: "Retinal OCT Diffusion Synthesis",
    eyebrow: "DIFFUSION • MEDICAL COMPUTER VISION",
    shortSummary:
      "DDPM framework generating realistic retinal OCT scans preserving delicate RPE pathology, achieving FID 13.20.",
    fullDescription:
      "Peer-reviewed paper accepted at ICSTESD-2026. Evaluates DDPM against StyleGAN2, CycleGAN, and DCGAN on the Kermany OCT dataset across 4 retinal conditions (CNV, DME, Drusen, Normal). Employs time-conditioned U-Net with GroupNorm and temporal embeddings.",
    tags: ["DDPM", "PyTorch", "U-Net", "Kermany OCT", "ICSTESD-2026"],
    metrics: [
      { label: "FID SCORE", value: "13.20" },
      { label: "SSIM", value: "0.86" },
      { label: "CLASSES", value: "4 Pathologies" },
    ],
    liveUrl: "https://[PLACEHOLDER]-oct-diffusion.org",
    repoUrl: "https://github.com/[PLACEHOLDER]/retinal-oct-diffusion",
    coverImage: "/media/projects/oct_diffusion.svg",
    year: "2025 – 2026",
    accentColor: "#6FA8FF",
  },
  {
    id: "prahari-astrasovereign",
    index: "03",
    title: "PRAHARI / AstraSovereign",
    eyebrow: "AGENTIC WORKBENCH • SOVEREIGN AI",
    shortSummary:
      "Air-gapped, sovereign agentic AI workbench built for enterprise infrastructure resilience.",
    fullDescription:
      "Developed for Smart India Hackathon 2026 (MRPL). Provides localized agent execution, verifiable audit trails, dynamic tool discovery, and zero-data-exfiltration guarantees for high-security industrial deployments.",
    tags: ["Agentic AI", "SIH 2026", "On-Premise", "Security", "Autonomous Ops"],
    metrics: [
      { label: "EVENT", value: "Smart India Hackathon '26" },
      { label: "ORGANIZATION", value: "MRPL Track" },
      { label: "ISOLATION", value: "Air-Gapped Sovereign" },
    ],
    liveUrl: "https://[PLACEHOLDER]-prahari.internal",
    repoUrl: "https://github.com/[PLACEHOLDER]/prahari-astrasovereign",
    coverImage: "/media/projects/prahari.svg",
    year: "2026",
    accentColor: "#2F5BFF",
  },
  {
    id: "deep-research-agent",
    index: "04",
    title: "Hierarchical Deep Research Agent",
    eyebrow: "MULTI-AGENT SYSTEMS • RAG REASONING",
    shortSummary:
      "Hierarchical multi-agent research engine orchestrating dynamic task graphs, source credibility, and bias detection.",
    fullDescription:
      "Won 2nd Place at HACK GEEK ROOM Hackathon. Decomposes high-level research questions into sub-agent workstreams with vector RAG memory, automated verification loops, iterative prompt refinement, and streaming evidence-graph UI.",
    tags: ["Multi-Agent Graphs", "RAG", "Dynamic Trees", "Self-Correction", "FastAPI"],
    metrics: [
      { label: "HONOR", value: "2nd Place Hackathon" },
      { label: "GRAPH", value: "Dynamic Task Trees" },
      { label: "VERIFICATION", value: "Self-Correction Loop" },
    ],
    liveUrl: "https://[PLACEHOLDER]-research-agent.io",
    repoUrl: "https://github.com/[PLACEHOLDER]/hierarchical-research-agent",
    coverImage: "/media/projects/research_agent.svg",
    year: "2025",
    accentColor: "#10B981",
  },
];
