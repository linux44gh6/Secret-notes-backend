import { Router } from "express"

const router=Router()

const moduleRouter:{path:string,route:Router}[]=[]

moduleRouter.forEach((route)=>router.use(route.path,route.route))

export default router
