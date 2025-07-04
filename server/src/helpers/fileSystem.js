const fs = require("fs");

const deleteFile = (filePath) => {
    fs.unlinkSync(filePath, (err) => {
    	if (err) {
        	return res.status(500).json({ error: 'Error deleting file' });
        }
        res.json({ message: 'File deleted successfully' });
    });
}


module.exports = deleteFile;