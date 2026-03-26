const [recording, setRecording] = useState(false);
const [mediaRecorder, setMediaRecorder] = useState(null);

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream, {
  mimeType: "audio/webm;codecs=opus",
});

  let audioChunks = [];

  recorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  recorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

    const formData = new FormData();
    formData.append("audio", audioBlob);

    await sendMessage({
  audio: blob,
});
  };

  recorder.start(100);
  setMediaRecorder(recorder);
  setRecording(true);
};

const stopRecording = () => {
  mediaRecorder.stop();
  setRecording(false);
};

