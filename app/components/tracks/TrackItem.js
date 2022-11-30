import styles from '../../styles/Trakr.module.css'
import { CalendarIcon, TrashIcon } from '@heroicons/react/outline'

const TrackItem = ({ idx, content, marked, dateline, publicKey, action }) => {
    const handleMarkTrack = () => {
        // Only allow unchecked track
        if (marked) return

        action(publicKey, idx)
    }


    return (
        <li key={idx} className={styles.trackItem}>
            <div onClick={handleMarkTrack} className={`${styles.trackCheckbox} ${marked && styles.checked}`} />
            <div>
                <span className="trackText">{content} </span>
                {dateline && (
                    <div className={styles.trackDateline}>
                        <CalendarIcon className={styles.calendarIcon} />
                        <span>{dateline}</span>
                    </div>
                )}
            </div>
            <div className={styles.iconContainer}>
            
            </div>
        </li>
    )
}

export default TrackItem
