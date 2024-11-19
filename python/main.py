import os
from gradio_client import Client, handle_file

# client = Client("fancyfeast/joy-caption-alpha-two")

# result = client.predict(
# 		input_image=handle_file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'),
# 		caption_type="Descriptive",
# 		caption_length="long",
# 		extra_options=[],
# 		name_input="Hello!!",
# 		custom_prompt="Hello!!",
# 		api_name="/stream_chat"
# )
# print(result)


# 初始化 Gradio 客户端
client = Client("fancyfeast/joy-caption-alpha-two")

# 获取脚本所在的目录
script_dir = os.path.dirname(os.path.abspath(__file__))

# 定义 input 文件夹路径
input_folder = os.path.join(script_dir, "input")

# 检查 input 文件夹是否存在
if not os.path.exists(input_folder):
    print(f"Input folder '{input_folder}' does not exist. Please create it and add images.")
    exit()

# 遍历文件夹中的所有图片文件
for file_name in os.listdir(input_folder):
    # 检查文件是否为 .jpg 或 .png
    if file_name.lower().endswith(('.jpg', '.png')):
        file_path = os.path.join(input_folder, file_name)
        txt_file_path = os.path.join(input_folder, os.path.splitext(file_name)[0] + ".txt")
        
        # 处理图片并调用 Gradio 客户端
        #caption_type Literal['Descriptive', 'Descriptive (Informal)', 'Training Prompt', 'MidJourney', 'Booru tag list', 'Booru-like tag list', 'Art Critic', 'Product Listing', 'Social Media Post'] Default: "Descriptive"
        #caption_length Literal['any', 'very short', 'short', 'medium-length', 'long', 'very long', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260'] Default: "long"
        #extra_options List[Literal['If there is a person/character in the image you must refer to them as {name}.', 'Do NOT include information about people/characters that cannot be changed (like ethnicity, gender, etc), but do still include changeable attributes (like hair style).', 'Include information about lighting.', 'Include information about camera angle.', 'Include information about whether there is a watermark or not.', 'Include information about whether there are JPEG artifacts or not.', 'If it is a photo you MUST include information about what camera was likely used and details such as aperture, shutter speed, ISO, etc.', 'Do NOT include anything sexual; keep it PG.', 'Do NOT mention the image's resolution.', 'You MUST include information about the subjective aesthetic quality of the image from low to very high.', 'Include information on the image's composition style, such as leading lines, rule of thirds, or symmetry.', 'Do NOT mention any text that is in the image.', 'Specify the depth of field and whether the background is in focus or blurred.', 'If applicable, mention the likely use of artificial or natural lighting sources.', 'Do NOT use any ambiguous language.', 'Include whether the image is sfw, suggestive, or nsfw.', 'ONLY describe the most important elements of the image.']] Default: []
        #name_input str Required
        #The input value that is provided in the "Person/Character Name (if applicable)" Textbox component.
        #custom_prompt str Required
        #The input value that is provided in the "Custom Prompt (optional, will override all other settings)" Textbox component.

        #Returns tuple of 2 elements
        #[0] str
        #The output value that appears in the "Prompt that was used" Textbox component.
        #[1] str
        #The output value that appears in the "Caption" Textbox component.

        try:
            result = client.predict(
                input_image=handle_file(file_path),
                caption_type="Descriptive",
                caption_length="long",
                extra_options=[],
                name_input="",
                custom_prompt="",
                api_name="/stream_chat"
            )
            # 将结果写入对应的 .txt 文件
            with open(txt_file_path, "w", encoding="utf-8") as txt_file:
                print(str(result))
                if len(result) > 1:
                    txt_file.write(str(result[1]))
                else:
                    txt_file.write(str(result[0]))
            print(f"Processed and saved result for {file_name}")
        except Exception as e:
            print(f"Error processing {file_name}: {e}")
