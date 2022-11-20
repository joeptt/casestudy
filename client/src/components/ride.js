export default function Ride({ ride }) {
    return (
        <div className="ride-wrapper">
            <div className="connection-wrapper">
                <span className="from">{ride.from}</span>
                <span className="to">{ride.to}</span>
            </div>
            <div className="progress-bar">
                <span></span>
                <span>1h</span>
                <span></span>
            </div>
            <div className="time-wrapper">
                <span className="timeDep">{ride.starttime}</span>
                <span className="timeArr">{ride.endtime}</span>
            </div>
        </div>
    );
}
