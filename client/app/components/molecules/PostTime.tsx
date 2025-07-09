import { Text } from "@chakra-ui/react";
import { useState } from "react";

export const PostDate = (props: {date: string}) => {
    const postDate = new Date(props.date);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [days, setDays] = useState<number>(0);

    // Update the count down every 1 second
    const clock = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = now - postDate.getTime();

    // Time calculations for days, hours, minutes and seconds
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(clock);
    }
    }, 10000);
    return (
        <Text id="time">
            {days >= 7 ? `${postDate.toDateString()} ` : ""}
            {days > 1 && days < 7 ? `${days} days ${hours} hours ${minutes} min ago` : ""}
            {days === 1 ? `${days} day ${hours} hours ${minutes} min ago` : ""}
            {days === 0 ? `${hours} hours ${minutes} min ago` : ""}
        </Text>)
}