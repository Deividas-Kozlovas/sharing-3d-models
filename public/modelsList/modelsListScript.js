document.addEventListener('DOMContentLoaded', async function() {
    const modelGallery = document.getElementById('modelGallery');

    try {
        const response = await fetch('/model-list/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const models = await response.json();

        // Clear existing content
        modelGallery.innerHTML = '';

        models.forEach(model => {
            // Create a card for each model
            const cardHtml = `
                <div class="col">
                    <div class="card h-100">
                        <img src="https://via.placeholder.com/400x200" class="card-img-top" alt="${model.fileName}">
                        <div class="card-body">
                            <h5 class="model-title">${model.fileName}</h5>
                            <p class="card-text">Uploaded on ${new Date(model.uploadDate).toLocaleDateString()}</p>
                        </div>
                        <div class="card-footer">
                            <a href="/uploads/${model.fileName}" class="btn btn-primary">View Model</a>
                        </div>
                    </div>
                </div>
            `;
            modelGallery.innerHTML += cardHtml;
        });
    } catch (error) {
        console.error('Error loading models:', error);
    }
});
