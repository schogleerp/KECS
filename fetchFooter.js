fetch('https://decorsystems.com.au/')
  .then(r => r.text())
  .then(t => {
    const f = t.lastIndexOf('<footer');
    if (f !== -1) {
      const e = t.indexOf('</footer>', f);
      console.log(t.substring(f, e + 9));
    } else {
      console.log('No footer found using lastIndexOf <footer');
      // If it's a SPA, maybe the content is in a specific div. Let's just print the last 5000 chars of body.
      const b = t.lastIndexOf('<body');
      console.log(t.substring(Math.max(0, t.length - 5000)));
    }
  })
  .catch(e => console.error(e));
