from pathlib import Path
from fastapi import FastAPI
from fastapi import Request, Response
from fastapi import Header
from fastapi.staticfiles import StaticFiles

import json
import uvicorn

app = FastAPI()
CHUNK_SIZE = 1024*1024

with open('content.json') as f:
    content = json.load(f)

app.mount("/thumbnails", StaticFiles(directory="Movies/thumbnails"), name="Thumbnails")

@app.get("/")
async def root():
    return content

@app.get("/video/{video_id}")
async def video(request: Request, response: Response, range: str = Header(None)):
    video_id = request.path_params['video_id']
    video_path = Path('Movies/' + content[video_id]['name'])
    if not video_path.exists():
        return Response(status_code=404)
    if not range:
        range = 'bytes=0-'
    start, end = range.replace("bytes=", "").split("-")
    start = int(start)
    end = int(end) if end else start + CHUNK_SIZE
    with open(video_path, "rb") as video:
        video.seek(start)
        data = video.read(end - start)
        filesize = str(video_path.stat().st_size)
        headers = {
            'Content-Range': f'bytes {str(start)}-{str(end)}/{filesize}',
            'Accept-Ranges': 'bytes'
        }
        return Response(data, status_code=206, headers=headers, media_type="video/mp4")
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0" , port=3005)