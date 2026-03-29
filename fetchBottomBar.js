fetch('https://decorsystems.com.au/')
  .then(r => r.text())
  .then(t => {
    const f = t.indexOf('</footer>');
    if (f !== -1) {
      console.log("CONTENT AFTER FOOTER:");
      console.log(t.substring(f + 9, f + 3000));
    } else {
      console.log("No footer found");
    }
  })
  .catch(e => console.error(e));
