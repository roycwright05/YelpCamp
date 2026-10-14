#Authentication - the process of verifying who a particular user is. Typically we use a username/password combination


#Authorization - verify what a specific user can do or has access to on your application.

Passport 

****Hashing****
Hashing - rather than storing a password as is, we run a hashing function then store the results in a db

Hashing function  - function that map input data of some arbitrary size to fixed-size output values

'mypassword' -> func -> SJFDOIIFDGJDOEDODO 

CLIENT -login-> {username: 'meemaw', password: 'iluvmoonpies'} ---> SERVER ---> DATABASE

Hashing function is 1 to 1, for every one input, it must produce the same output

Cryptographic Hashing Functions 
    - One-way function which is infeasible to invert
    
    - Small change in input yields large change in output
    - Deterministic - smae input yileds same output
    - Unlikely to find 2 outputs with the same value
    - Password Hash functions are deliberately SLOW

SALTS an extra safeguard
    - creates a unique, random string of characters (the salt) for every single password instance

    Bcrypt: Has our function - for hashing

    npm install-scripts approve bcrypt

    npm approve-scripts bcrypt

    npm rebuild bcrypt

    --------- Passport 
        https://www.passportjs.org/

    npm i passport passport-local passport-local-mongoose
        passport.authenticate('google');

        UserSchema.plugin(passportLocalMongoose.default);