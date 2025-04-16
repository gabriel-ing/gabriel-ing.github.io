import { useState } from 'react'
import HomePage from './pages/HomePage';
import About from './pages/About';
import MainLayout from './layouts/MainLayout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  createRoutesStub,
  RouterProvider,
  Route,
} from "react-router-dom";
import Projects from './pages/Projects';
import Blog from "./pages/Blog"
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<Projects/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="blog" element={<Blog/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App
