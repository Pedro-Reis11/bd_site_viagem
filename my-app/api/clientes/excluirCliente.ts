import{URL_CLIENTES}from'../../config/api';import{excluir}from'../base';export async function excluirCliente(id?:number){return excluir(URL_CLIENTES,id)}
