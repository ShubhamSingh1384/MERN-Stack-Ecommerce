import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductImageUpload = ({
  imageFile, 
  setImageFile, 
  uploadedImageUrl, 
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode
}) => {

  const inputRef = useRef(null);

  const handleImageFileChange = (event)=>{
    console.log(event.target.files);

    const selectedFile = event.target.files?.[0];
    if(selectedFile) {
      setImageFile(selectedFile);
      console.log("handleimagefilecalled : " , selectedFile);
    }
    
    
  }
  
  const handleDragOver = (event) => {
    event.preverntDefault();
  };
  
  const handleDrop = (event) => {
    event.preverntDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
      console.log("droppedfile : ", droppedFile);
    }
  };
  

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary(){
    setImageLoadingState(true);
    const data = new FormData();
    data.append('my-file', imageFile);
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
    console.log("response : ", response.data.result.url);
    if(response?.data?.success){
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);


  return (
    <div className='w-full max-w-md mx-auto mt-4'>
      <Label className='text-lg font-semibold mb-2 block'>Upload Images</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} 
      className={`${isEditMode ? "opacity-60": ""}border-2 border-dashed rounded-lg p-4`}>
        <Input 
        onChange={handleImageFileChange}
        id="image-upload" 
        type="file" 
        className="hidden" 
        ref={inputRef}
        disabled={isEditMode}
        />
        {
          (!imageFile) ? (
            <Label
              htmlFor="image-upload"
              className={`${isEditMode ? 'cursor-not-allowed' : ''}
              flex flex-col items-center justify-center h-32 cursor-pointer`}
            >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
            </Label>
          ) : (
            imageLoadingState ?
            <Skeleton className="h-10 bg-gray-100"/> 
            : 
            <div className='flex items-center justify-center'>
              <div className='flex items-center'>
                <FileIcon className = "w-8 text-primary mr-2 h-8" />
              </div>
              <p className='text-sm font-medium'>{imageFile.name}</p>
              <Button
              onClick={handleRemoveImage}
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground" 
              >
                <XIcon className='w-4 h-4'/>
                <span className='sr-only'>Remove File</span>
              </Button>
            </div>
          )
        } 
      </div>
    </div>
  )
}

export default ProductImageUpload