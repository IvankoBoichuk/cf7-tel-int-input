document.addEventListener("DOMContentLoaded", async () => {
    // Завантажуємо utils.js один раз
    const utilsScript = await import(
      "https://cdn.jsdelivr.net/npm/intl-tel-input@25.2.0/build/js/utils.js"
    );
    const forms = document.querySelectorAll("form.wpcf7-form"); // Знаходимо всі форми CF7
  
    forms.forEach((form) => {
      const input = form.querySelector("[type=tel]"); // Знаходимо поле [type=tel] у формі
      if (!input) {
        return;
      }
      const iti = window.intlTelInput(input, {
        loadUtils: () => utilsScript, // Використовуємо завантажений скрипт
        initialCountry: "auto",
        geoIpLookup: function (callback) {
          fetch("https://ipapi.co/json") // Геолокаційний API
            .then((response) => response.json())
            .then((data) => callback(data.country_code))
            .catch(() => callback("lv")); // Резервний варіант
        },
        preferredCountries: ["lv", "lt", "ee"],
        formatOnDisplay: true, // Форматуємо номер при відображенні
        nationalMode: false, // Вимагаємо міжнародний формат
        autoPlaceholder: "aggressive" // Додаємо маску до поля
      });
  
      // Додаємо маску через iMask на основі placeholder
      const updateMask = () => {
        const placeholder = input.placeholder;
        const dialCode = iti.getSelectedCountryData().dialCode.replace("0","\\0");
        const maskPattern = `+{${dialCode}} ` + placeholder.slice(placeholder.indexOf(" ") + 1).replace(/\d/g, "0");
        if (input.imaskInstance) {
          input.imaskInstance.updateOptions({ mask: maskPattern });
        } else {
          input.imaskInstance = IMask(input, { mask: maskPattern });
        }
      };
  
      // Оновлюємо маску при зміні країни
      input.addEventListener("countrychange", () => {
        updateMask();
      });
  
      // Додаємо маску під час завантаження сторінки
      updateMask();
    });
  });
  