import { ApiResponse } from '../../infra/rest/api-response';
import HttpRequest from '../../infra/rest/network-request';
import { Restaurant } from "./API-Response/get-restaurants-response";
import jsonConfig from '../../../config.json';
import { EditRestaurant } from './API-Response/edit-restaurant-response';

const baseUrl = jsonConfig.baseUiUrl + '/api/';

const getRestaurants = async (): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurants', method: HttpRequest.HttpMethod.GET, });

}

const resetServer = async (): Promise<ApiResponse<null>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'reset', method: HttpRequest.HttpMethod.POST, });

}

const createRestaurant = async (body: Restaurant): Promise<ApiResponse<null>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant', method: HttpRequest.HttpMethod.POST, body: body })
}

const getRestaurantById = async (id: number): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant', method: HttpRequest.HttpMethod.GET, queryParams: { id: id } });
}
const deletR = async (id: number): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant/' + id, method: HttpRequest.HttpMethod.DELETE, queryParams: { id: id } });
}
const editRestuarant = async (body: Restaurant): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant/' + body.id, method: HttpRequest.HttpMethod.PATCH, body: body });
}
const editRestuarantByAddress = async (body: EditRestaurant): Promise<ApiResponse<EditRestaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant/' + body.id, method: HttpRequest.HttpMethod.PATCH, body: body });
}
export default { getRestaurants, resetServer, createRestaurant, getRestaurantById, deletR, editRestuarant, editRestuarantByAddress }