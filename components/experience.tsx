"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    id: 1,
    role: "Engineering Manager",
    company: "Netcore Cloud",
    location: "Mumbai, India",
    period: "2022 - Present",
    description: [
      "Led frontend development, increasing user engagement by 40%.",
      "Implemented a component library, improving efficiency by 30%.",
      "Mentored developers and conducted code reviews.",
      "Collaborated with design and product teams.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
  },
  {
    id: 2,
    role: "Sr. Frontend Developer",
    company: "Xoriant Solutions",
    location: "Pune, IN",
    period: "2020 - 2022",
    description: [
      "Developed web applications using React and Redux.",
      "Implemented responsive designs and ensured compatibility.",
      "Integrated APIs and optimized performance.",
      "Participated in agile development processes.",
    ],
    technologies: ["React", "JavaScript", "Redux", "SASS", "REST API"],
  },
  {
    id: 3,
    role: "Web Developer",
    company: "Creative Agency",
    location: "Boston, MA",
    period: "2016 - 2018",
    description: [
      "Built interactive websites for various clients.",
      "Implemented pixel-perfect UI designs.",
      "Optimized performance and improved SEO.",
      "Maintained and updated client websites.",
    ],
    technologies: ["JavaScript", "HTML", "CSS", "jQuery", "WordPress"],
  },
]

export default function Experience() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [itemInViewStates, setItemInViewStates] = useState(experiences.map(() => false))
  const itemRefs = useRef<(HTMLDivElement | null)[]>(experiences.map(() => null))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setItemInViewStates((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [itemRefs])

  return (
    <section id="experience" className="py-20 bg-muted/30" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            Work Experience
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">My Professional Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional experience and the companies I've had the pleasure to work with.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView && itemInViewStates[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-primary -translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-background border rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-2 text-muted-foreground">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}