import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";

export default function Home() {
  var technologies = require("@/data/technologies.json");
  var projects = require("@/data/projects.json");

  return (
    <div className="flex flex-col items-center">
      <p>Enzo Castro</p>
      <div className="flex gap-5 justify-center mt-5 flex-wrap">
        {technologies.map((technologie) => {
          return (
            <Technologies key={technologie.name} technologie={technologie} />
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center w-[100%] m-5">
        {projects.map((project) => {
          return <Projects key={project.name} project={project}></Projects>;
        })}
      </div>
    </div>
  );
}
