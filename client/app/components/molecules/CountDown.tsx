import { useEffect, useRef, useState } from "react";
import { useCountdownClockContext } from "../context/CountdownClockContext";
import { server } from "~/config";
import { toaster } from "../ui/toaster";

let clock: NodeJS.Timeout | null = null;

export const CountdownClock = () => {
    const { countdownDate, setCountdownDate, currentTurn, setCurrentTurn } = useCountdownClockContext();
    const [message, setMessage] = useState()
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [days, setDays] = useState<number>(0);

    useEffect(() => {
        fetch(`${server}api/turn`).then((res) => {
            console.log(res.body);
            !res.ok ? toaster.create({ type: 'error', description: `Failed to load Turn`, duration: 5000 }) : undefined;
            return res.json();
        }).then(json => {
            setCountdownDate(new Date(json.endTime))
            setCurrentTurn(Number(json.number));
        });
    }, []);

    // Update the count down every 1 second
    useEffect(
        () => {
            if (clock != null) {
                clearInterval(clock);
            }
            clock = setInterval(function () {

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
                    if (clock != null) {
                        clearInterval(clock);
                    }
                    setDays(0);
                    setHours(0);
                    setMinutes(0);
                    setSeconds(0);
                }
            }, 1000);
        },
        [countdownDate, currentTurn]
    )


    return (<h1 id="time">Turn {currentTurn} | {days}d {hours}h {minutes}m {seconds}s</h1>)
}