const mongoose = require("mongoose")

const DeletedSeller= new mongoose.Schema(
    {
        Archived:{            
        }
},
{timestamps:true}
)

const profileModel= mongoose.model("Deleted-Seller", DeletedSeller)

module.exports=profileModel