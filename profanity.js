let profanity;
async function main(){
    profanity = await fetch("profanity.txt").then(response => response.text());
    console.log("loaded progfanity");
}
main();

function filter(input){
    if (input === undefined || input === null){
        return "...";
    }
    let p = profanity.split("\n").sort((a, b) => b.length - a.length);
    let lowercase = input.toLowerCase( ).
    replaceAll("0", "o").
    replaceAll("1", "i").
    replaceAll("2", "s").
    replaceAll("3", "e").
    replaceAll("4", "a").
    replaceAll("@", "a").
    replaceAll("5", "s").trim();

    let output = input.trim();
    p.forEach((profan) => {
        if (profan.length > 3) {
            const profanTrimmed = profan.trim();
            while (lowercase.includes(profanTrimmed)) {
                console.log("profanity found!")
                let ind = lowercase.indexOf(profanTrimmed);

                lowercase = lowercase.replace(profanTrimmed, "*".repeat(profanTrimmed.length));
                output = output.replace(output.substring(ind, ind+profanTrimmed.length), "*".repeat(profanTrimmed.length));

            }
        }
    })

    if (output.includes("https://www.youtube.com/") && output.includes("::")){
        output = output.replaceAll("https://www.youtube.com/","<iframe src=\"https://www.youtube.com/embed/")
        output = output.replaceAll("::","\"></iframe>")
    }

    output = output.replaceAll("{{","<audio controls src=\"")
    output = output.replaceAll("}}","\">failed to load</audio>");
    output = output.replaceAll("[[","<img src=\"")
    output = output.replaceAll("]]","\">")
    output = output.replaceAll(">(("," alt=\"")
    output = output.replaceAll("))","\">")
    return output;
}