import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    console.log(interviewer)
    return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
       //if the persons id matches select it
      // selected = {interviewer.id === props.interviewer}
      selected={interviewer.id === props.value}
      //passing the function down through the comp.
      // setInterviewer = {() => props.setInterviewer(interviewer.id)}
      setInterviewer={() => props.onChange(interviewer.id)}    
      // interviewer = {props.interviewer}   
    />
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}