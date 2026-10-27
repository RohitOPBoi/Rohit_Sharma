export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  headlineRole: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  country: string;
  status: string;
  socials: {
    name: string;
    label: string;
    url: string;
    isPlaceholder?: boolean;
  }[];
}

export const profileData: ProfileData = {
  name: "Rohit Sharma",
  firstName: "Rohit",
  lastName: "Sharma",
  title: "AI & Machine Learning Engineer | Diffusion Models | Generative AI",
  headlineRole: "AI ENGINEER & RESEARCHER",
  tagline: "BUILDING DIFFUSION ARCHITECTURES & AUTONOMOUS AGENT SYSTEMS",
  email: "rohitvani07@gmail.com",
  phone: "+91-9667664427",
  location: "Gurugram, India",
  city: "GURUGRAM",
  country: "INDIA",
  status: "AVAILABLE FOR RESEARCH & ENG ROLES",
  socials: [
    {
      name: "LinkedIn",
      label: "linkedin.com/in/rohitsharma-764866340",
      url: "https://linkedin.com/in/rohitsharma-764866340",
      isPlaceholder: false,
    },
    {
      name: "GitHub",
      label: "github.com/[PLACEHOLDER]",
      url: "https://github.com/[PLACEHOLDER]",
      isPlaceholder: true,
    },
    {
      name: "Google Scholar",
      label: "scholar.google.com/[PLACEHOLDER]",
      url: "https://scholar.google.com/[PLACEHOLDER]",
      isPlaceholder: true,
    },
    {
      name: "X / Twitter",
      label: "x.com/[PLACEHOLDER]",
      url: "https://x.com/[PLACEHOLDER]",
      isPlaceholder: true,
    },
  ],
};
