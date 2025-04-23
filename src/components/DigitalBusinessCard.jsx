import React, { useState } from "react";

const DigitalBusinessCard = () => {
  let [showFront, setShowFront] = useState(true);
  let [showBack, setShowBack] = useState(false);
  return (
    <>
    <iframe src="public/Gabriel-Ing-Digital-Business-Card.html" scrolling="no" width="95%" height="600" className="overflow-hidden rounded-2xl m-10 bg-turquoise-95"></iframe>
      {
        // <>
        //   <div className="mt-20 mb-20 mx-auto w-4/5 bg-turquoise-90 h-100 rounded-3xl p-5 shadow-2xl" id="flipcard">
        //     {showFront && (
        //       <>
        //         hello world
        //         <button
        //           className="w-10"
        //           onClick={() => {
        //             setShowFront(!showFront);
        //             setShowBack(true);
        //             document.getElementById("flipcard").style.transition= "transform 2s"
        //             document.getElementById("flipcard").style.transform = "rotateX(-360deg)"
        //           }}
        //         >
        //           click
        //         </button>
        //       </>
        //     )}
        //     {showBack && <>I'm on the back!</>}
        //   </div>
        // </>
      }
    </>
  );
};

export default DigitalBusinessCard;
