import { Optional } from 'sequelize'

export interface IPackage{
    id: string;
    name: string;
    description: string;
    noOfDay: number;
    banner: string;
    categoryId: string;
    isFeatured?: boolean;
}

export interface PackageInput extends Optional<IPackage, 'id'> {}
export interface PackageleOutput extends Required<IPackage[]> {}

export interface IPackageService{
    id:string;
    packageId:string
    serviceId:string
    type: string;
}

export interface PackageServiceInput extends Optional<IPackageService, 'id'> {}
export interface PackageServiceleOutput extends Required<IPackageService[]> {}