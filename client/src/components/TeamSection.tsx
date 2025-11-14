import { Linkedin } from "lucide-react";

export default function TeamSection() {
  return (
    <section id="team" className="py-20 lg:py-32 bg-card">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
          Team
        </h2>
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
          Our team consists of machine learning engineers with experience at leading technology companies including <span className="font-semibold text-foreground">Microsoft</span>, <span className="font-semibold text-foreground">Twitter</span>, and <span className="font-semibold text-foreground">Dropbox</span>, united by a shared vision of achieving continuously learning agents that significantly reduce human intervention required.
        </p>
        <div className="flex justify-center items-center gap-3 mt-6">
          <a
            href="https://www.linkedin.com/in/raveeshu-pahuja-82b77924/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Linkedin className="w-5 h-5" />
            Connect with Founder
          </a>
        </div>
      </div>
    </section>
  );
}