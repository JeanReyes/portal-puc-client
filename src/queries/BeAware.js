import gql from 'graphql-tag';

export const GET_CASOS_BY_CLIENT = gql `
    query getAllCasosByClient($input: ParametersCasos){
        getAllCasosByClient(input: $input){
            id
            refnum
            asunto
            fechacreacion
            idtipodesc
            idestadodesc
            slavalue
        }
    }
`;
export const GET_PRODUCTS = gql `
    query getProducts($input: ParametersCasos){
        getProducts(input: $input){
            id
            nombre
        }
    }
`;
export const GET_MOTIVOS = gql `
    query getMotivos($input: ParametersCasos){
        getMotivos(input: $input){
            id
            nombre
        }
    }
`;
export const GET_SUB_MOTIVOS = gql `
    query getSubMotivos($input: ParametersCasos){
        getSubMotivos(input: $input){
            id
            nombres
        }
    }
`;