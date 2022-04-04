import { Optional } from 'sequelize';

export interface IPackage{
    id?: string;
    name: string;
    slug?: string;
    description: string;
    noOfDay: number;
    banner?: string;
    categoryId: string;
    destinationId: string;
    isFeatured?: boolean;
    services?: any[];
    itinerary?: [{
        id?: string;
        day: number;
        title: string;
        meta: string;
        description: string;
    }];
    price?: [{
        id?: string;
        description: string;
        price: number;
    }]
}

export interface PackageInput extends Optional<IPackage, 'id'> {}
export interface PackageOutput extends Required<IPackage> {}

export interface IPackageService{
    id?:string;
    packageId:string
    serviceId:string
    type: string;
    description?:string;
}

export interface PackageServiceInput extends Optional<IPackageService, 'id'> {}
export interface PackageServiceOutput extends Required<IPackageService> {}

export interface IPackagePrice{
    id?:string;
    packageId:string;
    description?:string;
    price: number;
}

export interface PackagePriceInput extends Optional<IPackagePrice, 'id'> {}
export interface PackagePriceOutput extends Required<IPackagePrice> {}