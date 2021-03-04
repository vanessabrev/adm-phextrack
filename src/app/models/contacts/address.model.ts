export class AddressModel {
  id?: number;
  street: string; //rua
  number: string;
  complement: string;
  postalCode: string; //cep
  city: string;
  municipality: string; //bairro
  uf: string;
}
