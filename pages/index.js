import styles from '../styles/Home.module.scss'
import { MainLayout } from '../components/MainLayout.js'
import Calendar from "../components/calendar/Calendar";

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.container}>
          <div className={styles.homepage_text }>
            <h1 className={styles.homepage_text__title}>Choose the day for the meeting</h1>
            <p className={styles.homepage_text__description}>We encourage you to book your appointment online.</p>
            <p className={styles.homepage_text__description}>This will save you time.</p>
          </div>
          <div className={styles.container__inner_right}>
            <Calendar/>
          </div>

      </div>
    </MainLayout>
  )
}
