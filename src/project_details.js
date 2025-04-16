export const projects = [
  {
    id: 0,
    title: "SimpliPyTEM",
    subtitle: "Python Library for processing electron microscopy data",
    tags: ["python", "image analysis", "science", "numpy", "pandas"],
    description:
      "At the beginning of my PhD, my team were spending a considerable amount of time performing basic processing on images collected at the electron microscope. To reduce this time, I decided to create a fully automated pipeline in python. I then created an application to automate this method and to make it as available to non-technical users as possible. I wrote full documentation and tutorials for this work, to ensure its wider usability within the electron microscopy community. The documentation still gets regular visits, and the work has been cited by other researchers. ",
    imageLink: "src/images/SimpliPyTEM-image2.png",
    blogId: null,
    PhD: true,
    externalLink: null,
  },

  {
    id: 2,
    title: "Imaging proteins by liquid-phase electron microscopy",
    subtitle: "Main Thesis project",
    tags: [
      "science",
      "electron microscopy",
      "biophysics",
      "methods development",
    ],
    imageLink: "src/images/MeWithMicroscope.jpeg",
    blogId: null,
    description: `
      The aim of my PhD was to develop liquid-phase electron microscopy into a method to image biological molecules and obtain the structure of the molecules. Whilst the topic was exciting, it was deeply flawed, as I showed in my thesis. The three main flaws that I identified were: 
      1) the molecules could not withstand the high energy impact of electrons and likely disintegrated too rapidly to be seen. 

      2) If the molecules were truly free in solution, they would move several orders of magnitude faster than our camera could detect, and 
      
      3) the signal-to-noise ratio of biological molecules is so low that speeding up detection or reducing electron dose is not possible. 
      
      Overall, the project proved enjoyable but futile.
      `,
    PhD: true,
    externalLink: "https://discovery.ucl.ac.uk/id/eprint/10189770/",
  },
  {
    id: 3,
    title: "Electron Microscopy Calculations",
    subtitle:
      "Jupyter notebooks to calculate, demonstrate and educate, focussing on various features of electron microscopy",
    tags: [
      "science",
      "electron microscopy",
      "python",
      "jupyter notebooks",
      "data visualisation",
      "data storytelling",
    ],
    imageLink: "src/images/CTF_simulation.gif",
    blogId: null,
    description:
      "At certain points in my thesis, I used Python to calculate, plot and create figures, I wanted this data to be accessible so I made the jupyter notebooks I used to calculate these publically accessible. In some cases, these are also incredibly informative. For example, I modelled different diffusion modes of a particle to demonstrate how these work. My favourite of these is the demonstration of how averaging many noisy images of the same underlying data can remove the noise.",
    PhD: true,
    externalLink: [
      "https://github.com/gabriel-ing/EM_calculations",
      "https://github.com/gabriel-ing/CTF_sim",
    ],
  },
  {
    id: 4,
    title: "Project San Marino",
    subtitle: "A virtual exercise challenge between Edinburgh and San Marino",
    tags: ["data visualisation", "python", "flask", "dashboards"],
    imageLink: "src/images/Example_dash.png",
    blogId: null,
    description: `My partner and I wanted to do some sort of exercise challenge like the conquerer challenges where all the activities we did were tracked on a virtual map. I build this idea into a fully fledge project, by using Strava's API to download the data, and combining Python's Flask library and some HTML and CSS to create a virtual dashboard. This was a super fun project to do, and somehow we managed the 2200km in just under 2 months!`,
    PhD: false,
    externalLink: "",
  },
  {
    id: 5,
    title: "Canoe Polo Whiteboard: Part 1",
    subtitle: "Creating a tactics whiteboard for Canoe Polo",
    tags: [
      "Web-development",
      "d3.js",
      "JavaScript",
      "interactive data visualisation",
    ],
    imageLink: "src/images/CanoePoloWhiteboard.gif",
    blogId: null,
    description: `Having recently started playing Canoe Polo competitively, I realised one session that I had no idea of the tactics of the game. I came up with the idea to have an visualisation tool like a virtual tactics whiteboard, where you could move the boats and ball around and animate different tactics. Over the next two days, I built a complete version, complete with file downloads and uploads, using d3.js to handle the mechanics.`,
    PhD: false,
    externalLink: "https://gabriel-ing.github.io/CanoePoloWhiteboard/",
  },
  {
    id: 6,
    title: "Canoe Polo Whiteboard Part 2",
    subtitle: "A 3D expansion to the tactics whiteboard",
    tags: ["three.js", "JavaScript", "d3.js", "3D modelling"],
    imageLink: "src/images/CanoePolo3D.gif",
    blogId: null,
    description:
      "After showing club-mates the original whiteboard, one of them commented that it would be good if the 2D model could be translated into a 3D first-person view of this. I had no idea how to do this, but came across three.js and  worked on it from there, and ended up with a reasonable result!",
    PhD: false,
    externalLink: "https://gabriel-ing.github.io/CanoePolo3D/",
  },
  {
    id: 7,
    title: "Colour palette generator",
    subtitle: "Create a new click-to-copy colour palette",
    tags: ["d3.js", "UI", "JavaScript"],
    imageLink: "src/images/ColorPaletteGenerator.png",
    blogId: null,
    description:
      "I was fed up with having a list of colours in a random sticky notes which was a pain to copy from, so I created a click-to-copy colour palette image online. I then expanded this to include a colour generation feature based on complementary positions on the colour wheel. I've tried to make this as convenient to use as possible, so once generated the palette is saved within the unique URL so it is possible to bookmark a colour palette page, making it revisitable.",
    PhD: false,
    externalLink: "https://gabriel-ing.github.io/ColorPalette/",
  },
  {
    id: 8,
    title: "Yahtzee in Java",
    subtitle: "A simple dice game in Java",
    tags: ["Java", "application development"],
    imageLink: "src/images/gameExample.png",
    blogId: null,
    description: `To practice my Java, I built an app-based version of classic dice game Yahtzee

This project turned out to be fairly straight-forward (took a couple of days), but I really enjoyed making it!`,
    PhD: true,
    externalLink: "https://github.com/gabriel-ing/Yahtzee_Java",
  },
  {
    id: 9,
    title: "GPT shopping list generator",
    subtitle: "Enter some recipe web-pages and it will return a shopping list!",
    tags: ["python", "LLM", "GPT", "web-scraping"],
    imageLink: "src/images/shoppingListGenerator.png",
    blogId: null,
    description: "I made a lightweight python application which uses the OpenAI API to parse links to recipe webpages, finds the ingredients and outputs a sorted shopping list.",
    PhD: true,
    externalLink: null,
  }
];

const blank = {
  id: 5,
  title: "",
  subtitle: "",
  tags: [],
  imageLink: "",
  blogId: null,
  description: "",
  PhD: true,
  externalLink: "",
};
