import React from "react";

const Technologies = ({ img, name, desc }) => {
  return (
    <div className="bg-neutral-800 hover:bg-neutral-900 w-75 h-20 flex items-center p-5 gap-5 rounded-md border border-neutral-600 hover:border-neutral-700 transition ease-linear">
      <img src={img} className="h-10 bg-gray-100 rounded-md" />
      <div className="">
        <h1 className="text-base text-neutral-50">{name}</h1>
        <p className="text-xs text-neutral-400">{desc}</p>
      </div>
    </div>
  );
};

export default Technologies;
