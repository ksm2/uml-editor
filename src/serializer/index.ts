import FileSerializer from "./FileSerializer";
import UMLSerializer from "./UMLSerializer";

export const serializer = new UMLSerializer();
export const fileSerializer = new FileSerializer(serializer);
