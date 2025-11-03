export default function TeamSection() {
  return (
    <section id="team" className="py-20 lg:py-32 bg-card">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
          Team
        </h2>
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Our team consists of machine learning engineers with experience at leading technology companies including <span className="font-semibold text-foreground">Microsoft</span>, <span className="font-semibold text-foreground">Twitter</span>, and <span className="font-semibold text-foreground">Dropbox</span>, united by a shared vision of achieving continuously autonomous learning agents.
        </p>
      </div>
    </section>
  );
}