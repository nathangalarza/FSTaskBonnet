//Author: Nathan Javier Galarza Bonilla
//Date: 22/01/2022

//TASK: 
// Carla “Big Mon£y” Bordania has no time to waste. She thinks, breaths and lives money. 
// This can be seen through her motto in life: “Money is mine, and mine is money”. To 
// maintain her highly lucrative lifestyle, Carla needs to set up lots of meetings but recently, 
// she realised that the “set up” part of meetings often is the most time consuming and she 
// knows very well that this time could, of course, be used to make more cash. 
// Therefore, Carla decided to hire you, a smart cookie, to create an algorithm that, when fed 
// 2 or more schedules and a meeting duration, will automatically determine the earliest 
// possible time for a meeting. Carla knows that with this new tool of hers, she will be 
// spending less time on useless chit-chat and more time or valuable cash-chat.
// Requirements
// • All times in the calendars will be given in 24h format hh:mm, the result must also be in 
// that format
// • A meeting is represented by its start time (inclusively) and end time (exclusively) -> if a 
// meeting takes place from 09:00 - 11:00, the next possible start time would be 11:00
// • Carla works from 09:00 (inclusively) - 19:00 (exclusively), the appointment must start and 
// end within that range
// • If the meeting does not fit into the schedules, return null 
// • The duration of the meeting will be provided as an integer in minutes

const schedule = [
    //Monday
    [
        ['9:00', '11:30'],
        ['12:30', '13:00'],
        ['13:30', '14:00'],
        ['16:00', '17:30'],
        ['17:45', '19:00']
    ],
    // Tuesday
    [
        ['9:15', '12:00'],
        ['14:00', '16:30'],
        ['17:00', '17:30']
    ],
    //Wednesday
    [
        ['11:30', '12:15'],
        ['15:00', '16:30'],
        ['17:45', '19:00']
    ],
    //Thursday
    [
        ['10:00', '14:00']
    ],
    //Friday
    [
        ['9:00', '09:30'],
        ['11:00', '12:30'],
        ['14:00', '15:00'],
        ['18:00', '19:00']
    ]

]

/**
 * Given a schedule and a duration it will find the first solution to getting the 
 * earliest possible meeting
 * @param {Array<Array>, duration<number>} schedule = times that have meetings;
 * @return {solution<hour>} hour = hour format of nearest time in 24 hh:mm
 */
function ScheduleMeeting(schedule, duration) {
    let meetingRanges = getOpenMeetings(schedule);
    //The array of solutions shows a list of possible hours from Monday-Friday
    let solution = [];
    meetingRanges.map((meet => {
        solution.push(meet.find(range => rangeToMinutes(range) >= duration));
    }));

    return solution.find(item => item !== undefined) || null;
}
/**
 * Get Open meetings will find a list of possible meeting times form mon-fri.
 * @param {Array<Array>} schedules = a day of a given schedule  eg: Monday [0][  ['9:00', '11:30']]
 * @return {Array<Array>} open meetings = all the meetings in which there is no conflict
 */
function getOpenMeetings(schedules) {
    let res = [];
    return schedules.reduce((openSlots, schedule) => {
        let open = getOpenSlots(schedule);
        res.push(open);
        return res;
    }, [
        [, ]
    ]);

}
/**
 * Given a schedule it will find opened slots in an exact date eg: Monday ['9:00', '10:00']['12:00', '13:00']
 * for an hour schedule for monday it will choose 10:00 to 11:00
 * @param {Array<Array>} schedule = times that have meetings in a day eg: Monday
 * @return {Array<Array>} available slots = times in which it does not conflict with the schedule.
 */
function getOpenSlots(schedule) {
    let res = [];
    let head = schedule[0] && schedule[0][0];
    let tail = schedule[schedule.length - 1] && schedule[schedule.length - 1][1];

    if (schedule.length <= 1) {
        return schedule;
    }

    if (head !== '9:00') {
        res.push(['09:00', head]);
    }

    schedule.forEach((curr, i) => {
        let prev = schedule[i - 1];
        let isTimeBetween = prev && prev[1] !== curr[0];

        if (i > 0 && isTimeBetween) {
            res.push([prev[1], curr[0]]);
        }
    });

    if (tail !== '19:00') {
        res.push([tail, '19:00']);
    }

    return res;
}

/**
 *returns the length in minutes of a time range eg: between ['9:00', '10:00']
 *should return 60 
 * @param {Array<Number>} range
 * @return {Number} The minutes in the range
 */
function rangeToMinutes(range) {
    let mins = 0;
    let start = range[0];
    let end = range[1];
    let startParts = start.split(':');
    let endParts = end.split(':');
    let startHour = +startParts[0];
    let endHour = +endParts[0];
    let startMins = +startParts[1];
    let endMins = +endParts[1];

    if (startHour !== endHour) {
        let hrMins = (endHour - startHour) * 60;
        mins += hrMins;
    }

    if (startMins !== endMins) {
        mins += (endMins - startMins)
    }

    return mins;
}
//Startup function for testing.
function scheduleling() {
    return ScheduleMeeting(schedule, 60);
}

console.log(scheduleling());