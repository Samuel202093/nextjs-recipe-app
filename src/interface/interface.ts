export interface FormType {
  title: string;
  ingredients: string;
  instructions: string;
  image: File | null | string;
}

export interface EditFormType {
  title: string | undefined;
  ingredients: string | undefined;
  instructions: string | undefined;
  image: File | null | string;
}

export interface RecipeType {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl: string | null | undefined;
}

export interface RecipeProps {
  recipe: RecipeType;
}

export interface FormDataType {
  title: string;
  ingredients: string;
  instructions: string;
  image: FileList ;
}
