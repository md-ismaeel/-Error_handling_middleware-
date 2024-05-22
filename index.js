const express = require('express')
const app = express()

const port = 8000;
app.use(express.json())


// Middleware to validate user registration data
function validateRegistration(req, res, next) {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validate first name and last name
    const nameRegex = /^[A-Z][a-zA-Z]*(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        res.status(400).json({
            sucess: false,
            message: "First and last name must start with a capital letter and contain only alphabetic characters, spaces, hyphens, or apostrophes."
        });
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({
            sucess: false,
            message: "Email address must contain '@' and follow standard email format."
        });

    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {

        res.status(400).json({
            sucess: false,
            message: "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one numeric character, and one special character."
        });
    }

    // Validate phone number
    const digitsOnly = phone.replace(/\D/g, "");  // Remove non-digit characters
    if (digitsOnly.length < 10) {

        res.status(400).json({
            sucess: false,
            message: "Phone number must contain at least 10 digits."
        });

    }

    next();
}

// Route to handle user registration
app.post('/api/vi/register', validateRegistration, (req, res) => {
    res.status(200).json({
        sucess: true,
        message: "user Registration successful"
    });
});



app.use('/*', (req, res) => {
    res.json({
        success: false,
        message: 'Path not found'
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))