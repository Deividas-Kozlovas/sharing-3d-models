// Fetch and display models on page load
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/model/get-all-models'); // Endpoint to fetch all models
        const models = await response.json();

        // Call function to render models in the gallery
        renderModels(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        alert('Could not load models.');
    }
});

// Function to render models in the gallery
function renderModels(models) {
    const gallery = document.getElementById('modelGallery');

    // Clear existing content (if any)
    gallery.innerHTML = '';

    // Loop through the models array and create cards
    models.forEach(model => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card h-100">
                <img src="${model.image}" class="card-img-top" alt="${model.title}">
                <div class="card-body">
                    <h5 class="model-title">${model.title}</h5>
                    <p class="card-text">${model.description}</p>
                </div>
                <div class="card-footer">
                    <a href="${model.viewLink}" class="btn btn-primary">View Model</a>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}
