import formidable from "formidable";

export default function getRequest (request, path) {
    return new Promise((resolve, reject) => {
        const form = formidable({
            keepExtensions: true, 
            uploadDir: path,
        });
        form.parse(request , (err, fields, files) => {
            if (err) return reject(err);
            return resolve({fields, files});
        })
    })
}