import re

path = 'src/pages/AboutPage.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'\s*\{/\* Subtle warm organic wave contour lines matching reference \*/\}\s*<svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20".*?</svg>'
new_content = re.sub(pattern, '', content, flags=re.DOTALL)

if new_content != content:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully removed the 3 wave contour lines from AboutPage.tsx")
else:
    print("Warning: Pattern did not match")

