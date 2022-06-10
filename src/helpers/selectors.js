export default function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  const foundDay = state.days.find(findDay => findDay.name === day);

  if (!foundDay) {
    return [];
  }

  const appointmentsForTheDay = foundDay.appointments;

  const appointmentDetails = appointmentsForTheDay.map(id => state.appointments[id]);
  return appointmentDetails;
};

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  }
};

export function getInterviewersForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }
  const foundDay = state.days.find(findDay => findDay.name === day);

  if (!foundDay) {
    return [];
  }

  const interviewersForTheDay = foundDay.interviewers;

  const interviewersDetails = interviewersForTheDay.map(id => state.interviewers[id]);


  return interviewersDetails;


};

