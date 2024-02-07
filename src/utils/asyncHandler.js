/**
 * @function asyncHandler
 * @description Wraps an Express route handler function to handle asynchronous operations.
 * @param {Function} requestHandler - The route handler function to be wrapped.
 * @returns {Function} A middleware function.
 */
const asyncHandler = (requestHandler) => {
    // Returns a middleware function with parameters req, res, and next
    return (req, res, next) => {
        // Creates a Promise object
        Promise
            // Resolves the Promise with the result of calling requestHandler
            .resolve(requestHandler(req, res, next))
            // Catches any errors and passes them to the next middleware
            .catch((err) => next(err));
    };
};



export default asyncHandler

// const asyncHandler = ()=>{}
// const asyncHandler=(func)=>{()=>{}}
// const asyncHandler =(func)=> async()=>{}


// const asyncHandler = (func) => async(req,res,next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
      
//         res.status(err.code||500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }