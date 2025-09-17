import { Product } from "@prisma/client";
import { createProductDTO } from "../../dtos/product.dto";
import { productServices } from "../product.service";


export class productServicesimplementation implements productServices{
    addProduct(data: createProductDTO): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    deleteProduct(id: number): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    getAllProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    getSingleProduct(id: number): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    updateProduct(id: number, data: Partial<createProductDTO>): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}