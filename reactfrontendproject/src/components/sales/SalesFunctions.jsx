import axios from "axios"
import { getHeader } from "../auth/ApiFunctions";


export async function getTotalSales(){
    try {
        const headers = getHeader();
        const response = await axios.get('http://localhost:8080/user/sales', { headers });
    
        // Extract total amount from each sales record
        const totalSales = response.data.reduce((total, sale) => {
          return total + sale.totalAmount;
        }, 0);
    
        return totalSales;
      } catch (error) {
        console.error('Error fetching total sales data:', error);
        return 0; // Return 0 in case of error
      }
}

