console.log("headerScript.js загружен.");

function getCurrentLocation() {
    console.log("Запрос текущего местоположения запущен.");

    $.getJSON('https://geolocation-db.com/json/')
        .done(data => {
            const city = data.city;
            console.log("Название города получено:", city);

            // Используем Vue.js для обновления города
            const cityElement = document.querySelector('.main-menu__left__location');
            if (cityElement) {
                cityElement.innerHTML = `<img src="/images/main-page/marker.svg" alt="">${city}`;
            }
            // Передаем город во Vue компонент
            if (window.vueApp) {
                window.vueApp.city = city;
            }
        })
        .fail((jqXHR, textStatus, error) => {
            console.error("Ошибка при получении данных о местоположении:", textStatus, error);
        });
}

// Вызываем функцию для получения текущего местоположения
getCurrentLocation();

