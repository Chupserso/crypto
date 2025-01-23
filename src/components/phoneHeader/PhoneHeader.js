import "./PhoneHeader.css";

export const PhoneHeader = (props) => {
    const {time, color, batteryStyles, com, wifi, battery} = props;
    let signal1, signal2, signal3, signal4;

    for (let i = 0; i < Number(com); i++) {
        if (i == 0) {
            signal1 = "active-signal";
        }
        if (i == 1) {
            signal2 = "active-signal";
        }
        if (i == 2) {
            signal3 = "active-signal";
        }
        if (i == 3) {
            signal4 = "active-signal";
        }
    }

    let wifi2 = "", wifi3 = "";

    if (wifi == 1) {
        wifi2 = "none";
        wifi3 = "none";
    } else if (wifi == 2) {
        wifi3 = "none";
    } else if (wifi == 3) {
    }

    let radiusClassName = "";
    if (battery == 100) {
        radiusClassName = "radius";
    }

    return (
        <div className="header">
            <div className="time">{time}</div>
            <div className="icons">
                <div className="signal">
                    <div className="signal-wrapper">
                        <div className={"signal1 signal-item " + signal1}></div>
                        <div className={"signal2 signal-item " + signal2}></div>
                        <div className={"signal3 signal-item " + signal3}></div>
                        <div className={"signal4 signal-item " + signal4}></div>
                    </div>
                </div>
                <div className="waveStrength-3"> 
                    <div className={"wv3 wave " + wifi3}></div>
                    <div className={"wv2 wave " + wifi2}></div>
                    <div className={"wv1 wave "}></div>
                </div>
                <div className="battery">
                    {/* <span>{battery}</span> */}
                    <div className={"part " + color + " " + radiusClassName} style={batteryStyles}></div>
                </div>
            </div>
        </div>
    );
}