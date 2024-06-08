import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tree from "@/app/api/APIs/tree";
import {
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
} from "@/app/components/toast/ToastIcons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { ErrorMessageCreateLog } from "@/app/constants/errorMessages";
import { cn } from "@/app/lib/utils";
import { CreateTreeLogData, TreeCodeDetail } from "@/app/models/tree.models";
import customToast from "@/app/utils/customToast";
import { format } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";
import Loading from "../../loadingPage/Loading";
import AdminTreeList from "@/app/components/adminTree/AdminTreeList";

const AdminTreeDetail = () => {
  const { plantCodeID, status: statusString } = useParams<{
    plantCodeID: string;
    status: string;
  }>();
  const status = statusString ? parseInt(statusString, 10) : 0;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);
  const [detailList, setDetailList] = useState<TreeCodeDetail[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pictures, setPictures] = useState<string[]>([]);
  const validate = ErrorMessageCreateLog;
  const validationSchema = Yup.object().shape({
    ContentText: Yup.string()
      .required(validate.ContentText.required)
      .min(10, validate.ContentText.min),
    DateCreate: Yup.date().required(validate.dateCreate.required),
  });
  const navigate = useNavigate();

  const setFileToBase = (files: Blob[]) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let base64 = reader.result as string;
        base64 = base64.split(",")[1];
        if (base64) {
          setPictures((prevState: string[]) => [...prevState, base64]);
        }
      };
    });
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPictures([]);
    if (e.target.files !== null) {
      const filesArray = Array.from(e.target.files);
      setFileToBase(filesArray);
      setSelectedFiles(filesArray);
      formik.setFieldValue("PlantImageDetails", filesArray);
    }
  };

  useEffect(() => {
    try {
      getTreeDetail();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTreeDetail = async () => {
    try {
      if (plantCodeID) {
        const response = await Tree.getAdminTreeCodeDetail(plantCodeID);
        if (response) {
          setDetailList(response);
        }
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      PlantCodeID: plantCodeID || "",
      ContentText: "",
      DateCreate: new Date(),
      TotalStatus: status,
      TrackingStatus: 1,
      PlantImageDetails: [],
    },
    validationSchema,
    onSubmit: async (values: CreateTreeLogData) => {
      setIsCreateLoading(true);
      try {
        console.log(values);
        const formData = new FormData();
        formData.append("PlantCodeID", values.PlantCodeID);
        formData.append("ContentText", values.ContentText);
        formData.append("DateCreate", values.DateCreate.toLocaleDateString());
        formData.append("TotalStatus", values.TotalStatus.toString());
        formData.append("TrackingStatus", values.TrackingStatus.toString());
        selectedFiles.forEach((file) => {
          formData.append("PlantImageDetails", file);
        });
        const response = await Tree.createTreeLog(formData);
        if (response) {
          getTreeDetail();
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo tin tức thành công",
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
        customToast({
          icon: <ErrorIcon />,
          description: "Tạo cập nhật không thành công",
          duration: 3000,
        });
      } finally {
        setIsCreateLoading(false);
      }
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <>
      {isLoading || isCreateLoading ? <Loading /> : <></>}
      <div className="m-5">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader className="">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => navigate(-1)}
                    className="cursor-pointer"
                  >
                    Danh sách
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{plantCodeID}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle>Thông Tin Mã Cây</CardTitle>
            <CardDescription>
              Coi các cập nhật cũng như cập nhật thêm thông tin mới cho cây
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-5 gap-6">
            <Card className="col-span-2">
              <form onSubmit={handleOnSubmit}>
                <CardHeader className="">
                  <CardTitle>Tạo mới cập nhật</CardTitle>
                </CardHeader>
                <CardContent className=" mt-5">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 w-full gap-2">
                      <div className="col-span-1">
                        <Label htmlFor="TotalStatus">
                          Giai đoạn <span className="text-red-600">*</span>
                        </Label>
                        <Select
                          value={formik.values.TotalStatus.toString()}
                          onValueChange={(value) =>
                            formik.setFieldValue("TotalStatus", parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-full" id="TotalStatus">
                            <SelectValue placeholder="Chọn giai đoạn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Đã mua</SelectItem>
                            <SelectItem value="2">Đã trồng</SelectItem>
                            <SelectItem value="3">Đã ươm mầm</SelectItem>
                          </SelectContent>
                        </Select>
                        {formik.touched.TotalStatus &&
                        formik.errors.TotalStatus ? (
                          <div className="text-red-600">
                            {formik.errors.TotalStatus}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-span-1">
                        <Label htmlFor="TrackingStatus">
                          Trạng thái cây <span className="text-red-600">*</span>
                        </Label>
                        <Select
                          value={formik.values.TrackingStatus.toString()}
                          onValueChange={(value) =>
                            formik.setFieldValue(
                              "TrackingStatus",
                              parseInt(value)
                            )
                          }
                        >
                          <SelectTrigger className="w-full" id="TrackingStatus">
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Chết</SelectItem>
                            <SelectItem value="1">Bình thường</SelectItem>
                            <SelectItem value="2">Bệnh</SelectItem>
                            <SelectItem value="3">
                              Đang được chăm sóc
                            </SelectItem>
                            <SelectItem value="4">Khỏe mạnh</SelectItem>
                          </SelectContent>
                        </Select>
                        {formik.touched.TrackingStatus &&
                        formik.errors.TrackingStatus ? (
                          <div className="text-red-600">
                            {formik.errors.TrackingStatus}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="DateCreate">
                        Ngày cập nhật <span className="text-red-600">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !formik.values.DateCreate &&
                                "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formik.values.DateCreate ? (
                              format(formik.values.DateCreate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Calendar
                            mode="single"
                            selected={formik.values.DateCreate}
                            onSelect={(date) => {
                              formik.setFieldValue("DateCreate", date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {formik.touched.DateCreate &&
                      typeof formik.errors.DateCreate === "string" ? (
                        <div className="text-red-600">
                          {formik.errors.DateCreate}
                        </div>
                      ) : null}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="ContentText">
                        Nội dung <span className="text-red-600">*</span>
                      </Label>
                      <Textarea
                        id="ContentText"
                        placeholder="Nội dung cập nhật"
                        className="min-h-32 resize-none"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ContentText}
                      />
                      {formik.touched.ContentText &&
                      formik.errors.ContentText ? (
                        <div className="text-red-600">
                          {formik.errors.ContentText}
                        </div>
                      ) : null}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="PlantImageDetails">
                        Hình ảnh kèm theo
                      </Label>
                      {pictures.length > 0 ? (
                        <div className="relative">
                          <div className="grid grid-cols-4 gap-2 w-full">
                            {pictures.map((picture, index) => (
                              <img
                                key={index}
                                src={`data:image/jpeg;base64,${picture}`}
                                alt={`picture-${index}`}
                                className="h-full w-full"
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="relative flex h-40 w-full mt-3">
                        <div className="border-2 h-40 border-dashed rounded-lg bg-[#fafafa] border-[#d9d9d9] flex flex-col w-full justify-center items-center gap-2 text-center p-5">
                          <Download />
                          <div>Chọn các hình ảnh cập nhật</div>
                          <div className="text-red-400 text-sm">
                            Khi chọn các hình ảnh mới sẽ thay thế các hình ảnh
                            cũ đã chọn trc đó
                          </div>
                        </div>
                        <Input
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="PlantImageDetails"
                          type="file"
                          multiple
                          onChange={onImageChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="w-full flex justify-center">
                  <Button type="submit">Đăng Cập Nhật</Button>
                </CardFooter>
              </form>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="flex w-full justify-center">
                  <div>Cập Nhật</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminTreeList detailList={detailList} />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminTreeDetail;
