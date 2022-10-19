import json
import os
import cv2

movies = os.listdir('Movies')
movies.remove('thumbnails')

content = {}
for i, movie in enumerate(movies):
    # Calculate duration
    cap = cv2.VideoCapture('Movies/' + movie)
    frameCount = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    duration = frameCount/fps
    cap.release()

    content['marvel' + str(i)] = {
        'id': 'marvel' + str(i),
        'name': movie,
        'thumbnail': movie.replace('.mp4', '.mp4.png'),
        'duration': duration,
        'cost': 1000
    }

with open('content.json', 'w') as f:
    json.dump(content, f)