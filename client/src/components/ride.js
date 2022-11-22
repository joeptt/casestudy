import { useEffect, useState } from "react";

export default function Ride({ ride }) {
    const [duration, setDuration] = useState();
    const [progressBar, setProgressBar] = useState();

    useEffect(() => {
        // Get the duration by converting the time into minutes and substracting from one another
        const calculateDuration = (start, end) => {
            const startMinutes = convertToMinutes(start);
            const endMinutes = convertToMinutes(end);
            const durationInMinutes = endMinutes - startMinutes;
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;
            setDuration(`${hours}h ${minutes}min`);
        };

        const convertToMinutes = (time) => {
            const arr = time.split(":");
            return +arr[0] * 60 + +arr[1];
        };

        const calculatePercentage = (start, end) => {
            const startMinutes = convertToMinutes(start);
            const endMinutes = convertToMinutes(end);
            const date = new Date();
            const time = date.getHours() + ":" + date.getMinutes();
            const timeInMinutes = convertToMinutes(time);
            const duration = endMinutes - startMinutes;
            const currentDuration = timeInMinutes - startMinutes;
            if (currentDuration > duration) {
                setProgressBar("100%");
            } else {
                // Prozentsatz rechnen
                const percent = Math.floor((currentDuration / duration) * 100);
                setProgressBar(`${percent}%`);
            }
        };

        calculatePercentage(ride.starttime, ride.endtime);
        calculateDuration(ride.starttime, ride.endtime);
    }, [ride.starttime, ride.endtime]);

    return (
        <div className="ride-wrapper">
            <div className="connection-wrapper">
                <span className="from">{ride.from}</span>
                <span className="to">{ride.to}</span>
            </div>
            <div className="progress-bar">
                <div
                    style={{ width: `${progressBar}` }}
                    className="progress"
                ></div>
                <span className="start-end-point"></span>
                <span className="duration">{duration}</span>
                <span className="start-end-point"></span>
            </div>
            <div className="time-wrapper">
                <span className="timeDep">{ride.starttime} Uhr</span>
                <span className="timeArr">{ride.endtime} Uhr</span>
            </div>
        </div>
    );
}
