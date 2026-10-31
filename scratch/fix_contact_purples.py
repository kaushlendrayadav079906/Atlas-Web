with open('src/data/contactContent.ts', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('"#9333ea"', '"#0A66C2"')
c = c.replace('"text-[#9333ea]"', '"text-[#0066CC]"')
c = c.replace('"bg-[#f3e8ff]"', '"bg-blue-50"')
c = c.replace('border-[#9333ea]', 'border-[#0066CC]')
c = c.replace('bg-[#9333ea]', 'bg-[#0A66C2]')

with open('src/data/contactContent.ts', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated contactContent.ts')

with open('src/pages/ContactPage.tsx', 'r', encoding='utf-8') as f:
    c2 = f.read()

c2 = c2.replace('text-[#9333ea]', 'text-[#0066CC]')

with open('src/pages/ContactPage.tsx', 'w', encoding='utf-8') as f:
    f.write(c2)

print('Updated ContactPage.tsx')

