import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

(async function example() {
    let options = new chrome.Options();

    // Configuraciones adicionales opcionales
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    // Iniciar el navegador Chrome
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Maximizar la ventana del navegador
        await driver.manage().window().maximize();

        // Navegar a Google
        await driver.get('https://www.google.com');

        // Verificar el título de la página
        let title = await driver.getTitle();

        if (title.toLowerCase() === 'google') {
            console.log("Estás en la página correcta.");
        } else {
            console.log("No estás en la página correcta.");
        }

        // Esperar 3 segundos
        await new Promise(resolve => setTimeout(resolve, 3000));

    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
