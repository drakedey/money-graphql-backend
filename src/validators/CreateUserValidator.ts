/* eslint-disable class-methods-use-this */
import { Service } from 'typedi';
import CreateUserPayload from '../payload/CreateUserPayload';

@Service()
class CreateUserValidator {
  validate(user: CreateUserPayload): void {
    if (user.name == null || !user.name.trim().length) throw new Error('name is required');
    if (user.email == null) throw new Error('mail is required');
    if (!user.email.match(new RegExp('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'))) throw new Error('must input a valid email');
    if (user.lastName == null || !user.lastName.trim().length) throw new Error('last name is required');
    if (user.password == null || !user.password.trim().length) throw new Error('password is required');
  }
}

export default CreateUserValidator;
