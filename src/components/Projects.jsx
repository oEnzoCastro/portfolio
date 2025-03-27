import React from "react";
import ProjectTechnologies from "./ProjectTechnologies";

const Projects = ({ project }) => {
  return (
    <div className="p-5 m-5 bg-neutral-800 rounded-xl">
      <div className="rounded-xl overflow-hidden">
        <img
          className="h-80 max-w-full w-100 object-cover hover:scale-110 transition-all ease-out duration-500 bg-neutral-400"
          src={project.img}
        />
      </div>
      <div>{project.name}</div>
      <div className="flex flex-wrap w-80 gap-1">
        {project.technologies.map((technologie) => {
          return <ProjectTechnologies key={technologie.name} technologie={technologie}></ProjectTechnologies>;
        })}
      </div>
    </div>
  );
};

export default Projects;
