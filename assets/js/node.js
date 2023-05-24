new TypeWriter(`#head`, {
  loop: true,
  cursor: {
    speed: 700,
    size: 'larger',
    id: 'Some_TypeWriter_CSS',
    enabled: true
  },
  timeout: 50
})
.write(`Appstate To Facebook Bot`)
.wait(2000)
.removeAll()
.write(`Paste your appstate inside the Textarea`)
.wait(2000)
.removeAll(6)
.start();

new TypeWriter(`#credit`, {
  loop: true,
  cursor: {
    speed: 700,
    size: 'larger',
    id: 'Some_TypeWriter_CSS',
    enabled: true
  },
  timeout: 50
})
.write(`Credit: Ivan Cotacte`)
.wait(2000)
.removeAll()
.write(`Credit: Ivan Cotacte`)
.wait(2000)
.removeAll(6)
.start();

const updatePingStatus = async () => {
  try {
    const start = Date.now();
    await fetch('/ping');
    const end = Date.now();
    const ping = end - start;
    document.getElementById('pingTime').textContent = ping;
  } catch (error) {
    console.error('Error:', error);
  }
};
setInterval(updatePingStatus, 1000);

function clearconsole() {
  document.getElementById("sessionData").value = "";
}

document.addEventListener('contextmenu', 
     event => event.preventDefault()
);
