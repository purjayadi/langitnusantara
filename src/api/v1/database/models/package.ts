'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IPackage, PackageInput } from '../../interfaces';
import Category from './category';
import Service from './service';
import Itinerary from './itinerary';
import Review from './review';
import PackageService from './packageService';
import PackagePrice from './packagePrice';
var slug = require('slug');

//dto
class Package
  extends Model<IPackage, PackageInput>
  implements IPackage {
  public id!: string;
  public name!: string;
  public slug!: string;
  public banner!: string;
  public noOfDay!: number;
  public description!: string;
  public categoryId!: string;
  public destinationId!: string;
  public isFeatured?: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
  dataValues: any;
}

Package.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    categoryId: { 
      type: DataTypes.UUID,
      references: {
        model: 'Categories', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' 
    },
    destinationId: { 
      type: DataTypes.UUID,
      references: {
        model: 'Destinations', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    noOfDay: {
      type: DataTypes.INTEGER,
    },
    banner: {
      type: DataTypes.STRING,
      defaultValue: 'banner.jpg'
    },
    description: {
      type: DataTypes.TEXT,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    sequelize: db
  },
);

Package.beforeCreate((type) => {
  console.log(type.dataValues?.name);
  type.id = uuid(),
  type.slug = slug(type.dataValues?.name);
});

Package.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});


Service.belongsToMany(Package, 
  { 
    through: 'PackageServices', 
    foreignKey: 'serviceId',
    otherKey: 'packageId', 
    as: 'packages' 
  }
);

Package.belongsToMany(Service, 
  { 
    through: 'PackageServices', 
    foreignKey: 'packageId', 
    otherKey: 'serviceId',
    as: 'services' 
  }
);

Package.hasMany(Itinerary, { foreignKey: 'packageId', as: 'itinerary'});
Package.hasMany(Review, { foreignKey: 'packageId', as: 'reviews' });
Package.hasMany(PackagePrice, { foreignKey: 'packageId', as: 'price' });

Package.addScope('itinerary', {
  include: [
    {
      model: Itinerary,
      as: 'itinerary',
      attributes: ['day', 'title', 'meta', 'description']
    }
  ],
});


Package.addScope('services', {
  include: [
    {
      model: Service,
      as: 'services',
      attributes: ['name'],
      include: [
        {
          model: PackageService,
          attributes: ['type', 'description'],
          as: 'details',
          nested: true
        },
      ],
      through: {
          attributes: []
      },
      order: [
        [Service, PackageService, 'type', 'DESC']
      ]
    }
  ],
});

Package.addScope('category', {
  include: [
    {
      model: Category,
      as: 'category',
      attributes: ['name', 'color', 'icon'],
      required: true
    },
  ]
});

Package.addScope('reviews', {
  include: [
    {
      model: Review,
      as: 'reviews',
      attributes: ['name', 'email', 'rating', 'message', 'createdAt']
    }
  ]
});

Package.addScope('price', {
  include: [{
    model: PackagePrice,
    as: 'price',
    attributes: { exclude: ['packageId'] }
  }]
});



export default Package;