import "reflect-metadata";
import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'

@sealed
class KittenClass {
    @prop()
      @first()
  public name?: string;
    
    @prop()
      @second()
  public species?: string;

  // the "this" definition is required to have the correct types
  public async setSpeciesAndSave(this: DocumentType<KittenClass>, species: string) {
    this.species = species;
    await this.save();
  }
}
const KittenModel = getModelForClass(KittenClass);

const doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies' });
await doc.setSpeciesAndSave('SomeOtherSpecies');

function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}