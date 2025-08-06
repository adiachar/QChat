export const wrapAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => console.log("Server error!", err));
    }
}