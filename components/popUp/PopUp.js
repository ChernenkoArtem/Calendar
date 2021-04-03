import styles from '../../styles/popUp.module.scss'

export default function PopUp(props){

    const closePopUp = () => {
        props.setIsPopup()
    }
    return(
        props.isPopup ?
        <div className={styles.background}>
            <div className={styles.popUp}>
                <div
                    onClick={closePopUp}
                    className={styles.close}></div>
                <div>
                    <div className={styles.wrapper}>
                        <label>Month</label>
                        <input
                            className={styles.input}
                            value={props.month}
                            readOnly="readOnly"
                        />
                    </div>
                    <div className={styles.wrapper}>
                        <label>Day</label>
                        <input
                            className={styles.input}
                            value={props.day}
                            readOnly="readOnly"
                        />
                    </div>
                </div>
            </div>
        </div>
            : null
    )
}