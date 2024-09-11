document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('modelFile');
    const formData = new FormData();
    formData.append('modelFile', fileInput.files[0]);

    const statusDiv = document.getElementById('uploadStatus');
    statusDiv.innerHTML = 'Uploading...';

    try {
        const response = await fetch('/upload-model', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            statusDiv.innerHTML = `<div class="alert alert-success">Upload successful!</div>`;
        } else {
            statusDiv.innerHTML = `<div class="alert alert-danger">Error: ${result.error}</div>`;
        }
    } catch (error) {
        statusDiv.innerHTML = `<div class="alert alert-danger">Error: Unable to upload the model.</div>`;
        console.error('Upload error:', error);
    }
});
