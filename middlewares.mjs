export function checkAuth(req, res, next) {
  if (req.path === '/auth/login' || req.path === '/auth/register') {
    return next();
  }

  if (req.path === '/auth/adminLogin' || req.path === '/auth/adminRegister') {
    return next();
  }
  
    if (req.session.data === undefined) {
      return res.redirect('/auth/login')
    }

    const role = req.session.data.role;

    if (role === 'student') {
      // Only allow access to student files
      if (!req.path.startsWith('/dashboard') && !req.path.startsWith('/exam')) {
        return res.send('sorry you are not unauthorized');
      }
    }

    if (role === 'admin') {
      // Only allow access to student files
      if (!req.path.startsWith('/admin')) {
        return res.send('sorry you are not unauthorized');
      }
    }
  
    // Make `sessionData` available in templates. E.g. check navbar.ejs line:12
    res.locals.sessionData = req.session.data
  
    next()
  }