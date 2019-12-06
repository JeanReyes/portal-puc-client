import gql from 'graphql-tag';

export const USER_LOGIN = gql `
   mutation loginUser($input: LoginInput){
    login(input:$input)
        {
          token
          contacto{
            id
            pass
          }
          usuario{
            user
            email
            nombre
            apellido
            idempresa
          }
        }
    }
`;

export const USER_LOGIN_CLIENT = gql `
  mutation loginClient($input: LoginInputClient){
    loginClient(input:$input)
        {
          token
          contacto{
            id
            pass
            nombre
            apellido
          }
        }
    }
`;

export const ADD_CASES = gql `
  mutation addCase($input: InputCase){
    addCases(input: $input){
      id
    }
  }
`;
export const ADD_NOTES = gql `
  mutation addNote($input: NoteInput){
  addNote(input: $input){
      id
    }
  }
`;