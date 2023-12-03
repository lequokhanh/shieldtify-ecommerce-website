const db = require('../../models');
const { AppError } = require('../../common/errors/AppError');
const { v4 } = require('uuid');
module.exports = {
    getAddresses: async (uid) => {
        try {
            const addresses = await db.client_address.findAll({
                where: {
                    clientid: uid,
                },
            });
            return {
                statusCode: 200,
                message: 'Get addresses successfully',
                data: addresses,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    createAddress: async (
        clientid,
        { address, city, province, phone_number, is_default },
    ) => {
        try {
            const allAddress = await db.client_address.findAll({
                where: {
                    clientid,
                },
            });
            const newAddress = await db.client_address.create({
                uid: v4(),
                clientid,
                address,
                city,
                province,
                phone_number,
                is_default: allAddress.length === 0 ? true : is_default,
            });
            if (allAddress.length !== 0 && is_default) {
                await db.client_address.update(
                    {
                        is_default: false,
                    },
                    {
                        where: {
                            clientid,
                            uid: {
                                [db.Sequelize.Op.not]: newAddress.uid,
                            },
                        },
                    },
                );
            }
            return {
                statusCode: 200,
                message: 'Create address successfully',
                data: newAddress,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
};
