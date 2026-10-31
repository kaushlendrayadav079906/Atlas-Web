import json

path = 'C:/Users/A/.gemini/antigravity/brain/5b07bcd3-1b27-43b7-a312-bc3572569933/.system_generated/logs/transcript.jsonl'
with open(path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'USER_INPUT':
                print("USER INPUT:", data.get('content')[:120].replace('\n', ' '))
        except Exception:
            pass

