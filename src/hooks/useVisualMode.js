import React, { useState } from "react";

//test 1
// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  console.log("mode is", mode)

  const transition = function (version) {//first {{}
  //  change the mode with setMode function,   
   setMode(version);
  }
  //return the object containing the initial version and the version from the transition function
  //call with transition

  return {mode, transition}

};


//arr length is 2, when we do -1 we go 2-1 = position 1, which is the second
//let mode = ["first", "second"];




