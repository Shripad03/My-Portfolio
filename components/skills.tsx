"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skills = [
  { name: "Angular", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "React.js", level: 75 },
  { name: "Next.js", level: 75 },
  { name: "JavaScript", level: 95 },
  { name: "HTML/CSS", level: 90 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Redux", level: 80 },
  { name: "GraphQL", level: 75 },
  { name: "Node.js", level: 70 },
  { name: "Testing", level: 80 },
  { name: "UI/UX", level: 85 },
  { name: "Performance Optimization", level: 80 },
]

const technologies = [
  "Angular",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Redux",
  "GraphQL",
  "REST API",
  "Karma",
  "React Testing Library",
  "Git",
  "CI/CD",
  "Webpack",
  "Vite",
  "Responsive Design",
  "Accessibility",
  "Performance Optimization",
  "SEO",
  "PWA",
  "Jira"
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            Skills & Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">My Technical Proficiency</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've worked with a wide range of technologies throughout my career. Here's an overview of my technical
            skills and expertise.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Core Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Technologies & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="bg-background border border-border rounded-full px-4 py-2 text-sm"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

