const btn = document.querySelector('#talk-btn');
const transcriptDisplay = document.querySelector('#transcript');
const statusDot = document.querySelector('#status-dot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    statusDot.classList.add('active');
    transcriptDisplay.innerText = "Alex.ai is listening...";
};

recognition.onresult = (event) => {
    statusDot.classList.remove('active');
    const command = event.results[0][0].transcript;
    transcriptDisplay.innerText = `"${command}"`;
    processCommand(command.toLowerCase());
};

recognition.onerror = () => {
    statusDot.classList.remove('active');
    transcriptDisplay.innerText = "Error occurred. Try again.";
};

function processCommand(msg) {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    if (msg.includes('who are you')) {
        speech.text = "I am Alex.ai, your custom web assistant.";
    } 
    else if (msg.includes('hello') || msg.includes('hey')) {
        speech.text = "Hello! I am Alex.ai. How can I help you today?";
    } 
    else if (msg.includes('time')) {
        speech.text = "The time is " + new Date().toLocaleTimeString();
    } 
    else if (msg.includes('open google')) {
        speech.text = "Opening Google.";
        window.open("https://google.com", "_blank");
    } 
    else if (msg.includes('open youtube')) {
        speech.text = "Opening YouTube.";
        window.open("https://youtube.com", "_blank");
    }
    else {
        speech.text = "I heard you say " + msg + ". I'm still learning how to do that.";
    }

    window.speechSynthesis.speak(speech);
}

btn.addEventListener('click', () => {
    recognition.start();
});
