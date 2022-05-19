import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";


storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));


storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  
  ));
//copying it to src/components
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
  //day and setDay changed to value and onChange to follow the name convention from application.js and DayList.js
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} value={"Monday"} onChange={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
    ))
    .add("Wednesday", () => (
        <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
    ));
  

    //stories for InterviewerListItem
    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };
    
    storiesOf("InterviewerListItem", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Unselected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        />
      ))
      .add("Selected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      ))
      .add("Clickable", () => (
        <InterviewerListItem
          // id={interviewer.id}s
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={() => action("setInterviewer")(interviewer.id)}
        />
      ));

//stories for InterviewerList

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      // interviewer={3} changed to value below to follow the name convention
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      id={interviewers}
      interviewers={interviewers}
      // setInterviewer={action("setInterviewer")} changed to onChange to follow controlled name convention
      onChange={action("setInterviewer")}
    />
  ));

  //stories for Appointment
  storiesOf("Appointment", module)
  //storiesOf("string that labels the group", webpack module available on the global (per-file) scope)
    .addParameters({
  //The addParameters function can be chained to storiesOf and can be passed an object of parameters. 
      backgrounds: [{ name: "white", value: "#fff", default: true }]
    })
  //Once this initial code has been set up, we can add stories by 
  //chaining an add() function for any number of stories that we want to write.
  //he add() function accepts the name of the story as a string and a function 
  //that returns a React component.
    .add("Appointment", () => <Appointment />)
    .add("Appointment with Time", () => <Appointment time="12pm" />)
    .add("Header", () => <Header time="12pm" />)
    .add("Empty", () => <Empty onAdd={action("onAdd")} />)
    .add("Show", () => <Show student="Lydia Miller-Jones" interviewer={interviewers[0].name} 
                            onEdit={action("onEdit")} onDelete={action("onDelete")} />);





    