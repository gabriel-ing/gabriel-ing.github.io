import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProjectListing = ({ project}) => {
  const projectColors = ["green", "turquoise", "blue"];
  const [showFullDescription, setShowFullDescription] = useState(false);
  let description = project.description;

  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }
  // console.log(project.id)
  // console.log(projectColors[project.id])
  const c = projectColors[Math.floor(Math.random() * projectColors.length)];
  // console.log(c);
  return (
    <div
      className={`bg-${c}-95  border-2 border-purple-10 rounded-md shadow-md relative border-solid m-auto sm:justify-center p-5 gap-3 h-160 overflow-scroll`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <h5 className=" text-l font-normal">{project.subtitle}</h5>
      </div>
      <img src={project.imageLink} width="100%" className="border-solid"></img>
      <div className="mb-5">{description}</div>
      <button
        className="text-blue-40 mb-5 hover:text-blue-60 underline"
        onClick={() => setShowFullDescription((prevState) => !prevState)}
      >
        {showFullDescription ? "Less" : "More"}
      </button>

      <div className="border border-gray-100 mb-5"></div>

      <div className="flex flex-col lg:flex-row justify-between mb-4">
        {project.externalLink &&  (<div>
          <a
            href={project.externalLink}
            target="_blank"
            className="text-purple-10 mb-5 bg-white p-0.5 border-purple-10 border-1 rounded-md hover:scale-105"
          >
            View Project
          </a>
        </div>)} 
        
        {/* <Link
            to={`/jobs/${project.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link> */}
      </div>
    </div>
  );
};

export default ProjectListing;
