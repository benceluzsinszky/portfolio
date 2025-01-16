import BoschLogo from "../../assets/logos/bosch_logo.jpg";
import ITULogo from "../../assets/logos/itu_logo.jpg";
import OktogridLogo from "../../assets/logos/oktogrid_logo.jpg";
import TenPaoLogo from "../../assets/logos/ten_pao_logo.jpg";
import UniMiskolcLogo from "../../assets/logos/university_of_miskolc_logo.jpg";
import JourneyItem from "./JourneyItem";

export default function Journey() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-10 w-1 bg-gradient-to-t from-gray-200 to-gray-950"></div>
      <div className="relative flex flex-col w-3/4 items-center ">
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 z-0"></div>

        <JourneyItem
          date="Sep 2024"
          icon={ITULogo}
          title="IT University of Copenhagen"
          description="Full Stack Developer Student Assistant"
          techStack="React JS, Express JS, SQLite, Docker, Nginx, Git"
        />
        <JourneyItem
          date="Nov 2023"
          icon={OktogridLogo}
          title="Oktogrid"
          description="Full Stack Developer & Quality Assurance Student Assistant"
          techStack="React TS, FastAPI, PostgreSQL, AWS, Docker, Git"
          swapped
        />
        <JourneyItem
          date="Sep 2023"
          icon={ITULogo}
          title="IT University of Copenhagen"
          description="Started MSc in Software Design"
        />
        <JourneyItem
          date="Nov 2020"
          icon={BoschLogo}
          title="Bosch"
          description="Test Process Specialist"
          techStack="Python, Microsoft SQL Server"
          swapped
        />
        <JourneyItem
          date="Jun 2020"
          icon={UniMiskolcLogo}
          title="University of Miskolc"
          description="Graduated BSc in Electrical Engineering"
        />
        <JourneyItem
          date="Sep 2019"
          icon={TenPaoLogo}
          title="Ten Pao Electronics"
          description="Electronic Development Engineer"
          swapped
        />
        <JourneyItem
          date="Apr 2017"
          icon={BoschLogo}
          title="Bosch"
          description="Manufacturing Intern"
        />
      </div>

      <div className="h-10 w-1 bg-gradient-to-b from-gray-200 to-gray-950"></div>
    </div>
  );
}
