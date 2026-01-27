const { app, BrowserWindow, Menu, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'icon-512x512.png'),
        show: false
    });

    // Load the app
    const startURL = isDev 
        ? 'http://localhost:3000' 
        : `file://${path.join(__dirname, '../build/index.html')}`;
    
    mainWindow.loadURL(startURL);

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Open DevTools in development
        if (isDev) {
            mainWindow.webContents.openDevTools();
        }
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Create application menu
    createMenu();
}

// Create application menu
function createMenu() {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Export Data',
                    click: () => {
                        mainWindow.webContents.send('export-data');
                    }
                },
                {
                    label: 'Import Data',
                    click: () => {
                        mainWindow.webContents.send('import-data');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(process.platform === 'darwin' ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Documentation',
                    click: async () => {
                        await shell.openExternal('https://github.com/meresimi/si-nsa-srp');
                    }
                },
                {
                    label: 'Report Issue',
                    click: async () => {
                        await shell.openExternal('https://github.com/meresimi/si-nsa-srp/issues');
                    }
                },
                { type: 'separator' },
                {
                    label: 'About SI-NSA SRP',
                    click: () => {
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'About SI-NSA SRP',
                            message: 'SI-NSA Statistical Report Program',
                            detail: 'Version 1.0.0\nCross-platform data collection app for Bahá\'í community growth tracking\n\nBased on SRP 3.1 Reference Guide\n\n© 2024 SI-NSA'
                        });
                    }
                }
            ]
        }
    ];

    // Add "App" menu for macOS
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// IPC handlers for file operations
ipcMain.handle('save-file', async (event, content, defaultPath) => {
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
        defaultPath: defaultPath || 'srp-export.json',
        filters: [
            { name: 'JSON Files', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (filePath) {
        try {
            fs.writeFileSync(filePath, content, 'utf8');
            return { success: true, filePath };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    return { success: false, error: 'No file selected' };
});

ipcMain.handle('open-file', async () => {
    const { filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'JSON Files', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (filePaths.length > 0) {
        try {
            const content = fs.readFileSync(filePaths[0], 'utf8');
            return { success: true, content, filePath: filePaths[0] };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    return { success: false, error: 'No file selected' };
});

// App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});