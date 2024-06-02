import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";

// const validate = (value) {

// }

const CreateNews = () => {
  const [value, setValue] = useState();
  const [ex, setEx] = useState();
  const [picture, setPicture] = useState<string | null>(null);

  const setFileToBase = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      let base64 = reader.result as string;
      base64 = base64.split(",")[1];
      setPicture(base64);
    };
  };

  useEffect(() => {
    console.log(picture);
  }, [picture]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setFileToBase(file);
    }
  };

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Tạo Tin Tức</CardTitle>
          <CardDescription>Tạo tin tức mới về dự án cho web</CardDescription>
        </div>
        <div>
          <Button>Đăng Bài</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Card className="grid grid-cols-3 gap-6">
          <CardContent className="lg:col-span-1 col-span-3 mt-5">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="picture">
                  Picture <span className="text-red-600">*</span>
                </Label>
                {picture ? (
                  <div className="relative">
                    <img
                      src={`data:image/jpeg;base64,${picture}`}
                      alt="Preview thumbnail"
                    />
                    <Input
                      id="picture"
                      type="file"
                      onChange={onImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                ) : (
                  <Input id="picture" type="file" onChange={onImageChange} />
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">
                  Tiêu đề <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  placeholder="Tiêu đề của tin tức mới"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="summary">
                  Tóm tắt <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  id="summary"
                  placeholder="150 ký tự tối đa."
                  className="min-h-32 resize-none"
                />
              </div>
              <div></div>
            </div>
          </CardContent>
          <div className="lg:col-span-2 col-span-3 overflow-hidden h-[500px] md: mt-5 px-6">
            <div className="h-[500px] overflow-auto">
              <Label htmlFor="content">
                Nội dung <span className="text-red-600">*</span>
              </Label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={() => setValue}
                className="h-[400px] md:pb-0 "
                id="content"
              />
            </div>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default CreateNews;
