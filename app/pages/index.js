  import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useTrack } from '../hooks/track'
import { useState } from 'react'
import Loading from '../components/Loading'
import TrackSection from '../components/tracks/TrackSection'
import styles from '../styles/Home.module.css'


const Home = () => {
    const { initialized, initializeUser, loading, transactionPending, inactiveTracks, activeTracks, addTrack, markTrack, searchTrack} = useTrack()
    const [inputData, setInput] = useState([1])
    const [query, setQuery] = useState('');
    const onChange = event => setQuery(event.target.value);

    console.log(inputData)
    


    return (
        <div className={styles.container}>
            <div className={styles.actionsContainer}>
                {initialized ? (
                    <div className={styles.trackInput}>
                        <div className={`${styles.trackCheckbox} ${styles.checked}`} />
                        <div className={styles.inputContainer}>
                            <form onSubmit={()=> addTrack(query)}>
                                <input value={query} onChange={onChange} id={styles.inputField} type="text" placeholder='Create a new track...' />
                            </form>
                         
                        </div>
                        <div className={styles.iconContainer}>
       
                        </div>
                      
                    </div>

               

                ) : (
                    <button type="button"  className={styles.button} onClick={() => initializeUser()} disabled={transactionPending}>
                        Initialize
                    </button>
                )}

                        <button onClick={() => addTrack(query)}>
                        Add
                        </button>   
                        <button onClick={() => searchTrack(query)}>
                        Search
                        </button>   
                <WalletMultiButton />
            </div>

     
            <div className={styles.mainContainer}>
                <Loading loading={loading}>
                    
                    <TrackSection title="Active Tracks" tracks={activeTracks} change={inputData => setInput(inputData)} action={markTrack} />

                    <TrackSection title="Inactive Tracks" tracks={inactiveTracks}/>
                </Loading>
            </div>
        </div>
    )
}

export default Home
