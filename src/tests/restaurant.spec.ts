import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { expect } from 'chai';


import restaurantsAPI from '../logic/REST/restaurantsAPI';
import { EditRestaurant } from '../logic/REST/API-Response/edit-restaurant-response';

describe('Restaurants tests', () => {

    before('Reset restaurant server', async () => {
        //Arrange
        await restaurantsAPI.resetServer();
    })

    it('Validate the amount of restaurants', async () => {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

        //Assert
        expect(restaurants.success).to.be.true;
        const actualAmount = restaurants.data?.length;
        expect(actualAmount).to.equal(3, 'Restaurants amount is not as expected');
    })

    it('Get restaurant by id', async () => {
        //Arrange
        const myNewRest = { address: "My Addess 1", id: 233, name: "My Restaurant", score: 2.3 };
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233);

        //Assert
        expect(getByIdResponse.status).to.equal(200);
        expect(getByIdResponse.success).to.be.true;
        expect(getByIdResponse.data).to.deep.equal(myNewRest);
    })

    it('edit restaurant by all params', async () => {
        //Act
        const changeAllParams = { address: "My Addess 1", id: 21, name: "My Restaurant", score: 2.3 };
        const editResaurant: ApiResponse<Restaurant[]> = await restaurantsAPI.editRestuarant(changeAllParams);
        // console.log(editResaurant)
        // console.log(editResaurantByAddres)
        // console.log('ronen')
        expect(editResaurant.status).to.equal(200);
        expect(editResaurant.success).to.be.true;

    })
    it('edit restaurant by address', async () => {
        const editByAdress = { address: "bonjour class", id: 21 };
        const editResaurantByAddres: ApiResponse<EditRestaurant[]> = await restaurantsAPI.editRestuarantByAddress(editByAdress);
        //     console.log(editResaurantByAddres)
        //   console.log('ronen')
        expect(editResaurantByAddres.status).to.equal(200);
        expect(editResaurantByAddres.success).to.be.true;

    })
    it('edit restaurant id not exists', async () => {
        const editByAdress = { address: "bonjour class", id: 433 };
        const editResaurantByAddres: ApiResponse<EditRestaurant[]> = await restaurantsAPI.editRestuarantByAddress(editByAdress);
        // console.log(editResaurantByAddres)
        // console.log('ronen')
        expect(editResaurantByAddres.status).to.equal(404);
        //const actualAmount = editResaurantByAddres.data?.length;
        expect(editResaurantByAddres.error).to.equal('restaurant with given id not found');

    })
    it('delete existing restaurant ', async () => {
        //Act
        const deleteResaurant: ApiResponse<Restaurant[]> = await restaurantsAPI.deletR(21);
        console.log(deleteResaurant)
        expect(deleteResaurant.status).to.equal(200);
        expect(deleteResaurant.success).to.be.true;

    })

    it('delete not exists restaurant ', async () => {
        //Act
        const deleteResaurant: ApiResponse<Restaurant[]> = await restaurantsAPI.deletR(450);
        console.log(deleteResaurant)
        expect(deleteResaurant.status).to.equal(404);
        expect(deleteResaurant.error).to.equal('restaurant with given id not found');

    })






})