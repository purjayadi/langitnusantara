import Periode from '../database/models/accounting/periode';


export const isExist = async (isActive:boolean,) => {
    const periodes = await Periode.findAll();
    return periodes?.filter(period => period.isActive === isActive);
};

export const activePeriode = async () => {
    const periode = await Periode.findOne({
        where: {
            isActive: true
        }
    });
    return periode;
};

export const getIdActivePeriode = async () => {
    const periode = await Periode.findOne({
        where: {
            isActive: true
        }
    });
    if (periode) {
        return periode.id;
    }
    throw new Error('Unable to find active periode');
}; 