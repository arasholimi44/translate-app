import os

def generate_tree_with_content(directory, output_file="FULL_TREE_WITH_CONTENT.md"):
    with open(output_file, "w", encoding="utf-8") as f:
        for root, dirs, files in os.walk(directory):
            level = root.replace(directory, "").count(os.sep)
            indent = "    " * level
            f.write(f"{indent}📁 {os.path.basename(root)}/\n")
            subindent = "    " * (level + 1)
            for file in files:
                filepath = os.path.join(root, file)
                f.write(f"{subindent}📄 {file}\n")
                try:
                    with open(filepath, "r", encoding="utf-8") as content_file:
                        f.write(f"\n```{file.split('.')[-1]}\n{content_file.read()}\n```\n\n")
                except Exception as e:
                    f.write(f"  [Error reading file: {e}]\n")

generate_tree_with_content(".")