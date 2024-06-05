import React, { ReactNode, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFormik } from "formik";
import { ErrorMessageCreateNews } from "@/app/constants/errorMessages";
import * as Yup from "yup";
import { CreateNewsData } from "@/app/models/news.models";
import { ErrorIcon, SuccessIcon } from "../toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import Loading from "@/app/pages/loadingPage/Loading";
import News from "@/app/api/APIs/news";

const CreateNews = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [picture, setPicture] = useState<string | null>(null);
  const validate = ErrorMessageCreateNews;
  const validationSchema = Yup.object().shape({
    newsTitle: Yup.string()
      .required(validate.newsTitle.required)
      .max(100, validate.newsTitle.length),
    newsSummary: Yup.string()
      .required(validate.newsSummary.required)
      .max(150, validate.newsSummary.length),
    newsDescription: Yup.string().required(validate.newsDescription.required),
    thumbnail: Yup.string().required(validate.thumbnail.required),
    // .matches(/\.(jpg|jpeg|png|webp|svg)$/i, validate.thumbnail.invalid),
    type: Yup.number()
      .moreThan(0, validate.type.required)
      .lessThan(4, validate.type.required),
  });

  const setFileToBase = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let base64 = reader.result as string;
      base64 = base64.split(",")[1];
      setPicture(base64);
    };
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setFileToBase(file);
      formik.setFieldValue("thumbnail", file);
    }
  };

  const formik = useFormik({
    initialValues: {
      newsTitle: "",
      newsSummary: "",
      newsDescription: "",
      type: 1,
      thumbnail: new File([""], "myFile.txt", { type: "text/plain" }),
    } as CreateNewsData,
    validationSchema,
    onSubmit: async (values: CreateNewsData) => {
      setIsLoading(true);
      try {
        if (
          values.newsTitle !== undefined &&
          values.newsSummary !== undefined &&
          values.newsDescription !== undefined &&
          values.thumbnail !== undefined &&
          values.type !== undefined
        ) {
          console.log(values);
          const formData = new FormData();
          formData.append("NewsTitle", values.newsTitle);
          formData.append("NewsSummary", values.newsSummary);
          formData.append("NewsDescription", values.newsDescription);
          formData.append("type", values.type.toString());
          formData.append("fileImage", values.thumbnail);
          const response = await News.createNews(formData);
          if (response) {
            customToast({
              icon: <SuccessIcon />,
              description: "Tạo tin tức thành công",
              duration: 3000,
            });
          }
        }
      } catch (error) {
        customToast({
          icon: <ErrorIcon />,
          description: "Tạo tin tức không thành công",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleOnSubmit}>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>Tạo Tin Tức</CardTitle>
              <CardDescription>
                Tạo tin tức mới về dự án cho web
              </CardDescription>
            </div>
            <div>
              <Button type="submit">Đăng Bài</Button>
            </div>
          </CardHeader>
          <CardContent >
            <Card className="grid grid-cols-3 gap-6">
              <CardContent className="lg:col-span-1 col-span-3 mt-5">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="thumbnail">
                      Thumbnail <span className="text-red-600">*</span>
                    </Label>
                    {picture ? (
                      <div className="relative">
                        <img
                          src={`data:image/jpeg;base64,${picture}`}
                          alt="Preview thumbnail"
                        />
                        <Input
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="thumbnail"
                          type="file"
                          onChange={onImageChange}
                        />
                      </div>
                    ) : (
                      <Input
                        id="thumbnail"
                        type="file"
                        onChange={onImageChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    )}
                    {formik.touched.thumbnail && formik.errors.thumbnail ? (
                      <div className="text-red-600">
                        {formik.errors.thumbnail as ReactNode}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newsTitle">
                      Tiêu đề <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="newsTitle"
                      type="text"
                      className="w-full"
                      placeholder="Tiêu đề của tin tức mới"
                      onChange={(e) => {
                        formik.setFieldValue("newsTitle", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.newsTitle && formik.errors.newsTitle ? (
                      <div className="text-red-600">
                        {formik.errors.newsTitle}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="type">
                      Loại tin tức <span className="text-red-600">*</span>
                    </Label>
                    <Select
                      value={formik.values.type.toString()}
                      onValueChange={(value) =>
                        formik.setFieldValue("type", parseInt(value))
                      }
                    >
                      <SelectTrigger className="w-full" id="type">
                        <SelectValue placeholder="Loại Tin Tức" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Cập nhật hằng tháng</SelectItem>
                        <SelectItem value="2">Truyền thông</SelectItem>
                        <SelectItem value="3">Nét sống xanh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newsSummary">
                      Tóm tắt <span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                      id="newsSummary"
                      placeholder="150 ký tự tối đa."
                      className="min-h-32 resize-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newsSummary}
                    />
                    {formik.touched.newsSummary && formik.errors.newsSummary ? (
                      <div className="text-red-600">
                        {formik.errors.newsSummary}
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardContent>
              <div className="lg:col-span-2 col-span-3 overflow-hidden h-[500px] md: mt-5 px-6">
                <div className="h-[500px] overflow-auto">
                  <Label htmlFor="newsDescription">
                    Nội dung <span className="text-red-600">*</span>
                  </Label>
                  <ReactQuill
                    theme="snow"
                    value={formik.values.newsDescription}
                    className="h-[400px] md:pb-0 "
                    id="newsDescription"
                    onBlur={formik.handleBlur}
                    onChange={(value) => {
                      formik.setFieldValue("newsDescription", value);
                    }}
                  />
                  {formik.touched.newsDescription &&
                  formik.errors.newsDescription ? (
                    <div className="text-red-600">
                      {formik.errors.newsDescription}
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default CreateNews;
