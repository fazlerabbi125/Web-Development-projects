import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie {
  @Prop({ required:[true, 'Title is required'],unique: true,minLength:[3,'Must be at least 3 characters, got {VALUE}'],
})
  title: string;

  @Prop({required:[true, 'Genre is required'],minLength:[2,'Must be at least 2 characters, got {VALUE}'],})
  genre: string;
  @Prop({required:[true, 'Year is required'],
  min:[1980,'Year must be 1980 onwards.'],
  max:[2023,'Year must be less than or equal to 2023.'],
})
  year:number;
  @Prop({default:''})
  imgUrl:string;
  @Prop({min:[0,'Rating must be 0 onwards.'],
  max:[10,'Rating must be less than or equal to 10.']})
  rating:number;
  @Prop({required:[true, 'Description is required'],
  minLength:[5,'Must be at least 5 characters, got {VALUE}'],
})
  description:string;
  @Prop({required:[true, 'Country is required'],
  minLength:[2,'Must be at least 2 characters, got {VALUE}'],
})
  country: string;
  @Prop({required:[true, 'Language is required'],
  minLength:[3,'Must be at least 3 characters, got {VALUE}'],
})
  language: string;
}

// & joins the _id property provided by Document and the properties provided by Movie 
export type MovieDocument = Movie & Document;

export const MovieSchema = SchemaFactory.createForClass(Movie);
