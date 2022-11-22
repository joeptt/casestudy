import { useEffect, useState } from "react";
import Ride from "./components/ride";

export default function App() {
    const [allRides, setAllRides] = useState();
    const [ridesDisplayed, setRidesDisplayed] = useState();
    const [fromButtonClicked, setFromButtonClicked] = useState(false);
    const [toButtonClicked, setToButtonClicked] = useState(false);

    useEffect(() => {
        fetch("/rides")
            .then((res) => res.json())
            .then((data) => {
                setAllRides(data.rides);
                setRidesDisplayed(data.rides);
            });
    }, []);

    const fromFrankfurt = () => {
        if (fromButtonClicked) {
            setRidesDisplayed(allRides);
        } else {
            const arr = [];
            for (let i = 0; i < allRides.length; i++) {
                if (allRides[i].from === "Frankfurt(Main)Hbf") {
                    arr.push(allRides[i]);
                }
            }
            setRidesDisplayed(arr);
        }
        setFromButtonClicked(!fromButtonClicked);
    };

    const toFrankfurt = () => {
        if (toButtonClicked) {
            setRidesDisplayed(allRides);
        } else {
            const arr = [];
            for (let i = 0; i < allRides.length; i++) {
                if (allRides[i].to === "Frankfurt(Main)Hbf") {
                    arr.push(allRides[i]);
                }
            }
            setRidesDisplayed(arr);
        }
        setToButtonClicked(!toButtonClicked);
    };

    return (
        <div className="page-wrapper">
            {ridesDisplayed && (
                <div>
                    <h1>DB Fahrplananzeige</h1>
                </div>
            )}
            {ridesDisplayed && (
                <div>
                    <button onClick={fromFrankfurt}>Von Frankfurt</button>
                    <button onClick={toFrankfurt}>Nach Frankfurt</button>
                </div>
            )}
            {ridesDisplayed ? (
                ridesDisplayed.map((ride, i) => {
                    return <Ride key={i} ride={ride} />;
                })
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
}
