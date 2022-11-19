import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
    const [rides, setRides] = useState();

    useEffect(() => {
        fetch("/rides")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.rides);
                setRides(data.rides);
            });
    }, []);

    return (
        <div>
            <p>Hello, World!</p>
            {rides ? (
                rides.map((ride, i) => {
                    return <p key={i}>{ride.to}</p>;
                })
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
}
