import { InputType, Field } from '@nestjs/graphql';

@InputType()
class AuthorInput {
  @Field()
  readonly name: string;
}

export default AuthorInput;
