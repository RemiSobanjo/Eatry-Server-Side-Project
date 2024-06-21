const passport = require("passport"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose")

app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());