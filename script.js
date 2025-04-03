async function getColorSuggestions() {
    const imageInput = document.getElementById("imageInput").files[0];

    if (!imageInput) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput);

    const apiUrl = "https://color-suggestion-api.onrender.com/suggest-colors";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById("result").innerHTML = 
            `<strong>Suggested Colors:</strong> ${data.colors.join(", ")}`;
    } catch (error) {
        console.error(error);
        alert("Error fetching color suggestions.");
    }
}