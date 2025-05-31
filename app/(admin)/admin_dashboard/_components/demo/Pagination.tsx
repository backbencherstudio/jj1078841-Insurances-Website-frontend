"use client";

import Loading from "@/components/reusable/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DishTable() {
  const { token } = useToken();
  const [dishs, setDishs] = useState<any[]>([]);
  const [dataCount, setDataCount] = useState<any>();
  const [page, setPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
   const [loading,setLoading]=useState<boolean>(false)
  const limit = 10;
console.log(dishs);

  const fetchDishs = async () => {
    setLoading(true)
    try {
      const response = await UserService.getAlltraditionalDish({ token, context: null, page, limit });
      setDishs(response?.data.data || []);
      const total = response?.data.pagination.totalData || 0;
      console.log(total);
      setDataCount(total);
      setTotalPages(Math.ceil(total / limit));
      setLoading(false)
    } catch (error: any) {
      toast.error(error?.message || "Failed to load dishes");
    }
  };

  useEffect(() => {
    fetchDishs();
  }, [page]);

  const handleDeleteClick = (id: string) => {
    setSelectedDish(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await UserService.deleteDish(selectedDish, token);
      if (res.status === 200 || res.status === 204) {
        toast.success("Traditional Dish deleted successfully");
        setDishs((prev) => prev.filter((dish) => dish.id !== selectedDish));
        setDataCount((prev: number) => prev - 1);
      } else {
        toast.error("Something went wrong while deleting.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete dish");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedDish(null);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-2xl font-medium text-[#232323] font-[Poppins]">
            Traditional Dish List
          </h2>
          <Link
            href="/dashboard/dish/add-traditional-dish"
            className="bg-primaryColor font-medium text-white lg:px-5 lg:py-3 px-3 py-2 text-base rounded-[8px] cursor-pointer"
          >
            Add Traditional Dish
          </Link>
        </div>

        <table className="min-w-full text-sm text-left">
          <thead className="sticky top-0 bg-[#FAFAFA] text-[#4A4A4A] font-normal text-xs">
            <tr>
              <th className="px-4 py-3">Sl</th>
              <th className="px-4 py-3">Traditional Dish Name</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Number of review</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Booking Link</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#111]">
            {dishs.map((dish, index) => (
              <tr key={dish.id} className="border-b-[0.5px] border-borderColor">
                <td className="px-4 py-3">{(page - 1) * limit + index + 1}</td>
                <td className="px-4 py-3">{dish.name}</td>
                <td className="px-4 py-3">
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      width={30}
                      height={30}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">{dish.numberOfReview}</td>
                <td className="px-4 py-3">{dish.rating}</td>
                <td className="px-4 py-3">
                  <Link href={${dish.bookingLink}} target="_blank" rel="noopener noreferrer">
                    {dish.bookingLink}
                  </Link>
                </td>
                <td className="px-4 py-3">${dish.price}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDeleteClick(dish.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{loading && (
  <Loading/>
)}
       <div className="w-full flex justify-between items-center mt-6 text-sm text-gray-600">
        <span>
          {(page - 1) * limit + 1} -{" "}
          {Math.min(page * limit, dataCount )} Result Showing Out of{" "}
          {dataCount}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-2 py-1 rounded border ${page === 1 ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
              }`}
          >
            &#x276E;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-2 py-1 rounded border ${page === totalPages ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
              }`}
          >
            &#x276F;
          </button>
        </div>
      </div>


      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this dish? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className=" cursor-pointer" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className=" cursor-pointer" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DishTable;