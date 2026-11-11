import{salvar}from'../base';import{URL_PACOTESVIAGEM}from'../../config/api';export async function salvarPacoteviagem(id:number|undefined,x:any){return salvar(URL_PACOTESVIAGEM,id,x,'Pacote')}
