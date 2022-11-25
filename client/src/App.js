import { useEffect, useState } from "react";
import Ride from "./components/ride";
import LoadingRing from "./components/loading-ring";

export default function App() {
    const opacity = 100;
    const clickedOpacity = 50;
    const [allRides, setAllRides] = useState();
    const [ridesDisplayed, setRidesDisplayed] = useState();
    const [fromButtonClicked, setFromButtonClicked] = useState(false);
    const [toButtonClicked, setToButtonClicked] = useState(false);
    const [fromButtonOpacity, setFromButtonOpacity] = useState(opacity);
    const [toButtonOpacity, setToButtonOpacity] = useState(opacity);

    useEffect(() => {
        // get all connections from server
        fetch("/rides")
            .then((res) => res.json())
            .then((data) => {
                setAllRides(data.rides);
                setRidesDisplayed(data.rides);
            });
    }, []);

    // onClick to display only connections with departure from Frankfurt
    const fromFrankfurt = () => {
        // unfocus the "Nach Frankfurt"-button
        setToButtonClicked(false);
        setToButtonOpacity(opacity);
        if (fromButtonClicked) {
            // if the button is currently focused display all connections again and raise opacity
            setFromButtonOpacity(opacity);
            setRidesDisplayed(allRides);
        } else {
            // if the button is currently not focused, set opacity low and iterate through all connections to find the
            // ones going to Frankfurt
            setFromButtonOpacity(clickedOpacity);
            // Using for-loop
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

    // onClick to display only connections with arrival to Frankfurt
    const toFrankfurt = () => {
        setFromButtonClicked(false);
        setFromButtonOpacity(opacity);
        if (toButtonClicked) {
            setToButtonOpacity(opacity);
            setRidesDisplayed(allRides);
        } else {
            setToButtonOpacity(clickedOpacity);
            // Using filter method
            const arr = allRides.filter((ride) => {
                return ride.to === "Frankfurt(Main)Hbf";
            });
            setRidesDisplayed(arr);
        }
        setToButtonClicked(!toButtonClicked);
    };

    return (
        <>
            {ridesDisplayed ? (
                <>
                    <div className="text-wrapper">
                        <span>DB</span>
                        <span>&nbsp;</span>
                        <span>Fahrplananzeige</span>
                    </div>
                    <div className="buttons-wrapper">
                        <button
                            style={{ opacity: `${fromButtonOpacity}%` }}
                            onClick={fromFrankfurt}
                        >
                            von Frankfurt
                        </button>
                        <button
                            style={{ opacity: `${toButtonOpacity}%` }}
                            onClick={toFrankfurt}
                        >
                            nach Frankfurt
                        </button>
                    </div>
                    <div className="rides-wrapper">
                        {ridesDisplayed.map((ride) => {
                            return <Ride key={ride.uniqueID} ride={ride} />;
                        })}
                    </div>
                </>
            ) : (
                <LoadingRing />
            )}
        </>
    );
}
