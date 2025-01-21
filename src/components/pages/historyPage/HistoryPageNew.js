import React, { useState, useEffect } from "react";
import './HistoryPage.css';  // Внешний файл стилей
import { PhoneHeader } from "../../phoneHeader/PhoneHeader";
import arrowImg from "./arrow.png";
import topImg from "../../../icons/P&L_icon.svg";
import newIcon from "../../../icons/open in new_icon.svg";
import rightImg from "../accountPage/right.svg";
import Swal from 'sweetalert2'
import rightArrowImg from "./rightArrow.png";
import downArrowImg from "./downArrow.png";
import leftArrowImg from "./arrowLeft.png";
import circlesImg from "./circles.png";
import groupImg from "./group.png";

const OrderForm = ({ onCreate }) => {
    const [order, setOrder] = useState({
        color: "Красный",
        pair: "",
        status: "Закрыть Long", // Значение по умолчанию
        time: "",
        pnl: "",
        amount: "",
        entryPrice: "",
        exitPrice: "",
        openFee: "",
        closeFee: "",
        financeFee: "",
        executionType: ""
    });

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e) {  // Проверяем наличие времени для создания уникального идентификатора ордера
            const newOrder = { ...order, id: Date.now() }; // Добавляем уникальный идентификатор
            onCreate(newOrder);
            setOrder({
                color: "Красный",
                pair: "",
                status: "Закрыть Long",
                time: "",
                pnl: "",
                amount: "",
                entryPrice: "",
                exitPrice: "",
                openFee: "",
                closeFee: "",
                financeFee: "",
                executionType: ""
            });
        }
    };

    return (
        <form className="order-form" onSubmit={handleSubmit}>
            <select name="color" value={order.color} onChange={handleChange}>
                <option value="Красный">Красный</option>
                <option value="Зеленый">Зеленый</option>
            </select>
            <input type="text" name="pair" value={order.pair} onChange={handleChange} placeholder="Пара" />
            <select name="status" value={order.status} onChange={handleChange}>
                <option value="Закрыть Long">Закрыть Long</option>
                <option value="Закрыть Short">Закрыть Short</option>
            </select>
            <input type="text" name="time" value={order.time} onChange={handleChange} placeholder="Время" />
            <input type="text" name="pnl" value={order.pnl} onChange={handleChange} placeholder="P&L" />
            <input type="text" name="amount" value={order.amount} onChange={handleChange} placeholder="Кол-во" />
            <input type="text" name="entryPrice" value={order.entryPrice} onChange={handleChange} placeholder="Цена входа" />
            <input type="text" name="exitPrice" value={order.exitPrice} onChange={handleChange} placeholder="Цена выхода" />
            <input type="text" name="openFee" value={order.openFee} onChange={handleChange} placeholder="Комиссия за открытие" />
            <input type="text" name="closeFee" value={order.closeFee} onChange={handleChange} placeholder="Комиссия за закрытие" />
            <input type="text" name="financeFee" value={order.financeFee} onChange={handleChange} placeholder="Комиссия за финансирование" />
            <input type="text" name="executionType" value={order.executionType} onChange={handleChange} placeholder="Тип исполнения" />
            <button type="submit">Создать ордер</button>
        </form>
    );
};

