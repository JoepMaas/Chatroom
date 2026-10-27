const usernameInput = document.getElementById("username");
const message = document.getElementById("message");
const imgInput = document.getElementById("imgInput");
const preview = document.getElementById("preview");
const savedImage = localStorage.getItem("profileImage");
const picker = document.getElementById("colorField");
const title = document.getElementById("title");


let users = []; // gets stored usernames so that you can log back in.

const sbase = window.supabase.createClient(
    "https://ztknmxzfbhquizhjebvm.supabase.co",

    "sb_publishable_Pjk4YgT572fVuZDFphIqQA_F7lce8uX"
)

if (savedImage) {
  preview.src = savedImage;
}


const savedColor = localStorage.getItem("TitleColor");
if (savedColor) {
  usernameInput.style.color = savedColor;
  picker.value = savedColor;
}

picker.addEventListener("input", () => {
  usernameInput.style.color = picker.value;
  localStorage.setItem("TitleColor", picker.value);
});

imgInput.addEventListener("change", function () {
  const file = imgInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      
      localStorage.setItem("profileImage", e.target.result);
      
      assingUser(e.target.result);
      
      imgInput.value = "";
    };

    reader.readAsDataURL(file);
  }
});

async function assingUser(img) {
  let id = Math.floor(Math.random() * 10000) + 1;

  await sbase.from("sources").insert({
    id: id,
    image: img
  }) 

  localStorage.setItem("profileImageId", id);
}


function login() {
   const username = usernameInput.value;

  if (username.length > 2 && username.length < 15) {
    localStorage.setItem("currentUser", username); // Adds the currentuser
    location.href = "main.html";
  }
  else{
    message.textContent = "Username is to short or to long";
    console.log(imgInput.value);
    return;
  }

}
