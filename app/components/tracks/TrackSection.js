import styles from '../../styles/Trakr.module.css'
import TrackList from './TrackList'

const TrackSection = ({ title, tracks, action }) => {
    return (
        <div className={styles.trackSection}>
            <h1 className="title">
                {title} - {tracks.length}
            </h1>

            <TrackList tracks={tracks} action={action} />
       
        </div>
    )
}

export default TrackSection
