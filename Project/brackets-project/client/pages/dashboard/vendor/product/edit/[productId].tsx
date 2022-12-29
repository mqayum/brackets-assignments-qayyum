import React, {ReactElement, useEffect, useState} from "react";
import DashboardLayout from "../../../../../components/layouts/DashboradLayout";
import {useGetProductQuery,useEditProductMutation} from "../../../../../api/productsApi";
import toast,{Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {ID, IProduct} from "../../../../../types/types";

const EditProduct = () => {
    const router = useRouter();
    const {productId} = router.query;
    const {data, isSuccess} = useGetProductQuery(productId, {skip:!router.isReady});

    const [editProduct, {error}] = useEditProductMutation();
    const [state, setState] = useState<IProduct>({
        productTitle: "",
        productCategory: "",
        productType: "",
        productPrice: "",
        productDesc: "",
        productImages: Array<string>(),
    });
    const [images, setImages] = useState<File[]|undefined>(undefined)

    useEffect(()=>{
        if (isSuccess){
            setState(data.product);
        }
    },[data])

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name==="productImages") {
            const files = event.target.files
            setImages(files);
        }
        else
            setState({ ...state, [name]: value });
    };
    if (isSuccess){
        const product = data.product;
        const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
            try {
                const formData = new FormData();
                formData.append("productTitle", state.productTitle);
                formData.append("productCategory", state.productCategory);
                formData.append("productType", state.productType);
                formData.append("productPrice", state.productPrice);
                formData.append("productDesc", state.productDesc);


                if (images && images?.length != 0) {
                    for (const file of images) {
                        formData.append("productImages", file);
                    }
                }

                console.log(state);
                console.log(images);

                const res = await editProduct({productId, formData});
                if (!error)
                    toast.success("Product Updated Successfully.");

            }
            catch (e) {
                // @ts-ignore
                toast.error("Error: "+e.data.message);
                console.log(e)
            }
        }

        return (
            <div className="card w-full bg-base-100 shadow-xl ">
                <Toaster />
                <div className="card-body w-3/5 m-auto">
                    <h2 className="card-title">Update Product</h2>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Title</span>
                        </label>
                        <input type="text" placeholder="Product Title" name="productTitle" value={state.productTitle} onChange={handleChange} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Category</span>
                        </label>
                        <select className="select select-bordered" name="productCategory" value={state.productCategory} onChange={handleChange}>
                            <option>Select Category</option>
                            <option>Clothing</option>
                            <option>Stationary</option>
                            <option>Kitchen-ware</option>
                            <option>Household</option>
                            <option>Accessory</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Type</span>
                        </label>
                        <select className="select select-bordered" name="productType" value={state.productType} onChange={handleChange}>
                            <option>Select Type</option>
                            <option>Customizable</option>
                            <option>Non-Customizable</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Price</span>
                        </label>
                        <input type="number" placeholder="Price" className="input input-bordered w-full" name="productPrice" value={state.productPrice} onChange={handleChange} />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-36" placeholder="Product Description" name="productDesc" value={state.productDesc} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Upload Product Images</span>
                        </label>
                        <input type="file" multiple={true} accept="image/*" className="file-input file-input-primary file-input-bordered w-full" name="productImages" onChange={handleChange} />
                    </div>
                    <div className="form-control w-full mt-5">
                        <button className="btn btn-primary w-full" onClick={handleSubmit}>
                            Edit Product
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
EditProduct.getLayout = function (page:ReactElement){
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
EditProduct.requiredRole = "VENDOR"


export default EditProduct;