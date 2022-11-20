import { useEffect, useState } from "react";
import Ride from "./components/ride";

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
        <div className="page-wrapper">
            {rides && (
                <div>
                    <h1>Fahrplananzeige</h1>
                </div>
            )}
            {rides && (
                <div>
                    <button>Von Frankfurt</button>
                    <button>Nach Frankfurt</button>
                </div>
            )}
            {rides ? (
                rides.map((ride, i) => {
                    return <Ride key={i} ride={ride} />;
                })
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
}
