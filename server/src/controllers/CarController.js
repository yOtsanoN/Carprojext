const { Car } = require('../models');

module.exports = {
    // Get all cars
    async index(req, res) {
        try {
            const cars = await Car.findAll();
            res.send(cars);
        } catch (err) {
            res.status(500).send({
                error: 'The car information was incorrect'
            });
        }
    },
    
    // Create a new car
    async create(req, res) {
        try {
            console.log('Car create req.body:', req.body);
            const car = await Car.create(req.body);
            console.log('Car create car:', car);
            res.send(car.toJSON());
        } catch (err) {
            console.log('Car create err:', err);
            res.status(500).send({
                error: 'Create car incorrect'
            });
        }
    },
    
    // Update car details
    async put(req, res) {
        try {
            const [updated] = await Car.update(req.body, {
                where: {
                    id: req.params.carId
                }
            });
            if (!updated) {
                return res.status(404).send({
                    error: 'Car not found'
                });
            }
            res.send(req.body); // Optionally return the updated car data
        } catch (err) {
            res.status(500).send({
                error: 'Update car incorrect'
            });
        }
    },
    
    // Delete a car
    async remove(req, res) {
        try {
            const car = await Car.findOne({
                where: {
                    id: req.params.carId
                }
            });
            if (!car) {
                return res.status(403).send({
                    error: 'The car information was incorrect'
                });
            }
            await car.destroy();
            res.send(car); // Optionally return the deleted car data
        } catch (err) {
            res.status(500).send({
                error: 'The car information was incorrect'
            });
        }
    },
    
    // Get a car by ID
    async show(req, res) {
        try {
            const car = await Car.findByPk(req.params.carId);
            if (!car) {
                return res.status(404).send({
                    error: 'Car not found'
                });
            }
            res.send(car);
        } catch (err) {
            res.status(500).send({
                error: 'The car information was incorrect'
            });
        }
    }
};
