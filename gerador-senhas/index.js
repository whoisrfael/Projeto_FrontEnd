const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { password: null }); // Adicione a variável password com valor null ao renderizar a página inicial
  });

app.post('/gerar', (req, res) => {
    const { length, uppercase, lowercase, numbers, special } = req.body;
    let chars = '';
  
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (special) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
    const password = generatePassword(length, chars);
    res.render('index', { password: password }); // Pass the password variable to the template
  });
  

function generatePassword(length, chars) {
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);
    password += chars.charAt(randomIndex);
  }

  return password;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
