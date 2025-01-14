import { Divider } from "@mantine/core";

export default function CurriculumVitae() {
  return (
    <div>
      <h1>Curriculum Vitae</h1>
      <Divider />
      <h2>Work Experience</h2>
      <div>
        <h3 className="mt-4 mb-3">Full Stack Developer Student Assistant</h3>
        <p>IT University of Copenhagen, Copenhagen, Denmark</p>
        <p>Oct 2024 -</p>
        <h4>Tech Stack</h4>
        <p>React JS, Express JS, SQLite, Docker, Nginx, Git</p>
        <h4>Responsibilities</h4>
        <h5>Full Stack Development</h5>
        <ul>
          <li>Developing React JS Frontend</li>
          <li>Developing Express JS Backend</li>
          <li>Maintaining and extending the existing codebase</li>
        </ul>
        <h5>DevOps</h5>
        <ul>
          <li>
            Containerizing and deploying application on ITU-managed servers
          </li>
          <li>Setting up Development, Staging and Production environment</li>
          <li>
            Configuring NGINX reverse proxy and SSL certificates for environment
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mt-4 mb-3">
          Backend Developer & Quality Assurance Student Assistant
        </h3>
        <p>Oktogrid, Copenhagen, Denmark</p>
        <p>Nov 2023 - Oct 2024</p>
        <h4>Tech Stack</h4>
        <p>React TS, Python, FastAPI, AWS, Docker, PostgreSQL, Git</p>
        <h4>Responsibilities</h4>
        <h5>Full Stack Development</h5>
        <ul>
          <li>
            Developing, testing, and maintaining RESTful APIs using Python
            FastAPI
          </li>
          <li>Creating data visualization dashboards with React TS</li>
          <li>
            Creating CI/CD pipelines via Bitbucket for automated deployment
          </li>
          <li>
            Developing, testing, and maintaining Python-based CLI applications
          </li>
        </ul>
        <h5>DevOps (Amazon Web Services)</h5>
        <ul>
          <li>
            Managing Lambda functions responsible for processing and storing
            MQTT messages on S3
          </li>
          <li>
            Managing rules for MQTT messages on IoT Core to trigger Lambda
            functions
          </li>
          <li>Storing and managing data on S3</li>
          <li>Setting up and managing PostgreSQL databases</li>
          <li>Hosting and load balancing APIs on EC2</li>
          <li>Deploying containerized applications on ECS</li>
          <li>
            Managing roles, policies and secrets to ensure secure access to AWS
            services across different environments on IAM
          </li>
          <li>Monitoring and logging other services with CloudWatch</li>
        </ul>
      </div>

      <div>
        <h3 className="mt-4 mb-3">Test Process Specialist</h3>
        <p>Bosch, Miskolc, Hungary</p>
        <p>Dec 2020 - Aug 2023</p>
        <h4>Tech Stack</h4>
        <p>Python, Microsoft SQL Server</p>
        <h4>Responsibilities</h4>
        <h5>Digitalization</h5>
        <ul>
          <li>
            Developing Python application with to automate daily engineering
            duties
          </li>
          <li>
            Creating automation scripts to load data from manufacturing stations
            into Microsoft SQL Server database
          </li>
          <li>
            Extracting product data from standard documentation and loading it
            into manufacturing equipment settings file
          </li>
          <li>Creating PowerBI visualizations from the database</li>
        </ul>
        <h5>Engineering</h5>
        <ul>
          <li>
            Taking over test processes and instruments from German Center of
            Competence
          </li>
          <li>
            Calibrating measurement systems and performing Gauge R&R studies on
            them
          </li>
          <li>
            Solving early life problems of newly launched projects and planning
            preventive maintenance measures
          </li>
          <li>
            Training blue collar colleagues for equipment maintenance and
            operation
          </li>
          <li>Hosting and load balancing APIs on EC2</li>
          <li>Deploying containerized applications on ECS</li>
          <li>
            Supporting technicians crew in ad-hoc service of faulty equipment
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mt-4 mb-3">Electronic Development Engineer</h3>
        <p>Ten Pao Electronics, Miskolc, Hungary</p>
        <p>Sep 2019 - Dec 2020</p>
        <h4>Responsibilities</h4>
        <h5>Digitalization</h5>
        <ul>
          <li>
            Writing Excel VBA Macros to collect previous day's manufacturing
            data
          </li>
          <li>Visualizing production data for daily meetings</li>
          <li>Creating data visualizations on ad-hoc requests</li>
        </ul>
        <h5>Engineering</h5>
        <ul>
          <li>Supporting switching power supply manufacturing</li>
          <li>Installing and duplicating of production lines</li>
          <li>Ensuring seamless operation of test equipment</li>
        </ul>
      </div>

      <div>
        <h3 className="mt-4 mb-3">Internship in Manufacturing</h3>
        <p>Bosch, Miskolc, Hungary</p>
        <p>Apr 2017 - Sep 2019</p>
        <h4>Responsibilities</h4>
        <ul>
          <li>Debugging malfunctioning test equipment</li>
          <li>Building and validating new test instruments</li>
          <li>Implementing production development projects</li>
          <li>Creating and revising documents for manufacturing</li>
        </ul>
      </div>
    </div>
  );
}
