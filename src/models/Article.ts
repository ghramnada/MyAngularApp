import { Member } from "./Member"

export interface Article{
  id : String,
  type : String,
  titre : String,
  lien:String
  sourcePdf : String , 
  date : String,
  auteur : any
}