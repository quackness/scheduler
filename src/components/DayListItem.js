import React from 'react';
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })
  //fix the outputs to pass the tests
  const formatSpots = function() {
    if (props.spots === 0) {
      return "no spots remaining"
    } else if (props.spots === 1) {
      return "1 spot remaining"
    } else {
      return `${props.spots} spots remaining`
    }
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
    {/* https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/899?journey_step=54&workbook=22 */}
    {/* <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}></li> */}
    {/* li is the day item */}
      <h2 className="text--regular">{props.name}</h2> 
      {/* <h3 className="text--light">{props.spots} spots remaining</h3> */}
      <h3 className="text--light">{formatSpots()}</h3>
      
    </li>
  );
}