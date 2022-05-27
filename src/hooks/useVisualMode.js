import React, { useState } from "react";

//test 1
// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  console.log("mode is", mode);
  //history of the modes, so we can go backwards
  const [history, setHistory] = useState([initial]);

  function transition(version) {//first {{}
  //  change the mode with setMode function,   
   setMode(version);
   //When transition is called, we need to add the new mode to our history.
   //here we are creating history we could work with t later
   setHistory( prev => [...prev, version]);

  }
  function back() {
    //push to history?
    //sets the 
    //[one, two, three]
//remove history -1
//[one, two]
    setHistory( prev => [ ...prev.slice(0, -1)]);
    if (history.length > 1) {
      setMode(history[history.length - 2]);
    }
    //[one, two, three] - 2 becouse setHistory is async
    
    
    // setHistory.push(newMode)
    // toPop.pop(setHistory -1)
    
  }
  console.log("back", back)
  //return the object containing the initial version and the version from the transition function
  //call with transition

  return {mode, transition, back}

};
//: newMode[newMode.length - 1]
// hint
// function useCustomHook() {
//   function action() {}
//   return { action };
// }



// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property
