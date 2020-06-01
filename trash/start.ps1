$python = start-process "python" "-m http.server" -Passthru
$chromePath = "C:\Users\James\AppData\Local\Google\Chrome SxS\Application\chrome.exe"
$chromeArgs = "--new-window `"http://localhost:8000/index.html`""
$chrome = start-process $chromePath $chromeArgs -Passthru
Read-Host -Prompt "Press Enter to continue..."
stop-process $chrome
stop-process $python
