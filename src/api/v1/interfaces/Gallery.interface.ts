import { Optional } from 'sequelize';

export interface IGallery{
    id?: string;
    name?: string;
    isSlider: boolean;
}

export interface GalleryInput extends Optional<IGallery, 'id'> {}
export interface GalleryOutput extends Required<IGallery> {}
