
// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const totalTimeEl = document.querySelector('.total-time');
    
    // Si ya está cargada la metadata, actualizas directamente
    if (audio.readyState >= 1) {
        setTotalDuration();
    } else {
        // Si no, esperas a que esté cargada
        audio.addEventListener('loadedmetadata', setTotalDuration);
    }

    function setTotalDuration() {
        const duration = Math.floor(audio.duration);
        progress.max = duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        totalTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    // Luego todo tu otro código sigue normal...
});











document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause');
    const backwardBtn = document.getElementById('backward');
    const forwardBtn = document.getElementById('forward');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const disk = document.querySelector('.disk');
    const lyricsContainer = document.getElementById('lyrics');

    let isPlaying = false;

    // Ejemplo de letra sincronizada
    const lyricsData = [
        { time: 0, text: "[Coro] ¡Ohhh C0CA JUNIORS, gloria y pasión! En cada cancha, somos un solo corazón. Con garra y con alma, jugamos sin miedo, honrando la historia, forjando el futuro en el ruedo."},
        { time: 36, text: "Desde el barrio hasta el mundo, nuestra voz retumbó, con Casado y Jurado, la defensa se cerró. Dominamos la cancha, con magia y honor, como Pérez en el medio, marcando el valor." },
        { time: 47, text: "Y en el área rival, un rugido feroz, es Domènech con clase, definiendo veloz. Carrillo en el arco, gigante sin par, las leyendas nos guían, nos enseñan a ganar." },
        { time: 57, text: " [Coro] ¡Ohhh C0CA JUNIORS, gloria y pasión! En cada cancha, somos un solo corazón. Con garra y con alma, jugamos sin miedo, honrando la historia, forjando el futuro en el ruedo." },
        { time: 93, text: "Maradona es nuestra luz, su espíritu vive, en cada gambeta, su arte nos persigue. Jugamos con alma, jugamos con fe, porque C0CA JUNIORS jamás caerá de pie." },
        { time: 104, text: "Con el escudo en el pecho y el grito en la voz, somos un equipo, somos un Dios. Desde el ayer hasta el mañana, C0CA JUNIORS siempre gana." },
        { time: 114, text: "¡Ohhh C0CA JUNIORS, gloria y pasión! Llevamos el fútbol en el corazón. Que ruja la hinchada, que tiemble el rival, C0CA JUNIORS, inmortal." },
        { time: 133, text: "Música"},
        { time: 174, text: "[Coro] ¡Ohhh C0CA JUNIORS, gloria y pasión! En cada cancha, somos un solo corazón. Con garra y con alma, jugamos sin miedo, honrando la historia, forjando el futuro en el ruedo. Con él en la piel."},
        { time: 194, text: "COCA JUNIORS!! GLORIA Y PASIÓN!!!. Llevamos el fútbol en el corazón."},
        { time: 203, text: "Que ruja la hinchada, que tiemble el rival."},
        { time: 207, text: "COCA JUNIORS!!!!"},
        { time: 210, text: "INMORTAL!!."}
    ];

    audio.addEventListener('loadedmetadata', () => {
        console.log('Duración del audio:', audio.duration);
        const duration = Math.floor(audio.duration);
        progress.max = duration; // Ajustar el max de la barra de progreso a la duración
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        totalTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });

    
    // Actualizar progreso y tiempo mientras se reproduce
    audio.addEventListener('timeupdate', () => {
    // Actualizar la barra de progreso
        progress.value = Math.floor(audio.currentTime);

    // Actualizar el tiempo actual
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Actualizar la letra sincronizada
        updateLyrics(audio.currentTime);
    });

    // Botón play/pause
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = '▶️';
            disk.style.animationPlayState = 'paused'; // Detener la animación del disco
        } else {
            audio.play();
            playPauseBtn.textContent = '⏸️';
            disk.style.animationPlayState = 'running'; // Iniciar la animación del disco
        }
        isPlaying = !isPlaying;
    });

    // Botón retroceder 10 segundos
    backwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    // Botón adelantar 10 segundos
    forwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    // Cambiar tiempo desde la barra de progreso
    progress.addEventListener('input', () => {
        audio.currentTime = progress.value;
    });

    // Actualizar la letra sincronizada
    function updateLyrics(currentTime) {
        const currentLyric = lyricsData.slice().reverse().find(lyric => currentTime >= lyric.time);
        if (currentLyric) {
            lyricsContainer.textContent = currentLyric.text;
        }
    }

    // Detener la reproducción y la animación cuando termine la canción
    audio.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶️';
        disk.style.animationPlayState = 'paused'; // Detener la animación del disco
        isPlaying = false;
        progress.value = 0; // Resetear la barra de progreso
        currentTimeEl.textContent = '0:00'; // Resetear el tiempo actual
    });
});

