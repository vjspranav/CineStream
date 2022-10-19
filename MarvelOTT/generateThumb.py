import PIL
from PIL import Image
import os
import cv2

def generateThumbFromVideo(videoPath, thumbPath, size):
    # Take ss at 1/3rd of the video
    cap = cv2.VideoCapture(videoPath)
    frameCount = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frameNumber = int(frameCount/3)
    cap.set(1, frameNumber)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(thumbPath, frame)
    cap.release()
    # Resize the image
    img = Image.open(thumbPath)
    img = img.resize(size, PIL.Image.ANTIALIAS)
    img.save(thumbPath)


if __name__ == "__main__":
    movies = 'Movies/'
    thumbs = 'Movies/thumbnails/'

    for movie in os.listdir(movies):
        if movie.endswith('.mp4'):
            moviePath = os.path.join(movies, movie)
            thumbPath = os.path.join(thumbs, movie.replace('.mp4', '.mp4.png'))
            generateThumbFromVideo(moviePath, thumbPath, (512, 512))