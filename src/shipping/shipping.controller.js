import * as shippingService from './shipping.service.js';

export const createShipment = async (req, res, next) => {
  try {
    const shipment = await shippingService.createShipment(
      req.body.orderId,
      req.user.id
    );
    res.status(201).json(shipment);
  } catch (e) { next(e); }
};

export const getShipmentByOrder = async (req, res, next) => {
  try {
    const shipment = await shippingService.getShipmentByOrder(
      req.params.orderId,
      req.user.id
    );
    res.json(shipment);
  } catch (e) { next(e); }
};

export const updateShipmentStatus = async (req, res, next) => {
  try {
    const shipment = await shippingService.updateShipmentStatus(
      req.params.id,
      req.body.status
    );
    res.json(shipment);
  } catch (e) { next(e); }
};