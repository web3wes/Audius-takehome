# Audius-takehome

This repo is source code my Audius Take home assement and has the following feature:


- Phantom wallet connection using Anchor wallet (using the app will requires test sol on devnet)
- An input to allow adding IPFS CIDs
- The ability to search by a given ID and recive a CID in return

</br>
</br>


To get started 🛫:
- Run the app locally, by cloning the repo,  running yarn install, and npm run dev in the app directiry
or
- Navigate to https://trakr-seven.vercel.app/ 

From there you should see the option to select a wallet (the app was tested using Phantom). Once a wallet has been selected, click the initialize button on the top left.

After initalizing, you should be presented with an empty list (0 active tracks, and 0 inactive tracks)

</br>
</br>

Adding a CID 🆔: 
 
Adding a new CID to the track list is relatively straightfoward. Copy a CID, paste in the input field, and choose 'add'. After the transaction is verified, you should see it appear in the active tracks section.

You should also see an alert informing you of a the track ID. Copy this in order to use it in the search section. 

</br>
</br>


Searching by ID 🔎:

Still have that ID handy?Tthe time has come to weild your new found power.

Paste the ID in the search bar selecting search. This should result in seeing only the CID associated with your search term in the active tracks section. 

That's about it! Enjoy keeping track of well... tracks to your hearts content.  

</br>
</br>

Known issues ⁇ :
- Pressing enter prompts the 'add' flow, but this should be a pretty low effort fix 
- Text isn't enclosed in divs neatly
- App is not currently repsonsive
- Index 0 occastionally does not return accurate search results


</br>
</br>


What I would upgrade 🛠:

- The biggest thing I would change is adding and easy way to see track IDs. The track IDs are the of result hashing the CID and the user's current track number. Since the app will have access to that info in 'myMap' we could expose that info to user so they don't have to manually store IDs for future use. 

- The search returns CIDs at present, but it would probably be more useful if user's could click on CID to navigate to track in question, or if the song, art, and other metadata popped up in a modal when the CID is clicked.

- Currently track lists are permissioned such that only the owner of a specfic wallet can see them. I would expand this app to include sharing tracks with the community, as well as a global track list. (Similar to how Soundcloud works)

There are other things I'd be interested in such as liking and sharing others tracks, but they are outisde of the scope of this assignment. 

</br>
</br>

Conclusion ✅:

Thank you very much for presenting this challenge and for taking to time to review my work. Please let me know if you have any questions! I'd be happy to follow up about anything. 

</br>
Cheers,
Wes
