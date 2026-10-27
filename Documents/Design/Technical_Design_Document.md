# Technical design document

## Project architecture
How do you set up your project?
### Class structure
Chat: Sends and receives live messages through the database.
Themes: Swaps colors and choose your own.
Storage: Saves your layout and profile to the browser's memory.

root
├── index.html                  # Login page
├── main.html                   # Main page
├── profile.html                # Edit own profile
├── viewProfile.html            # View other users' profiles
├── /css
│    ├── style.css
│    ├── styleLogin.css
│    ├── styleMain.css
│    ├── styleProfile.css
│    └── styleViewProfile.css
├── /js
│    ├── handler.js             # Main logic, main script
│    ├── loginScript.js         # Login logic
│    ├── themeHandler.js        # Theme system + color randomizer
│    ├── profile.js             # Profile management
│    ├── viewProfile.js         # Viewing other profiles
│    ├── profanity.js           # Filtering the user's input, chacking for bad words
│
├── data.json                   # Local data storage fallback



## User story approach
How are you going to get each user story/feature to work?
### User story 1: User registration & login
login.html + loginScript.js. Simple username + color picker. Stores currentUser in localStorage. Redirects to main.html.
### User story 2: Custom profile
loginScript.js (initial) + profile.js. 
Profile picture uploaded to Supabase sources table (random ID), saved via profile_image_id. Bio, name, location editable via contentEditable + Supabase profiles table.
### User story 3: View other users’ profiles
viewProfile.html + viewProfile.js (basic). Uses query param ?user=... and links from message clicks.
### User story 4: Send text, photos, and links
sendString() in main logic. Text + basic HTML. Photos implemented in send. Links handled via preSendFormat().
### User story 5: Tagging / @mentions
formatMessage() replaces @username with styled <div class="tag">. 
Mention detection in realtime listener (content.includes('@'+Cusername)).
### User story 6: Dedicated UI for searching messages
Search input in main.html. 
Simple client-side filter on .messageBox using text.includes(query).
### User story 7: Theme system 
themeHandler.js — Multiple color pickers, localStorage persistence, randomizeTheme(), resetTheme(), assignColors(), assingMultiColors(). 
Uses direct style overrides + some CSS variables missing.
### User story 8: Color randomizer
Implemented in themeHandler.js — generates similar colors.
### User story 9: Message history & sync
Supabase realtime subscription on chat table + loadChatRoom() on switch. 
Messages stored with contents JSON column. Limited to 500 messages.


