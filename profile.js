document.addEventListener('DOMContentLoaded', async () => {
    const sbase = window.supabase.createClient(
        "https://fjzhzkdbknnoeplniouv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqemh6a2Ria25ub2VwbG5pb3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjgyMDAsImV4cCI6MjA5NjcwNDIwMH0.rlLet3I5i2070my-c7YddGlrb_te1aXkIuQ-263D8cM"
    );

    const me = localStorage.getItem('currentUser');
    if (!me) return;

    const img = document.getElementById('thePFP');
    const fileInput = document.getElementById('file');
    const colorPicker = document.getElementById("colorField");
    const bio = document.getElementById("bio");
    const DEFAULT_PFP = "free-user-icon-3296-thumb.png";

    document.querySelector('.username').textContent = me;

    document.getElementById('bio').innerText      = localStorage.getItem('bio')

    async function save(fields) {
        await sbase.from("profiles").upsert({ username: me, ...fields }, { onConflict: "username" });
    }



        document.getElementById('bio').innerText      = localStorage.getItem('bio') || "";
        document.getElementById('location').innerText = localStorage.getItem('_location') || "";
        document.getElementById('fullName').innerText = localStorage.getItem('currentUser') || "";
        const savedColor = localStorage.getItem("TitleColor");
        if (savedColor) { colorPicker.value = savedColor; document.querySelector('.username').style.color = savedColor; }
        const savedId = localStorage.getItem(me + '_profileImageId');
        if (savedId) {
            const { data: imgData } = await sbase.from("sources").select("image").eq("id", Number(savedId)).single();
            if (imgData) img.src = imgData.image;
        }


    colorPicker.addEventListener("input", async (e) => {
        document.querySelector('.username').style.color = e.target.value;
        localStorage.setItem("TitleColor", e.target.value);
        await save({ title_color: e.target.value });
    });

    bio.addEventListener("input", async (e) => {
        localStorage.setItem("bio", e.target.innerText);
        console.log( e.target.innerText);
    })

    document.getElementById('camera').addEventListener('click', () => fileInput.click());
    document.getElementById('editBtn').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async function () {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            img.src = e.target.result;
            const id = Math.floor(Math.random() * 1000000) + 1;
            await sbase.from("sources").insert({ id, image: e.target.result });
            localStorage.setItem("profileImageId", id);
            localStorage.setItem(me + '_profileImageId', id);
            await save({ profile_image_id: id });
        };
        reader.readAsDataURL(file);
    });

    const usernameEl = document.querySelector('.username');
    usernameEl.addEventListener('click', () => { usernameEl.contentEditable = true; usernameEl.focus(); });
    usernameEl.addEventListener('blur', () => {
        usernameEl.contentEditable = false;
        const newName = usernameEl.textContent.trim();
        if (newName && newName !== me) { localStorage.setItem('currentUser', newName); alert("Username updated! Refresh chat for full effect."); }
    });

    for (const [id, lsKey, col] of [['bio','bio','bio'], ['location','location','location'], ['fullName','fullName','full_name']]) {
        const el = document.getElementById(id);
        el.addEventListener('click', () => { el.contentEditable = true; el.focus(); });
        el.addEventListener('blur', async () => {
            el.contentEditable = false;
            const value = el.innerText.trim();
            localStorage.setItem(me + '_' + lsKey, value);
            await save({ [col]: value });
        });
    }
});