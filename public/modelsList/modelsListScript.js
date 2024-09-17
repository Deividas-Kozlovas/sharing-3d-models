document.addEventListener('DOMContentLoaded', async function() {
    const modelGallery = document.getElementById('modelGallery');

    try {
        const response = await fetch('/model-list/user-all');
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
                        <div class="card-body">
                            <h5 class="model-title">${model.fileName}</h5>
                            <p class="card-text">Uploaded on ${new Date(model.uploadDate).toLocaleDateString()}</p>
                            <div id="modelViewer-${model._id}" style="width: 100%; height: 300px;"></div> <!-- Container for 3D model -->
                        </div>
                        <div class="card-footer">
                            <a href="/uploads/${model.fileName}" class="btn btn-primary">Download Model</a>
                        </div>
                    </div>
                </div>
            `;
            modelGallery.innerHTML += cardHtml;

            // Load the 3D model in the container
            load3DModel(`/uploads/${model.fileName}`, `modelViewer-${model._id}`);
        });
    } catch (error) {
        console.error('Error loading models:', error);
    }
});

function load3DModel(modelUrl, containerId) {
    const container = document.getElementById(containerId);

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add lighting to the scene
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the STL model using STLLoader
    const loader = new THREE.STLLoader();
    loader.load(modelUrl, (geometry) => {
        const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 200 });
        const mesh = new THREE.Mesh(geometry, material);

        // Adjust the model size and position
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(0, 0, 0); // Center the model
        mesh.scale.set(1, 1, 1); // Adjust scale as necessary

        scene.add(mesh);

        // Set the camera position
        camera.position.z = 5;

        // Animation loop to render the model and allow interaction
        const animate = function () {
            requestAnimationFrame(animate);
            if (mesh) {
                mesh.rotation.y += 0.01; // Rotate the model for better visualization
            }
            renderer.render(scene, camera);
        };
        animate();
    }, undefined, (error) => {
        console.error('An error occurred while loading the STL model:', error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
