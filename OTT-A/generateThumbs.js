

const ffmpeg = require('fluent-ffmpeg');

movies = ['Pexels Videos 1258859.mp4',  'Pexels Videos 1494253.mp4',  'Pexels Videos 4549.mp4',  'production ID_3930868.mp4',  'production ID_4695859.mp4']

  movies.forEach(movie => {
    ffmpeg('Movies/' + movie)
    .screenshots({
        count: 1,
        filename: movie + '.png',
        folder: 'Movies/thumbnails',
        // size: '320x240'
    });
}
)