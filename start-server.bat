@echo off
echo Starting FolioOne Backend Server...
echo.
echo Setting environment variables...
set ADMIN_USERNAME=Sundaram
set ADMIN_PASSWORD=CK@454()
echo Admin Username: %ADMIN_USERNAME%
echo.
echo Starting server on http://localhost:3000...
echo Press Ctrl+C to stop the server
echo.
node backend-api.js
pause