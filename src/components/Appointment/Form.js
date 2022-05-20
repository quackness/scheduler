import React, { useState } from 'react';
import InterviewerList from "../InterviewerList.js";
import Button from "../Button.js";


export default function Form(props){
  //we add state to form it is the only place when those values will be changed
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);



  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input 
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
          your code goes here
        */
       value = {student}
       onChange={(nameEdit) => setStudent(nameEdit.target.value)}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      // setInterviewer={() => onChange(props.interviewer)}
      // onChange={setStudent(interviewer)}
      // selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)} 
     
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  );
}