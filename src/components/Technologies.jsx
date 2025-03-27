import React from "react";

const Technologies = ({ technologie }) => {
  return (
    <div className="bg-neutral-800 hover:bg-neutral-900 w-75 h-20 flex items-center p-5 gap-5 rounded-xl border border-neutral-800 hover:border-neutral-700 transition ease-linear">
      <img src={technologie.img} className="h-10 bg-gray-800 rounded-md p-1" />
      <div className="">
        <h1 className="text-base text-neutral-50">{technologie.name}</h1>
        <p className="text-xs text-neutral-400">{technologie.desc}</p>
      </div>
    </div>
  );
};

export default Technologies;
