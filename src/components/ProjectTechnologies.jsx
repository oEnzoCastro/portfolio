import React from "react";

const ProjectTechnologies = ({technologie}) => {
  return (
    <div className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 p-2 rounded-xl border-1 border-neutral-700 hover:border-neutral-800 transition ease-linear">
      <div className="">
        <h1 className="w-max text-sm text-neutral-400">{technologie.name}</h1>
      </div>
    </div>
  );
};

export default ProjectTechnologies;
