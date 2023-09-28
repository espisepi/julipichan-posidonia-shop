// lib/models.ts
import mongoose, { Document, Model, Schema, model } from 'mongoose'

export interface IGLB extends Document {
  filename: string
  data: Buffer
}

const glbSchema: Schema<IGLB> = new mongoose.Schema({
  filename: String,
  data: Buffer,
})

const GLB: Model<IGLB> = mongoose.models?.GLB || model('GLB', glbSchema)

export default GLB
