$Date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git add .
git commit -m "Mise à jour auto $Date"
git pull --rebase origin main
git push origin main
