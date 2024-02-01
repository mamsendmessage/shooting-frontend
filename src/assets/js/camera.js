// camera stream video element
let on_stream_video = document.querySelector('#camera-stream');

let closeButton1 = document.querySelector('#close1');
let closeButton2 = document.querySelector('#close2');

// flip button element
let flipBtn = document.querySelector('#flip-btn');

// default user media options
let constraints = { audio: false, video: true }
let shouldFaceUser = true;

// check whether we can use facingMode
let supports = navigator.mediaDevices.getSupportedConstraints();
if (supports['facingMode'] === true) {
    flipBtn.disabled = false;
}

let stream = null;

function capture() {
    constraints.video = {
        width: {
            min: 192,
            ideal: 192,
            max: 192,
        },
        height: {
            min: 192,
            ideal: 192,
            max: 192
        },
        facingMode: shouldFaceUser ? 'user' : 'environment'
    }
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            stream = mediaStream;
            on_stream_video.srcObject = stream;
            on_stream_video.play();

            // Automatically turn off the camera after 30 seconds
            setTimeout(turnOffCamera, 30000);
        })
        .catch(function (err) {
            console.log(err)
        });
}

function turnOffCamera() {
    if (stream) {
        // Stop all tracks of the current stream
        stream.getTracks().forEach(t => {
            t.stop();
        });
        console.log('Camera turned off after 30 seconds');
    }
}

flipBtn.addEventListener('click', function () {
    if (stream == null) return
    // we need to flip, stop everything
    stream.getTracks().forEach(t => {
        t.stop();
    });
    // toggle / flip
    shouldFaceUser = !shouldFaceUser;
    capture();
})

capture();

document.getElementById("capture-camera").addEventListener("click", function () {
    // Elements for taking the snapshot
    const video = document.querySelector('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const tElement = document.getElementById('photo');
    tElement.value = canvas.toDataURL();
    tElement.dispatchEvent(new Event('input'));
});

closeButton1.addEventListener('click', function () {
    turnOffCamera();
})
closeButton2.addEventListener('click', function () {
    turnOffCamera();
})