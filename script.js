// For Normal Text 
function generateNotes() {

  let text = document.getElementById("inputText").value;

  let sentences = text.split(".");

  let summary = sentences.slice(0, 3).join(".");

  document.getElementById("output").innerHTML =
    "<h3>Generated Notes:</h3><p>" + summary + "</p>";
}

// pdf Integration 
document.getElementById('pdfUpload').addEventListener('change', async function(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function() {

        const typedarray = new Uint8Array(reader.result);

        const pdf = await pdfjsLib.getDocument(typedarray).promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const textContent = await page.getTextContent();

            const textItems = textContent.items.map(item => item.str);

            fullText += textItems.join(" ");
        }

        document.getElementById("inputText").value = fullText;
    };

    reader.readAsArrayBuffer(file);
});

//generetor
function generateNotes() {

    const text = document.getElementById("inputText").value;

    if (text.trim() === "") {
        alert("Please upload or paste notes");
        return;
    }

    // Split into sentences
    const sentences = text.split(/[.!?]+/);

    let notes = "";

    // Take important medium-sized sentences
    for (let i = 0; i < sentences.length; i++) {

        let line = sentences[i].trim();

        if (line.length > 40 && line.length < 200) {
            notes += "• " + line + ".\n\n";
        }

        // Limit output size
        if (notes.length > 1500) break;
    }

    document.getElementById("output").innerText = notes;
}