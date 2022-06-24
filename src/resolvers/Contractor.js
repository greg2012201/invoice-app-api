import mongoose from 'mongoose'
import Contractor from '../models/Contractor.js'



export default {
    Query : {
        getContractors: async (parent, args,context, info) => {
            try {
               
                return await Contractor.find({})
            }
            catch (e) {
                console.log(`Error happened at Query getContractors ${args}`)
                return e
            }    
          }
          
    },
    Mutation : {
        addContractor: async (parent, args, context, info) => {
            try {
                await new Contractor({_id: new mongoose.Types.ObjectId().toString(),...args}).save()
                return true
            }
            catch (e) {
                console.log(`Error happened at Query addContractor ${args}`)
                return e
             }
         }
    }
}