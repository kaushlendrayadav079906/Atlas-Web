import os
import glob
import re

src_dir = os.path.join(os.getcwd(), 'src')

replacements = [
    # 1. Gradients for text highlights
    ('from-[#1B72E8] via-[#7139E8] to-[#9B72CF]', 'from-[#0052CC] via-[#0066CC] to-[#0A66C2]'),
    ('from-[#1b72e8] via-[#7139e8] to-[#9b72cf]', 'from-[#0052CC] via-[#0066CC] to-[#0A66C2]'),
    
    # 2. Button and active indicator gradients
    ('from-[#1B72E8] to-[#7139E8]', 'from-[#0052CC] to-[#0A66C2]'),
    ('from-[#1b72e8] to-[#7139e8]', 'from-[#0052CC] to-[#0A66C2]'),
    ('hover:from-[#1557B0] hover:to-[#5B21B6]', 'hover:from-[#0040A8] hover:to-[#08529C]'),
    ('hover:to-[#5B21B6]', 'hover:to-[#08529C]'),
    
    # 3. Purple hex codes
    ('#7139E8', '#0066CC'),
    ('#7139e8', '#0066CC'),
    ('#9B72CF', '#0A66C2'),
    ('#9b72cf', '#0A66C2'),
    ('#963ee8', '#0066CC'),
    ('#a34dff', '#0A66C2'),
    
    # 4. Purple Tailwind utility classes
    ('bg-purple-500/5', 'bg-blue-500/5'),
    ('bg-purple-50', 'bg-blue-50'),
    ('bg-purple-100', 'bg-blue-100'),
    ('border-purple-100', 'border-blue-100'),
    ('border-purple-200', 'border-blue-200'),
    ('border-purple-300', 'border-blue-300'),
    ('text-purple-600', 'text-[#0066CC]'),
    ('bg-purple-600', 'bg-[#0066CC]'),
    ('hover:border-purple-200', 'hover:border-blue-200'),
    ('hover:border-purple-300', 'hover:border-blue-300'),
    ('hover:shadow-purple-500/10', 'hover:shadow-blue-500/10'),
    ('via-purple-100', 'via-blue-100'),
    ('to-purple-50', 'to-blue-50'),
    ('bg-[#fbf7ff]', 'bg-[#f4f9ff]'),
]

count_files_changed = 0

for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.css')):
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8') as fp:
                original = fp.read()
            
            modified = original
            for src_pattern, target_pattern in replacements:
                modified = modified.replace(src_pattern, target_pattern)
            
            if modified != original:
                with open(fpath, 'w', encoding='utf-8') as fp:
                    fp.write(modified)
                count_files_changed += 1
                rel_path = os.path.relpath(fpath, os.getcwd())
                print(f"Updated {rel_path}")

print(f"\nDone! Modified {count_files_changed} files.")

