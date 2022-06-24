import mongoose from 'mongoose'

export default {
    Query : {
        getContractors: async (parent, args, {models : {Contractor}}, info) => {
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
        addContractor: async (parent, args, {models : {Contractor}}, info) => {
            try {
                await new Contractor(args).save()
                return true
            }
            catch (e) {
                console.log(`Error happened at Query addContractor ${args}`)
                return e
             }
         }
    }
}