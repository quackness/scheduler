import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  //apply a class if the interviewer is selected
  let interviewersClass = classNames("interviewers__item", {
    'interviewers__item--selected': props.selected
    })
  
  return (
    <li className={interviewersClass} onClick = {props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        //replacing hardcoded values with props
      />
      {/* Conditionally render the interviewer's name, only when selected */}
      { props.selected && props.name }
    </li>
  );
}