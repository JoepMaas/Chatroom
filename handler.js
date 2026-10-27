window.addEventListener("DOMContentLoaded", Main);

let knownUsernames = ["dummy"];

let knownChatrooms;
const imageCache = {};

let shiftPressed = false;
let profanityFilter = true;

let ipData;
let chatroom = "main";
const Cusername = localStorage.getItem("currentUser");

let bio = localStorage.getItem("bio");

const sbase = window.supabase.createClient(
    "https://lmncjmtfyvhbkfnwkqhx.supabase.co/rest/v1/",

    "sb_publishable_YwussStM5M-x_dt1hF8N4Q_SuI6VDYD"
)

if (localStorage.getItem("chatrooms") == null) {
    localStorage.setItem("chatrooms","[\"main\"]");
    console.log("joined main")
}
knownChatrooms = JSON.parse(localStorage.getItem("chatrooms"))


async function Main() {

    joinChatRoom("main");
    sbase.channel("chat").on("postgres_changes", {event: "INSERT", schema: "public", table: "chat"}, (payload) => {
        let thing = payload.new.contents;
        sendNotification(thing, true)

        if (thing.content.includes('@'+Cusername)) {
            let x = document.getElementById(thing.chatroom);
            x.innerHTML = x.innerHTML.replace(
                `class="ding"`,
                `class="ping"`
            );
        }

    }).subscribe();

    console.log("a");
    bio = localStorage.getItem("bio");


    console.log(localStorage.getItem("currentUser"));

    console.log("b");
    if (Cusername == null) {
        window.location.href = "index.html";
    }

    console.log("c");

    const imageId = localStorage.getItem("profileImageId");
    if (imageId) {
        const {data, error} = await sbase
            .from("sources")
            .select("image")
            .eq("id", imageId)
            .single();
    }

    console.log("d");
    if (knownChatrooms == null || knownChatrooms == undefined) {return;}
    knownChatrooms.forEach(chtrm => {
        updateChatroomTile(chtrm, "...");
        console.log("loaded x")
    })
    
    document.querySelector('.search-input').addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const messages = document.querySelectorAll('.messageBox');
 
    messages.forEach(msg => {
        const text = msg.innerText.toLowerCase();
        msg.style.display = text.includes(query) || query === '' ? '' : 'none';
    });
});
}

async function setChatroom(cr){
    console.log("attempting "+ chatroom);
    chatroom = cr;
    document.getElementById("chatName").innerHTML = cr;
    await loadChatRoom(chatroom);


    console.log("switched to "+ chatroom);
}

addEventListener("keydown", (e) => {
    if (e.keyCode === 16) {
        shiftPressed = true;
    }
})
function maybeSend(){
    if (event.key === "Enter" && !shiftPressed) {
        send();

    }
    shiftPressed = false;
}
function createChatroomBetween(person1, person2) {
    const array = [person1, person2].sort((a, b) => a - b);
    return array[0] + " & " + array[1]
}
async function sendString(input){
    let msg = input;
    let time = Date.now();
    let uName = localStorage.getItem("currentUser");
    let img = localStorage.getItem("profileImageId") || "free-user-icon-3296-thumb.png"; 
    let titleColor = localStorage.getItem("TitleColor");

    await sbase.from("chat").insert({
        contents: {
            username: uName,
            content: preSendFormat(msg),
            time : time,
            chatroom: chatroom,
            profile: img,
            titleColor: titleColor,
            userBio: bio
        }
    })
}

async function command(cmd){
    const tokens = cmd.trim().split(" ");
    switch(tokens[0]){
        case "goto":
            await setChatroom(cmd.substring(5));
            break;
    }
}

async function send(){
    const inputbox = document.getElementById("inputtext");
    if (inputbox.value.charAt(0) == "/"){
        await command(inputbox.value.substring(1))
        inputbox.value = "";
        return;
    }
    if (inputbox.value === ""){
        return;
    }

    await sendString(inputbox.value.replace("{system_style}", "OPENING_CODE_BRACKETsystem_styleCLOSING_CODE_BRACKET"));

    inputbox.value = "";
}

async function sendNotification(msg, recent){
    let tile = document.getElementById(msg.chatroom);
    if (!tile === null){
        tile.classList.add("sidebar-notif");
    }
    if (!knownChatrooms.includes(msg.chatroom)){
        return;
    }
    updateChatroomTile(msg.chatroom, msg);
    if(msg.chatroom != chatroom){
        return;
    }

    let chat = document.getElementById("chat");

    let imgSrc = "free-user-icon-3296-thumb.png";
    const imgId = msg.profile;
    if (imgId && !isNaN(imgId) && Number.isInteger(Number(imgId))) {
        if (imageCache[imgId] ) {
            imgSrc = imageCache[imgId];
        } else {
            const {data, error} = await sbase
                .from("sources")
                .select("image")
                .eq("id", Number(imgId))
                .single();
            if (data && !error) {
                imgSrc = data.image;
                imageCache[imgId] = imgSrc;
            }
        }
    }

     const div = document.createElement("div");
    div.innerHTML = createChatbox(msg.content, msg.username, msg.time, recent, imgSrc, msg.titleColor, msg.userBio);
    chat.appendChild(div);

    //chat.innerHTML += createChatbox(msg.content, msg.username, msg.time, recent, imgSrc, msg.titleColor);
    //await (createChatbox(msg.content, msg.username, msg.time, recent, msg.profile, msg.titleColor))

    chat.scrollTop = chat.scrollHeight;
}

async function joinChatRoom(chatroom){
    let joinmsg = false;
    if (!knownChatrooms.includes(chatroom)){
        knownChatrooms.push(chatroom);
        localStorage.setItem("chatrooms", JSON.stringify(knownChatrooms));
        joinmsg = true;
    }
    await loadChatRoom(chatroom);
    await updateChatroomTile(chatroom, "...");
    if (joinmsg) {await sendString(`{system_style}${Cusername} joined`);}

    console.log("joined chatroom " + chatroom);
}

async function loadChatRoom(chatroom) {
    chatroom = chatroom.trim();
    let chat = document.getElementById("chat");
    if (!knownChatrooms.includes(chatroom)){
        chat.innerHTML = `<button onclick="
    joinChatRoom(chatroom)
"   >join this chatroom</button>`;
        return;
    }

    let x = document.getElementById(chatroom);
    if (x != null) {
        x.innerHTML = x.innerHTML.replace(
            `class="ping"`,
            `class="ding"`
        );
    }
    chat.innerHTML = "Loading...";

    const {data, error} = await sbase.from("chat").select("contents").eq("contents->>chatroom", chatroom).limit(500);

    if (error){
        console.log(error)
    }

    let am = data.sort((a, b) => a.contents.time - b.contents.time)

    chat.innerHTML = "";

     for (const message of am) {
        const div = document.createElement("div");
        div.innerHTML = createChatbox(message.contents.content, message.contents.username, message.contents.time, false, null, message.contents.titleColor, message.contents.userBio);
        div.dataset.imgId = message.contents.profile || "";
        chat.appendChild(div);
    }

    chat.scrollTop = chat.scrollHeight;

    const boxes = chat.querySelectorAll("[data-img-id]");
    for (const box of boxes) {
        const imgId = box.dataset.imgId;
        if (imgId && !isNaN(imgId) && Number.isInteger(Number(imgId))) {
            let imgSrc;
            if (imageCache[imgId]) {
                imgSrc = imageCache[imgId];
            } else {
                const { data, error } = await sbase
                    .from("sources")
                    .select("image")
                    .eq("id", Number(imgId))
                    .single();
                if (data && !error) {
                    imgSrc = data.image;
                    imageCache[imgId] = imgSrc;
                }
            }
            if (imgSrc) {
                const img = box.querySelector(".profilePicture");
                if (img) img.src = imgSrc;
            }
        }
    }
    let tile = document.getElementById(chatroom);
    if (!tile === null){
        tile.classList.remove("sidebar-notif");
    }


}





