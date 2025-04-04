function getColorSuggestions() {
    const fileInput = document.getElementById("imageInput");
    const resultDiv = document.getElementById("result");

    if (!fileInput.files || fileInput.files.length === 0) {
        resultDiv.innerHTML = "Please select an image file.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const base64Image = event.target.result;

        fetch("https://color-suggestion-api.onrender.com/suggest-colors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image_data: base64Image }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `<strong>Suggested Colors:</strong><br>${JSON.stringify(data)}`;
        })
        .catch(error => {
            console.error("Error:", error);
            resultDiv.innerHTML = "Error fetching color suggestions: " + error.message;
        });
    };

    reader.onerror = function() {
        resultDiv.innerHTML = "Error reading the image file.";
    };

    reader.readAsDataURL(file);
}
