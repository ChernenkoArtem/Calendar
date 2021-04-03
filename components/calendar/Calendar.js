import styles from '../../styles/calendar.module.scss'
import { useState, useEffect } from 'react';
import moment from 'moment'
import PopUp from "../popUp/PopUp";

export default function Calendar() {
    const [today, setToday] = useState(moment())
    const [calendar, setCalendar] = useState([]);
    const [isPopup, setIsPopup] = useState(false);
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(today.format('MMMM'))



    useEffect(() => {
        setCalendar(buildCalendar(today));
    }, [today]);

    const buildCalendar = (date) => {
        const tmpArr = [];

        const startDay = date.clone().startOf("month").startOf("week");
        const endDay = date.clone().endOf("month").endOf("week");

        const _date = startDay.clone().subtract(1, "day");

        while (_date.isBefore(endDay, "day")) {
            tmpArr.push(
                Array(7)
                    .fill(0)
                    .map(() => _date.add(1, "day").clone())
            );
        }
        return tmpArr;
    }

    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));

    const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'))


    const selectDay = (el) => {
        setIsPopup(!isPopup)

        const includesClassBefore  = el.target.className.includes('before')
        const includesClassAfter = el.target.className.includes('after')
        if(!includesClassBefore || !includesClassAfter) {

            const mydate = createDateString(1, el.target.innerText)
            setSelectedDay(`${el.target.innerText+' '+ moment(mydate).format('dddd') }` )
            setSelectedMonth(moment(mydate).format('MMMM'))
        }
        if (includesClassBefore) {
            const mydate = createDateString(null, el.target.innerText)
            setSelectedDay(`${el.target.innerText+' '+ moment(mydate).format('dddd') }` )

            setSelectedMonth(moment(mydate).format('MMMM'))
        }
        if (includesClassAfter) {
            const mydate = createDateString(2, el.target.innerText)
            setSelectedDay(`${el.target.innerText+' '+ moment(mydate).format('dddd') }` )
            setSelectedMonth(moment(mydate).format('MMMM'))
        }
    }
    const createDateString = (month, day) => `${today.clone().year()}-${(today.clone().month()+ month) <10?'0'+(today.clone().month()+ month):(today.clone().month()+month)}-${day}`



    function isSelectedDay(day, value) {
        return value.isSame(day, "day");
    }
    const isBeforeFirstDay = (day) => {
        const startDayOfM = today.clone().startOf("month")

        return day.isBefore(startDayOfM, "day");
    }

    const isAfterLastDay = (day) => {
        const endDayOfM = today.clone().endOf("month")

        return day.isAfter(endDayOfM, "day");
    }

    const isToday = (day) => {
        return day.isSame(new Date(), "day");
    }

  const dayStyles = (day, value) => {
        if (isBeforeFirstDay(day)) return styles.before;
        if (isToday(day, value)) return styles.today;
        if (isAfterLastDay(day)) return styles.after;
        return "";
    }

    return(
        <>
        <div className={styles.calendar}>
            <div className={styles.calendar__nav}>
                <div
                    onClick={prevHandler}
                    className={styles.prev_month}
                >
                </div>
                <span className={styles.month_name}>{`${today.format('MMMM') +'  '+ today.year()}`}</span>
                <div
                    onClick={nextHandler}
                    className={styles.next_month}>
                </div>
            </div>
            <hr className={styles.calendar__lane}/>
            {calendar.map((week, idx) => (
                <div key={idx}
                     className={styles.calendar__week}
                >
                    {week.map((day, idx) => (
                        <div
                            key={idx}
                            className={`${styles.day+' '+dayStyles(day, today)}`}
                            onClick={selectDay}
                        >
                            {day.format("D") < 10 ? `0${day.format("D").toString()}`: day.format("D").toString()  }
                        </div>
                    ))}
                </div>
            ))}
            <hr className={styles.calendar__lane}/>
            <div className={styles.calendar__week}>
                {["S", "M", "T", "W", "T", "F", "S"].map((dayName, idx) => (
                    <div
                        key={idx}
                        className={styles.day_name}>{dayName}</div>
                ))}
            </div>
            <hr className={styles.calendar__lane}/>
        </div>
        <PopUp
            setIsPopup={()=>setIsPopup(!isPopup)}
            isPopup={isPopup}
            month={selectedMonth}
            day={selectedDay}
        />
        </>
    )
}