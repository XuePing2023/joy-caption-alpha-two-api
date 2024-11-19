// import { Client,handle_file } from "@gradio/client";

import * as fs from "fs";
import * as os from "os";
import * as path from "path";

// export const importDynamic = new Function('modulePath', 'return import(modulePath)');

// const { client } = await importDynamic('@gradio/client');
/**
 * input_image Blob | File | Buffer Required
The input value that is provided in the "Input Image" Image component.
caption_type string Default: "Descriptive"
The input value that is provided in the "Caption Type" Dropdown component.
caption_length string Default: "long"
The input value that is provided in the "Caption Length" Dropdown component.
extra_options any Default: []
[
'If there is a person/character in the image you must refer to them as {name}.', 
'Do NOT include information about people/characters that cannot be changed (like ethnicity, gender, etc), but do still include changeable attributes (like hair style).',
'Include information about lighting.', 
'Include information about camera angle.', 
'Include information about whether there is a watermark or not.', 
'Include information about whether there are JPEG artifacts or not.', 
'If it is a photo you MUST include information about what camera was likely used and details such as aperture, shutter speed, ISO, etc.', 
'Do NOT include anything sexual; keep it PG.', 
'Do NOT mention the image's resolution.', 
'You MUST include information about the subjective aesthetic quality of the image from low to very high.', 
'Include information on the image's composition style, such as leading lines, rule of thirds, or symmetry.', 
'Do NOT mention any text that is in the image.', 
'Specify the depth of field and whether the background is in focus or blurred.', 
'If applicable, mention the likely use of artificial or natural lighting sources.', 
'Do NOT use any ambiguous language.', 
'Include whether the image is sfw, suggestive, or nsfw.', 
'ONLY describe the most important elements of the image.'
]
The input value that is provided in the "Extra Options" Checkboxgroup component.
name_input string Required
The input value that is provided in the "Person/Character Name (if applicable)" Textbox component.
custom_prompt string Required
The input value that is provided in the "Custom Prompt (optional, will override all other settings)" Textbox component.

Returns list of 2 elements
[0] string
The output value that appears in the "Prompt that was used" Textbox component.
[1] string
The output value that appears in the "Caption" Textbox component.
 */

// 获取脚本所在的目录
// const scriptDir = path.dirname(__filename);
const scriptDir = path.dirname(__dirname);
// 定义 input 文件夹路径
const inputFolder = path.join(scriptDir, "input");

// 检查 input 文件夹是否存在
if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder '${inputFolder}' does not exist. Please create it and add images.`);
    process.exit(1);
}

// 初始化 Gradio 客户端
// const client = new Client("fancyfeast/joy-caption-alpha-two");
export const importDynamic = new Function('modulePath', 'return import(modulePath)');

async function sendClientStreamChat(localFilepath:string) {
    // const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    // const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    // const exampleImage = await response_0.blob();

    const { Client,handle_file } = await importDynamic('@gradio/client');

    const client = await Client.connect("fancyfeast/joy-caption-alpha-two");
    const result = await client.predict("/stream_chat", {
        input_image: handle_file(localFilepath),
        caption_type: "Descriptive",
        caption_length: "long",
        extra_options: [],
        name_input: "",
        custom_prompt: "",
    });

    console.log(result.data);

    return result.data;
}

function main() {
    // 遍历文件夹中的所有图片文件
    fs.readdir(inputFolder, async (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        for (const fileName of files) {
            // 检查文件是否为 .jpg 或 .png
            if (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".png")) {
                const filePath = path.join(inputFolder, fileName);
                const txtFilePath = path.join(inputFolder, `${path.parse(fileName).name}.txt`);

                // 处理图片并调用 Gradio 客户端
                try {
                    const result = await  sendClientStreamChat(filePath);

                    // 将结果写入对应的 .txt 文件
                    if(result && result[1]){
                        fs.writeFileSync(txtFilePath, JSON.stringify(result[1], null, 2), "utf-8");
                    }else{
                        console.log(`error result for ${fileName}`);
                    }
                    console.log(`Processed and saved result for ${fileName}`);
                } catch (error) {
                    console.error(`Error processing ${fileName}: ${(error as Error).message}`);
                }
            }
        }
    });
}

main();

