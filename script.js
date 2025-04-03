function getColorSuggestions() {
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];

    if (!file) {
        document.getElementById("result").innerHTML = "Please select an image file.";
        return;
    }

    const formData = new FormData();
    formData.append("image", file);  // API should expect "image" as the key

    fetch("https://color-suggestion-api.onrender.com/suggest-colors", {
        method: "POST",
        body: formData,  // Send as FormData, NOT JSON
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = "Suggested Colors: " + JSON.stringify(data);
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = "Error fetching color suggestions: " + error.message;
    });
}
