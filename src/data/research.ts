export interface Publication {
  id: string;
  title: string;
  conference: string;
  year: string;
  authors: string[];
  metrics: string;
  abstract: string;
  paperUrl: string;
  codeUrl: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  year: string;
  badge: string;
  description: string;
}

export const publicationsData: Publication[] = [
  {
    id: "oct-ddpm-2026",
    title: "Retinal Optical Coherence Tomography Synthesis via Denoising Diffusion Probabilistic Models: Comparative Evaluation Against GAN Baselines",
    conference: "ICSTESD-2026 (International Conference on Science, Technology, Engineering & Sustainable Development)",
    year: "2026",
    authors: ["Rohit Sharma", "[CO-AUTHORS PLACEHOLDER]"],
    metrics: "FID: 13.20 | SSIM: 0.86 | PSNR: 28.4 dB",
    abstract:
      "Investigated time-conditioned U-Net DDPMs for high-fidelity OCT retinal image generation across 4 pathological states. Demonstrated superior structural preservation of retinal pigment epithelium (RPE) layers compared to DCGAN, CycleGAN, and StyleGAN2.",
    paperUrl: "https://[PLACEHOLDER]-paper-icstesd2026.pdf",
    codeUrl: "https://github.com/[PLACEHOLDER]/oct-diffusion-icstesd",
  },
];

export const achievementsData: Achievement[] = [
  {
    title: "2nd Place Winner",
    issuer: "HACK GEEK ROOM Hackathon 2025",
    year: "2025",
    badge: "🥈 HACKATHON WINNER",
    description: "Built and deployed a Hierarchical Multi-Agent Research System with dynamic task graph decomposition and grounded RAG verification.",
  },
  {
    title: "Top 5,000 / 50,000+ Finalist",
    issuer: "EY Hackathon 6.0 — Global FinTech Challenge",
    year: "2025",
    badge: "GLOBAL TOP 10%",
    description: "Advanced into the top tier of 50,000+ participants globally for innovative financial risk intelligence architecture.",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera / Stanford University (Andrew Ng)",
    year: "2024",
    badge: "STANFORD DEEPLEARNING.AI",
    description: "Rigorous foundation in supervised learning, neural network optimization, unsupervised learning, and recommender systems.",
  },
];