const OrderItem = ({ order, onDelete }) => {
    const Swal = require('sweetalert2')
    let statusClassName = order.pnl > 0 ? "order-plus" : "order-minus";
    const pnlClass = order.pnl < 0 ? "" : "plus";

    // Обработчик клика, который вызывает функцию удаления
    const handleClick = () => {
        Swal.fire({
            title: "Вы уверенны что хотите удалить?",
            text: "Вы не сможете вернуть обратно",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Да, удалить!"
          }).then((result) => {
            if (result.isConfirmed) {
                onDelete(order.id);  // Удаляет ордер по ID при клике
            }
          });
    };

    if (order.color == "Красный") {
        statusClassName = "order-minus";
    } else if (order.color == "Зеленый") {
        statusClassName = "order-plus";
    }

    let smallClassName = "";
    let imgClassname = ""

    if (order.pair.length > 12) {
        smallClassName = "small"
        imgClassname = "smallIMG"
    }
    if (order.pair.length > 16) {
        smallClassName = "supersmall";
        imgClassname = "supersmallIMG"
    }

    return (
        <div className="order-card" onClick={handleClick}> {/* Весь элемент кликабельный */}
            <div className="order-header">
                <div>
                    <span className="pair">{order.pair}</span>
                    <span className={"order-status " + statusClassName}>{order.status}</span>
                </div>
                <span className={"info " + smallClassName}>Закрытый P&L(USDT) <img src={newIcon} className={"newicon " + imgClassname} /></span>
            </div>
            <div className="order-details">
                <div className="order-time">
                    <span className="span-time">{order.time}</span><span className={"pnl-value " + pnlClass}>{order.pnl}</span>
                </div>
                <div className="order-data">
                    <div className="order-data-wrapper">
                        <div className="order-data-item wrap">
                            <span>Кол-во ордеров</span>
                            <span>{order.amount}</span>
                        </div>
                        <div className="order-data-item wrap-center">
                            <span>Цена входа</span>
                            <span>{order.entryPrice}</span>
                        </div>
                        <div className="order-data-item wrap">
                            <span>Цена выхода</span>
                            <span>{order.exitPrice}</span>
                        </div>
                    </div>
                    <hr className="order-hr" />
                    <div className="order-data-item-def">
                        <span>Комиссия за открытие</span>
                        <span>{order.openFee}</span>
                    </div>
                    <div className="order-data-item-def">
                        <span>Комиссия за закрытие</span>
                        <span>{order.closeFee}</span>
                    </div>
                    <div className="order-data-item-def">
                        <span>Комиссия за финансирование</span>
                        <span>{order.financeFee}</span>
                    </div>
                    <div className="order-data-item-def">
                        <span>Тип исполнения</span>
                        <span>{order.executionType}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderEditForm = ({ order, onEdit }) => {
    const [time, setTime] = useState(order.time);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "time") {
            setTime(value);
            onEdit(order.id, name, value); // Передаем новое значение времени
        } else {
            onEdit(order.id, name, value);
        }
    };

    useEffect(() => {
        setTime(order.time); // Обновляем локальное состояние при изменении order
    }, [order.time]);

    return (
        <div className="order-edit-form">
            <h3>Редактирование ордера {order.pair}</h3>
            <select name="color" value={order.color} onChange={handleChange}>
                <option value="Красный">Красный</option>
                <option value="Зеленый">Зеленый</option>
            </select>

            <input type="text" name="pair" value={order.pair} onChange={handleChange} placeholder="Пара" />
            <select name="status" value={order.status} onChange={handleChange}>
                <option value="Закрыть Long">Закрыть Long</option>
                <option value="Закрыть Short">Закрыть Short</option>
            </select>
            <input type="text" name="pnl" value={order.pnl} onChange={handleChange} placeholder="P&L" />
            <input type="text" name="time" value={time} onChange={handleChange} placeholder="Дата" />
            <input type="text" name="amount" value={order.amount} onChange={handleChange} placeholder="Кол-во" />
            <input type="text" name="entryPrice" value={order.entryPrice} onChange={handleChange} placeholder="Цена входа" />
            <input type="text" name="exitPrice" value={order.exitPrice} onChange={handleChange} placeholder="Цена выхода" />
            <input type="text" name="openFee" value={order.openFee} onChange={handleChange} placeholder="Комиссия за открытие" />
            <input type="text" name="closeFee" value={order.closeFee} onChange={handleChange} placeholder="Комиссия за закрытие" />
            <input type="text" name="financeFee" value={order.financeFee} onChange={handleChange} placeholder="Комиссия за финансирование" />
            <input type="text" name="executionType" value={order.executionType} onChange={handleChange} placeholder="Тип исполнения" />
        </div>
    );
};

