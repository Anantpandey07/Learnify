import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) =>{
    const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn: '1d'});
    return res
    .status(200)
    .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge : 24 * 60 * 60 * 1000,
    })
    .json({
        success: true,
        message,
        user
    })
}

// What is httpOnly?
// When httpOnly: true, JavaScript on the client side cannot access this cookie.
// This protects it from XSS (Cross-site Scripting) attacks.
// Only the server can access this cookie when the browser sends requests.

// What is sameSite?
// This controls when cookies are sent with cross-site requests.
// "strict" means:
// The cookie will only be sent for same-site requests.
// If your frontend and backend are on different domains/ports (like during development), the cookie won't be sent unless you're careful with CORS.
// Prevents CSRF (Cross-site Request Forgery) attacks.

//  maxAge
// maxAge specifies how long the cookie is valid (in milliseconds).
// 24 * 60 * 60 * 1000 = 1 day.