import React from 'react'
import ProjectListings from '../components/projectListings'

const HomePage = () => {
  return (<>
  <div className="bg-blue-95 m-10 rounded-3xl p-5"><h1 className='text-4xl m-auto text-center font-bold mb-5'>Welcome!</h1>
  <p>Welcome to my new website! I remade it to better showcase some of my projects, to create a mini-blog, and to practice some skills (react and tailwindcss specifically). </p></div>
   <ProjectListings ishome={true}></ProjectListings>
   </>
  )
}

export default HomePage