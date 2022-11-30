import styles from '../../styles/Trakr.module.css'
import TrackItem from './TrackItem'

const TrackList = ({ tracks, action }) => {
    return (
        <ul className={styles.tracksList}>
            {tracks.map((track) => (
                <TrackItem key={track.account.idx} {...track.account} publicKey={track.publicKey} action={action} />
            ))}
        </ul>
    )
}

export default TrackList
