exports.addModel = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Handle the file (e.g., save details to the database)
    res.json({ message: 'File uploaded successfully!', file: req.file });
};
