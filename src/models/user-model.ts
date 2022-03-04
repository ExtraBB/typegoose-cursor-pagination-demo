import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination';
import { prop, getModelForClass, plugin, index } from "@typegoose/typegoose";
import mongoose from "mongoose";

@plugin(paginationPlugin)
@index({ email: 1 })
export class User {
  @prop({  required: true })
  name: string;

  @prop({ required: true })
  email: string;
}

export const UserModel = getModelForClass(User, { existingMongoose: mongoose, schemaOptions: { timestamps: true } }) as PaginateModel<User, typeof User>;;
