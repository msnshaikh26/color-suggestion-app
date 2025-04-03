function getColorSuggestions() {
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];

    if (!file) {
        document.getElementById("result").innerHTML = "Please upload an image.";
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    fetch("https://color-suggestion-api.onrender.com/suggest-colors", {
        method: "POST",
        body: formData, // Send the file as FormData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("result").innerHTML = "Suggested Colors: " + JSON.stringify(data);
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = "Error fetching color suggestions: " + error.message;
    });
}
