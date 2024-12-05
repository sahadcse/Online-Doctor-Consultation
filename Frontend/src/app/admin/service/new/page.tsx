"use client";

import AdminLayout from "@/components/AdminLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const NewServicePage = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            image: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Service title is required"),
            description: Yup.string().required("Description is required"),
            price: Yup.number()
                .required("Price is required")
                .min(0, "Price must be a positive value"),
            image: Yup.mixed().required("Image is required"),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("image", values.image);

            // Replace with your API call
            console.log("Submitted Service:", {
                title: values.title,
                description: values.description,
                price: values.price,
                image: values.image,
            });

            alert("Service added successfully!");
            formik.resetForm();
            setImagePreview(null);
        },
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("image", file);

        // Generate image preview
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <AdminLayout>
            <div>
                <h1 className="text-center text-3xl my-5 font-work-sans font-bold">Create New Service</h1>
                <form
                    className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md"
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                >
                    {/* Service Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                            Service Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter service title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <p className="text-red-500 text-sm">{formik.errors.title}</p>
                        ) : null}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter service description"
                            rows="4"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        {formik.touched.description && formik.errors.description ? (
                            <p className="text-red-500 text-sm">{formik.errors.description}</p>
                        ) : null}
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter service price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.price && formik.errors.price ? (
                            <p className="text-red-500 text-sm">{formik.errors.price}</p>
                        ) : null}
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full"
                        />
                        {formik.touched.image && formik.errors.image ? (
                            <p className="text-red-500 text-sm">{formik.errors.image}</p>
                        ) : null}
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-1">Image Preview:</label>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-full h-auto rounded-md shadow-md"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Add Service
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default NewServicePage;
