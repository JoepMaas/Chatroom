const bgPicker = document.getElementById("bg-color");
const secondColor = document.getElementById("secondColor");
const sidebarColor = document.getElementById("sidebarColor");
const outlineColor = document.getElementById("outline-color");
const textColor = document.getElementById("text-color");
const secondaryTextColor = document.getElementById("secondary-text-color");
const accentColor = document.getElementById("accent-color");
const allElements = document.querySelectorAll("*");
const borderedElements = [];

const Background = document.body;
const profileBox = document.getElementsByClassName("name-and-pfp")[0];
const arrow = document.getElementsByClassName("fa fa-arrow-right")[0];
const sendUI = document.getElementsByClassName("fa fa-upload")[0];
const inputBox = document.getElementsByClassName("inputBox")[0];
const TitleColor = document.getElementsByClassName("center")[0];
const backgroundMsgBoxes = document.getElementsByClassName("messageBox");
const messageText = document.getElementsByClassName("messageText");
const secondaryFont = document.getElementsByClassName("time");
const sidebar = document.getElementsByClassName("fullSidebar")[0];
const sidebarMsg = document.getElementsByClassName("sidebar-notif")[0];
const sidebarPing = document.getElementsByClassName("sidebar-ping")[0];
const tag = document.getElementsByClassName("tag");
const sidebarMSG = document.getElementsByClassName("sidebar");
const ping = document.getElementsByClassName("ping");
const mentionbox = document.getElementsByClassName("mentionbox");
const userlist = document.getElementsByClassName("user-in-list-box");
const msgColor = localStorage.getItem("BackroundMsg");
const fontColor = localStorage.getItem("fontColor");
const secondaryColor = localStorage.getItem("SecondaryColor");

let changed = localStorage.getItem("Changed", false);
let changedBG = localStorage.getItem("ChangedBG", false);

var delaySec = 2 * 1000;

function randomizeTheme() {

    let randomInt = Math.floor(Math.random() * 999999);
    let sidebarRan;
    let msgInt;
    let borderRan;
    let randomFont = Math.floor(Math.random() * 3)

    if (randomInt < 995000) {
        sidebarRan = randomInt + 4999;
        msgInt = randomInt + 1999;
        borderRan = randomInt + 3000;
    }
    else {
        sidebarRan = randomInt - 4999;
        msgInt = randomInt - 1999;
        borderRan = randomInt - 3000;
    }

    localStorage.setItem("SidebarColor", "#" + sidebarRan);
    localStorage.setItem("BackgroundColor", "#" + randomInt);
    localStorage.setItem("Outline", "#" + borderRan);

    localStorage.setItem("fontColor", "#" + Math.floor(randomInt / 3));
    localStorage.setItem("BackroundMsg", "#" + msgInt);
    localStorage.setItem("SecondaryColor", "#" + Math.floor(randomInt / 2));
    localStorage.setItem("accentColor", "#" + (sidebarRan + 400));

    assingMultiColors();
    assignColors();
    updateColorValues();
}

function resetTheme() {
    localStorage.setItem("BackgroundColor", "#323339");
    localStorage.setItem("SidebarColor", "#36373c");
    localStorage.setItem("SecondaryColor", "#abacb2");
    localStorage.setItem("BackroundMsg", "#3a3b41");
    localStorage.setItem("fontColor", "#ffffff");
    localStorage.setItem("Outline", "#1d1e22");
    localStorage.setItem("accentColor", "rgba(100, 216, 236, 0.5)");
    localStorage.setItem("BasicMSGBG", "#4d4e55");
    
    sidebar.style.backgroundColor = "#2c2d32";
    profileBox.style.backgroundColor = "#3a3b41";
    TitleColor.style.backgroundColor = "#1d1e22";
    
    Background.style.backgroundColor = localStorage.getItem("BackgroundColor");
    arrow.style.color = localStorage.getItem("SecondaryColor");
    sendUI.style.color = localStorage.getItem("SecondaryColor");
    document.body.style.color = localStorage.getItem("fontColor");
    
    assingMultiColors();
    
    inputBox.style.backgroundColor = "#393a41";
    inputBox.style.border = "2px solid #4d4e55";

    localStorage.setItem("Changed", false);
    localStorage.setItem("ChangedBG", false);
    
    updateColorValues();
}

function BackToLogin() {
    location.href = "index.html";
}

function assignColors() {
    TitleColor.style.backgroundColor = localStorage.getItem("SidebarColor");
    Background.style.backgroundColor = localStorage.getItem("BackgroundColor");
    sidebar.style.backgroundColor = localStorage.getItem("SidebarColor");
    profileBox.style.backgroundColor = localStorage.getItem("SidebarColor");
    inputBox.style.backgroundColor = localStorage.getItem("SidebarColor");
    arrow.style.color = localStorage.getItem("SecondaryColor");
    sendUI.style.color = localStorage.getItem("SecondaryColor");
}

function assingMultiColors() {
     for (i = 0; i < backgroundMsgBoxes.length; i++) {
        backgroundMsgBoxes[i].style.backgroundColor = localStorage.getItem("BackroundMsg");
        secondaryFont[i].style.color = localStorage.getItem("SecondaryColor");  
    }

        document.body.style.color = localStorage.getItem("fontColor");
    

    for (i = 0; i < messageText.length; i++) {
        messageText[i].style.color = localStorage.getItem("fontColor");
    }

    for (i = 0; i < mentionbox.length; i++) {
        mentionbox[i].style.borderColor = localStorage.getItem("accentColor");
       
    }
    for (i = 0; i < tag.length; i++) {
        tag[i].style.backgroundColor = localStorage.getItem("accentColor");
    }

    for (i = 0; i < ping.length; i++) {
        ping[i].style.backgroundColor = localStorage.getItem("accentColor");
    }

    for (i = 0; i < sidebarMSG.length; i++) {
        sidebarMSG[i].style.backgroundColor = localStorage.getItem("BackroundMsg");
    }

    for (i = 0; i < userlist.length; i++) {
        userlist[i].style.backgroundColor = localStorage.getItem("BackroundMsg");
    }

    borderedElements.forEach(el => {
        el.style.borderColor = localStorage.getItem("Outline");
    });

}

function updateColorValues() {
    bgPicker.value = localStorage.getItem("BackgroundColor");
    secondColor.value = localStorage.getItem("BackroundMsg");
    sidebarColor.value = localStorage.getItem("SidebarColor");
    outlineColor.value = localStorage.getItem("Outline");
    textColor.value = localStorage.getItem("fontColor");
    secondaryTextColor.value = localStorage.getItem("SecondaryColor");
    accentColor.value = localStorage.getItem("accentColor");
}

setTimeout(function () {
    for (i = 0; i < backgroundMsgBoxes.length; i++) {
        backgroundMsgBoxes[i].style.backgroundColor = localStorage.getItem("BackroundMsg");
        secondaryFont[i].style.color = localStorage.getItem("SecondaryColor"); 
        messageText[i].style.color = localStorage.getItem("fontColor");
    }

    document.body.style.color = fontColor;

    borderedElements.forEach(el => {
        el.style.borderColor = localStorage.getItem("Outline");
    });
    
        inputBox.style.backgroundColor = "#393a41";
    inputBox.style.border = "2px solid #4d4e55";

    for (i = 0; i < mentionbox.length; i++) {
        mentionbox[i].style.borderColor = localStorage.getItem("accentColor");
    }
    for (i = 0; i < tag.length; i++) {
        tag[i].style.backgroundColor = localStorage.getItem("accentColor");
    }
    
    for (i = 0; i < ping.length; i++) {
        ping[i].style.backgroundColor = localStorage.getItem("accentColor");
    }
    
    for (i = 0; i < sidebarMSG.length; i++) {
        sidebarMSG[i].style.backgroundColor = localStorage.getItem("BackroundMsg");
    }
    
    console.log(localStorage.getItem("Changed"));
    
    if (localStorage.getItem("Changed") === 'false') {
        TitleColor.style.backgroundColor = "#1d1e22";
        sidebar.style.backgroundColor = "#2c2d32";
        profileBox.style.backgroundColor = "#3a3b41";
    }
    
    updateColorValues();   
    
    assingMultiColors();
    assignColors();
}, delaySec);

document.addEventListener('DOMContentLoaded', () => {
    allElements.forEach(el => {
        borderedElements.push(el);
    });
})

bgPicker.addEventListener("input", () => {
    Background.style.backgroundColor = bgPicker.value;
    localStorage.setItem("BackgroundColor", bgPicker.value);
});

secondColor.addEventListener("input", () => {

    for (i = 0; i < backgroundMsgBoxes.length; i++) {
        backgroundMsgBoxes[i].style.backgroundColor = secondColor.value;
    }

    for (i = 0; i < sidebarMSG.length; i++) {
        sidebarMSG[i].style.backgroundColor = secondColor.value;
    }


    localStorage.setItem("BackroundMsg", secondColor.value);
});


sidebarColor.addEventListener("input", () => {
    sidebar.style.backgroundColor = sidebarColor.value;
    TitleColor.style.backgroundColor = sidebarColor.value;
    profileBox.style.backgroundColor = sidebarColor.value;
    inputBox.style.backgroundColor = sidebarColor.value;

    localStorage.setItem("Changed", true);
    localStorage.setItem("SidebarColor", sidebarColor.value);
});


outlineColor.addEventListener("input", () => {
     borderedElements.forEach(el => {
        el.style.borderColor = outlineColor.value;
    });
    localStorage.setItem("Outline", outlineColor.value);
});


textColor.addEventListener("input", () => {
    for (i = 0; i < messageText.length; i++) {
        messageText[i].style.color = textColor.value;
    }
    document.body.style.color = textColor.value;
    
    localStorage.setItem("fontColor", textColor.value);
});


secondaryTextColor.addEventListener("input", () => {
    for (i = 0; i < secondaryFont.length; i++) {
        secondaryFont[i].style.color = secondaryTextColor.value;
    }

    arrow.style.color = secondaryTextColor.value;
    sendUI.style.color = secondaryTextColor.value;

    localStorage.setItem("SecondaryColor", secondaryTextColor.value);
});


accentColor.addEventListener("input", () => {
    for (i = 0; i < mentionbox.length; i++) {
        mentionbox[i].style.borderColor = accentColor.value;
       
    }
    for (i = 0; i < tag.length; i++) {
        tag[i].style.backgroundColor = accentColor.value;
    }

     for (i = 0; i < ping.length; i++) {
        ping[i].style.backgroundColor = accentColor.value;
    }
    localStorage.setItem("accentColor", accentColor.value);
})