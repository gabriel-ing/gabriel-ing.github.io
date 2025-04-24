import React from "react";

const About = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold">About me</h2>
      <img
        src="images/About_photos/ING15738-3-compressed.jpg"
        width="400px"
        className="m-auto mb-4 rounded-4xl border-2 border-purple-10"
      ></img>
      <p>
        Hi! I'm Gabriel am a programmer, scientist and PhD graduate living in
        Edinburgh, UK. I made this website to showcase some of the recent
        projects I have been working on, including a summary of various aspects
        of my PhD. Feel free to have a look, and get in touch (linkedIn icon
        below) if you would like any more info!
      </p>
      {/* <a
        href="https://www.linkedin.com/in/gabriel-ing-b94586144"
        class="icon brands fa-linkedin"
        target="_blank"
      >
      </a> */}
      <h3 className="text-2xl m-8  m-4 font-semibold">Education</h3>
      <ul className="mt-3 mb-3">
        <li>
          <p>
            <strong>
              PhD in Biophysics - Transmission Electron Microscopy
            </strong>
            <br></br>
            <strong>
              University College London <br></br>2019-2024
            </strong>
            <br></br>
            <br></br>I was developing a new method to image biological molecules
            with liquid-phase electron microscopy. This was a busy mixture of
            experimenting, analysing image and videos, and theorising on the
            physics behind the approach. For more info, check the{" "}
            <a href="#work">PhD summary</a> page!
          </p>
        </li>
        <li>
          <p>
            <strong>
              Biochemistry BSc <br></br> Imperial College London <br></br>
              2016-2019<br></br>1st Class
            </strong>
          </p>
          <p>
            I specialised in structural biology (biophysics) and bioinformatics.{" "}
            <br></br> I received high grades throughout the degree, including
            being in the top 10% of the year in my second year and getting a
            first in every module in 2nd and 3rd year.
          </p>
        </li>
      </ul>

      <h3 className="text-2xl m-8 font-semibold">Personal Interests</h3>
      <p>
        I like to stay busy, meaning now I have a ton of hobbies. They can
        generally be broken down into two categories:{" "}
      </p>
      <h4 className="text-l m-4 font-semibold">Sports</h4>
      <ul>
        <li>
          <strong>Sailing</strong> - I competitively sailed throughout school
          and university, including competing at a high level on the team racing
          scene.
        </li>
        <li>
          <strong>Cycling</strong> - I particularly like bikepacking
          expeditions!
        </li>
        <li>
          <strong>Hillwalking and mountaineering</strong> - I love mountains and
          the experience of climbing them (even in dodgy conditions).
        </li>
        <li>
          <strong>Running</strong>
        </li>

        <li>
          <strong>Canoe Polo</strong> - I've recently started playing this
          sport, and am loving it so far!
        </li>
      </ul>
      <h4 className="text-l m-4 font-semibold">Making things</h4>
      <ul>
        <li>
          <strong>Knitting</strong> - I enjoy knitting and have made several
          jumpers and too many hats.
        </li>
        <li>
          <strong>Photography</strong> - in the past I wanted to be a
          photographer, and many years of nice portfolio pictures. My love of
          taking photos has been lessoned in recent years, as I focus more on
          enjoying the moment, but it'll return at some point.
        </li>
        <li>
          <strong>Painting and relief printing</strong> - I learned to draw ok
          as an adult, so I'm not an expert here, but I enjoy it as a way of
          chilling out.
        </li>
      </ul>
      <h3 className="text-2xl m-8  m-4 font-semibold">CV</h3>
      <embed
        src="CV.pdf"
        width="600"
        height="800"
        type="application/pdf"
      />
    </div>
  );
};

export default About;
