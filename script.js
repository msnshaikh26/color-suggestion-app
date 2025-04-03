document.querySelector("button").addEventListener("click", function () {
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];

    if (!file) {
        document.getElementById("result").innerHTML = "⚠️ Please select an image file first.";
        return;
    }

    const formData = new FormData();
    formData.append("image", file);  // API expects "image" as key

    fetch("https://color-suggestion-api.onrender.com/suggest-colors", {
        method: "POST",
        body: formData,  // Must send as FormData, not JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("result").innerHTML = "<strong>Suggested Colors:</strong> " + JSON.stringify(data);
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = "❌ Error fetching color suggestions: " + error.message;
    });
});
