export const ErrorMessageLogin = {
  username: {
    required: "Tên đăng nhập đang trống",
  },
  password: {
    required: "Mật khẩu đang trống",
  },
};

export const ErrorMessageRegister = {
  otp: {
    invalid: "Mã OTP không đúng với OTP đã gửi",
  },
  username: {
    required: "Tên đăng nhập đang trống",
    taken: "Tên đăng nhập đã có người sử dụng",
    length: "Tên đăng nhập cần tối thiểu 5 kí tự",
  },
  email: {
    required: "Email đang trống",
    invalidFormat: "Email không đúng định dạng",
  },
  password: {
    required: "Mật khẩu đang trống",
    length: "Mật khẩu cần tối thiểu 6 kí tự",
    invalidFormat:
      "Mật khẩu cần bắt đầu bằng chữ in hoa và có ít nhất 1 khoảng trống",
  },
  rePassword: {
    required: "Nhập lại mật khẩu đang trống",
    invalid: "Nhập lại mật khẩu không trùng với mật khẩu ở trên",
  },
  firstName: {
    required: "Tên đang trống",
  },
  lastName: {
    required: "Họ đang trống",
  },
  phoneNumber: {
    required: "Số điện thoại đang trống",
    length: "Số điện thoại không hợp lệ",
  },
};

export const ErrorMessageCreateNews = {
  newsTitle: {
    required: "Tiêu đề đang trống",
    length: "Tiêu đề tối đa 100 kí tự",
  },
  newsSummary: {
    required: "Tóm tắt đang trống",
    length: "Tóm tắt tối đa 150 kí tự",
  },
  newsDescription: {
    required: "Nội dung chính đang trống",
  },
  thumbnail: {
    required: "Thumbnail đang trống",
    invalid: "Dữ liệu vừa gửi không phải hình ảnh",
  },
  type: {
    required: "Thể loại tin tức đang trống",
  },
};

export const ErrorMessageCreateLog = {
  ContentText: {
    required: "Nội dung cập nhật đang trống",
    min: "Nội dung cần tối thiểu 10 ký tự",
  },
  dateCreate: {
    required: "Ngày cập nhật đang trống",
  },
};

export const ErrorMessageDonate = {
  quantity: {
    required: "Số lượng cây đnag thiếu",
    min: "Phải tối thiểu 1 cây",
    max: "Số lượng cây không được quá 1000",
  },
};
