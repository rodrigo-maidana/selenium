import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

// Función para agregar un delay de 1 segundo entre cada acción
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function testLoginLogout() {
    let options = new chrome.Options();

    // Configuraciones adicionales opcionales
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    // Iniciar el navegador Chrome
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Maximizar la ventana del navegador
        await driver.manage().window().maximize();

        // Navegar a la página de inicio de sesión
        await driver.get('http://localhost:5173/');
        await delay(1000);  // Esperar 1 segundo

        // Esperar a que los campos de entrada estén presentes
        await driver.wait(until.elementLocated(By.css('input[type="text"].form-control')), 5000);
        await driver.wait(until.elementLocated(By.css('input[type="password"].form-control')), 5000);
        await delay(1000);  // Esperar 1 segundo

        // Introducir el usuario (en este caso 'a') en el campo de texto
        await driver.findElement(By.css('input[type="text"].form-control')).sendKeys('a');
        await delay(1000);  // Esperar 1 segundo

        // Introducir la contraseña (en este caso 'a') en el campo de contraseña
        await driver.findElement(By.css('input[type="password"].form-control')).sendKeys('a');
        await delay(1000);  // Esperar 1 segundo

        // Hacer clic en el botón de login usando la clase del botón
        await driver.findElement(By.css('button.btn.btn-primary.btn-block')).click();
        await delay(5000);  // Esperar 1 segundo

        // Esperar a que la página redirija o muestre un mensaje de éxito
        await driver.wait(until.urlContains('proveedores'), 5000); // Ahora esperamos que la URL contenga 'proveedores'
        await delay(1000);  // Esperar 1 segundo

        // Verificar si el login fue exitoso (basado en que la URL contiene 'proveedores')
        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('proveedores')) {
            console.log("Login exitoso. Redirigido a la página de proveedores.");
        } else {
            console.log("Error en el login. No redirigido a proveedores.");
        }

        // Esperar explícitamente que el botón "Salir" esté visible y sea interactuable
        let logoutButton = await driver.wait(until.elementIsVisible(driver.findElement(By.css('button.btn.btn-outline-light'))), 5000);
        await driver.wait(until.elementIsEnabled(logoutButton), 5000);

        // Realizar logout
        await logoutButton.click();
        await delay(1000);  // Esperar 1 segundo

        console.log("Logout realizado exitosamente.");

    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
