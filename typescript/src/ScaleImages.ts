import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

interface ImageStats {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
}

export class ScaleImages{
    mInputFolder = "input";
    mOutputFolder = "output";
    mFileExtensionList = [".jpg", ".png", ".webp"];
    mDestMaxWidth = 2048;
    mDestMaxHeight = 2048;

    //最后的最大最小  用于设置桶的最大宽高
    mResultMaxWidth = 99999;
    mResultMinWidth = 0;
    mResultMaxHeight = 99999;
    mResultMinHeight = 0;
    mResultStats:ImageStats;

    constructor() {
        this.mInputFolder = path.join(path.dirname(__dirname), this.mInputFolder);
        this.mOutputFolder = path.join(path.dirname(__dirname), this.mOutputFolder);
        // 检查 input 文件夹是否存在
        if (!fs.existsSync(this.mInputFolder)) {
            console.error(`Input folder '${this.mInputFolder}' does not exist. Please create it and add images.`);
            process.exit(1);
        }        
        // 检查 output 文件夹是否存在
        if (!fs.existsSync(this.mOutputFolder)) {
            fs.mkdirSync(this.mOutputFolder);
        }
    }

    run() {
        this.mResultStats = {
            minWidth: Infinity,
            maxWidth: -Infinity,
            minHeight: Infinity,
            maxHeight: -Infinity,
        };

        fs.readdir(this.mInputFolder, async (err, files) => {
            if (err) {
                console.error(`Error reading directory: ${err.message}`);
                return;
            }

            for (const fileName of files) {
                // 检查文件是否为 .jpg 或 .png
                let fileExt = path.extname(fileName);
                if (this.mFileExtensionList.includes(fileExt.toLowerCase())) {
                    const inputFilePath = path.join(this.mInputFolder, fileName);
                    const outputFilePath = path.join(this.mOutputFolder, fileName);
        
                    try {
                        const image = sharp(inputFilePath);
                        const metadata = await image.metadata();
        
                        if (!metadata.width || !metadata.height) {
                            console.error(`Could not get metadata for ${fileName}`);
                            continue;
                        }
        
                        // 计算缩放比例
                        const scale = Math.min(this.mDestMaxWidth / metadata.width, this.mDestMaxHeight / metadata.height, 1);
                        const newWidth = Math.round(metadata.width * scale);
                        const newHeight = Math.round(metadata.height * scale);
        
                        // 更新统计信息
                        this.mResultStats.minWidth = Math.min(this.mResultStats.minWidth, newWidth);
                        this.mResultStats.maxWidth = Math.max(this.mResultStats.maxWidth, newWidth);
                        this.mResultStats.minHeight = Math.min(this.mResultStats.minHeight, newHeight);
                        this.mResultStats.maxHeight = Math.max(this.mResultStats.maxHeight, newHeight);
        
                        // 缩放图片并保存到输出目录
                        await image.resize(newWidth, newHeight).toFile(outputFilePath);
                        console.log(`Processed ${fileName}: ${newWidth}x${newHeight}`);
                    } catch (error) {
                        console.error(`Error processing ${fileName}: ${(error as Error).message}`);
                    }

            
                }
            }
            console.log(this.mResultStats);
        });

    }

}