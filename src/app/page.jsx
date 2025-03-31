import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import HelloDropdown from "@/components/HelloDropdown";

export default function Home() {
  var technologies = require("@/data/technologies.json");
  var projects = require("@/data/projects.json");

  return (
    <div className="flex flex-col items-center">

      {/* Header Start */}

      <div className="h-screen w-full bg-neutral-800/50 flex flex-col items-center">
        <div className="text-5xl md:text-6xl font-medium text-center p-10 duration-500">Enzo Castro</div>
        <div className="w-[80%] flex flex-col items-center">
          <HelloDropdown></HelloDropdown>
        </div>
        {/* Button */}
        <div className="flex gap-2 m-15">
          <button className="bg-neutral-900 text-neutral-300 rounded-xl p-2 border border-neutral-300">My Projects</button>
          <button className="bg-neutral-800 text-neutral-100 rounded-xl p-2 border border-neutral-100">About Me</button>
        </div>
      </div>

      {/* Header End */}
      {/* Technologies Start */}

      <div className="text-4xl text-center font-medium p-5">Current Technologies</div>
      <div className="md:text-xl pl-20 pr-20 text-neutral-300 duration-1000">I'm in a constant process of learning about modern solutions. These are some of my main technologies.</div>

      <div className="flex gap-5 justify-center flex-wrap mt-5 p-10">
        {technologies.map((technologie) => {
          return (
            <Technologies key={technologie.name} technologie={technologie} />
          );
        })}
      </div>

      {/* Technologies End */}
      {/* Projects Start */}

      <div className="text-4xl font-medium text-center p-5">My Projects</div>
      <div className="md:text-xl pl-20 pr-20 text-neutral-300 duration-1000">While learning i like to develop some ideas. These are some projects i have done.</div>

      <div className="flex flex-wrap justify-center w-[100%] m-5">
        {projects.map((project) => {
          return <Projects key={project.name} project={project}></Projects>;
        })}
      </div>

      {/* Projects End */}
      {/* Background Start */}

      <div className="fixed h-full w-full bg-[radial-gradient(#fafafa4a_1px,transparent_1px)] [background-size:16px_16px] animate-pulse z-[-1] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_125%)] opacity-25 duration-500 ease-in-out"></div>

      {/* Background End */}
    </div>
  );
}
