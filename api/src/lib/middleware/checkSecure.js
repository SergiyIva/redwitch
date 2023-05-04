
const checkSecure = () => (req, res, next) => {
    if (req.secure) next()
    else if (/^\/admin/.test(req.path)) res.status(303).redirect("https://localhost/admin")
    else next()
}

export default checkSecure