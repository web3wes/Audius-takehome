import * as anchor from '@project-serum/anchor'
import { useEffect, useMemo, useState } from 'react'
import { TRACK_PROGRAM_PUBKEY } from '../constants'
import { IDL as profileIdl } from '../constants/idl'
import toast from 'react-hot-toast'
import { SystemProgram } from '@solana/web3.js'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { authorFilter } from '../utils'
import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { sha256 } from 'multiformats/hashes/sha2'
import { base64 } from "multiformats/bases/base64"

export function useTrack( change ) {
    console.log(change)
    var myMap = new Map()
    let filteredTrack = []
    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const anchorWallet = useAnchorWallet()


    const [initialized, setInitialized] = useState(false)
    const [lastTrack, setLastTrack] = useState(0)
    const [tracks, setTracks] = useState([])
    const [searchNumber, setSearchNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [transactionPending, setTransactionPending] = useState(false)
    console.log("showTracks")

   
    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(profileIdl, TRACK_PROGRAM_PUBKEY, provider)
        }
    }, [connection, anchorWallet])

    useEffect(() => {
        const findProfileAccounts = async () => {
            if (program && publicKey && !transactionPending) {
                try {
                    setLoading(true)
                    const [profilePda, profileBump] = await findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                    console.log(profilePda)
                    const profileAccount = await program.account.userProfile.fetch(profilePda)

                    if (profileAccount) {
                        setLastTrack(profileAccount.lastTrack)
                        setInitialized(true)

                        const trackAccounts = await program.account.trackAccount.all([authorFilter(publicKey.toString())])
                    
                        console.log(program)
                        setTracks(trackAccounts)
                    } else {
                        setInitialized(false)
                    }
                } catch (error) {
                    console.log(error)
                    setInitialized(false)
                    setTracks([])
                } finally {
                    setLoading(false)
                }
            }
        }

        findProfileAccounts()

        console.log(change)
    }, [publicKey, program, transactionPending, searchNumber])

    const initializeUser = async () => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)

                const tx = await program.methods
                    .initializeUser()
                    .accounts({
                        userProfile: profilePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                setInitialized(true)
                toast.success('Successfully initialized user.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    function hash(string) {
        const utf8 = new TextEncoder().encode(string);
        return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
          return hashHex;
        });
      }

    const addTrack = async (input) => {

        event.preventDefault();
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                const [trackPda, trackBump] = findProgramAddressSync([utf8.encode('TODO_STATE'), publicKey.toBuffer(), Uint8Array.from([lastTrack])], program.programId)
                

            
                const content = input


                if (!content) {
                    setTransactionPending(false)
                    return
                }

                console.log(`${content}${lastTrack-1}`)
               let trackId = await hash(`${content}${lastTrack-1}`)
                alert("your track id is "+ trackId+" please it for future use")
                
                
                // c2022010bbace10bb0e5a728bd4c4843b10730438b0b64cc16074230305c << a serachable ID


                await program.methods
                    .addTrack(content)
                    .accounts({
                        userProfile: profilePda,
                        trackAccount: trackPda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                toast.success('Successfully added track.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }



    const searchTrack = async (trackId) => {
        console.log(trackId)
        console.log(activeTracks)
        console.log(inactiveTracks)

        var arr = [2, 5, 6, 3, 8, 9];
          
        var newArr = arr.map(function(val, index){
            return {key:index, value:val*val};
        })
          
        console.log(program)
      
       let mappedTracks= await Promise.all( activeTracks.map(async (track) =>
           myMap.set(await hash(`${track.account.content}${track.account.idx}`), track.account.idx)
          ))


      
 console.log(myMap)
 console.log(myMap)
        const [archiveTrackPda, archiveTrackBump] = findProgramAddressSync([utf8.encode('TODO_STATE'), publicKey.toBuffer(), Uint8Array.from([myMap.get(trackId)])], program.programId)
        console.log(archiveTrackPda)
        let cid = await program.account.trackAccount.fetch(archiveTrackPda)

        setSearchNumber(cid.idx)


    }
    const markTrack = async (trackPda, trackIdx) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)

                await program.methods
                    .markTrack(trackIdx)
                    .accounts({
                        userProfile: profilePda,
                        trackAccount: trackPda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                toast.success('Successfully marked track.')
            } catch (error) {
                console.log(error)
                toast.success(error.toString())
            } finally {
                setLoading(false)
                setTransactionPending(false)
            }
        }
    }

   

    
    
    // const activeTracks = tracks

    const activeTracks = 

    searchNumber ?
    useMemo(() => tracks.filter((tracks) => tracks.account.idx == searchNumber), [tracks]):
    useMemo(() => tracks.filter((tracks) => !tracks.account.marked), [tracks])





    console.log(searchNumber)
    
  

    const inactiveTracks = useMemo(() => tracks.filter((tracks) => tracks.account.marked), [tracks])



    return { initialized, initializeUser, loading, transactionPending, inactiveTracks, activeTracks, addTrack, markTrack, searchTrack, filteredTrack }
}
