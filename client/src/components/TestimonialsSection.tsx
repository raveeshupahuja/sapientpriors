import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "SapientPriors' API has transformed how Ental.ai interacts with our users. Instead of repeatedly asking about financial preferences, our assistant now remembers each user's goals, risk tolerance, and communication style. The integration was seamless, and we saw immediate improvements in user engagement and satisfaction.",
      author: "Devang Mundhra",
      title: "Co-founder",
      company: "Ental.ai",
      companyUrl: "https://ental.ai/",
      linkedIn: "https://www.linkedin.com/in/devangmundhra/"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            What Our Customers Say
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            See how companies are using our API to build truly personalized AI experiences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 lg:p-10 relative"
              data-testid={`testimonial-card-${index}`}
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              <blockquote className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-foreground">
                    <a
                      href={testimonial.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {testimonial.author}
                    </a>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.title},{" "}
                    <a
                      href={testimonial.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {testimonial.company}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
