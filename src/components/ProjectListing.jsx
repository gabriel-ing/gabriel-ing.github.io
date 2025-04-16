import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const tagFormats = {
  Python: " bg-green-40 text-green-95",
  Pandas: " bg-green-95 text-green-10",
  Numpy: " bg-green-95 text-green-10",
  "d3.js": " bg-blue-80 text-blue-10",
  "three.js": " bg-blue-80 text-blue-10",
  JavaScript: " bg-blue-40 text-blue-95",
  Java: " bg-orange-40 text-orange-95",
  Science: " bg-red-80 text-red-10",
  "Data visualisation": " bg-red-50 text-red-95",
  "Web dev": " bg-blue-40 text-blue-95",
  "App dev": " bg-orange-80 text-orange-10",
};

const ProjectListing = ({ project }) => {
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
      className={`bg-white shrink-1 border-0.5 border-purple-10 rounded-4xl shadow-2xl relative border-solid m-auto sm:justify-center p-6 gap-3 h-160 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-grey-400 scrollbar-track-transparent`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <div className="tags flex flex-wrap">
          {project.tags.map((tag, index) => {
            let tagClass =
              "m-1 border-1 p-1 text-sm rounded-xl items-center justify-center flex";
            tagFormats.hasOwnProperty(tag)
              ? (tagClass += tagFormats[tag])
              : (tagClass += " bg-grey-95 text-grey-10");
            return (
              <div className={tagClass} key={index}>
                {tag}
              </div>
            );
          })}
        </div>
        <h5 className=" text-l text-purple-60 font-semibold">
          {project.subtitle}
        </h5>
      </div>
      <img
        src={project.imageLink}
        width="100%"
        className="border-1 border-blue-95 rounded-xl"
        max-height="100"
      ></img>
      <div className="mb-5 mt-5">{description}</div>
      <button
        className="text-blue-40 mb-5 hover:text-blue-60 underline"
        onClick={() => setShowFullDescription((prevState) => !prevState)}
      >
        {showFullDescription ? "Less" : "More"}
      </button>

      <div className="border border-gray-100 mb-5"></div>

      <div className="flex flex-col lg:flex-row justify-between mb-4">
        {project.externalLink && (
          <div>
            <a
              href={project.externalLink}
              target="_blank"
              className="text-purple-10 mb-5 bg-white p-0.5 border-purple-10 border-1 rounded-md hover:scale-105"
            >
              {project.linkButton}
            </a>
          </div>
        )}

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
