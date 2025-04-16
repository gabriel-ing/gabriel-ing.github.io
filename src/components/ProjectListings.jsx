import React from "react";
import ProjectListing from "./ProjectListing.jsx";
import { projects } from "../project_details.js";
import { Link } from "react-router-dom";



const ProjectListings = ({ishome = false}) => {


  let sectionClass;
  let pinnedProjects = [0, 5, 4];
  let title;
  let selectedProjects = projects;
  if (ishome) {
    sectionClass = "bg-red-95 px-4 py-10 rounded-2xl m-10";
    title = "Pinned Projects";
    selectedProjects = selectedProjects.filter((d) =>
      pinnedProjects.includes(d.id)
    );
  } else {
    sectionClass = "bg-red-95 px-4 py-10";
    title = "Browse Projects";
  }
  console.log(selectedProjects);
  return (
    <section className={sectionClass}>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-purple-10 text-center">
          {title}
        </h2>

        
          <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ">
            {selectedProjects.map((project, index) => (
              <ProjectListing
                key={project.id}
                project={project}
              ></ProjectListing>
            ))}
          </div>
      </div>
        {ishome&&(<div className="mt-8 hover:scale-105  w-40  "><Link to="projects" className="bg-white p-2 mt-5 text-xl rounded-3xl border-2 border-blue-70 text-blue-70 hover:text-blue-80">View More</Link></div> )}
    </section>
  );
};

export default ProjectListings;
