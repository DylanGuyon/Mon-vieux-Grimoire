const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const processImage = async (req, res, next) => {
    if (req.file) {
        const webpFilename = req.file.filename.replace(/\.[^.]+$/, ".webp");
        const webpImagePath = path.join("images", webpFilename);

        const newWidth = 400;
        const newHeight = 600;

        try {
            sharp.cache(false)
            await sharp(req.file.path)
                .resize(newWidth, newHeight)
                .webp({ quality: 80 })
                .toFile(webpImagePath);

            // Supprime l'ancienne image après que la nouvelle soit sauvegardée
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression de l'image originale:", err);
                } else {
                    console.log("Image originale supprimée !");
                }
                next();
            });

            req.file.filename = webpFilename;
        } catch (err) {
            console.error("Erreur lors du traitement de l'image:", err);
            return res.status(500).json({
                error: "Erreur lors du traitement de l'image",
            });
        }
    } else {
        next();
    }
};

module.exports = processImage;