function createChatbox(content, username, time, recent, imgId, titleColor, bio) {
    if (!knownUsernames.includes(username)) {
        console.log("added" + username);
        knownUsernames.push(username);
    }
    let imgSrc = imgId || "free-user-icon-3296-thumb.png";

    let output = ` 

            </div>

            <div class="messageText" style="color: ${localStorage.getItem("fontColor")};">
                ${formatMessage(content, username)}
            </div>
`;

    if (!content.startsWith("{system_style}")) {
         output = `<div style="background-color: ${localStorage.getItem("BackroundMsg")}; border: ${content.includes('@' + Cusername)? `2px solid ${localStorage.getItem("accentColor")}`: "2px solid transparent"};
  " class="messageBox${content.includes('@'+Cusername) ? ' mentionbox' : ''}">
                <div class="user">

                <img class="profilePicture" src="${imgSrc}" style="cursor:pointer" onclick="window.location.href='viewProfile.html?user=${username}&bio=${bio}'">

                    <div class="nameTime">
                        <div class="name" style="color: ${titleColor}; cursor:pointer" onclick="window.location.href='viewProfile.html?user=${username}&bio=${bio}'" title="${bio}">
                            ${profanityFilter ? filter(username) : username} <br>
                        </div>

                     <div class="time" style="color: ${localStorage.getItem("SecondaryColor")};">
                       ${new Date(time).toLocaleString()} <br>
                    </div>
                    
                </div>
${output}</div>`;
    }


    return output;
}

function createChatroomTile(title) {
    return `
<div class="sidebar" style="background-color: ${localStorage.getItem("BackroundMsg")};" onclick="setChatroom('${title}')" id="${title}"> 
        <div class="sidebarHeader">

            <div class="chatroomBox" >

            <div class="ding"></div>

                    <div class="userName">
                        ${title}
                    </div>

            </div>

        </div>

        <div class="sidebarMessage" id="${title}_latestmsg">
        </div>

    </div>`;
}



function preSendFormat(msg){

    let output = msg;


    output = output.replaceAll("\n", "<br>").trim();

    output = customHtmlIn(output,"goto",`<button onclick="setChatroom('%s')">%s</button>`);




    return output;
}

function customHtmlIn(text,tag,replacement){
    const opentag = "<" + tag + ">";
    const closetag = "</" + tag + ">";

    let output = text;

    while (output.includes(opentag) && output.includes(closetag)){
        const content = output.substring(output.indexOf(opentag) + opentag.length, output.indexOf(closetag));
        output = output.replace(content,"");

        output = output.replace(opentag,replacement.replaceAll("%s",content));
        output = output.replace(closetag,"");
    }

    return output;
}

function formatMessage(msg,username){

    let output = msg.replaceAll("{system_style}",`(${username}) -> `)
        .replaceAll("CLOSING_CODE_BRACKET","}")
        .replaceAll("OPENING_CODE_BRACKET","{");

    knownUsernames.forEach(name => {
         output = output.replace("@" + name, `<div style="background-color: ${localStorage.getItem("accentColor")};" class="tag">@${name}</div>`);
    })



    return profanityFilter ? filter(output) : output;
}

function updateChatroomTile(chatroom, msg) {
    let tile = document.getElementById(chatroom);
    if (tile === null) {
        document.getElementById("groups").innerHTML += createChatroomTile(chatroom);
    }
    const text = document.getElementById(`${chatroom}_latestmsg`);
    if (text === null) {
        return;
    }
    let result = `${profanityFilter ? filter(msg.username) : msg.username}: ${filter(msg.content)}`;
    text.innerText = result.replace("<br>", " ").replace("{system_style}", "").substr(0, 25) + "...";
}

async function upload() {
    window.open();
}

