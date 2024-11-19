// import { Client,handle_file } from "@gradio/client";

import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { JoyCaptionAlpha2 } from "./JoyCaptionAlpha2";
import { ScaleImages } from "./ScaleImages";

// export const importDynamic = new Function('modulePath', 'return import(modulePath)');

// const { client } = await importDynamic('@gradio/client');


// // 获取脚本所在的目录
// // const scriptDir = path.dirname(__filename);
// const scriptDir = path.dirname(__dirname);
// // 定义 input 文件夹路径
// const inputFolder = path.join(scriptDir, "input");

// // 检查 input 文件夹是否存在
// if (!fs.existsSync(inputFolder)) {
//     console.error(`Input folder '${inputFolder}' does not exist. Please create it and add images.`);
//     process.exit(1);
// }

// // 初始化 Gradio 客户端
// // const client = new Client("fancyfeast/joy-caption-alpha-two");
// export const importDynamic = new Function('modulePath', 'return import(modulePath)');

// async function sendClientStreamChat(localFilepath:string) {
//     // const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
//     // const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
//     // const exampleImage = await response_0.blob();

//     const { Client,handle_file } = await importDynamic('@gradio/client');

//     const client = await Client.connect("fancyfeast/joy-caption-alpha-two");
//     const result = await client.predict("/stream_chat", {
//         input_image: handle_file(localFilepath),
//         caption_type: "Descriptive",
//         caption_length: "long",
//         extra_options: [],
//         name_input: "",
//         custom_prompt: "",
//     });

//     console.log(result.data);

//     return result.data;
// }

function main() {
    // 遍历文件夹中的所有图片文件
    // fs.readdir(inputFolder, async (err, files) => {
    //     if (err) {
    //         console.error(`Error reading directory: ${err.message}`);
    //         return;
    //     }

    //     for (const fileName of files) {
    //         // 检查文件是否为 .jpg 或 .png
    //         if (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".png")) {
    //             const filePath = path.join(inputFolder, fileName);
    //             const txtFilePath = path.join(inputFolder, `${path.parse(fileName).name}.txt`);

    //             // 处理图片并调用 Gradio 客户端
    //             try {
    //                 const result = await  sendClientStreamChat(filePath);

    //                 // 将结果写入对应的 .txt 文件
    //                 if(result && result[1]){
    //                     fs.writeFileSync(txtFilePath, JSON.stringify(result[1], null, 2), "utf-8");
    //                 }else{
    //                     console.log(`error result for ${fileName}`);
    //                 }
    //                 console.log(`Processed and saved result for ${fileName}`);
    //             } catch (error) {
    //                 console.error(`Error processing ${fileName}: ${(error as Error).message}`);
    //             }
    //         }
    //     }
    // });

    // let joy2 = new JoyCaptionAlpha2();
    // joy2.run();
    let scaleImage = new ScaleImages();
    scaleImage.run();
}

main();


