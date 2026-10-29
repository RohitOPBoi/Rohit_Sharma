export interface ServiceRow {
  index: string;
  title: string;
  description: string;
  tags: [string, string, string];
  link: string;
}

export interface ExpertiseData {
  eyebrow: string;
  headingTop: string;
  headingBottom: string;
  introHighlight: string;
  introBody: string;
  techChips: string[];
  rows: ServiceRow[];
  floatingIcons: {
    name: string;
    symbol: string;
    color: string;
    x: number; // base percentage x
    y: number; // base percentage y
    speed: number;
  }[];
}

export const expertiseData: ExpertiseData = {
  eyebrow: "03 — EXPERTISE",
  headingTop: "MY",
  headingBottom: "EXPERTISE",
  introHighlight: "Architecting generative vision and autonomous multi-agent systems",
  introBody:
    "Grounded in mathematical formulation, time-conditioned diffusion pipelines, and verifiable production orchestration with zero tolerance for ungrounded hallucination.",
  techChips: [
    "PyTorch",
    "CUDA",
    "FastMCP",
    "Docker",
    "Python",
    "Transformers",
    "U-Net",
  ],
  rows: [
    {
      index: "01",
      title: "Generative AI & Diffusion Models",
      description:
        "Formulating forward and reverse stochastic differential equations, time-conditioned U-Nets, and latent sampling pipelines for high-fidelity clinical synthesis.",
      tags: ["DDPM / DDIM", "Time-Conditioned U-Net", "Kermany OCT"],
      link: "#work",
    },
    {
      index: "02",
      title: "Multi-Agent Systems & MCP",
      description:
        "Building autonomous agent topologies with dynamic reflection trees, tool discovery via FastMCP, sub-250ms edge scheduling, and self-correcting validation loops.",
      tags: ["LangGraph", "FastMCP Protocols", "Edge Scheduling"],
      link: "#work",
    },
    {
      index: "03",
      title: "Deep Learning & Computer Vision",
      description:
        "Custom neural architectures, self-attention mechanisms, convolutional backbones, and adversarial discriminators optimized for high-throughput GPU inference.",
      tags: ["Attention Heads", "PyTorch Geometric", "Loss Surfaces"],
      link: "#work",
    },
    {
      index: "04",
      title: "Production ML & Infrastructure",
      description:
        "Deterministic Docker environments, CUDA kernel execution, Linux server tuning, and reproducible deployment frameworks engineered for enterprise reliability.",
      tags: ["Docker Containment", "CUDA Acceleration", "API Gateway"],
      link: "#work",
    },
  ],
  floatingIcons: [
    { name: "PyTorch", symbol: "🔥", color: "#EE4C2C", x: 65, y: 18, speed: 1.1 },
    { name: "CUDA", symbol: "⚡", color: "#76B900", x: 85, y: 35, speed: 0.9 },
    { name: "Python", symbol: "🐍", color: "#3776AB", x: 60, y: 60, speed: 1.3 },
    { name: "Docker", symbol: "🐳", color: "#2496ED", x: 80, y: 75, speed: 0.8 },
    { name: "FastMCP", symbol: "⚙️", color: "#C9B17C", x: 92, y: 15, speed: 1.2 },
  ],
};