export const HistoryPageNew = () => {
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = JSON.parse(localStorage.getItem('orders'));
            return savedOrders && Array.isArray(savedOrders) ? savedOrders : [];
        } catch (error) {
            console.error("Ошибка при извлечении данных из localStorage:", error);
            return [];
        }
    });

    console.log(orders);

    const [tradePair, setTradePair] = useState(() => {
        return localStorage.getItem('tradePair') || "BTCUSDT";
    });

    // Обновляем localStorage при изменении orders
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Обновляем localStorage при изменении торговой пары
    useEffect(() => {
        localStorage.setItem('tradePair', tradePair);
    }, [tradePair]);

    const handleCreateOrder = (newOrder) => {
        setOrders([newOrder, ...orders]);
    };

    const handleEditOrder = (orderId, fieldName, value) => {
        setOrders(
            orders.map(order => 
                order.id === orderId ? { ...order, [fieldName]: value } : order
            )
        );
    };

    const handleDeleteOrder = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId)); // Удаление по ID
    };

    if (localStorage.getItem("time")) {
        const ok = 1;
    } else {
        localStorage.setItem("time", "16:03");
    }
    const [time, setTime] = useState(localStorage.getItem("time") || "");
    const onTime = (e) => {
        setTime(e.target.value);
        localStorage.setItem("time", e.target.value);
    };

    const handleTradePairChange = (e) => {
        setTradePair(e.target.value);
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

    if (localStorage.getItem("days")) {
        const ok = 1;
    } else {
        localStorage.setItem("days", "За 7 дн.");
    }
    const [days, setDays] = useState(localStorage.getItem("days"));

    if (localStorage.getItem("textOrders")) {
        const ok = 1;
    } else {
        localStorage.setItem("textOrders", "Закрытые орд...");
    }
    const [textOrders, setTextOrders] = useState(localStorage.getItem("textOrders"));


    if (localStorage.getItem("tab11")) {
        const ok = 1;
    } else {
        localStorage.setItem("tab11", "Инвестиции");
    }
    const [tab1, setTab1] = useState(localStorage.getItem("tab11"));

    if (localStorage.getItem("tab21")) {
        const ok = 1;
    } else {
        localStorage.setItem("tab21", "История ордеров");
    }
    const [tab2, setTab2] = useState(localStorage.getItem("tab21"));

    if (localStorage.getItem("tab31")) {
        const ok = 1;
    } else {
        localStorage.setItem("tab31", "История");
    }
    const [tab3, setTab3] = useState(localStorage.getItem("tab31"));

    if (localStorage.getItem("tab41")) {
        const ok = 1;
    } else {
        localStorage.setItem("tab41", "P&L");
    }
    const [tab4, setTab4] = useState(localStorage.getItem("tab41"));

    if (localStorage.getItem("tab51")) {
        const ok = 1;
    } else {
        localStorage.setItem("tab51", "Инст");
    }
    const [tab5, setTab5] = useState(localStorage.getItem("tab51"));

    return (
        <div className="history-page">
            <div className="container hist-cont">
                <div className="wrapp">
                <div className="blue-header">
                    <PhoneHeader battery={battery} wifi={wifi} com={com} batteryStyles={batteryStyles} time={time} color={color} />

                    <div className="navigation">
                        <div className="back-arrow">
                            <img src={leftArrowImg} className="leftArrow" />
                        </div>
                        <div className="navigation-title">Ордера</div>
                        <div className="nav-title"><img src={groupImg} className="group" /><img className="circles" src={circlesImg} /></div>
                    </div>
                    <div className="sub-tabs">
                        <span>{tab1}</span>
                        <span>{tab2}</span>
                        <span>{tab3}</span>
                        <div className="active-bl"><span className="active">{tab4}</span></div>
                        <span>{tab5}</span>
                        <span className="downSpan">
                            <img className="downArrow" src={downArrowImg} />
                        </span>
                    </div>
                    <div className="trade-menu">
                        <div className="trade-wrap">
                            <span>{tradePair} <img className="botArrow" src={arrowImg} /></span> {/* Здесь отображается редактируемая пара */}
                            <span>{textOrders} <img className="botArrow" src={arrowImg} /></span>
                            <span>{days} <img className="botArrow" src={arrowImg} /></span>
                        </div>
                    </div>
                </div>

                <div className="management" style={{"margin": "20px 20px"}}>
                    <span>Смотреть торговые результаты</span>
                    <img src={rightArrowImg} className="rightArrow" />
                </div>

                <div className="orders-list">
                    {orders.map((order, index) => (
                        <OrderItem key={index} order={order} onDelete={handleDeleteOrder} />
                    ))}
                </div>
                <div className="line-wrapp">
                    <div className="iphone-line1"></div>
                    </div>
                </div>

                <OrderForm onCreate={handleCreateOrder} />


                <label>Изменить пункт меню 1:</label>
                <br />
                <input
                    type="text"
                    value={tab1}
                    onChange={(e) => {
                        setTab1(e.target.value);
                        localStorage.removeItem("tab11");
                        localStorage.setItem("tab11", e.target.value);
                    }}
                    placeholder="Изменить пункт меню 1:"
                />
                <br />

                <label>Изменить пункт меню 2:</label>
                <br />
                <input
                    type="text"
                    value={tab2}
                    onChange={(e) => {
                        setTab2(e.target.value);
                        localStorage.removeItem("tab21");
                        localStorage.setItem("tab21", e.target.value);
                    }}
                    placeholder="Изменить пункт меню 2:"
                />
                <br />

                <label>Изменить пункт меню 3:</label>
                <br />
                <input
                    type="text"
                    value={tab3}
                    onChange={(e) => {
                        setTab3(e.target.value);
                        localStorage.removeItem("tab31");
                        localStorage.setItem("tab31", e.target.value);
                    }}
                    placeholder="Изменить пункт меню 3:"
                />
                <br />

                <label>Изменить пункт меню 4:</label>
                <br />
                <input
                    type="text"
                    value={tab4}
                    onChange={(e) => {
                        setTab4(e.target.value);
                        localStorage.removeItem("tab41");
                        localStorage.setItem("tab41", e.target.value);
                    }}
                    placeholder="Изменить пункт меню 4:"
                />
                <br />

                <label>Изменить пункт меню 5:</label>
                <br />
                <input
                    type="text"
                    value={tab5}
                    onChange={(e) => {
                        setTab5(e.target.value);
                        localStorage.removeItem("tab51");
                        localStorage.setItem("tab51", e.target.value);
                    }}
                    placeholder="Изменить пункт меню 5:"
                />
                <br />


                <label>Изменить надпись 'Закрытые орд...'</label>
                <br />
                <input
                    type="text"
                    value={textOrders}
                    onChange={(e) => {
                        setTextOrders(e.target.value);
                        localStorage.removeItem("textOrders");
                        localStorage.setItem("textOrders", e.target.value);
                    }}
                    placeholder="Изменить надпись 'Закрытые орд...'"
                />
                <br />
                <label>Изменить надпись 'За 7 дн.'</label>
                <br />
                <input
                    type="text"
                    value={days}
                    onChange={(e) => {
                        setDays(e.target.value);
                        localStorage.removeItem("days");
                        localStorage.setItem("days", e.target.value);
                    }}
                    placeholder="Изменить надпись 'За 7 дн.'"
                />
                <br />
                <label>Изменить связь от 0 до 4</label>
                <br />
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
                <br />
                <label>Изменить вайфай сигнал от 1 до 3</label>
                <br />
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
                <br />
                <label>Изменить названия крипты в 3 верхнем меню</label>
                <br />
                <input
                    type="text"
                    value={tradePair}
                    onChange={handleTradePairChange}
                    placeholder="Изменить названия крипты в 3 верхнем меню"
                />
                <br />
                <label>Изменить заряд(должен быть больше 14)</label>
                <br />
                <input
                    type="number"
                    value={battery}
                    onChange={onBatteryInput}
                    placeholder="Изменить батарею"
                    min="14"
                    max="100"
                />
                <br />
                <label>Изменить время</label>
                <br />
                <input
                    type="text"
                    value={time}
                    onChange={onTime}
                    placeholder="Изменить время"
                />
                {orders.map(order => (
                    <OrderEditForm key={order.id} order={order} onEdit={handleEditOrder} />
                ))}
            </div>
        </div>
    );
};