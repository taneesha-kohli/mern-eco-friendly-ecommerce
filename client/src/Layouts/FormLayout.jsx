import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { uploadImage } from "@/store/shop/ProductSlice";

const FormLayout = ({
  formControls,
  buttonText,
  formData,
  setFormData,
  handleOnSubmit,
}) => {
  
  const dispatch = useDispatch();
  
  const handleChange = (event) => {
     if (event.target.files) {
    const image = event.target.files[0];

    const createBlob = URL.createObjectURL(image);

    const multipartImageData = new FormData();
    multipartImageData.append('image', image);

    dispatch(uploadImage(multipartImageData)).then((res)=>{
      
    setFormData((prev) => ({
      ...prev,
      image: res.payload.imageUrl
    }));
    })

    setBlobURL(createBlob);


  }
    else{
        const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    }
 
  };

  const handleValueChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showPass, setShowPass] = useState(false);

  const [blobURL, setBlobURL] = useState('');
  

  const renderElementType = (item) => {
    let element = "";
    switch (item.elementType) {
      case "input":
        if (item.name == "password") {
          element = (
            <div className="relative">
              <Input
                placeholder={item.placeholder}
                name={item.name}
                type={showPass ? "text" : "password"}
                className="py-5"
                onChange={(event) => handleChange(event)}
                value = {formData[item.name]}
              />
              <Eye
                className={`absolute right-3 top-[25%] text-gray-500 size-[20px] cursor-pointer ${showPass ? "visible" : "hidden"}`}
                onClick={() => setShowPass(false)}
              />
              <EyeOff
                className={`absolute right-3 top-[25%] text-gray-500 size-[20px] cursor-pointer ${!showPass ? "visible" : "hidden"}`}
                onClick={() => setShowPass(true)}
              />
            </div>
          );
        }
        if(item.type == 'file')
        {
          element = (
              <div className="md:col-span-2">
            {/* <Label className="text-sm font-medium">{item.label}</Label> */}
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-[#00965f] relative">
               {
                blobURL || formData.image ?
               <> <img src={blobURL ? blobURL : formData.image} alt="" className="h-[200px]"/>
                <div className="absolute top-3 right-4 text-[20px]" onClick={()=> blobURL ? setBlobURL('') : setFormData((prev)=> ({...prev, image: ''}))}>X</div></>:
                <>
              <Upload size={28} />
              <p className="mt-2 text-sm">
                Click or drag image to upload
              </p>
              <input type={item.type} className="opacity-0 absolute h-full cursor-pointer w-full" onChange={(event)=> handleChange(event)} name={item.name}/>
              </>
               }
                </div>
          
          </div>
          )
        }
        else {
          element = (
            <Input
              placeholder={item.placeholder}
              name={item.name}
              type={item.type}
              className="py-5"
              onChange={(event) => handleChange(event)}
              value = {formData[item.name]}
            />
          );
        }

        break;
      case "textarea":
        element = (
          <Textarea
            placeholder={item.placeholder}
            name={item.name}
            className="py-5"
            onChange={(event) => handleChange(event)}
            value = {formData[item.name]}
          />
        );
        break;

      case "select":
        element = (
          <Select onValueChange={(value) => handleValueChange(value, item.name)} value = {formData[item.name]}>
            <SelectTrigger className="w-full py-5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white w-full">
              <SelectGroup>
                {item.options.map((option) => {
                  return (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
        break;

      default:
        element = (
          <Input
            placeholder={item.placeholder}
            name={item.name}
            type={item.type}
            className={`${
              item.elementType === "input" && item.type === "file"
                ? "p-0"
                : "py-5"
            }`}
            onChange={(event) => handleChange(event)}
            value = {formData[item.name]}
          />
        );
        break;
    }

    return element;
  };


  console.log("form data in form layout", formData)

  return (
    <form action="" onSubmit={(event) => handleOnSubmit(event)}>
      {formControls.map((item) => {
        return (
          <div className="form-group pb-4">
            <Label className="pb-2">{item.label}</Label>
            {renderElementType(item)}
          </div>
        );
      })}
      {buttonText == "Add Product" || buttonText == "Update Product" ? (
        <div className="flex justify-end gap-3 mt-8">
          <button className="px-5 py-2 border rounded-lg hover:bg-gray-100">
            Cancel
          </button>

          <button className="px-5 py-2 bg-[#00965f] text-white rounded-lg hover:opacity-90">
            {buttonText}
          </button>
        </div>
      ) : (
        <Button className="bg-[var(--main)] text-white w-full h-[45px] mt-5">
          {buttonText}
        </Button>
      )}

      {buttonText == "Sign In" || buttonText == "Sign Up" ? (
        <p className="text-sm text-center mt-6">
          {buttonText == "Sign In"
            ? "Don’t have an account?"
            : "Already have an account?"}

          <span className="text-green-600 cursor-pointer pl-2">
            <Link to={buttonText == "Sign In" ? "/register" : "/login"}>
              {buttonText == "Sign In" ? "Sign Up" : "Sign In"}
            </Link>
          </span>
        </p>
      ) : (
        ""
      )}
    </form>
  );
};

export default FormLayout;
