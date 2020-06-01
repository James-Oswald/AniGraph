
start "ServerWindow" python -m http.server
rem start "ChromeWindow" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --new-window "http://localhost:8000/index.html"
pause
taskkill /fi "WindowTitle eq ServerWindow"
taskkill /fi "WindowTitle eq ChromeWindow"
rem del ./tmp/* /s /f /q
exit