document.addEventListener("DOMContentLoaded", async () => {
    // Завантажуємо utils.js один раз
    const utilsScript = await import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.2.0/build/js/utils.js");

    const inputs = document.querySelectorAll("[type=tel]"); // Знаходимо всі елементи [type=tel]

    inputs.forEach(input => {
        window.intlTelInput(input, {
            loadUtils: () => utilsScript, // Використовуємо завантажений скрипт
            initialCountry: "auto",
            geoIpLookup: function(callback) {
                fetch('https://ipapi.co/json') // Геолокаційний API
                    .then(response => response.json())
                    .then(data => callback(data.country_code))
                    .catch(() => callback('lv')); // Резервний варіант
            },
            preferredCountries: ["lv", "lt", "ee"],
        });
    });
});
