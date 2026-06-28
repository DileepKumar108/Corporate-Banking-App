import BankLayout from './BankLayout';

const skills = [
  'Java 8/17',
  'Spring Boot',
  'Spring Cloud',
  'Spring Security',
  'React JS',
  'Redux',
  'Redux-Saga',
  'REST APIs',
  'Microservices',
  'PostgreSQL',
  'SQL Server',
  'Docker',
  'AWS ECS/ECR/Fargate',
  'Jenkins',
  'GitHub Actions',
  'JUnit',
  'Mockito',
  'K6',
];

const experiences = [
  {
    role: 'Senior Java Full Stack Developer',
    company: 'NTT (via SGR Info System Pvt Ltd)',
    period: '08/2024 – Present',
    highlights: [
      'Built enterprise-grade applications using Java 17, Spring Boot, and Spring Cloud microservices.',
      'Developed responsive React JS interfaces with Redux-based state management and REST integrations.',
      'Implemented secure API communication with Spring Security and deployed solutions with Docker and AWS.',
    ],
  },
  {
    role: 'Java Full Stack Developer',
    company: 'Brillio',
    period: '09/2023 – 07/2024',
    highlights: [
      'Delivered Spring Boot services and reusable React components for enterprise workflows.',
      'Worked on database design, SQL optimization, and unit testing with JUnit and Mockito.',
      'Followed Agile delivery practices and participated in code reviews and SDLC activities.',
    ],
  },
  {
    role: 'Java Full Stack Developer',
    company: 'Tech Mahindra (via Softalk Technologies Limited)',
    period: '09/2020 – 09/2023',
    highlights: [
      'Developed enterprise applications using Java, Spring Boot, and microservices patterns.',
      'Created and maintained REST APIs while improving application performance and maintainability.',
      'Collaborated with cross-functional teams in Agile environments and supported testing efforts.',
    ],
  },
];

const projects = [
  {
    name: 'CORESTREAM – Distributed Multi-Tenant Data Hub',
    summary: 'Built scalable microservices and React-based UI for secure enterprise workflows.',
    stack: 'Java 17, Spring Boot, Spring Cloud, Spring Data JPA, PostgreSQL, Docker, AWS ECS/ECR/Fargate',
  },
  {
    name: 'VANGUARD – Enterprise Integration & Transaction Engine',
    summary: 'Delivered backend services and UI integrations for transaction workflows with performance testing.',
    stack: 'Java, Spring Boot, Microservices, REST APIs, React JS, Redux, SQL Server, PostgreSQL, AWS, K6',
  },
];

const ResumePage = () => {
  return (
    <BankLayout title="Resume" subtitle="A professional snapshot of full-stack engineering experience and delivery impact." activePath="/resume">
      <div className="resume-hero panel">
        <div>
          <p className="muted">Senior Java Full Stack Developer</p>
          <h3>Experienced in building scalable enterprise applications with modern Java and React stacks.</h3>
          <p className="muted">
            I specialize in Spring Boot microservices, REST API design, secure application development, cloud deployment,
            and frontend experiences built with React and Redux.
          </p>
        </div>
        <div className="action-grid">
          <button className="primary-btn" type="button">Download CV</button>
          <button className="secondary-btn" type="button">Contact</button>
        </div>
      </div>

      <div className="resume-grid">
        <section className="panel">
          <h3>Core skills</h3>
          <div className="skill-list">
            {skills.map((skill) => (
              <span key={skill} className="skill-chip">{skill}</span>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Professional experience</h3>
          <div className="timeline-list">
            {experiences.map((experience) => (
              <article key={`${experience.role}-${experience.company}`} className="timeline-item">
                <div className="timeline-badge" />
                <div>
                  <h4>{experience.role}</h4>
                  <p className="muted">{experience.company} • {experience.period}</p>
                  <ul className="bullet-list">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <h3>Key projects</h3>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.name} className="project-card">
              <h4>{project.name}</h4>
              <p className="muted">{project.summary}</p>
              <p><strong>Stack:</strong> {project.stack}</p>
            </article>
          ))}
        </div>
      </section>
    </BankLayout>
  );
};

export default ResumePage;
