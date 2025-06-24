// import request from "../client";
import { Fruit } from "../models/fruit";
import { wait } from "@/utils"; 

export const fruitsAPI = {
  getFruits: async (page:PageQuery) => {
    // request<ResWithPagination<Fruit[]>>({
    //   method: "GET",
    //   url: "/api/v1/fruits",
    //   params: page,
    // }),
    await wait(1000)
    let res:ResWithPagination<Fruit[]> = {
      data: [],
      pagination: {
        limit: 10,
        page: page.pageNum || 1,
        total: 100,
      }
    }
    res.data = Array.from({length:10},(_,i)=>({
      name: `Fruit ${i}_${page.pageNum}`,
      price: Math.random() * 100,
      quantity: Math.floor(Math.random() * 100),
      image: `https://via.placeholder.com/150?text=Fruit+${i}`,
      category: `Category ${i}`,
      isAvailable: Math.random() > 0.5,
    } as Fruit))
    return res
  }
};
