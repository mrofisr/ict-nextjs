import { succes, error } from "@/utils/res";
import getRequest from "@/libs/get-req";


export const config = {
    api: {
        bodyParser: false
    }
}

export default async function hander (req, res) {
    const {fields, files} = await getRequest(req, './public/user')

    console.log(fields);
    console.log(files);
    const path = files.wajah.filepath.replace('C:\\Users\\user\\OneDrive\\ict-nextjs-1\\','');
    const pathWajahKtp = files.wajah_ktp.filepath.replace('C:\\Users\\user\\OneDrive\\ict-nextjs-1\\','')
    console.log(path);
    console.log(pathWajahKtp);



    // const form = formidable({
    //     keepExtensions: true, 
    //     uploadDir: "./public/cover",
    // });
    
    // form.parse(req , (err, fields, files) => {
    //     if (err) console.log(err);
    //     console.log(fields);

    //     return res.status(200).json({
    //         ...succes,
    //         message: "Register user succesfully",
    //     })

    // });
    
    res.status(200).json({
        ...succes,
        message: "Register user succesfully",
    })
}
// {filepath, originalFilename, newFilename} qq
