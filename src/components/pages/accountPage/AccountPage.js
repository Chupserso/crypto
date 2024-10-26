import React, { useState, useEffect } from "react";
import "./AccountPage.css";
import { PhoneHeader } from "../../phoneHeader/PhoneHeader";
import kolpakImg from "./kolpak.png"
import konvImg from "./conv.png";
import btcImg from "./btc.png";
import usdtImg from "./usdt.png";
import usdcImg from "./usdc.png";
import etcImg from "../../../icons/etc.svg";
import backImg from "../../../icons/back_icon.svg";
import mangImg from "../../../icons/management_icon.svg";
import eyeImg from "../../../icons/review_icon.svg";
import appoint1Img from "../../../icons/repair appointment_icon.svg";
import infoImg from "../../../icons/info_icon.svg";
import depositImg from "../../../icons/deposit_icon.svg";
import transferImg from "../../../icons/transfer_icon.svg";
import conv1Img from "../../../icons/conversion2_icon.svg";
import loanImg from "../../../icons/loans_icon.svg";
import rebootImg from "../../../icons/reboot_icon.svg";
import searchImg from "../../../icons/search_icon.svg";
import arrowImg from "./arrow.png";

export const AccountPage = () => {
    // Считываем данные из localStorage или устанавливаем значения по умолчанию
    const [balance, setBalance] = useState(() => localStorage.getItem("balance") || 8.63);
    const [time, setTime] = useState(() => localStorage.getItem("time") || "16:03");
    const [btcValue, setBtcValue] = useState(() => localStorage.getItem("btcValue") || 0.00013565);
    const [pnlValue, setPnlValue] = useState(() => localStorage.getItem("pnlValue") || 0.00);
    const [crypto, setCrypto] = useState(() => {
        const savedCrypto = localStorage.getItem("crypto");
        return savedCrypto
            ? JSON.parse(savedCrypto)
            : {
                USDT: { name: "Tether USDT", balance: 8.6395, usd: 8.63, image: usdtImg },
                USDC: { name: "USD Coin", balance: 0, usd: 0, image: usdcImg },
                BTC: { name: "Bitcoin", balance: 0, usd: 0, image: btcImg },
                ETH: { name: "Ethereum", balance: 0, usd: 0, image: etcImg }
            };
    });

    // Сохранение данных в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem("balance", balance);
    }, [balance]);

    useEffect(() => {
        localStorage.setItem("time", time);
    }, [time]);

    useEffect(() => {
        localStorage.setItem("btcValue", btcValue);
    }, [btcValue]);

    useEffect(() => {
        localStorage.setItem("pnlValue", pnlValue);
    }, [pnlValue]);

    useEffect(() => {
        localStorage.setItem("crypto", JSON.stringify(crypto));
    }, [crypto]);

    const handleBalanceChange = (e) => {
        setBalance(e.target.value);
    };

    const handleCryptoChange = (e, cryptoType) => {
        const { name, value } = e.target;
        setCrypto((prevCrypto) => ({
            ...prevCrypto,
            [cryptoType]: {
                ...prevCrypto[cryptoType],
                [name]: value
            }
        }));
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleBtcChange = (e) => {
        setBtcValue(e.target.value);
    };

    const handlePnlChange = (e) => {
        setPnlValue(e.target.value);
    };

    if (localStorage.getItem("battery")) {
        const ok = 1;
    } else {
        localStorage.setItem("battery", 100);
    }
    const [battery, setBattery] = useState(localStorage.getItem("battery"));

    let color;

    if (battery <= 18) {
        color = "red"
    } else if (battery > 18 && battery < 50) {
        color = "orange"
    } else if (battery >= 50) {
        color = "green"
    }

    const batteryStyles = {"width": `${battery}%`, color};

    const onBatteryInput = (e) => {
        setBattery(e.target.value);
        localStorage.removeItem("battery");
        localStorage.setItem("battery", e.target.value);
    }

    if (localStorage.getItem("com")) {
        const ok = 1;
    } else {
        localStorage.setItem("com", 2);
    }
    const [com, setCom] = useState(localStorage.getItem("com"));

    if (localStorage.getItem("wifi")) {
        const ok = 1;
    } else {
        localStorage.setItem("wifi", 2);
    }
    const [wifi, setWifi] = useState(localStorage.getItem("wifi"));

    return (
        <>
            <div className="container">
                <PhoneHeader wifi={wifi} com={com} batteryStyles={batteryStyles} time={time} color={color} />
                <div className="title">
                    <div className="back-arrow"><i className="fas fa-arrow-left text-xl"></i></div>
                    <span>Единый торговый аккаунт</span>
                    <div className="icons">
                        <div><img src={infoImg} /></div>
                        <div><img src={appoint1Img} /></div>
                    </div>
                </div>
                <div className="balance-card">
                    <div className="balance-text">Баланс средств <img className="eye" src={eyeImg} /></div>
                    <div className="balance">
                        {balance} <span>USD</span> <img className="botArrow" src={arrowImg} />
                    </div>
                    <div className="balance-sub">≈ {btcValue} BTC</div> {/* Редактируемое значение BTC */}
                    <div className="balance-sub" style={{ color: "#fff", marginTop: "10px" }}>
                        P&amp;L за сегодня <span className="pl-span">{pnlValue} USD</span> {/* Редактируемое значение P&L */}
                    </div>
                    <div className="balance-details">
                        <div>
                            <span>Баланс кошелька</span>
                            <span className="money">
                                <div className="number">{balance}</div> USD
                            </span>
                        </div>
                        <div>
                            <span>Нереализованный P&L (бесср. и фьючерсы)</span>
                            <span className="money">
                                <div className="number">0.00</div> USD
                            </span>
                        </div>
                    </div>
                    <hr />
                    <span className="card-text">Изолированная маска <i style={{"margin-left": "10px"}} className="fas fa-arrow-right"></i></span>
                </div>
                <div className="management">
                    Руководство по Единому торговому аккаунту
                    <div className="img">
                        <img src={mangImg} />
                    </div>
                </div>
                <div className="line">
                    <div className="line-first"></div>
                    <div className="line-second"></div>
                </div>
                <div className="actions">
                    <div className="action">
                        <img className="act-1" src={depositImg} /> <span className="sp1">Депозит</span>
                    </div>
                    <div className="action">
                        <img className="act-2" src={transferImg} /> <span className="sp2">Перевод</span>
                    </div>
                    <div className="action">
                        <img className="act-3" src={conv1Img} /> <span className="sp3">Конвертация</span>
                    </div>
                    <div className="action">
                        <img className="act-4" src={loanImg} /> <span className="sp4">Займы</span>
                    </div>
                </div>
                <div className="crypto-section">
                    <div className="crypto-header">
                        <div className="title">Криптовалюта</div>
                    </div>
                    <div className="zero-balances">
                        <div>
                            <div className="checkbox"></div>
                            <span>Скрыть нулевые балансы</span>
                        </div>
                        <div className="imgs">
                            <div><img src={rebootImg} /></div>
                            <div><img src={searchImg} /></div>
                        </div>
                    </div>
                    <div className="crypto-list">
                        {Object.entries(crypto).map(([key, data]) => {
                            let img = data.image;

                            if (data.name == "Ethereum") {
                                img = etcImg;
                            }

                            return (
                                <div key={key} className="crypto-item">
                                    <div className="crypto-info">
                                        <img
                                            alt={`${key} icon`}
                                            height="24"
                                            src={img}
                                            width="24"
                                        />
                                        <div>
                                            <div className="crypto-name">{key}</div>
                                            <div className="crypto-fullname">{data.name}</div>
                                        </div>
                                    </div>
                                    <div className="crypto-balance">
                                        <div className="balance">{data.balance}</div>
                                        <div className="balance-usd">{data.usd} USD</div>
                                    </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Форма для редактирования */}
            <div className="edit-container">
                <h3>Редактировать данные</h3>
                <label>Связь от 0 до 4</label>
                <input
                    type="number"
                    value={com}
                    onChange={(e) => {
                        setCom(e.target.value);
                        localStorage.removeItem("com");
                        localStorage.setItem("com", e.target.value);
                    }}
                    placeholder="Изменить связь"
                    min="1"
                    max="4"
                />
                <label>Изменить вайфай сигнал от 1 до 3</label>
                <input
                    type="number"
                    value={wifi}
                    onChange={(e) => {
                        setWifi(e.target.value);
                        localStorage.removeItem("wifi");
                        localStorage.setItem("wifi", e.target.value);
                    }}
                    placeholder="Изменить Wifi"
                    min="1"
                    max="3"
                />
                <label>Заряд</label>
                <input
                    type="number"
                    value={battery}
                    onChange={onBatteryInput}
                    placeholder="Изменить батарею"
                    min="1"
                    max="100"
                />
                <div className="edit-form">
                    <div className="form-group">
                        <label>Время:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={time}
                            onChange={handleTimeChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Баланс (USD):</label>
                        <input
                            type="number"
                            className="form-control"
                            value={balance}
                            onChange={handleBalanceChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Значение BTC:</label>
                        <input
                            type="number"
                            step="0.00000001"
                            className="form-control"
                            value={btcValue}
                            onChange={handleBtcChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>P&L за сегодня (USD):</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={pnlValue}
                            onChange={handlePnlChange}
                        />
                    </div>
                    {Object.entries(crypto).map(([key, data]) => (
                        <div key={key} className="crypto-edit">
                            <h4>{key}</h4>
                            <div className="form-group">
                                <label>Полное имя:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => handleCryptoChange(e, key)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Баланс (Crypto):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="balance"
                                    value={data.balance}
                                    onChange={(e) => handleCryptoChange(e, key)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Баланс (USD):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="usd"
                                    value={data.usd}
                                    onChange={(e) => handleCryptoChange(e, key)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};