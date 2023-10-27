// Verifica si el navegador soporta la API
if ('webkitSpeechRecognition' in window) {
    // Inicializa el reconocimiento de voz
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true; // Continúa escuchando incluso si el usuario hace una pausa
    recognition.interimResults = true; // Muestra resultados intermedios

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

    // Comienza el reconocimiento de voz
    recognition.start();

} else {
    console.error('El navegador no soporta el reconocimiento de voz.');
}
