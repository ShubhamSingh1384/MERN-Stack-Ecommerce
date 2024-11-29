import ProductFilter from "@/components/shopping-view/Filter";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/productSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


const createSearchParamsHelper = (filterParams) =>{
  const queryParams = [];

  for(const [key, value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(',');

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  return queryParams.join('&')
}



function ShoppingListing() {

  const dispatch = useDispatch();
  const {productsList, productDetails} = useSelector(state => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);



  const handleSort = (value) =>{
    //console.log(value);
    setSort(value)
  }

  const handleFilter = (getSectionId, getCurrentOption)=>{
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));

    // console.log(cpyFilters)
  }

  useEffect(() =>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters])

  const handleGetProductDetails = (getCurrentProductId)=>{
    // console.log(getCurrentProductId)
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() =>{
    if(productDetails !== null)
    setOpenDetailsDialog(true);

  }, [productDetails])

  useEffect(() =>{
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, [])
  
  useEffect(() =>{
    if(filters !== null && sort !== null){
      //console.log("sort: ", sort);
      dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}))

    }
    
  }, [dispatch, sort, filters])

  // console.log("productsList : " , productsList)
  // console.log("productsDetails : ", productDetails);
  //  console.log("filters : " , filters, searchParams.toString())

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productsList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {
            productsList && productsList.length > 0 ? 
            productsList.map(productsItem => 
            <ShoppingProductTile 
            product={productsItem}
            handleGetProductDetails={handleGetProductDetails}
            />) : null
          }
        </div>
      </div>
      <ProductDetailsDialog 
      open={openDetailsDialog}
      setOpen={setOpenDetailsDialog}
      productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
