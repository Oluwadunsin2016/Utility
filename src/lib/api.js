import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl='https://lendnode.creditclan.com/gateway/buypower/buypower/buypower/'

export const useGetPriceLists = () => {
   return useMutation({
    mutationFn: async (payload) => {
      return await axios.post(`${baseUrl}pricelist`,payload).then((res) => {
       return res.data;
      });
    },
  });
};
export const useCheckMeter = () => {
   return useMutation({
    mutationFn: async (payload) => {
      return await axios.post(`${baseUrl}checkmeter`,payload).then((res) => {
       return res.data;
      });
    },
  });
};


export const usePurchase = () => {
   return useMutation({
    mutationFn: async (payload) => {
      return await axios.post(`${baseUrl}initiate_bill`,payload).then((res) => {
       return res.data;
      });
    },
  });
};
export const useVerifyPayment = () => {
   return useMutation({
    mutationFn: async (id) => {
      return await axios.post(`${baseUrl}verify_bill/${id}`).then((res) => {
       return res.data;
      });
    },
  });
};


// export const useGetPriceLists = () => {
//   return useQuery({
//     queryKey: ['get-price-list', id],
//     queryFn: async () => {
//       return await axios.get(`${baseUrl}pricelist`).then((res) => {
//         return res.data;
//       });
//     },
//   });
// };