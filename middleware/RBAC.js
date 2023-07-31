// Role Based Access Control

// const forAdmin = (req,res,next) => {
//   if(req.user.role === "admin" || req.user.role === "superAdmin"  )
//   {
//     return next()
//   }
//   return res.send(
//    {
//     msg : "Not Authorized"
//    } 
//   )
// }

// const forAdmin=(req,res,next)=>{
//     if(req.user.role==="admin" || req.user.role==="superAdmin"){
//         return next()
//     }else{
//         if(req.user.role !== "admin"|| req.user.role !== "user"){
//             return next()
//         }else{
//             return res.send({
//                 message: 'You are not authorized to access this resource'
//             })
//         }
//     }
// }



// const forSuperAdmin = (req,res,next) => {
//     if(req.user.role === "superAdmin")
//     {
//       return next()
//     }
//     return res.send(
//      {
//       msg : "Not Authorized"
//      } 
//     )
// }

const roles = {
    user : {
        permissions : ['get']
    },
    admin : {
        permissions : ["get", "post", "put", "patch"]
    },
    superAdmin:{
        permissions : ["get", "post", "put", "patch","delete"]
    }
}


const RBAC = (req, res, next) =>{
    if(
        req.user && roles[req.user.role] && roles[req.user.role].permissions.includes(req.method.toLowerCase())
    )
    return next()

    return res.send({msg :" Not Authorized"})
  }


module.exports = {RBAC}