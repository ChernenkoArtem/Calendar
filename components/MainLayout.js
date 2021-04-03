import styles from '../styles/mainLayout.module.scss'
import Link from "next/link"
import Image from 'next/image'

export function MainLayout ({children}){
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__logo}>
                    <Image
                        src='/logo.png'
                        width={165}
                        height={50}
                    />
                </div>
                <nav className={styles.header__nav}>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/aboutUs'}>About Us</Link>

                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}