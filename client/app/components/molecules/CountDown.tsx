import { useState } from "react";
import { useCountdownClockContext } from "../context/CountdownClockContext";

export const CountdownClock = () => {
    const { countdownDate } = useCountdownClockContext();
    const [message, setMessage] = useState()
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [days, setDays] = useState<number>(0);

    // Update the count down every 1 second
    const clock = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countdownDate.getTime() - now;

    // Time calculations for days, hours, minutes and seconds
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(clock);
        document.getElementById("time").innerHTML = "EXPIRED";
    }
    }, 1000);

    return (<h1 id="time">{days}d {hours}h {minutes}m {seconds}s</h1>)
}