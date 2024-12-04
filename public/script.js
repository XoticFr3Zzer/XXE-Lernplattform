document.addEventListener('DOMContentLoaded', function () {
    let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

    function updateScoreDisplay() {
        const scoreDisplay = document.getElementById('scoreDisplay');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Punkte: ${score}`;
        }
    }

    function unlockAchievement(id) {
        const achievements = JSON.parse(localStorage.getItem('achievements')) || {};
        if (!achievements[id]) {
            achievements[id] = true;
            localStorage.setItem('achievements', JSON.stringify(achievements));
        }
    }

    // Reset-Funktion
    const resetPlatformBtn = document.getElementById('resetPlatform');
    if (resetPlatformBtn) {
        resetPlatformBtn.addEventListener('click', function () {
            if (confirm("Möchtest du die Plattform wirklich zurücksetzen? Alle Fortschritte und Punkte werden gelöscht.")) {
                const achievements = JSON.parse(localStorage.getItem('achievements')) || {};
                localStorage.clear(); // Plattformdaten löschen
                localStorage.setItem('achievements', JSON.stringify(achievements)); // Achievements wiederherstellen
                alert("Die Plattform wurde zurückgesetzt. Starte erneut!");
                location.reload();
            }
        });
    }

    updateScoreDisplay();
});
