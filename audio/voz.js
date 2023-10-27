if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function() {
        console.log('El reconocimiento de voz está activo.');
    };
    recognition.onerror = function(event) {
        console.error('Error en el reconocimiento de voz:', event.error);
    };
    recognition.onend = function() {
        console.log('El reconocimiento de voz ha finalizado.');
    };
    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        console.log(transcript);
    };
    recognition.start();
} else {
    console.error('El navegador no soporta el reconocimiento de voz.');
}