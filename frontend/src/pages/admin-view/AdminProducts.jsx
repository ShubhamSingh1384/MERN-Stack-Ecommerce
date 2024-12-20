import CommonForm from '@/components/common/CommonForm';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useEffect, useState } from 'react'
import ProductImageUpload from '../../components/admin-view/ProductImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/productSlice';
import { toast } from 'react-toastify';
import ProductTile from '@/components/admin-view/ProductTile';




const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const {productList} = useSelector(state=>state.adminProducts)

  const dispatch = useDispatch();
  // console.log(formData);
  
  const onSubmit = (event)=>{
    event.preventDefault();

    currentEditedId !== null ? 
    dispatch(
        editProduct({
          id: currentEditedId,
          formData,
        })
      ).then((data) => {
        console.log(data, "edit");

        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      })

    : dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data) => {
      // console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setImageFile(null);
        setOpenCreateProductsDialog(false);
        toast.success("Product added Successfully")
      }
    })
  }

  const handleDelete = (getCurrentProductId)=>{
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then(data =>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
      }
    })
  }

  function isFormValid(){
    return Object.keys(formData)
    .map((key) => formData[key] !== "")
    .every((item) => item);
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  }, [dispatch])

  console.log(productList, uploadedImageUrl, 'formData');

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick = {() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          (productList && productList.length > 0) ? 
          productList.map(productItem =>{ 
          return <ProductTile 
          product={productItem}
          setCurrentEditedId={setCurrentEditedId}
          setFormData={setFormData}
          setOpenCreateProductsDialog={setOpenCreateProductsDialog}
          handleDelete={handleDelete}
          />
        }) : null
        }
      </div>
      <Sheet 
      open={openCreateProductsDialog}
      onOpenChange={ () => {
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData);
      }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                (currentEditedId !== null) ? 'Edit Product' : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload 
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className='py-6'>
            <CommonForm 
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText={(currentEditedId !== null) ? 'Save Edit' : 'Add'}
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
            
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts