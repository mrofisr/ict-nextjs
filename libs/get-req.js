import formidable from "formidable";
// const fs = require('fs');
// export default function getRequest (request, path) {
//     return new Promise((resolve, reject) => {
//         const form = formidable({
//             keepExtensions: true, 
//             uploadDir: path,
//             fileWriteStreamHandler: () =>
//                 fs.createWriteStream('C:\\Users\\ivnri\\Documents\\ict\\ict-nextjs-1\\public')

//         });
//         form.parse(request , (err, fields, files) => {
//             if (err) return reject(err);
//             return resolve({fields, files});
//         })
//     })
// }

export default function getRequest (req, path) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = path;

        form.parse (req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({fields, files});
        });
    });
}