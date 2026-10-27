document.addEventListener("DOMContentLoaded", async () => {
    const username = "_/(._.)\\_"
    if (!username) return;

    const sbase = window.supabase.createClient(
        "https://fjzhzkdbknnoeplniouv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqemh6a2Ria25ub2VwbG5pb3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjgyMDAsImV4cCI6MjA5NjcwNDIwMH0.rlLet3I5i2070my-c7YddGlrb_te1aXkIuQ-263D8cM"
    );
    let params = new URLSearchParams(document.location.search);
    document.getElementById("username").textContent = params.get("user");


    document.getElementById("fullName").textContent = params.get("user") || username;
    document.getElementById("bioText").textContent  = params.get("bio")       || "This user hasn't written a bio yet.";
    document.getElementById("location").textContent = data?.location  || "No location set";
    if (data?.title_color) document.getElementById("username").style.color = data.title_color;

    if (data?.profile_image_id) {
        const { data: img } = await sbase.from("sources").select("image").eq("id", data.profile_image_id).single();
        if (img) document.getElementById("pfp").src = img.image;
    }
});