export interface ProjectItem {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  repoUrl?: string;
  badgeText: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "retinal-oct-diffusion",
    number: "01",
    eyebrow: "RESEARCH · MEDICAL VISION",
    title: "Retinal OCT Diffusion Synthesis",
    description:
      "Time-conditioned DDPM and DDIM pipeline synthesizing high-resolution retinal optical coherence tomography scans across 4 pathologies, establishing SSIM 0.88 and FID 14.2.",
    tags: ["DDPM / DDIM", "PyTorch", "Medical Vision", "U-Net", "CUDA"],
    metrics: [
      { label: "FID SCORE", value: "14.20" },
      { label: "SSIM", value: "0.88" },
      { label: "RESOLUTION", value: "512 x 512" },
    ],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    badgeText: "RETINAL OCT • DIFFUSION PIPELINE • VIEW RESEARCH •",
  },
  {
    id: "quorum-multimodal",
    number: "02",
    eyebrow: "HACKATHON · QUALCOMM 3RD",
    title: "Quorum Multimodal Orchestrator",
    description:
      "Award-winning low-latency multimodal agent framework coordinating simultaneous audio, vision, and tool invocation with sub-250ms deterministic edge scheduling.",
    tags: ["Qualcomm Hackathon", "Multimodal Agents", "FastMCP", "WebSockets", "Edge AI"],
    metrics: [
      { label: "AWARD", value: "Qualcomm 3rd Place" },
      { label: "LATENCY", value: "<250ms Edge" },
      { label: "PROTOCOLS", value: "FastMCP / gRPC" },
    ],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    badgeText: "QUALCOMM 3RD PLACE • QUORUM AGENTS • VIEW SYSTEM •",
  },
  {
    id: "prahari-adversarial",
    number: "03",
    eyebrow: "SECURITY · ADVERSARIAL DEFENSE",
    title: "Prahari Adversarial Fraud Defense",
    description:
      "Real-time graph neural network and transaction defense platform countering emergent synthetic identity manipulation and automated multi-hop transaction laundering.",
    tags: ["Adversarial AI", "Graph Neural Networks", "PyTorch Geometric", "FastAPI", "Docker"],
    metrics: [
      { label: "THROUGHPUT", value: "15k req/sec" },
      { label: "PRECISION", value: "99.4%" },
      { label: "INFRA", value: "Docker / Redis" },
    ],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    badgeText: "PRAHARI DEFENSE • ADVERSARIAL AI • VIEW ARCHITECTURE •",
  },
  {
    id: "prometheus-research",
    number: "04",
    eyebrow: "SYSTEMS · AUTONOMOUS AGENTS",
    title: "Prometheus Autonomous Research Agent",
    description:
      "Recursive literature and empirical research synthesis engine built with LangGraph, continuous reflection trees, citation grounding, and automated hypothesis verification.",
    tags: ["LangGraph", "FastMCP", "Vector Memory", "Self-Correction", "Python"],
    metrics: [
      { label: "VERIFICATION", value: "Self-Correcting Loop" },
      { label: "GROUNDING", value: "Full Citation Proof" },
      { label: "TOPOLOGY", value: "Dynamic Task Trees" },
    ],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    badgeText: "PROMETHEUS • AUTONOMOUS RESEARCH • VIEW CODE •",
  },
];
