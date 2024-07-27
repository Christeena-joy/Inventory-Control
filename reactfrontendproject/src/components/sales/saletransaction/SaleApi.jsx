import axios from 'axios';
import { getHeader } from '../../auth/ApiFunctions';

export const processSale = async (saleWithItemsDto) => {
    try {
        const headers = getHeader();
        await axios.post('http://localhost:8080/user/saletransaction/create', saleWithItemsDto,{headers});
        // Optionally handle success or return data
    } catch (error) {
        // Handle error
        console.error("Error processing sale:", error);
        throw error; // Optionally rethrow the error
    }
}

export const updateSale = async (saleDto, saleItems) => {
    try {
        const headers = getHeader();
        await axios.post('http://localhost:8080/saletransaction/update', { saleDto, saleItems });
        // Optionally handle success or return data
    } catch (error) {
        // Handle error
        console.error("Error updating sale:", error);
        throw error; // Optionally rethrow the error
    }
}

export const getSaleByIdWithItems = async (saleId) => {
    try {
        const headers = getHeader();
        const response = await axios.get(`http://localhost:8080/saletransaction/${saleId}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error("Error fetching sale by ID:", error);
        throw error; // Optionally rethrow the error
    }
}
